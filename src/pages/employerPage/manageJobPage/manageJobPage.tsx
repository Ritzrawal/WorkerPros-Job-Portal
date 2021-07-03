import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'reactstrap'

import {
	employerPublishedJobListAction,
	employerDraftJobListAction,
	employerExpiredJobListAction,
	employerToggleJobStatusAction,
} from '../../../store/action/employerJobAction'

import Navbar from '../../../component/employer/navbar/navbar'
import Sidebar from '../../../component/employer/sidebar/sidebar'

import ManageJobBox from './manageJobBox/manageJobBox'

import './manageJobPage.css'

const listTypes = {
	PUBLISHED: 'PUBLISHED',
	DRAFT: 'DRAFT',
	EXPIRED: 'EXPIRED',
}
interface Props {
	employerPublishedJobList: any
	employerDraftJobList: any
	employerExpiredJobList: any
	employerPublishedJobListAction: (params: any) => void
	employerDraftJobListAction: (params: any) => void
	employerExpiredJobListAction: (params: any) => void
	employerToggleJobStatusAction: (jobId: string, jobType: string) => void
}

const ManageJobPage: React.FC<Props> = (props: Props) => {
	const {
		employerPublishedJobList,
		employerDraftJobList,
		employerExpiredJobList,
		employerPublishedJobListAction,
		employerDraftJobListAction,
		employerExpiredJobListAction,
		employerToggleJobStatusAction,
	} = props

	const [currentPage, setCurrentPage] = useState(1)
	const [currentList, setCurrentList] = useState(listTypes.PUBLISHED)

	const limit = 10

	useEffect(() => {
		const params = '&page=1&limit=10'
		employerPublishedJobListAction(params)
		employerDraftJobListAction(params)
		employerExpiredJobListAction(params)
	}, [])

	const getEmployerJobLoading = () => {
		let jobListLoading = false

		if (currentList === listTypes.PUBLISHED) {
			jobListLoading = employerPublishedJobList.loading
		} else if (currentList === listTypes.DRAFT) {
			jobListLoading = employerDraftJobList.loading
		} else if (currentList === listTypes.EXPIRED) {
			jobListLoading = employerExpiredJobList.loading
		}

		return jobListLoading
	}

	const employerToggleJobStatus = (jobId: string) => {
		employerToggleJobStatusAction(jobId, currentList)
	}

	return (
		<>
			<Navbar />
			<div className='EmployerManageJob'>
				<Sidebar />
				<div className='EmployerManageJob__Body'>
					<div className='EmployerManageJob__Body--Title'>Your Jobs</div>
					<div className='EmployerManageJob__Body--SubTitle'>
						<div
							className={`EmployerManageJob__Body--SubTitle--Published ${
								currentList === listTypes.PUBLISHED ? 'Active' : ''
							}`}
							onClick={() => setCurrentList(listTypes.PUBLISHED)}
						>
							Published{' '}
							<span>
								{employerPublishedJobList.data
									? employerPublishedJobList.data.length
									: 0}
							</span>
						</div>
						<div
							className={`EmployerManageJob__Body--SubTitle--Draft ${
								currentList === listTypes.DRAFT ? 'Active' : ''
							}`}
							onClick={() => setCurrentList(listTypes.DRAFT)}
						>
							Draft{' '}
							<span>
								{employerDraftJobList.data
									? employerDraftJobList.data.length
									: 0}
							</span>
						</div>
						<div
							className={`EmployerManageJob__Body--SubTitle--Expired ${
								currentList === listTypes.EXPIRED ? 'Active' : ''
							}`}
							onClick={() => setCurrentList(listTypes.EXPIRED)}
						>
							Expired{' '}
							<span>
								{employerExpiredJobList.data
									? employerExpiredJobList.data.length
									: 0}
							</span>
						</div>
					</div>
					<div className='EmployerManageJob__Body--Container'>
						{getEmployerJobLoading() ? (
							<Spinner />
						) : (
							<>
								<div
									className={`EmployerManageJob__Body--Container--Published ${
										currentList === listTypes.PUBLISHED ? '' : 'Hide'
									}`}
								>
									{employerPublishedJobList.data &&
										employerPublishedJobList.data.map((job: any, index) => (
											<div
												key={index}
												className='EmployerManageJob__Body--Container--Published--ManageJobBox'
											>
												<ManageJobBox
													jobId={job._id}
													active={job.active}
													title={job.title}
													location={job.address.city}
													pay={null}
													description={job.summary}
													applicantCount={job.applicants_count}
													newApplicantCount={job.new_applicants_count}
													messageCount={0}
													interviewCount={job.interviews_count}
													categories={job.categories}
													employerToggleJobStatus={employerToggleJobStatus}
												/>
											</div>
										))}
								</div>

								<div
									className={`EmployerManageJob__Body--Container--Draft ${
										currentList === listTypes.DRAFT ? '' : 'Hide'
									}`}
								>
									{employerDraftJobList.data &&
										employerDraftJobList.data.map((job: any, index) => (
											<div
												key={index}
												className='EmployerManageJob__Body--Container--Draft--ManageJobBox'
											>
												<ManageJobBox
													jobId={job._id}
													active={job.active}
													title={job.title}
													location={job.address.city}
													pay={null}
													description={job.summary}
													applicantCount={job.applicants_count}
													newApplicantCount={job.new_applicants_count}
													messageCount={0}
													interviewCount={job.interviews_count}
													categories={job.categories}
													employerToggleJobStatus={employerToggleJobStatus}
												/>
											</div>
										))}
								</div>

								<div
									className={`EmployerManageJob__Body--Container--Expired ${
										currentList === listTypes.EXPIRED ? '' : 'Hide'
									}`}
								>
									{employerExpiredJobList.data &&
										employerExpiredJobList.data.map((job: any, index) => (
											<div
												key={index}
												className='EmployerManageJob__Body--Container--Expired--ManageJobBox'
											>
												<ManageJobBox
													jobId={job._id}
													active={job.active}
													title={job.title}
													location={job.address.city}
													pay={null}
													description={job.summary}
													applicantCount={job.applicants_count}
													newApplicantCount={job.new_applicants_count}
													messageCount={0}
													interviewCount={job.interviews_count}
													categories={job.categories}
													employerToggleJobStatus={employerToggleJobStatus}
												/>
											</div>
										))}
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state) => ({
	employerPublishedJobList: state.employerJobReducer.published,
	employerDraftJobList: state.employerJobReducer.draft,
	employerExpiredJobList: state.employerJobReducer.expired,
	employerToggleJobStatus: state.employerJobReducer.toggleStatus,
})

const actions = {
	employerPublishedJobListAction,
	employerDraftJobListAction,
	employerExpiredJobListAction,
	employerToggleJobStatusAction,
}

export default connect(mapStateToProps, actions)(ManageJobPage)
