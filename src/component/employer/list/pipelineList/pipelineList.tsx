import React, { useState } from 'react'
import Moment from 'moment'

import CandidateDetailModal from '../../../employer/modal/candidateDetailModal/candidateDetailModal'

import PipelineListBox from './pipelineListBox/pipelineListBox'

import './pipelineList.css'

const PipelineTypes = {
	APPLIED: 'APPLIED',
	SCREENING: 'SCREENING',
	INTERVIEW: 'INTERVIEW',
	OFFERED: 'OFFERED',
	HIRED: 'HIRED',
}

interface Props {
	pipelineList: any
}

const PipelineList: React.FC<Props> = (props: Props) => {
	const { pipelineList } = props

	const [list, setList] = useState({
		applied: pipelineList
			? pipelineList.filter((list) => list.phase === 'applied')
			: [],
		screening: pipelineList
			? pipelineList.filter((list) => list.phase === 'screening')
			: [],
		interview: pipelineList
			? pipelineList.filter((list) => list.phase === 'interview')
			: [],
		offered: pipelineList
			? pipelineList.filter((list) => list.phase === 'offered')
			: [],
		hired: pipelineList
			? pipelineList.filter((list) => list.phase === 'hired')
			: [],
	})

	const [currentCandidate, setCurrentCandidate] = useState('')

	return (
		<>
			{currentCandidate !== '' && (
				<CandidateDetailModal
					candidateDetail={currentCandidate}
					closeCandidateDetail={() => setCurrentCandidate('')}
				/>
			)}
			<div className='EmployerPipelineList'>
				<div className='EmployerPipelineList__Body'>
					<div className='EmployerPipelineList__Body--Applied'>
						<div className='EmployerPipelineList__Body--Applied--Title'>
							<div className='EmployerPipelineList__Body--Applied--Title--Icon'></div>
							<div className='EmployerPipelineList__Body--Applied--Title--Text'>
								Applied
							</div>
							<div className='EmployerPipelineList__Body--Applied--Title--Count'>
								<span>{list.applied.length}</span>
							</div>
						</div>
						<div className='EmployerPipelineList__Body--Applied--List'>
							{list.applied.map((list: any, index) => (
								<div
									key={index}
									className='EmployerPipelineList__Body--Applied--List--PipelineListBox'
								>
									<PipelineListBox
										name={`${list.worker_detail.first_name} ${list.worker_detail.last_name}`}
										image={list.worker_detail.profile_image}
										time={Moment(list.created_at).fromNow()}
										openCandidateModal={() => setCurrentCandidate(list)}
									/>
								</div>
							))}
						</div>
					</div>
					<div className='EmployerPipelineList__Body--Screening'>
						<div className='EmployerPipelineList__Body--Screening--Title'>
							<div className='EmployerPipelineList__Body--Screening--Title--Icon'></div>
							<div className='EmployerPipelineList__Body--Screening--Title--Text'>
								Screening
							</div>
							<div className='EmployerPipelineList__Body--Screening--Title--Count'>
								<span>{list.screening.length}</span>
							</div>
						</div>
						<div className='EmployerPipelineList__Body--Screening--List'>
							{list.screening.map((list: any, index) => (
								<div
									key={index}
									className='EmployerPipelineList__Body--Screening--List--PipelineListBox'
								>
									<PipelineListBox
										name={`${list.worker_detail.first_name} ${list.worker_detail.last_name}`}
										image={list.worker_detail.profile_image}
										time={Moment(list.created_at).fromNow()}
										openCandidateModal={() => setCurrentCandidate(list)}
									/>
								</div>
							))}
						</div>
					</div>
					<div className='EmployerPipelineList__Body--Interview'>
						<div className='EmployerPipelineList__Body--Interview--Title'>
							<div className='EmployerPipelineList__Body--Interview--Title--Icon'></div>
							<div className='EmployerPipelineList__Body--Interview--Title--Text'>
								Interview
							</div>
							<div className='EmployerPipelineList__Body--Interview--Title--Count'>
								<span>{list.interview.length}</span>
							</div>
						</div>
						<div className='EmployerPipelineList__Body--Interview--List'>
							{list.interview.map((list: any, index) => (
								<div
									key={index}
									className='EmployerPipelineList__Body--Interview--List--PipelineListBox'
								>
									<PipelineListBox
										name={`${list.worker_detail.first_name} ${list.worker_detail.last_name}`}
										image={list.worker_detail.profile_image}
										time={Moment(list.created_at).fromNow()}
										openCandidateModal={() => setCurrentCandidate(list)}
									/>
								</div>
							))}
						</div>
					</div>
					<div className='EmployerPipelineList__Body--Offered'>
						<div className='EmployerPipelineList__Body--Offered--Title'>
							<div className='EmployerPipelineList__Body--Offered--Title--Icon'></div>
							<div className='EmployerPipelineList__Body--Offered--Title--Text'>
								Offered
							</div>
							<div className='EmployerPipelineList__Body--Offered--Title--Count'>
								<span>{list.offered.length}</span>
							</div>
						</div>
						<div className='EmployerPipelineList__Body--Offered--List'>
							{list.offered.map((list: any, index) => (
								<div
									key={index}
									className='EmployerPipelineList__Body--Offered--List--PipelineListBox'
								>
									<PipelineListBox
										name={`${list.worker_detail.first_name} ${list.worker_detail.last_name}`}
										image={list.worker_detail.profile_image}
										time={Moment(list.created_at).fromNow()}
										openCandidateModal={() => setCurrentCandidate(list)}
									/>
								</div>
							))}
						</div>
					</div>
					<div className='EmployerPipelineList__Body--Hired'>
						<div className='EmployerPipelineList__Body--Hired--Title'>
							<div className='EmployerPipelineList__Body--Hired--Title--Icon'></div>
							<div className='EmployerPipelineList__Body--Hired--Title--Text'>
								Hired
							</div>
							<div className='EmployerPipelineList__Body--Hired--Title--Count'>
								<span>{list.hired.length}</span>
							</div>
						</div>
						<div className='EmployerPipelineList__Body--Hired--List'>
							{list.hired.map((list: any, index) => (
								<div
									key={index}
									className='EmployerPipelineList__Body--Hired--List--PipelineListBox'
								>
									<PipelineListBox
										name={`${list.worker_detail.first_name} ${list.worker_detail.last_name}`}
										image={list.worker_detail.profile_image}
										time={Moment(list.created_at).fromNow()}
										openCandidateModal={() => setCurrentCandidate(list)}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default PipelineList
