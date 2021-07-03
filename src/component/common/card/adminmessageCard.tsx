import React from 'react'
import './cardStyle.css'
import { ProfileDummyImage } from '../../logosAndIcons'
import renderHTML from 'react-render-html'
import Moment from 'moment'
import { Badge } from 'reactstrap'

interface Props {
	profile_image?: string
	first_name?: string
	last_name?: string
	profile?: any
	last_message: string
	time?: string
	active: boolean
	read_unread?: boolean
	company_name?: string
	clickHandler: () => void
	match?: any
	name?: string
	list?: string
}

const AdminMessagesCard: React.FC<Props> = (props: Props) => {
	const {
		profile_image,
		profile,
		time,
		last_message,
		read_unread,
		clickHandler,
		active,
		name,
		company_name,
		list,
	} = props

	return (
		<div
			onClick={() => clickHandler()}
			className={`messagesCardMainContainer ${active ? 'active' : ''}`}
		>
			{name && (
				<div className='messagesCardUserInfoDiv'>
					<div className='messagesCardUserName'>{name}</div>
					{company_name && (
						<div className='messagesCardUserCompany'>Microsoft</div>
					)}
				</div>
			)}
			{profile?.map((items, index) => {
				return (
					<div className='AdminmessagesCardTopSection' key={index}>
						<div className='messageProfileImageSection'>
							{items.profile_image && (
								<div className='messagesCardImageDiv'>
									<img
										src={
											items.profile_image
												? `${process.env.REACT_APP_IMAGE_URL}${items.profile_image}`
												: ProfileDummyImage
										}
									></img>
								</div>
							)}
						</div>

						<div className='messagesCardUserInfoDiv'>
							<div className='messagesCardUserName'>
								{items.first_name} {items.last_name}
							</div>
							{company_name && (
								<div className='messagesCardUserCompany'>Microsoft</div>
							)}
						</div>
					</div>
				)
			})}
			<div className='messagesCardMidSection'>
				<span className='messagesCardLastMessage'>
					{last_message?.length < 200
						? renderHTML(last_message)
						: `${renderHTML(last_message?.slice(0, 30))}...`}
				</span>
				{!read_unread && !active && (
					<Badge className='AdminmessagesCardUnreadNum'>{list}</Badge>
				)}
			</div>
			<span className='messagesCardTime'>{Moment(time).fromNow()}</span>
		</div>
	)
}

export default AdminMessagesCard
