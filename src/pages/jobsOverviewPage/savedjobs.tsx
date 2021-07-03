import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Fontawesome from 'react-fontawesome'
import { Input } from 'reactstrap'

import { getSavedJobs, getSavedJobsWithFilter } from '../../store/action/job'

import Header from '../headerPage/headerComponent2'
import SideBar from './sidebarPage/sidebar'
import SearchBox from './searchboxPage/searchBoxpage'
import ListTable from './listtable/listTablePage'

import './savedjobs.css'

interface Props {
	savedJobs: any
	getSavedJobs: (params: any) => void
	getSavedJobsWithFilter: (params: any) => void
}

const SavedJobs: React.FC<any> = (props: Props): React.ReactElement => {
	const { savedJobs } = props
	let [pageNum, setPageNum] = useState(1)
	let [jobListLimit, setJobListLimit] = useState(100)
	let [jobTitleSearch, setJobTitle] = useState({ title: '' })

	let [filterButtonClass, setFilterButtonClass] = useState('')

	// let pageParams = `?page=${pageNum}&limit=${jobListLimit}`

	let pageParams = `?day_filter=30&filters=${JSON.stringify(jobTitleSearch)}`

	let savedJobsParams7 = `?day_filter=7&filters=${JSON.stringify(
		jobTitleSearch
	)}`
	let savedJobsParams30 = `?day_filter=30&filters=${JSON.stringify(
		jobTitleSearch
	)}`

	useEffect(() => {
		//get saved jobs and manipulate data here
		props.getSavedJobs(pageParams)
	}, [])

	useEffect(() => {
		props.getSavedJobs(pageParams)
	}, [jobTitleSearch])

	return (
		<>
			<div className='headerCustomWidth'>
				<Header title={'Saved Jobs'} />
			</div>

			<div className='Savedjobs'>
				<div className='Savedjobs__SideBar'>
					<SideBar />
				</div>
				<div className='Savedjobs__Body'>
					<div className='Savedjobs__Body--Header'>
						<div className='Savedjobs__Body--Header--Title'>Saved Jobs</div>
						<div className='Savedjobs__Body--Header--Counter'>
							<span>{savedJobs.data.length}</span>
						</div>
						<div className='Savedjobs__Body--Header--Search'>
							<div className='SearchBox__Icon'>
								<Fontawesome name={'search'} />
								<Input
									className='searchJobsPageInputModule'
									onChange={(e: any) =>
										setJobTitle({ ...jobTitleSearch, title: e.target.value })
									}
									placeholder='Search Jobs'
								/>
							</div>
						</div>
					</div>
					<div className='Savedjobs__Body--Filter'>
						<button
							onClick={() => {
								setFilterButtonClass('')
								props.getSavedJobs(pageParams)
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
					</div>
					<div className='Savedjobs__Body--Table'>
						<ListTable list={savedJobs} />
					</div>
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state: any) => ({
	savedJobs: state.job.saved,
})

const actions = {
	getSavedJobs,
	getSavedJobsWithFilter,
}

export default connect(mapStateToProps, actions)(SavedJobs)
