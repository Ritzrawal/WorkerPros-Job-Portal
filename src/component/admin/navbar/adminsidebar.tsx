import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import './adminavbar.css'

const AdminSidebar = (props: any) => {
	const compareCurrentPath = (path: string) => {
		const currentPath = props.match.path
		if (currentPath === path) return true
		return false
	}
	return (
		<div className='AdminSidebar'>
			<div className='AdminSidebar__List'>
				<ul className='AdminHeader'>
					<Link style={{ textDecoration: 'none' }} to={'/admin/dashboard'}>
						<li
							className={`${
								props.match.path === '/admin/dashboard' && 'Adminactive'
							}`}
						>
							Dashboard/Analytics
						</li>
					</Link>
					<Link to={'/admin/company-management'}>
						<li
							className={`${
								compareCurrentPath('/admin/company-management')
									? 'Adminactive'
									: ''
							}`}
						>
							Company Management
						</li>
					</Link>
					<Link to={'/admin/tradesperson'}>
						<li
							className={`${
								compareCurrentPath('/admin/tradesperson') ? 'Adminactive' : ''
							}`}
						>
							Tradesperson Management
						</li>
					</Link>

					<Link to={'/admin/social-feed'}>
						<li
							className={`${
								compareCurrentPath('/admin/social-feed') ? 'Adminactive' : ''
							}`}
						>
							Social Feed Management
						</li>
					</Link>
					<Link to={'/admin/messaging/:messageid?'}>
						<li
							className={`${
								compareCurrentPath('/admin/messaging/:messageid?')
									? 'Adminactive'
									: ''
							}`}
						>
							Messaging Management
						</li>
					</Link>
					<Link to={'/admin/management'}>
						<li
							className={`${
								compareCurrentPath('/admin/management') ? 'Adminactive' : ''
							}`}
						>
							Admin Management
						</li>
					</Link>
					<Link to={'/admin/subscription'}>
						<li
							className={`${
								compareCurrentPath('/admin/subscription') ? 'Adminactive' : ''
							}`}
						>
							Subscriptions
						</li>
					</Link>
				</ul>
			</div>
		</div>
	)
}

export default withRouter(AdminSidebar)
