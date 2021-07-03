import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { HeaderPage2 } from '../headerPage'
import {
	JobCardComponent,
	CompanyMidCardComponent,
	ButtonComponent,
} from '../../component'
import { getJobCategories, getJobs, filterJobs } from '../../store/action/job'
import { locationListAction } from '../../store/action/locationListAction'
import { Range, getTrackBackground } from 'react-range'
import { InputCheckBox } from '../../component/common/FormComponent/form'

import {
	ThreeDots,
	SearchIcon,
	LessFilterIcon,
	LocationIcon,
} from '../../component/logosAndIcons'
import TopCompanies from '../homePage/landingPage/topCompanies'
import './jobFinderpage.css'
import '../../styles/responsive.css'
import { Form, FormGroup, Input, Spinner } from 'reactstrap'

import { WithContext as ReactTags } from 'react-tag-input'
import ReactPaginate from 'react-paginate'

const KeyCodes = {
	comma: 188,
	enter: 13,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

interface Props {
	value?: string
	jobsData?: []
	getJobCategories: () => void
	getJobs: (params: any) => void
	filterJobs: (params: any) => void
	locationListAction: () => void
	ref?: React.RefObject<any>
	style?: React.CSSProperties
	jobCategory: any
	jobList: any
	locationList: any
}

const JobFinderPage: React.FC<Props> = (props: Props): React.ReactElement => {
	const {
		getJobCategories,
		getJobs,
		filterJobs,
		locationListAction,
		jobCategory,
		jobList,
		locationList,
	} = props

	const rate = { from: 0, to: 1 }
	const [moreFilterText, setMoreFilterText] = useState('More Filters')
	const [moreFilterIcon, setMoreFilterIcon] = useState(ThreeDots)
	const [showSkillSelect, setShowSkillSelect] = useState('')
	const [values, setValues] = useState([18])
	let [selectedSkills, setSelectedSkills] = useState([])
	let currentSkills = []
	const [locationTags, setLocationTags] = useState({
		tags: [
			{ id: 'Charlotte', text: 'Charlotte' },
			{ id: 'Miami', text: 'Miami' },
		],
		suggestions: [
			{ id: 'USA', text: 'USA' },
			{ id: 'Germany', text: 'Germany' },
			{ id: 'Austria', text: 'Austria' },
			{ id: 'Costa Rica', text: 'Costa Rica' },
			{ id: 'Sri Lanka', text: 'Sri Lanka' },
			{ id: 'Thailand', text: 'Thailand' },
		],
	})

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

	const handleDelete = (i) => {
		const { tags } = locationTags
		setLocationTags({
			tags: tags.filter((tag, index) => index !== i),
			suggestions: locationTags.suggestions,
		})
	}

	const handleAddition = (tag) => {
		setLocationTags({
			tags: [...locationTags.tags, tag],
			suggestions: locationTags.suggestions,
		})
	}

	const handleDrag = (tag, currPos, newPos) => {
		const tags = [...locationTags.tags]
		const newTags = tags.slice()

		newTags.splice(currPos, 1)
		newTags.splice(newPos, 0, tag)

		// re-render
		setLocationTags({ tags: newTags, suggestions: locationTags.suggestions })
	}

	const { tags, suggestions } = locationTags

	const updateRate = (rateRange: any) => {
		setFilterParams({
			...filterParams,
			pay_rate: { min: rateRange[0], max: rateRange[1] },
		})
	}

	const onChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target
		const { name, value } = event.target

		const data: any = filterParams.category.skills
		if (target.checked == true) {
			data.push(target.value)
		} else {
			data.pop(target.value)
		}
		console.log('data', data)
		setFilterParams({
			...filterParams,
			category: {
				...filterParams.category,
				skills: data,
			},
		})
	}

	const moreFilterHandler = () => {
		if (moreFilterText === 'More Filters') {
			setMoreFilterText('Less Filters')
			setMoreFilterIcon(LessFilterIcon)

			let additionalFilter: any = document.querySelector(
				'.jobFinderMoreFiltersDiv'
			)
			additionalFilter.style.display = 'block'
		} else {
			setMoreFilterText('More Filters')
			setMoreFilterIcon(ThreeDots)
			let additionalFilter: any = document.querySelector(
				'.jobFinderMoreFiltersDiv'
			)
			additionalFilter.style.display = 'none'
		}
	}

	const [filterParams, setFilterParams] = useState({
		locations: null,
		category: { title: null, skills: [] },
		travel_will: values,
		search: '',
		pay_rate: { min: 1, max: 100 },
		skill_level: null,
	})
	const [currentPage, setCurrentPage] = useState(1)

	const listLimit = 10

	useEffect(() => {
		getJobCategories()
		locationListAction()
		window.scrollTo(0, 0)
	}, [])

	useEffect(() => {
		const filterParamsJson = getFilters()
		const pageParams = `?page=${currentPage}&limit=${listLimit}&filters=${filterParamsJson}`

		getJobs(pageParams)
	}, [currentPage])

	useEffect(() => {
		const pageParams = `?page=${currentPage}&limit=${listLimit}&filters=${filterParamsJson}`

		getJobs(pageParams)
	}, [currentPage])

	const getFilters = () => {
		let newFilterParams: any = {
			pay_rate: {
				min: 1,
				max: 100,
			},
		}

		if (filterParams.category !== null) {
			newFilterParams.category = filterParams.category
		}

		if (filterParams.pay_rate.min !== 1) {
			newFilterParams.pay_rate.min = filterParams.pay_rate.min
		}

		if (filterParams.pay_rate.max !== 100) {
			newFilterParams.pay_rate.max = filterParams.pay_rate.max
		}

		if (filterParams.locations !== null) {
			newFilterParams.locations = filterParams.locations
		}

		if (filterParams.search !== null) {
			newFilterParams.search = filterParams.search
		}

		return JSON.stringify(newFilterParams)
	}

	let filterParamsJson = getFilters()

	useEffect(() => {
		filterJobs(
			`?page=${currentPage}&limit=${listLimit}&filters=${filterParamsJson}`
		)
	}, [filterParamsJson])

	const applyFilter = () => {
		const filterParamsJson = getFilters()
		filterJobs(
			`?page=${currentPage}&limit=${listLimit}&filters=${filterParamsJson}`
		)
	}

	const handleClick = (event: any) => {
		window.scrollTo(0, 0)
		const data = event
		setCurrentPage(data.selected + 1)
		console.log('Paginate number', data.selected + 1)
	}

	//Category On Click
	const [filterHeight, setFilterHeight] = useState(0)
	const getFilterHeight = (categoryId) => {
		const height = document.querySelector(`#Category__Skills-${categoryId}`)
			?.clientHeight

		console.log({ height })
		return height ? height + 20 : 0
	}

	useEffect(() => {
		setFilterHeight(getFilterHeight(showSkillSelect))
	}, [showSkillSelect])

	return (
		<div className='JobsMainContainer'>
			<div>
				<HeaderPage2 title='WorkerPros' />
			</div>
			<div className='bannerSectionJobPage'></div>
			<div className='findJobsInBannerSection'>
				<div className='companiesFilterSectionJobPage'>
					<p className='findJobsInSectionJobPage'>
						Find Jobs In{' '}
						<span>
							{' '}
							<select
								className='CharlotteDropDown'
								onChange={(e: any) => {
									setShowSkillSelect('')
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
						</span>
						<div className='job-category-list'>
							<ul>
								{jobCategory.loading ? (
									<div className='loaderDiv'>
										<Spinner color='grey' />
									</div>
								) : (
									<>
										<li
											onClick={() => {
												setShowSkillSelect('')
												setFilterParams({
													...filterParams,
													category: { ...filterParams.category, title: null },
												})
											}}
											className={`landingPageJobstypeLi jobFinder ${
												filterParams.category &&
												filterParams.category.title === null
													? 'active'
													: null
											}`}
											style={{ marginBottom: 'auto' }}
										>
											All Jobs
										</li>
										{jobCategory.data &&
											jobCategory.data.map((category: any, index) => {
												return (
													<>
														<li
															onClick={() => {
																setShowSkillSelect(category._id)

																setFilterParams({
																	...filterParams,
																	category: {
																		...filterParams.category,
																		title: category.title,
																	},
																})
															}}
															className={`landingPageJobstypeLi jobFinder ${
																filterParams.category.title === category.title
																	? 'active pointer'
																	: null
															}`}
															style={{
																marginBottom:
																	category._id === showSkillSelect
																		? `${filterHeight}px`
																		: 'auto',
															}}
															key={index}
														>
															<div className='jobFinderContainer'>
																{category.title}
															</div>
															<div
																id={`Category__Skills-${category._id}`}
																className={`jobFinderSkillSelectContainer ${
																	category._id === showSkillSelect ? 'show' : ''
																}`}
															>
																{category.skills.map((value, index) => {
																	return (
																		<InputCheckBox
																			key={index}
																			title={value}
																			value={value}
																			onChecked={(e: any) => {
																				onChecked(e)
																			}}
																		/>
																	)
																})}
															</div>
														</li>
													</>
												)
											})}
									</>
								)}
							</ul>
							<br />
						</div>
					</p>
					<div className='jobFinderPageFilter1'>
						<div className='jobFinderRangeSliderDiv'>
							<span className='jobFinderPageFilterTitle'> Hourly Pay</span>

							<Range
								values={[
									filterParams.pay_rate.min ? filterParams.pay_rate.min : 1,
									filterParams.pay_rate.max ? filterParams.pay_rate.max : 100,
								]}
								step={1}
								min={0}
								max={100}
								onChange={(values) => updateRate(values)}
								renderTrack={({ props, children }) => (
									<div
										style={{
											height: '36px',
											display: 'flex',
										}}
									>
										<div
											ref={props.ref}
											style={{
												height: '5px',
												width: '100%',
												borderRadius: '4px',
												background: getTrackBackground({
													values: [
														filterParams.pay_rate.min
															? filterParams.pay_rate.min
															: 1,
														filterParams.pay_rate.max
															? filterParams.pay_rate.max
															: 100,
													],
													colors: ['#E1E7EF', '#234476', '#E1E7EF'],
													min: 0,
													max: 100,
												}),
												alignSelf: 'center',
											}}
										>
											{children}
										</div>
									</div>
								)}
								renderThumb={({ props }) => (
									<div
										{...props}
										style={{
											...props.style,
											height: '24px',
											width: '24px',
											borderRadius: '24px',
											backgroundColor: '#FFFFFF',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
										}}
									></div>
								)}
							/>
							<span className='jobFinderPageRangeMin'>
								${filterParams.pay_rate.min}
							</span>
							<span className='jobFinderPageRangeMax'>
								${filterParams.pay_rate.max}
							</span>
						</div>
						<div className='jobFinderPageSkillLevelDiv'>
							<span className='jobFinderPageFilterTitle'>Skill Level</span>
							<FormGroup className='InputDropDownField'>
								<Input
									type='select'
									name='state'
									className='InputDropTextField'
									id='exampleSelect'
								>
									{/* {props.countrylist &&
											props.countrylist.states &&
											props.countrylist.states.map((items, index) => {
												return <option key={items}></option>
											})} */}
									<option>Any</option>
									<option>Skill 1</option>
									<option>Skill 2</option>
									<option>Skill 3</option>
									<option>Skill 4</option>
								</Input>
							</FormGroup>
						</div>
						<div className='jobFinderPageSearchDiv'>
							<span className='jobFinderPageFilterTitle'>Search</span>
							<div className='jobFinderSearchInnerDiv'>
								<Form>
									<FormGroup className='writePostInputContainer'>
										<Input
											className='jobFinderPageSearchBox'
											placeholder='Search by a job title or keywords'
											onChange={(event) =>
												setFilterParams({
													...filterParams,
													search: event.target.value,
												})
											}
										></Input>
										<img
											className='writePostPlaceholderImage'
											src={SearchIcon}
										/>{' '}
									</FormGroup>
								</Form>
							</div>

							{/* <button>Apply Filter</button> */}
						</div>
					</div>
					{/* <div className='jobFinderButtonDiv'>
						<ButtonComponent
							width={170}
							clickHandler={applyFilter}
							buttonTitle='Apply Filter'
						/>
					</div> */}

					<div className='jobFinderMoreFiltersDiv'>
						<div className='jobFinderAdditionalFiltersTextDiv'>
							Additional Filters
						</div>
						<div className='jobFinderAdditionalFiltersContainer'>
							<div className='addFilterLocationSelect'>
								<span className='jobFinderPageFilterTitle'>Locations</span>
								<ReactTags
									className='jobFindertagInput'
									inputFieldPosition='inline'
									tags={tags}
									suggestions={suggestions}
									handleDelete={handleDelete}
									handleAddition={handleAddition}
									delimiters={delimiters}
									placeholder='Add a location'
								/>
								<img className='addLocationTagImage' src={LocationIcon} />
							</div>
							<div className='addFilterWilltoTravel'>
								<span className='jobFinderPageFilterTitle'>
									Willing To Travel:{' '}
									<text className='CustomizeTextofHowFar'>{values} MI</text>{' '}
								</span>
								<FormGroup className='SliderCustomizer'>
									<Range
										values={values}
										step={1}
										min={0}
										max={50}
										onChange={(values) => setValues(values)}
										renderTrack={({ props, children }) => (
											<div
												style={{
													height: '36px',
													display: 'flex',
													width: '100%',
												}}
											>
												<div
													ref={props.ref}
													style={{
														height: '5px',
														width: '100%',
														borderRadius: '4px',
														background: getTrackBackground({
															values: values,
															colors: ['#234476', '#E1E7EF'],
															min: 0,
															max: 50,
														}),
														alignSelf: 'center',
													}}
												>
													{children}
												</div>
											</div>
										)}
										renderThumb={({ props }) => (
											<div
												{...props}
												style={{
													height: '24px',
													width: '24px',
													borderRadius: '24px',
													backgroundColor: '#FFFFFF',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
												}}
											></div>
										)}
									/>
								</FormGroup>
								<div className='ProfileSliderValueContainer'>
									<div className='InitialValueSlider'>1 mi</div>
									<div className='InitialValueSlider'>50+ mi</div>
								</div>
							</div>
						</div>
					</div>
					<div onClick={moreFilterHandler} className='jobFinderMoreFilterDiv'>
						{' '}
						<img style={{ marginRight: '15px' }} src={moreFilterIcon} />
						{moreFilterText}
					</div>
				</div>
			</div>
			<div className='jobsListSection container'>
				<div className='listHeader'>
					<div>
						<h5 style={{ textTransform: 'capitalize' }}>
							{filterParams.category.title
								? filterParams.category.title
								: 'All'}{' '}
							Jobs In{' '}
							{filterParams.locations ? filterParams.locations : 'Charlotte'}{' '}
						</h5>
					</div>

					<span className='TotalofJobFinder'>
						Total Of{' '}
						<span style={{ color: '#000000' }}>
							{' '}
							{jobList.data.totalJobs} Jobs
						</span>
					</span>
				</div>
				<div className='jobsList'>
					<ul className='jobs-list-ul'>
						{jobList.loading ? (
							<div className='loaderDiv'>
								<Spinner color='grey' />
							</div>
						) : jobList.data &&
						  jobList.data.jobs &&
						  jobList.data.jobs.length > 0 ? (
							jobList.data.jobs.map((job: any, index) => {
								return (
									<>
										{index === 4 && <CompanyMidCardComponent jobs={true} />}
										<Link
											style={{ textDecoration: 'none' }}
											to={`/jobdescription/${job._id}`}
											key={index}
										>
											{' '}
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
												showCategory={true}
											/>
										</Link>
									</>
								)
							})
						) : (
							<div className='noDataFoundDiv'> Oops! No Job Found </div>
						)}
					</ul>
				</div>
				<div className='PaginationSection'>
					<ReactPaginate
						previousLabel={` < Previous`}
						nextLabel={'Next >'}
						breakLabel={'...'}
						breakClassName={'PaginationLi'}
						pageCount={Math.ceil(jobList.data.totalJobs / listLimit)}
						marginPagesDisplayed={2}
						pageRangeDisplayed={5}
						onPageChange={(e: any) => handleClick(e)}
						containerClassName={'pagination'}
						subContainerClassName={'pages pagination'}
						activeClassName={'activePaginate'}
					/>
				</div>
			</div>
			<div style={{ marginTop: '30px' }}>
				<TopCompanies showDownload={false} />
			</div>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	jobCategory: state.job.category,
	jobList: state.job.list,
	locationList: state.locationListReducer.data,
})

const actions = {
	getJobCategories,
	getJobs,
	filterJobs,
	locationListAction,
}

export default connect(mapStateToProps, actions)(JobFinderPage)
