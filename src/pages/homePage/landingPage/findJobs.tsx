import React, { useState, useEffect } from 'react'
import { JobCardComponent } from '../../../component'
import { Link, useHistory } from 'react-router-dom'
import Dots from '../../../assets/images/landing-page/3dots.png'
import { Spinner } from 'reactstrap'
import { IsLoggedIn } from '../../../utils/storage'
import './landingPage.css'

import {
	getJobs,
	getJobCategories,
	filterJobs,
} from '../../../store/action/job'
import { locationListAction } from '../../../store/action/locationListAction'

import { connect } from 'react-redux'

interface Props {
	num: number
	jobCount?: number
	getJobs: (params: any) => void
	getJobCategories: () => void
	locationListAction: () => void
	filterJobs: (params: any) => void
	jobList: any
	jobCategory: any
	locationList: any
}

const FindJobs: React.FC<Props> = (props: Props) => {
	const {
		getJobs,
		jobCategory,
		getJobCategories,
		locationListAction,
		filterJobs,
		jobList,
		locationList,
	} = props

	const [filterParams, setFilterParams] = useState({
		locations: null,
		category: { title: null, skills: [] },
	})

	const history = useHistory()

	useEffect(() => {
		const pageParams = `?page=${currentPage}&limit=${15}`

		if (
			filterParams.category.title !== null ||
			filterParams.locations !== null
		) {
			const filterParamsJson = JSON.stringify({
				locations: filterParams.locations,
				category: { title: filterParams.category.title },
			})
			filterJobs(`${pageParams}&filters=${filterParamsJson}`)
		} else {
			getJobs(pageParams)
		}
	}, [filterParams])

	const getLocations = (locationList) => {
		let locations: any = []

		if (
			locationList &&
			locationList.country_states_cities &&
			locationList.country_states_cities.states.length
		) {
			locationList.country_states_cities.states.forEach((state: any) => {
				if (state.cities.length) {
					state.cities.forEach((city: any) => {
						locations.push({ title: city, value: city })
					})
				}
			})
		}

		return locations
	}

	const [listLimit, setListLimit] = useState(3)

	const currentPage = 1

	useEffect(() => {
		const pageParams = `?page=${currentPage}&limit=${15}`
		getJobs(pageParams)
		locationListAction()
	}, [])

	useEffect(() => {
		getJobCategories()
	}, [])

	return (
		<div>
			<div style={{ marginTop: '65px' }} className='find-jobs-container'>
				<div className='find-jobs-startImage'>
					<div className='find-jobs-startImage-wrapper container'>
						<div className='find-jobs-left'>
							<h1>Build Your Future with WorkerPros</h1>
						</div>
						<div className='find-jobs-right'>
							<Link to='/howitwork'>
								<button className='learn-more-button'>Learn More</button>
							</Link>
						</div>
					</div>
				</div>
				<div className='find-jobs-in-outerdiv'>
					<div className='container'>
						<div className='find-jobs-in-container'>
							<div className='find-jobs-in-title'>
								<h2>
									Find jobs in{' '}
									<select
										className='CharlotteDropDown'
										onChange={(e: any) => {
											console.log(e.target.value)
											setFilterParams({
												...filterParams,
												locations: e.target.value,
											})
										}}
										name='cars'
										id='cars'
									>
										{getLocations(locationList).map((value: any, index) => {
											return <option key={index}>{value.title}</option>
										})}
									</select>
								</h2>
							</div>
							<div className='job-category-list'>
								<ul>
									<li
										onClick={() =>
											setFilterParams({
												...filterParams,
												category: { ...filterParams.category, title: null },
											})
										}
										className={`landingPageJobstypeLi2 ${
											filterParams.category.title === null ? 'active' : null
										}`}
									>
										All Jobs
									</li>
									{jobCategory.data &&
										jobCategory.data.map((category: any, index) => {
											return (
												<>
													<li
														onClick={() =>
															setFilterParams({
																...filterParams,
																category: {
																	...filterParams.category,
																	title: category.title,
																},
															})
														}
														className={`landingPageJobstypeLi2 ${
															filterParams.category.title === category.title
																? 'active'
																: null
														}`}
														key={index}
													>
														{category.title}
													</li>
												</>
											)
										})}
								</ul>
							</div>
						</div>
						<div className='jobs-list-container'>
							<ul className='jobs-list-ul'>
								{jobList.loading ? (
									<div className='loaderDiv'>
										<Spinner color='grey' />
									</div>
								) : jobList.data &&
								  jobList.data.jobs &&
								  jobList.data.jobs.length > 0 ? (
									jobList.data.jobs
										.slice(0, listLimit)
										.map((job: any, index) => {
											return (
												<Link
													style={{ textDecoration: 'none' }}
													key={index}
													to={`/jobdescription/${job._id}`}
												>
													<JobCardComponent
														image={job.company.profile_image}
														descripton={job.summary}
														heading={job.title}
														hourPayMin={job.pay_rate.min}
														hourPayMax={job.pay_rate.max}
														jobLocation={job.address.city}
														companyName={job.company.company_name}
														featured={job.job_featured}
														categories={job.categories}
														showCategory={false}
													/>
												</Link>
											)
										})
								) : (
									<div className='noDataFoundDiv'> No Data Available! </div>
								)}
							</ul>
							<div
								className='load-more'
								onClick={() => {
									IsLoggedIn()
										? history.push('/findJobs')
										: history.push('/login')
								}}
							>
								<img style={{ marginRight: '17px' }} src={Dots}></img> Load More
								Jobs
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	jobList: state.job.list,
	jobCategory: state.job.category,
	locationList: state.locationListReducer.data,
})

const actions = {
	getJobs,
	getJobCategories,
	filterJobs,
	locationListAction,
}

export default connect(mapStateToProps, actions)(FindJobs)
