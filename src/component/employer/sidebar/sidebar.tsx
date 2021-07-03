import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import DashboardIcon from '../../../assets/images/icons/dashboardIcon.png'
import ManagejobIcon from '../../../assets/images/icons/managejobIcon.png'
import MessageIcon from '../../../assets/images/icons/messageIcon.png'
import CandidateIcon from '../../../assets/images/icons/candidateIcon.png'
import SubcontractorIcon from '../../../assets/images/icons/subcontractorIcon.png'
import CompanyIcon from '../../../assets/images/icons/companyIcon.png'
import CalendarIcon from '../../../assets/images/icons/calendarIcon.png'

import './sidebar.css'

const Sidebar: React.FC<any> = (props: any) => {
	const { match, collapse } = props

	console.log({ match })

	return (
		<div
			className='EmployerSidebar'
			style={{ width: collapse ? '75px' : '270px' }}
		>
			<div className='EmployerSidebar__List'>
				<ul>
					<Link to={'/employer/dashboard'}>
						<li
							className={`${
								match.path === '/employer/dashboard' &&
								'EmployerSidebar___List--Active'
							}`}
						>
							<img src={DashboardIcon} />
							{collapse ? '' : 'Dashboard'}
						</li>
					</Link>
					<Link to={'/employer/manage-job'}>
						<li
							className={`${
								match.path === '/employer/manage-job' &&
								'EmployerSidebar___List--Active'
							}`}
						>
							<img src={ManagejobIcon} />
							{collapse ? '' : 'Manage Jobs'}
						</li>
					</Link>
					<Link to={'/employer/message'}>
						<li
							className={`${
								match.path === '/employer/message/:messageid?' &&
								'EmployerSidebar___List--Active'
							}`}
						>
							<img src={MessageIcon} />
							{collapse ? '' : 'Messages'}
						</li>
					</Link>
					<Link to={'/employer/applied/candidate'}>
						<li
							className={`${
								match.path ===
									'/employer/:candidatetype?/candidate/:detailid?/:detailtype?' &&
								'EmployerSidebar___List--Active'
							}`}
						>
							<img src={CandidateIcon} />
							{collapse ? '' : 'Candidates'}
						</li>
					</Link>
					<li>
						<img src={SubcontractorIcon} />
						{collapse ? '' : 'Subcontractor'}
					</li>
					<Link to={'/employer/update-company-profile'}>
						<li
							className={`${
								match.path === '/employer/update-company-profile' &&
								'EmployerSidebar___List--Active'
							}`}
						>
							<img src={CompanyIcon} />
							{collapse ? '' : 'Company'}
						</li>
					</Link>
					<Link to={'/employer/calendar'}>
						<li
							className={`${
								match.path === '/employer/calendar' &&
								'EmployerSidebar___List--Active'
							}`}
						>
							<img src={CalendarIcon} />
							{collapse ? '' : 'Calendar'}
						</li>
					</Link>
					<Link to={'/employer/team-member'}>
						<li
							className={`${
								match.path === '/employer/team-member/:memberId?' &&
								'EmployerSidebar___List--Active'
							}`}
						>
							<img src={CandidateIcon} />
							{collapse ? '' : 'Team'}
						</li>
					</Link>
				</ul>
			</div>
		</div>
	)
}

export default withRouter(Sidebar)
