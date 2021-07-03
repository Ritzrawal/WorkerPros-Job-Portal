import React from 'react'
import './cardStyle.css'
import { ProfileDummyImage } from '../../logosAndIcons'
import renderHTML from 'react-render-html'
import Moment from 'moment'

interface Props {
	profile_image?: string
	first_name?: string
	last_name?: string
	name?: string
	last_message: string
	time?: string
	active: boolean
	read_unread?: boolean
	company_name?: string
	clickHandler: () => void
	match?: any
	isAdminDeleted: boolean
	unreadCount: number
}

const MessagesCard: React.FC<Props> = (props: Props) => {
	const {
		profile_image,
		name,
		time,
		last_message,
		isAdminDeleted,
		read_unread,
		clickHandler,
		active,
		company_name,
		unreadCount,
	} = props

	return (
		<div
			onClick={() => clickHandler()}
			className={`messagesCardMainContainer ${active ? 'active' : ''}`}
		>
			<div className='messagesCardTopSection'>
				<div className='messagesCardImageDiv'>
					<img src={profile_image}></img>
				</div>
				<div className='messagesCardUserInfoDiv'>
					<div className='messagesCardUserName'>{name}</div>
					{company_name && (
						<div className='messagesCardUserCompany'>Microsoft</div>
					)}
				</div>
			</div>
			<div className='messagesCardMidSection'>
				<span className='messagesCardLastMessage'>
					{isAdminDeleted
						? 'Your message has been deleted due to violation of terms and conditions'
						: last_message.length < 30
						? renderHTML(last_message)
						: `${renderHTML(last_message?.slice(0, 30))}...`}
				</span>
				{!read_unread && !active && (
					<span className='messagesCardUnreadNum'>{unreadCount}</span>
				)}
			</div>
			<span className='messagesCardTime'>{Moment(time).fromNow()}</span>
		</div>
	)
}

export default MessagesCard
