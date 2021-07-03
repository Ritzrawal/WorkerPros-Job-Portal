import React from 'react'
import { AdminSidebar, AdminNavbar } from '../../../component/admin'
import { AdminMessagesPages } from './adminMessagesPage'
interface Props {
	title?: string
}

export const MessagingHomePage: React.FC<Props> = () => {
	return (
		<>
			<AdminNavbar />
			<div className='AdminDashboardSidebarAndContent'>
				<div className='AdminDashboardSidebar'>
					<AdminSidebar />
				</div>
				<div className='AdminContentMainCustomize'>
					<AdminMessagesPages />
				</div>
			</div>
		</>
	)
}
export default MessagingHomePage
