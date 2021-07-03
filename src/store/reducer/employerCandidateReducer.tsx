import {
	EMPLOYER_APPLIED_JOB_CANDIDATE_LIST,
	EMPLOYER_APPLIED_JOB_CANDIDATE_LIST_SUCCESS,
	EMPLOYER_APPLIED_JOB_CANDIDATE_LIST_ERROR,
	EMPLOYER_APPLIED_JOB_INTERVIEW_CANDIDATE_LIST,
	EMPLOYER_APPLIED_JOB_INTERVIEW_CANDIDATE_LIST_SUCCESS,
	EMPLOYER_APPLIED_JOB_INTERVIEW_CANDIDATE_LIST_ERROR,
	EMPLOYER_APPLIED_JOB_CANDIDATE_PHASE_CHANGE,
	EMPLOYER_APPLIED_JOB_CANDIDATE_PHASE_CHANGE_SUCCESS,
	EMPLOYER_APPLIED_JOB_CANDIDATE_PHASE_CHANGE_ERROR,
	EMPLOYER_INVITE_CANDIDATE_LIST,
	EMPLOYER_INVITE_CANDIDATE_LIST_SUCCESS,
	EMPLOYER_INVITE_CANDIDATE_LIST_ERROR,
	EMPLOYER_LIKE_CANDIDATE_PROFILE,
	EMPLOYER_LIKE_CANDIDATE_PROFILE_SUCCESS,
	EMPLOYER_LIKE_CANDIDATE_PROFILE_ERROR,
	EMPLOYER_UNLIKE_CANDIDATE_PROFILE,
	EMPLOYER_UNLIKE_CANDIDATE_PROFILE_SUCCESS,
	EMPLOYER_UNLIKE_CANDIDATE_PROFILE_ERROR,
} from '../action/actionTypes'

const initialstate = {
	appliedJob: {
		loading: true,
		success: false,
		data: null,
		error: null,
	},
	interview: {
		loading: true,
		success: false,
		data: null,
		error: null,
	},
	phaseChange: {
		loading: false,
		success: false,
		data: null,
		error: null,
	},
	invite: {
		loading: false,
		success: false,
		data: null,
		error: null,
	},
	likeProfile: {
		loading: false,
		success: false,
		data: null,
		error: null,
	},
	unlikeProfile: {
		loading: false,
		success: false,
		data: null,
		error: null,
	},
}

const employerCandidateReducer = (state = initialstate, action: any) => {
	const { type, payload } = action

	switch (type) {
		case EMPLOYER_APPLIED_JOB_CANDIDATE_LIST:
			return { ...state, appliedJob: { loading: true } }

		case EMPLOYER_APPLIED_JOB_CANDIDATE_LIST_SUCCESS:
			return {
				...state,
				appliedJob: {
					...state.appliedJob,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_APPLIED_JOB_CANDIDATE_LIST_ERROR:
			return {
				...state,
				appliedJob: {
					loading: false,
					success: false,
					error: payload,
				},
			}

		case EMPLOYER_APPLIED_JOB_INTERVIEW_CANDIDATE_LIST:
			return { ...state, interview: { loading: true } }

		case EMPLOYER_APPLIED_JOB_INTERVIEW_CANDIDATE_LIST_SUCCESS:
			return {
				...state,
				interview: {
					...state.interview,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_APPLIED_JOB_INTERVIEW_CANDIDATE_LIST_ERROR:
			return {
				...state,
				interview: {
					loading: false,
					success: false,
					error: payload,
				},
			}

		case EMPLOYER_APPLIED_JOB_CANDIDATE_PHASE_CHANGE:
			return { ...state, phaseChange: { loading: true } }

		case EMPLOYER_APPLIED_JOB_CANDIDATE_PHASE_CHANGE_SUCCESS:
			return {
				...state,
				phaseChange: {
					...state.phaseChange,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_APPLIED_JOB_CANDIDATE_PHASE_CHANGE_ERROR:
			return {
				...state,
				phaseChange: {
					loading: false,
					success: false,
					error: payload,
				},
			}

		case EMPLOYER_INVITE_CANDIDATE_LIST:
			return { ...state, invite: { loading: true } }

		case EMPLOYER_INVITE_CANDIDATE_LIST_SUCCESS:
			return {
				...state,
				invite: {
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_INVITE_CANDIDATE_LIST_ERROR:
			return {
				...state,
				invite: {
					loading: false,
					success: false,
					error: payload,
				},
			}

		case EMPLOYER_LIKE_CANDIDATE_PROFILE:
			return { ...state, likeProfile: { loading: true } }

		case EMPLOYER_LIKE_CANDIDATE_PROFILE_SUCCESS:
			return {
				...state,
				likeProfile: {
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_LIKE_CANDIDATE_PROFILE_ERROR:
			return {
				...state,
				likeProfile: {
					loading: false,
					success: false,
					error: payload,
				},
			}

		case EMPLOYER_UNLIKE_CANDIDATE_PROFILE:
			return { ...state, unlikeProfile: { loading: true } }

		case EMPLOYER_UNLIKE_CANDIDATE_PROFILE_SUCCESS:
			return {
				...state,
				unlikeProfile: {
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_UNLIKE_CANDIDATE_PROFILE_ERROR:
			return {
				...state,
				unlikeProfile: {
					loading: false,
					success: false,
					error: payload,
				},
			}

		default:
			return state
	}
}

export default employerCandidateReducer
