import React from 'react'

import { ProfileDummyImage } from '../../../../logosAndIcons'

import './pipelineListBox.css'

interface Props {
	name: string
	image: string
	time: string
	openCandidateModal: () => void
}

const PipelineListBox: React.FC<Props> = (props: Props) => {
	const { name, image, time, openCandidateModal } = props

	return (
		<div className='EmployerPipelineListBox'>
			<div className='EmployerPipelineListBox__Info'>
				<div className='EmployerPipelineListBox__Info--Image'>
					<img
						src={
							image
								? `https://workerpros-images.s3.amazonaws.com/${image}`
								: ProfileDummyImage
						}
					></img>
				</div>
				<div className='EmployerPipelineListBox__Info--Detail'>
					<div className='EmployerPipelineListBox__Info--Detail--Name'>
						{name}
					</div>
					<div className='EmployerPipelineListBox__Info--Detail--Link'>
						<span onClick={openCandidateModal}>View Profile</span>
					</div>
				</div>
			</div>
			<div className='EmployerPipelineListBox__Time'>{time}</div>
		</div>
	)
}

export default PipelineListBox
