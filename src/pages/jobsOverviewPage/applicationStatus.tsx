import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Fontawesome from 'react-fontawesome'
import { Input } from 'reactstrap'

import { getSavedJobs, getJobApplication } from '../../store/action/job'

import Header from '../headerPage/headerComponent2'
import SideBar from './sidebarPage/sidebar'
import SearchBox from './searchboxPage/searchBoxpage'

import './savedjobs.css'
import { Savedjobs } from '..'
import ApplicationsListTable from './listtable/applicationsListTable'

interface Props {
	savedJobs: any
	applicationsList: any
	getJobApplication: (params: any) => void
}

const ApplicationStatus: React.FC<any> = (props: Props): React.ReactElement => {
	const { applicationsList } = props

	let [pageNum, setPageNum] = useState(1)
	let [applicationListLimit, setJobListLimit] = useState(100)

	let [applicationPhase, setApplicationPhase] = useState('')
	let [applicationSearchTitle, setApplicationSearchTitle] = useState('')

	let pageParams = `?page=${pageNum}&limit=${applicationListLimit}`
	let [filterButtonClass, setFilterButtonClass] = useState('')

	let applicationsParamsIntrReq = `?page=${pageNum}&limit=${applicationListLimit}&phase=${applicationPhase}&title=${applicationSearchTitle}`

	let applicationsFilter = (phase: string) => {
		props.getJobApplication(applicationsParamsIntrReq)
	}

	useEffect(() => {
		props.getJobApplication(applicationsParamsIntrReq)
	}, [applicationSearchTitle, applicationPhase])

	useEffect(() => {
		//get saved jobs and manipulate data here
		props.getJobApplication(pageParams)
	}, [])

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
						<div className='Savedjobs__Body--Header--Title'>Applications</div>
						<div className='Savedjobs__Body--Header--Counter'>
							<span>{applicationsList.data.length}</span>
						</div>
						<div className='Savedjobs__Body--Header--Search'>
							<div className='SearchBox__Icon'>
								<Fontawesome name={'search'} />
								<Input
									className='searchJobsPageInputModule'
									placeholder='Search Applications'
									onChange={(e: any) =>
										setApplicationSearchTitle(e.target.value)
									}
								/>
							</div>
						</div>
					</div>
					<div className='Savedjobs__Body--Filter'>
						<button
							onClick={() => {
								setApplicationPhase('')
								setFilterButtonClass('')
							}}
							className={filterButtonClass === '' ? 'active' : ''}
						>
							All
						</button>
						<button
							className={filterButtonClass === 'screening' ? 'active' : ''}
							onClick={() => {
								setApplicationPhase('screening')
								setFilterButtonClass('screening')
							}}
						>
							Interview Requested
						</button>
						<button
							className={filterButtonClass === 'interview' ? 'active' : ''}
							onClick={() => {
								setApplicationPhase('interview')
								setFilterButtonClass('interview')
							}}
						>
							Interview Scheduled
						</button>
						<button
							className={filterButtonClass === 'pending' ? 'active' : ''}
							onClick={() => {
								setApplicationPhase('applied')
								setFilterButtonClass('pending')
							}}
						>
							Pending
						</button>
						<button
							className={filterButtonClass === 'declined' ? 'active' : ''}
							onClick={() => {
								setApplicationPhase('declined')
								setFilterButtonClass('declined')
							}}
						>
							Declined
						</button>
					</div>
					<div className='Savedjobs__Body--Table'>
						<ApplicationsListTable list={applicationsList} />
					</div>
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state: any) => ({
	savedJobs: state.job.saved,
	applicationsList: state.job.applicationList,
})

const actions = {
	getSavedJobs,
	getJobApplication,
}

export default connect(mapStateToProps, actions)(ApplicationStatus)
