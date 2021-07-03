import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
	dashboardMessageListAction,
	dashboardNotificationListAction,
	dashboardDataCountAction,
} from '../../../store/action/employerDashboarAction'
import { employerDashboardJobListAction } from '../../../store/action/employerJobAction'
import { getCandidateMessages } from '../../../store/action/socialFeatureAction'

import Navbar from '../../../component/employer/navbar/navbar'
import Sidebar from '../../../component/employer/sidebar/sidebar'

import CompleteProfile from './completeProfle/completeProfile'
import ReviewBox from './reviewBox/reviewBox'
import JobList from './jobList/jobList'
import NotificationList from './notificationList/notificationList'
import MessageList from './messageList/messageList'
import DownloadApp from './downloadApp/downloadApp'
import PostFirstJob from './postFirstJob/postFirstJob'
import PostFirstJobSmall from './postFirstJob/postFirstJobSmall/postFirstJobSmall'
import EventCalendar from './eventCalendar/eventCalendar'

import './dashboardPage.css'

interface Props {
	dashboardMessageList: any
	dashboardNotificationList: any
	employerDashboardJobList: any
	dashboardMessageListAction: () => void
	dashboardNotificationListAction: () => void
	employerDashboardJobListAction: (params: any) => void
	dashboardDataCountAction: () => void
	dashboardDataCount: any
	getCandidateMessages: () => void
	candidateMessagesList: any
}

const DashboardPage: React.FC<Props> = (props: Props) => {
	const {
		getCandidateMessages,
		candidateMessagesList,
		dashboardMessageList,
		dashboardNotificationList,
		employerDashboardJobList,
		dashboardMessageListAction,
		dashboardNotificationListAction,
		employerDashboardJobListAction,
		dashboardDataCountAction,
		dashboardDataCount,
	} = props

	useEffect(() => {
		// dashboardMessageListAction()
		dashboardNotificationListAction()
		employerDashboardJobListAction(null)
		dashboardDataCountAction()
		getCandidateMessages()
	}, [])

	return (
		<>
			<Navbar />
			<div className='EmployerDashboard'>
				<Sidebar />
				<div className='EmployerDashboard__Body'>
					<div className='EmployerDashboard__Body--CompleteProfile'>
						<CompleteProfile dashboardDataCount={dashboardDataCount} />
					</div>
					{dashboardDataCount && dashboardDataCount.job_count === 0 ? (
						<div className='EmployerDashboard__Body--PostFirstJob'>
							<PostFirstJob />
						</div>
					) : null}
					<div className='EmployerDashboard__Body--Container'>
						<div className='EmployerDashboard__Body--Container--Left'>
							<div className='EmployerDashboard__Body--Container--Left--Review'>
								<ReviewBox number={'50'} title={'new applicants to review'} />
							</div>
							<div className='EmployerDashboard__Body--Container--Left--Job'>
								<JobList employerDashboardJobList={employerDashboardJobList} />
							</div>
							<div className='EmployerDashboard__Body--Container--Left--Message'>
								<MessageList candidateMessagesList={candidateMessagesList} />
							</div>
							{/* <div className='EmployerDashboard__Body--Container--Left--Download'>
								<DownloadApp />
							</div> */}
							<div className='EmployerDashboard__Body--Container--Left--PostFirstJob'>
								<PostFirstJobSmall />
							</div>
						</div>
						<div className='EmployerDashboard__Body--Container--Right'>
							<div className='EmployerDashboard__Body--Container--Right--Review'>
								<ReviewBox
									number={'12'}
									title={'new B2B inquiries to review'}
								/>
							</div>
							<div className='EmployerDashboard__Body--Container--Right--Notification'>
								<NotificationList
									dashboardNotificationList={dashboardNotificationList}
								/>
							</div>
							<div className='EmployerDashboard__Body--Container--Right--EventCalendar'>
								<EventCalendar />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state) => ({
	dashboardMessageList: state.employerDashboardReducer.message.data,
	dashboardNotificationList: state.employerDashboardReducer.notification.data,
	employerDashboardJobList: state.employerJobReducer.dashboard.data,
	dashboardDataCount: state.employerDashboardReducer.dataCount.data,
	candidateMessagesList: state.socialFeatureReducer.candidateMessagesList.data,
})

const actions = {
	dashboardMessageListAction,
	dashboardNotificationListAction,
	employerDashboardJobListAction,
	dashboardDataCountAction,
	getCandidateMessages,
}

export default connect(mapStateToProps, actions)(DashboardPage)
