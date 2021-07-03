import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faAngleDown,
	faAngleUp,
	faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'

import CandidateList from './candidateList/candidateList'
import PipelineList from '../../../../../component/employer/list/pipelineList/pipelineList'
import InterviewList from './interviewList/interviewList'

import './appliedCandidateJobBox.css'

const listTypes = {
	candidate: 'candidate',
	pipeline: 'pipeline',
	interview: 'interview',
}

interface Props {
	jobId: string
	title: string
	location: string
	pay: string
	newCandidate: string
	totalCandidate: string
	employerAppliedJobCandidateList: any
	employerAppliedJobInterviewCandidateList: any
	isListOpen: boolean
	detailType: any
}

const AppliedCandidateJobBox: React.FC<Props> = (props: Props) => {
	const {
		jobId,
		title,
		location,
		pay,
		newCandidate,
		totalCandidate,
		employerAppliedJobCandidateList,
		employerAppliedJobInterviewCandidateList,
		isListOpen,
		detailType,
	} = props

	return (
		<div className='EmployerAppliedCandidateJobBox'>
			<Link
				to={
					isListOpen
						? `/employer/applied/candidate`
						: `/employer/applied/candidate/${jobId}/${listTypes.candidate}`
				}
			>
				<div
					className={`EmployerAppliedCandidateJobBox__List ${
						isListOpen ? 'BottomBorder' : ''
					}`}
				>
					<div className='EmployerAppliedCandidateJobBox__List--Title'>
						<div className='EmployerAppliedCandidateJobBox__List--Title--Name'>
							{title}
						</div>
						<div className='EmployerAppliedCandidateJobBox__List--Title--Info'>
							<div className='EmployerAppliedCandidateJobBox__List--Title--Info--Location'>
								<FontAwesomeIcon icon={faMapMarkerAlt} /> {location}
							</div>
							<div className='EmployerAppliedCandidateJobBox__List--Title--Info--Pay'>
								<span>$</span> {pay}
							</div>
						</div>
					</div>
					<div className='EmployerAppliedCandidateJobBox__List--Count'>
						<div className='EmployerAppliedCandidateJobBox__List--Count--New'>
							<span>{newCandidate}</span> New Candidate
						</div>
						<div className='EmployerAppliedCandidateJobBox__List--Count--Total'>
							<span>{totalCandidate}</span> Total Candidate
						</div>
					</div>
					<div className='EmployerAppliedCandidateJobBox__List--Dropdown'>
						{isListOpen ? (
							<Link to={`/employer/applied/candidate`}>
								<FontAwesomeIcon icon={faAngleUp} />
							</Link>
						) : (
							<Link
								to={`/employer/applied/candidate/${jobId}/${listTypes.candidate}`}
							>
								<FontAwesomeIcon icon={faAngleDown} />
							</Link>
						)}
					</div>
				</div>
			</Link>
			{isListOpen && (
				<div className='EmployerAppliedCandidateJobBox__Detail'>
					<div className='EmployerAppliedCandidateJobBox__Detail--Title'>
						<Link
							to={`/employer/applied/candidate/${jobId}/${listTypes.candidate}`}
						>
							<div
								className={`EmployerAppliedCandidateJobBox__Detail--Title--Candidate ${
									detailType === listTypes.candidate ? 'Active' : ''
								}`}
							>
								Candidate
							</div>
						</Link>
						<Link
							to={`/employer/applied/candidate/${jobId}/${listTypes.pipeline}`}
						>
							<div
								className={`EmployerAppliedCandidateJobBox__Detail--Title--Pipeline ${
									detailType === listTypes.pipeline ? 'Active' : ''
								}`}
							>
								Pipeline
							</div>
						</Link>
						<Link
							to={`/employer/applied/candidate/${jobId}/${listTypes.interview}`}
						>
							<div
								className={`EmployerAppliedCandidateJobBox__Detail--Title--Interview ${
									detailType === listTypes.interview ? 'Active' : ''
								}`}
							>
								Interview
							</div>
						</Link>
					</div>
					<div className='EmployerAppliedCandidateJobBox__Detail--Body'>
						{detailType === listTypes.candidate && (
							<div className='EmployerAppliedCandidateJobBox__Detail--Body--Canndidate'>
								<CandidateList
									employerAppliedJobCandidateList={
										employerAppliedJobCandidateList
									}
								/>
							</div>
						)}
						{detailType === listTypes.pipeline && (
							<div className='EmployerAppliedCandidateJobBox__Detail--Body--Pipeline'>
								<PipelineList pipelineList={employerAppliedJobCandidateList} />
							</div>
						)}
						{detailType === listTypes.interview && (
							<div className='EmployerAppliedCandidateJobBox__Detail--Body--Interview'>
								<InterviewList
									jobTitle={title}
									employerAppliedJobInterviewCandidateList={
										employerAppliedJobInterviewCandidateList
									}
								/>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default AppliedCandidateJobBox
