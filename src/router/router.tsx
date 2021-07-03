import * as React from 'react'
import {
	BrowserRouter as Router,
	Route,
	Link,
	useHistory,
	Switch,
} from 'react-router-dom'
import { HomePage } from '../pages/homePage'
import { JobDescriptionPage } from '../component'
import {
	SignupPage,
	LoginPage,
	ForgetPassword,
	HowitWorksPage,
	WelcomePage,
	CompaniesPage,
	JobFinderPage,
	Savedjobs,
	WorkerDashboard,
	InvitationPage,
	ProfileDisplayPage,
	ApplicationStatus,
	LogOutPage,
	CandidateMessagesPage,
	SearchJobs,
	SubscriptionListPage,
} from '../pages'
import {
	DashbordHomePage,
	AnalyticsHomePage,
	MessagingHomePage,
	AdminPanagementPage,
	CompanyManagementPage,
	TradePersonPage,
	SocailManagementPage,
	SubscriptionManagementPage,
	AdminMessagesPages,
	AdminMessagingPage,
	AdminLoginPage,
	AddAdminMemberForm,
} from '../pages/adminPage'

import DashboardPage from '../pages/employerPage/dashboardPage/dashboardPage'
import PostJobPage from '../pages/employerPage/postJobPage/postJobPage'
import ManageJobPage from '../pages/employerPage/manageJobPage/manageJobPage'
import CandidatePage from '../pages/employerPage/candidatePage/candidatePage'
import PrivateRoute from './privateRoute'
import PrivateRouteWorker from './privateWorker'
import PrivateRouteEmployer from './privateEmployer'
import UpdateProfilePage from '../pages/employerPage/profilePage/updateProfilePage/updateProfilePage'
import JobCandidatePage from '../pages/employerPage/jobDetailPage/JobDetailPage'
import UpdateCompanyProfilePage from '../pages/employerPage/profilePage/updateCompanyProfilePage/updateCompanyProfilePage'
import InterviewSchedulePage from '../pages/employerPage/interviewSchedulePage/interviewSchedulePage'
import MessagePage from '../pages/employerPage/messagingPage/messagingPage'
import TeamMemberPage from '../pages/employerPage/teamMemberPage/teamMemberPage'
import SubscriptionDetailPage from '../pages/employerPage/subscriptionPage/subscriptionDetailPage/subscriptionDetailPage'
import CalendarPage from '../pages/employerPage/calendarPage/calendarPage'

import NotFoundPage from '../component/common/pages/notFoundPage'
import PrivateRouteAdmin from './adminPrivate'
interface Props {
	title: string
}

const RouterComponent: React.FC<Props> = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={HomePage}></Route>

				<Route exact path='/login' component={LoginPage}></Route>
				<Route exact path='/signup' component={SignupPage} />
				<Route exact path='/change-password' component={ForgetPassword} />
				<PrivateRouteWorker
					exact
					path='/profile/setting'
					component={WelcomePage}
				/>
				<PrivateRouteWorker
					exact
					path='/display/profile'
					component={ProfileDisplayPage}
				/>
				<Route exact path='/howitwork' component={HowitWorksPage} />
				<Route
					exact
					path='/jobdescription/:jobid'
					component={JobDescriptionPage}
				/>
				<Route
					exact
					path='/manageSubscription'
					component={SubscriptionListPage}
				/>
				<PrivateRoute exact path='/findcompanies' component={CompaniesPage} />
				<PrivateRoute exact path='/findjobs' component={JobFinderPage} />
				<PrivateRoute exact path='/saved-jobs' component={Savedjobs} />
				<PrivateRoute exact path='/search-jobs' component={SearchJobs} />
				<PrivateRoute
					exact
					path='/application-status'
					component={ApplicationStatus}
				/>
				<PrivateRouteWorker
					exact
					path='/worker-dashboard'
					component={WorkerDashboard}
				/>
				<PrivateRoute
					exact
					path='/invitation-page'
					component={InvitationPage}
				/>
				<PrivateRouteEmployer
					exact
					path='/employer/dashboard'
					component={DashboardPage}
				/>
				<PrivateRoute exact path='/employer/post-job' component={PostJobPage} />
				<PrivateRoute
					exact
					path='/employer/manage-job'
					component={ManageJobPage}
				/>
				<PrivateRoute
					exact
					path='/messages/:convoId?/:receiverId?'
					component={CandidateMessagesPage}
				/>
				<PrivateRoute
					exact
					path='/employer/:candidatetype?/candidate/:detailid?/:detailtype?'
					component={CandidatePage}
				/>
				<PrivateRoute
					exact
					path='/employer/update-profile'
					component={UpdateProfilePage}
				/>
				<PrivateRoute
					exact
					path='/employer/job-detail/:jobid'
					component={JobCandidatePage}
				/>

				<PrivateRoute
					exact
					path='/employer/update-company-profile'
					component={UpdateCompanyProfilePage}
				/>

				<Route exact path='/logout' component={LogOutPage} />

				{/* ====================admin Dashboard============================*/}
				<Route exact path='/admin/login' component={AdminLoginPage} />
				<PrivateRouteAdmin
					exact
					path='/admin/dashboard'
					component={DashbordHomePage}
				/>
				<PrivateRouteAdmin
					exact
					path='/admin/company-management'
					component={CompanyManagementPage}
				/>
				<PrivateRouteAdmin
					exact
					path='/admin/social-feed'
					component={SocailManagementPage}
				/>
				<PrivateRouteAdmin
					exact
					path='/admin/messaging/:messageid?'
					component={AdminMessagingPage}
				/>
				<PrivateRouteAdmin
					exact
					path='/admin/management'
					component={AdminPanagementPage}
				/>
				<Route
					exact
					path='/admin/management/addnew-form'
					component={AddAdminMemberForm}
				/>
				<PrivateRouteAdmin
					exact
					path='/admin/analytics'
					component={AnalyticsHomePage}
				/>
				<PrivateRouteAdmin
					exact
					path='/admin/tradesperson'
					component={TradePersonPage}
				/>
				<PrivateRouteAdmin
					exact
					path='/admin/subscription'
					component={SubscriptionManagementPage}
				/>
				{/* <Route exact path='/admin-messages' component={CandidateMessagesPage} /> */}

				<PrivateRoute
					exact
					path='/employer/schedule-interview/:userid'
					component={InterviewSchedulePage}
				/>
				<PrivateRoute
					exact
					path='/employer/message/:messageid?'
					component={MessagePage}
				/>
				<PrivateRoute
					exact
					path='/employer/team-member/:memberId?'
					component={TeamMemberPage}
				/>
				<PrivateRoute
					exact
					path='/employer/subscription'
					component={SubscriptionDetailPage}
				/>
				<PrivateRoute
					exact
					path='/employer/subscription/list'
					component={SubscriptionListPage}
				/>
				<PrivateRoute
					exact
					path='/employer/calendar'
					component={CalendarPage}
				/>
				<Route component={NotFoundPage}></Route>
			</Switch>
		</Router>
	)
}
export default RouterComponent
