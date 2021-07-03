import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Fontawesome from 'react-fontawesome'

import './sidebar.css'

interface Props {
	title: string
	profileinfo: {
		profile_image: string
		first_name: string
		last_name: string
		user: {
			email: string
		}
	}
	profileAllInfoAction: () => void
	match?: any
}

const SideBar: React.FC<any> = (props: Props): React.ReactElement => {
	const compareCurrentPath = (path: string) => {
		const currentPath = props.match.path
		if (currentPath === path) return true
		return false
	}
	return (
		<div className='SideBar'>
			<div className='SideBar__List'>
				<ul>
					<Link style={{ textDecoration: 'none' }} to='/search-jobs'>
						<li
							className={`${
								compareCurrentPath('/search-jobs')
									? 'SideBar__List--Active'
									: ''
							}`}
						>
							Search Jobs
							<span className='SideBar__List--Active--Icon'>
								<Fontawesome name={'angle-right'} />
							</span>
						</li>
					</Link>

					<Link style={{ textDecoration: 'none' }} to='/saved-jobs'>
						<li
							className={`${
								compareCurrentPath('/saved-jobs') ? 'SideBar__List--Active' : ''
							}`}
						>
							Saved Jobs
							<span className='SideBar__List--Active--Icon'>
								<Fontawesome name={'angle-right'} />
							</span>
						</li>
					</Link>
					<Link
						style={{ textDecoration: 'none', color: 'none' }}
						to='/application-status'
					>
						<li
							className={`${
								compareCurrentPath('/application-status')
									? 'SideBar__List--Active'
									: ''
							}`}
						>
							Application Status
							<span className='SideBar__List--Active--Icon'>
								<Fontawesome name={'angle-right'} />
							</span>
						</li>
					</Link>

					<li>Interviews</li>
					<li>Calendar</li>
				</ul>
			</div>
		</div>
	)
}

export default withRouter(SideBar)
