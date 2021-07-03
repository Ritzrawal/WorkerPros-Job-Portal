import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'reactstrap'

import {
	employerAppliedJobCandidateListAction,
	employerAppliedJobCandidatePhaseChangeAction,
} from '../../../store/action/employerCandidateAction'
import { employerJobDetailAction } from '../../../store/action/employerJobAction'

import Navbar from '../../../component/employer/navbar/navbar'
import Sidebar from '../../../component/employer/sidebar/sidebar'

import DraggablePipelineList from '../../../component/employer/list/pipelineList/draggablePipelineList'

import './jobDetailPage.css'

interface Props {
	employerAppliedJobCandidateList: any
	employerAppliedJobCandidateListAction: (jobId: string) => void
	employerAppliedJobCandidatePhaseChange: any
	employerAppliedJobCandidatePhaseChangeAction: (
		applicationId: string,
		phase: string
	) => void
	employerJobDetail: any
	employerJobDetailAction: (jobId: any) => void
	match: any
}

const JobDetailPage: React.FC<Props> = (props: Props) => {
	const {
		employerAppliedJobCandidateList,
		employerAppliedJobCandidateListAction,
		employerAppliedJobCandidatePhaseChange,
		employerAppliedJobCandidatePhaseChangeAction,
		employerJobDetail,
		employerJobDetailAction,
		match,
	} = props
	console.log({ employerJobDetail })

	useEffect(() => {
		const jobId = match.params.jobid
		employerAppliedJobCandidateListAction(jobId)
		employerJobDetailAction(jobId)
	}, [])

	return (
		<>
			<Navbar />
			<div className='EmployerJobDetail'>
				<Sidebar />
				<div className='EmployerJobDetail__Body'>
					<div className='EmployerJobDetail__Body--Title'>
						<div className='EmployerJobDetail__Body--Title--Link'>
							<Link to={'/employer/manage-job'}>
								<FontAwesomeIcon icon={faAngleLeft} /> Back To Jobs
							</Link>
						</div>
						{employerJobDetail.data && (
							<>
								<div className='EmployerJobDetail__Body--Title--Name'>
									{employerJobDetail.data.title}
								</div>
								<div className='EmployerJobDetail__Body--Title--Location'>
									<FontAwesomeIcon icon={faMapMarkerAlt} />{' '}
									{employerJobDetail.data.address.city}
								</div>
							</>
						)}
					</div>
					{employerJobDetail.loading ? (
						<div className='Loading__Container'>
							<Spinner />
						</div>
					) : (
						employerJobDetail.data && (
							<>
								<div className='EmployerJobDetail__Body--SubTitle'>
									<div className='EmployerJobDetail__Body--SubTitle--Description'>
										Job Description
									</div>
									<div className='EmployerJobDetail__Body--SubTitle--Candidate'>
										Candidate
									</div>
									<div className='EmployerJobDetail__Body--SubTitle--Pipeline Active'>
										Pipeline
									</div>
								</div>
								<div className='EmployerJobDetail__Body--Container'>
									<div className='EmployerJobDetail__Body--Container--PipelineList'>
										{employerAppliedJobCandidateList && (
											<DraggablePipelineList
												pipelineList={employerAppliedJobCandidateList}
												employerAppliedJobCandidatePhaseChangeAction={
													employerAppliedJobCandidatePhaseChangeAction
												}
											/>
										)}
									</div>
								</div>
							</>
						)
					)}
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state) => ({
	employerAppliedJobCandidateList:
		state.employerCandidateReducer.appliedJob.data,
	employerAppliedJobCandidatePhaseChange:
		state.employerCandidateReducer.phaseChange.data,
	employerJobDetail: state.employerJobReducer.detail,
})

const actions = {
	employerAppliedJobCandidateListAction,
	employerAppliedJobCandidatePhaseChangeAction,
	employerJobDetailAction,
}

export default connect(mapStateToProps, actions)(JobDetailPage)
