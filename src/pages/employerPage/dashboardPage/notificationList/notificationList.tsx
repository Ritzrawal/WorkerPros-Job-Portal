import React from 'react'

import NotificationListBox from './notificationListBox/notificationListBox'

import './notificationList.css'

interface Props {
	dashboardNotificationList: any
}

const NotificationList: React.FC<Props> = (props: Props) => {
	const { dashboardNotificationList } = props
	return (
		<div className='EmployerNotificationList'>
			<div className='EmployerNotificationList__Title'>Notifications</div>
			<div className='EmployerNotificationList__Body'>
				{dashboardNotificationList &&
					dashboardNotificationList.map((d: any, index) => (
						<div
							key={index}
							className='EmployerNotificationList__Body--NotificationListBox BottomBorder'
						>
							<NotificationListBox
								message={d.message}
								createdAt={d.created_at}
							/>
						</div>
					))}
			</div>
		</div>
	)
}

export default NotificationList
