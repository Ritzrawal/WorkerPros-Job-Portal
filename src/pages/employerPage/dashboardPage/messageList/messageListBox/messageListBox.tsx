import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment'

import { ProfileDummyImage } from '../../../../../component/logosAndIcons'

import './messageListBox.css'

interface Props {
	conversationId: string
	image: string
	name: string
	time: string
	message: string
}

const MessageListBox: React.FC<Props> = (props: Props) => {
	const { conversationId, image, name, time, message } = props

	return (
		<div className='EmployerDashboardMessageListBox'>
			<div className='EmployerDashboardMessageListBox__Image'>
				<img
					src={
						image
							? `${process.env.REACT_APP_IMAGE_URL}${image}`
							: ProfileDummyImage
					}
				></img>
			</div>
			<div className='EmployerDashboardMessageListBox__Detail'>
				<div className='EmployerDashboardMessageListBox__Detail--Info'>
					<div className='EmployerDashboardMessageListBox__Detail--Info--Name'>
						<Link to={`/employer/message/${conversationId}`}>{name}</Link>
					</div>
					<div className='EmployerDashboardMessageListBox__Detail--Info--Time'>
						{Moment(time).fromNow()}
					</div>
				</div>
				<div className='EmployerDashboardMessageListBox__Detail--Message'>
					{message}
				</div>
			</div>
			{/* <div className='EmployerDashboardMessageListBox__Count'>
				<span>3</span>
			</div> */}
		</div>
	)
}

export default MessageListBox
