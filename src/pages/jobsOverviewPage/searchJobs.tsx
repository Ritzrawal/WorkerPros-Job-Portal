import './searchJobs.css'

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import {
	getSavedJobsWithFilter,
	getJobs,
	filterJobs,
} from '../../store/action/job'

import Header from '../headerPage/headerComponent2'
import SideBar from './sidebarPage/sidebar'
import JobSearchTable from './listtable/jobSearchListTable'
import Fontawesome from 'react-fontawesome'
import { Input } from 'reactstrap'

interface Props {
	jobList: any
	filterJobs: (params: any) => void
	getSavedJobsWithFilter: (params: any) => void
	getJobs: (params: any) => void
}

const SearchJobs: React.FC<any> = (props: Props): React.ReactElement => {
	const { jobList, getJobs, filterJobs } = props
	let [pageNum, setPageNum] = useState(1)
	let [jobListLimit, setJobListLimit] = useState(100)

	let [filterButtonClass, setFilterButtonClass] = useState('')

	const [filterParams, setFilterParams] = useState({
		locations: null,
		category: { title: null, skills: [] },
		search: '',
		pay_rate: { min: 1, max: 100 },
		skill_level: null,
	})

	const [currentPage, setCurrentPage] = useState(1)

	const listLimit = 40

	let pageParams = `?page=${pageNum}&limit=${jobListLimit}`
	let savedJobsParams7 = `?page=${pageNum}&limit=${jobListLimit}&day_filter=7`
	let savedJobsParams30 = `?page=${pageNum}&limit=${jobListLimit}&day_filter=30`

	const getFilters = () => {
		let newFilterParams: any = {}
		if (filterParams.category.title !== null) {
			newFilterParams.category = {
				title: filterParams.category.title,
				skills: filterParams.category.skills,
			}
		}

		if (filterParams.locations !== null) {
			newFilterParams.locations = filterParams.locations
		}

		if (
			filterParams.pay_rate.min !== null &&
			filterParams.pay_rate.max !== null
		) {
			newFilterParams.pay_rate = filterParams.pay_rate
		}

		if (filterParams.search !== null) {
			newFilterParams.search = filterParams.search
		}

		return JSON.stringify(newFilterParams)
	}

	let filterParamsJson = getFilters()

	console.log('All jobs haru eta hai', jobList)

	useEffect(() => {
		filterJobs(
			`?page=${currentPage}&limit=${listLimit}&filters=${filterParamsJson}`
		)
	}, [filterParamsJson])

	useEffect(() => {
		const filterParamsJson = getFilters()
		const pageParams = `?page=${currentPage}&limit=${listLimit}&filters=${filterParamsJson}`

		getJobs(pageParams)
	}, [currentPage])

	useEffect(() => {
		const pageParams = `?page=${currentPage}&limit=${listLimit}`

		getJobs(pageParams)
	}, [])

	return (
		<>
			<div className='headerCustomWidth'>
				<Header title={'Search Jobs'} />
			</div>

			<div className='Savedjobs'>
				<div className='Savedjobs__SideBar'>
					<SideBar />
				</div>
				<div className='Savedjobs__Body'>
					<div className='Savedjobs__Body--Header'>
						<div className='Savedjobs__Body--Header--Title'>Search Jobs</div>
						<div className='Savedjobs__Body--Header--Counter'>
							<span>{jobList.data.totalJobs}</span>
						</div>
						<div className='SearchJobs__Body--Header--Search'>
							<div className='SearchBox__Icon'>
								<Fontawesome name={'search'} />
								<Input
									className='searchJobsPageInputModule'
									onChange={(e: any) =>
										setFilterParams({ ...filterParams, search: e.target.value })
									}
									placeholder='Search Jobs'
								/>
							</div>
						</div>
					</div>
					{/* <div className='Savedjobs__Body--Filter'>
						<button
							onClick={() => {
								setFilterButtonClass('')
							}}
							className={filterButtonClass === '' ? 'active' : ''}
						>
							All
						</button>
						<button
							onClick={() => {
								setFilterButtonClass('7Days')
								props.getSavedJobsWithFilter(savedJobsParams7)
							}}
							className={filterButtonClass === '7Days' ? 'active' : ''}
						>
							Last 7 Days
						</button>
						<button
							onClick={() => {
								setFilterButtonClass('30Days')
								props.getSavedJobsWithFilter(savedJobsParams30)
							}}
							className={filterButtonClass === '30Days' ? 'active' : ''}
						>
							Last 30 Days
						</button>
					</div> */}
					<div className='Searchjobs__Body--Table'>
						<JobSearchTable list={jobList} />
					</div>
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state: any) => ({
	jobList: state.job.list,
})

const actions = {
	getSavedJobsWithFilter,
	getJobs,
	filterJobs,
}

export default connect(mapStateToProps, actions)(SearchJobs)
