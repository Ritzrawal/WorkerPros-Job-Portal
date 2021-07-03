import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Moment from 'moment'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

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
	employerAppliedJobCandidatePhaseChangeAction: (
		applicationId: string,
		phase: string
	) => void
}

const DraggablePipelineList: React.FC<Props> = (props: Props) => {
	const { pipelineList, employerAppliedJobCandidatePhaseChangeAction } = props

	const history = useHistory()

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

	const handleOnDragEnd = (result) => {
		const { source, destination, draggableId } = result

		if (source && destination) {
			employerAppliedJobCandidatePhaseChangeAction(
				draggableId,
				destination.droppableId
			)

			const [movedItem] = list[source.droppableId].filter(
				(li: any, index) => li._id === draggableId
			)

			const newSource = list[source.droppableId].filter(
				(li: any, index) => li._id !== draggableId
			)

			let newDestination =
				source.droppableId === destination.droppableId
					? newSource
					: list[destination.droppableId]
			if (!newDestination.length) {
				newDestination.push(movedItem)
			} else {
				newDestination.splice(destination.index, 0, movedItem)
			}

			setList({
				...list,
				[source.droppableId]: newSource,
				[destination.droppableId]: newDestination,
			})

			if (destination.droppableId === 'interview') {
				history.push(`/employer/schedule-interview/${movedItem.user_id}`)
			}
		}
	}

	return (
		<>
			{currentCandidate !== '' && (
				<CandidateDetailModal
					candidateDetail={currentCandidate}
					closeCandidateDetail={() => setCurrentCandidate('')}
				/>
			)}
			<DragDropContext onDragEnd={handleOnDragEnd}>
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
							<Droppable droppableId='applied'>
								{(provided) => (
									<div
										className='EmployerPipelineList__Body--Applied--List'
										{...provided.droppableProps}
										ref={provided.innerRef}
									>
										{list.applied.map((list: any, index) => (
											<Draggable
												key={list._id}
												draggableId={list._id}
												index={index}
											>
												{(provided) => (
													<div
														className='EmployerPipelineList__Body--Applied--List--PipelineListBox'
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														<PipelineListBox
															name={`${list.worker_detail.first_name} ${list.worker_detail.last_name}`}
															image={list.worker_detail.profile_image}
															time={Moment(list.created_at).fromNow()}
															openCandidateModal={() =>
																setCurrentCandidate(list)
															}
														/>
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
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
							<Droppable droppableId='screening'>
								{(provided) => (
									<div
										className='EmployerPipelineList__Body--Screening--List'
										{...provided.droppableProps}
										ref={provided.innerRef}
									>
										{list.screening.map((list: any, index) => (
											<Draggable
												key={list._id}
												draggableId={list._id}
												index={index}
											>
												{(provided) => (
													<div
														className='EmployerPipelineList__Body--Screening--List--PipelineListBox'
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														<PipelineListBox
															name={`${list.worker_detail.first_name} ${list.worker_detail.last_name}`}
															image={list.worker_detail.profile_image}
															time={Moment(list.created_at).fromNow()}
															openCandidateModal={() =>
																setCurrentCandidate(list)
															}
														/>
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
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
							<Droppable droppableId='interview'>
								{(provided) => (
									<div
										className='EmployerPipelineList__Body--Interview--List'
										{...provided.droppableProps}
										ref={provided.innerRef}
									>
										{list.interview.map((list: any, index) => (
											<Draggable
												key={list._id}
												draggableId={list._id}
												index={index}
											>
												{(provided) => (
													<div
														className='EmployerPipelineList__Body--Interview--List--PipelineListBox'
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														<PipelineListBox
															name={`${list.worker_detail.first_name} ${list.worker_detail.last_name}`}
															image={list.worker_detail.profile_image}
															time={Moment(list.created_at).fromNow()}
															openCandidateModal={() =>
																setCurrentCandidate(list)
															}
														/>
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
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
							<Droppable droppableId='offered'>
								{(provided) => (
									<div
										className='EmployerPipelineList__Body--Offered--List'
										{...provided.droppableProps}
										ref={provided.innerRef}
									>
										{list.offered.map((list: any, index) => (
											<Draggable
												key={list._id}
												draggableId={list._id}
												index={index}
											>
												{(provided) => (
													<div
														className='EmployerPipelineList__Body--Offered--List--PipelineListBox'
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														<PipelineListBox
															name={`${list.worker_detail.first_name} ${list.worker_detail.last_name}`}
															image={list.worker_detail.profile_image}
															time={Moment(list.created_at).fromNow()}
															openCandidateModal={() =>
																setCurrentCandidate(list)
															}
														/>
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
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
							<Droppable droppableId='hired'>
								{(provided) => (
									<div
										className='EmployerPipelineList__Body--Hired--List'
										{...provided.droppableProps}
										ref={provided.innerRef}
									>
										{list.hired.map((list: any, index) => (
											<Draggable
												key={list._id}
												draggableId={list._id}
												index={index}
											>
												{(provided) => (
													<div
														className='EmployerPipelineList__Body--Hired--List--PipelineListBox'
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														<PipelineListBox
															name={`${list.worker_detail.first_name} ${list.worker_detail.last_name}`}
															image={list.worker_detail.profile_image}
															time={Moment(list.created_at).fromNow()}
															openCandidateModal={() =>
																setCurrentCandidate(list)
															}
														/>
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</div>
					</div>
				</div>
			</DragDropContext>
		</>
	)
}

export default DraggablePipelineList
