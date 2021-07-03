import React from 'react'
import Moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import './notificationListBox.css'
interface Props {
	message: any
	createdAt: any
}

const NotificationListBox: React.FC<Props> = (props: Props) => {
	const { message, createdAt } = props
	return (
		<div className='EmployerNotificationListBox'>
			<div className='EmployerNotificationListBox__Icon'>
				<FontAwesomeIcon icon={faUser} />
			</div>
			<div className='EmployerNotificationListBox__Detail'>
				<div className='EmployerNotificationListBox__Detail--Title'>
					{message}
				</div>
				<div className='EmployerNotificationListBox__Detail--Time'>
					{Moment(createdAt).fromNow()}
				</div>
			</div>
		</div>
	)
}

export default NotificationListBox
