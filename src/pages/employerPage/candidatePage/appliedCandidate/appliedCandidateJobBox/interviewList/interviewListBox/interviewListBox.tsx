import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'

import { ProfileDummyImage } from '../../../../../../../component/logosAndIcons'

import './interviewListBox.css'

interface Props {
	name: string
	image: string
	title: string
	date: string
	time: string
	phone: string
	openCandidateModal: () => void
}

const InterviewListBox: React.FC<Props> = (props: Props) => {
	const { name, image, title, date, time, phone, openCandidateModal } = props

	return (
		<div className='EmployerInterviewListBox'>
			<div className='EmployerInterviewListBox__Info'>
				<div className='EmployerInterviewListBox__Info--Image'>
					<img
						src={
							image
								? `https://workerpros-images.s3.amazonaws.com/${image}`
								: ProfileDummyImage
						}
					></img>
				</div>
				<div className='EmployerInterviewListBox__Info--Detail'>
					<div className='EmployerInterviewListBox__Info--Detail--Name'>
						{name}
					</div>
					<div className='EmployerInterviewListBox__Info--Detail--Profile'>
						<span onClick={openCandidateModal}>View Profile</span>
					</div>
				</div>
			</div>
			<div className='EmployerInterviewListBox__Title'>{title}</div>
			<div className='EmployerInterviewListBox__Date'>
				<div className='EmployerInterviewListBox__Date--Date'>{date}</div>
				<div className='EmployerInterviewListBox__Date--Time'>{time}</div>
			</div>
			<div className='EmployerInterviewListBox__Contact'>
				<FontAwesomeIcon icon={faPhoneAlt} />
				{phone}
			</div>
		</div>
	)
}

export default InterviewListBox
