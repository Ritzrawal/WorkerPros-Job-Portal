// Imports: Dependencies
import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import profileReducer from './profileReducer'
import jobsListReducer from './jobsListReducer'
import locationListReducer from './locationListReducer'
import certificateListReducer from './certificateListReducer'
import benefitListReducer from './benefitListReducer'
import categoryListReducer from './categoryListReducer'
import job from './job'
import company from './company'
import jobTypeListReducer from './jobTypeListReducer'
import jobRoleListReducer from './jobRoleListReducer'
import jobPostReducer from './jobPostReducer'
import employerDashboardReducer from './employerDashboardReducer'
import employerJobReducer from './employerJobReducer'
import companySizeReducer from './companySizeReducer'
import employerCandidateReducer from './employerCandidateReducer'
import employerProfileReducer from './employerProfileReducer'
import usersListReducer from './usersListReducer'
import socialFeatureReducer from './socialFeatureReducer'
import workerDashboardReducer from './workerDashboardReducer'
import socketReducer from '../../pages/candidateMessagesPage/socket/socketReducer'
import searchReducer from './searchReducer'
import subscriptionReducer from './subscriptionReducer'

import adminReducer from './adminReducer'
import employerTeamMemberReducer from './employerTeamMemberReducer'

// Redux: Root Reducer
const rootReducer = combineReducers({
	loginReducer,
	job,
	profileReducer,
	locationListReducer,
	certificateListReducer,
	benefitListReducer,
	categoryListReducer,
	company,
	jobsListReducer,
	jobTypeListReducer,
	jobRoleListReducer,
	jobPostReducer,
	employerDashboardReducer,
	employerJobReducer,
	companySizeReducer,
	employerCandidateReducer,
	employerProfileReducer,
	usersListReducer,
	socialFeatureReducer,
	workerDashboardReducer,
	socketReducer,
	searchReducer,
	subscriptionReducer,
	adminReducer,
	employerTeamMemberReducer,
})
// Exports
export default rootReducer
