import {
	EMPLOYER_DASHBOARD_JOB_LIST,
	EMPLOYER_DASHBOARD_JOB_LIST_SUCCESS,
	EMPLOYER_DASHBOARD_JOB_LIST_ERROR,
	EMPLOYER_JOB_LIST,
	EMPLOYER_JOB_LIST_SUCCESS,
	EMPLOYER_JOB_LIST_ERROR,
	EMPLOYER_PUBLISHED_JOB_LIST,
	EMPLOYER_PUBLISHED_JOB_LIST_SUCCESS,
	EMPLOYER_PUBLISHED_JOB_LIST_ERROR,
	EMPLOYER_DRAFT_JOB_LIST,
	EMPLOYER_DRAFT_JOB_LIST_SUCCESS,
	EMPLOYER_DRAFT_JOB_LIST_ERROR,
	EMPLOYER_EXPIRED_JOB_LIST,
	EMPLOYER_EXPIRED_JOB_LIST_SUCCESS,
	EMPLOYER_EXPIRED_JOB_LIST_ERROR,
	EMPLOYER_APPLIED_JOB_LIST,
	EMPLOYER_APPLIED_JOB_LIST_SUCCESS,
	EMPLOYER_APPLIED_JOB_LIST_ERROR,
	EMPLOYER_TOGGLE_JOB_STATUS,
	EMPLOYER_TOGGLE_JOB_STATUS_SUCCESS,
	EMPLOYER_TOGGLE_JOB_STATUS_ERROR,
	EMPLOYER_JOB_DETAIL,
	EMPLOYER_JOB_DETAIL_SUCCESS,
	EMPLOYER_JOB_DETAIL_ERROR,
} from '../action/actionTypes'

const initialstate = {
	dashboard: {
		loading: true,
		success: false,
		data: null,
		error: null,
	},
	published: {
		loading: true,
		success: false,
		data: null,
		error: null,
	},
	draft: {
		loading: true,
		success: false,
		data: null,
		error: null,
	},
	expired: {
		loading: true,
		success: false,
		data: null,
		error: null,
	},
	applied: {
		loading: true,
		success: false,
		data: null,
		error: null,
	},
	toggleStatus: {
		loading: false,
		success: false,
		data: null,
		error: null,
	},
	detail: {
		loading: true,
		success: false,
		data: null,
		error: null,
	},
	list: {
		loading: true,
		success: false,
		data: null,
		error: null,
	},
}

const employerJobReducer = (state = initialstate, action: any) => {
	const { type, payload } = action

	switch (type) {
		case EMPLOYER_DASHBOARD_JOB_LIST:
			return { ...state, dashboard: { loading: true } }

		case EMPLOYER_DASHBOARD_JOB_LIST_SUCCESS:
			return {
				...state,
				dashboard: {
					...state.dashboard,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_DASHBOARD_JOB_LIST_ERROR:
			return {
				...state,
				dashboard: {
					loading: false,
					success: false,
					error: payload,
				},
			}

		case EMPLOYER_PUBLISHED_JOB_LIST:
			return { ...state, published: { loading: true } }

		case EMPLOYER_PUBLISHED_JOB_LIST_SUCCESS:
			return {
				...state,
				published: {
					...state.published,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_PUBLISHED_JOB_LIST_ERROR:
			return {
				...state,
				published: {
					...state.published,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case EMPLOYER_DRAFT_JOB_LIST:
			return { ...state, draft: { loading: true } }

		case EMPLOYER_DRAFT_JOB_LIST_SUCCESS:
			return {
				...state,
				draft: {
					...state.draft,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_DRAFT_JOB_LIST_ERROR:
			return {
				...state,
				draft: {
					...state.draft,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case EMPLOYER_EXPIRED_JOB_LIST:
			return { ...state, expired: { loading: true } }

		case EMPLOYER_EXPIRED_JOB_LIST_SUCCESS:
			return {
				...state,
				expired: {
					...state.expired,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_EXPIRED_JOB_LIST_ERROR:
			return {
				...state,
				expired: {
					...state.expired,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case EMPLOYER_APPLIED_JOB_LIST:
			return { ...state, applied: { loading: true } }

		case EMPLOYER_APPLIED_JOB_LIST_SUCCESS:
			return {
				...state,
				applied: {
					...state.applied,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_APPLIED_JOB_LIST_ERROR:
			return {
				...state,
				applied: {
					loading: false,
					success: false,
					error: payload,
				},
			}

		case EMPLOYER_TOGGLE_JOB_STATUS:
			return { ...state, toggleStatus: { loading: true } }

		case EMPLOYER_TOGGLE_JOB_STATUS_SUCCESS:
			return {
				...state,
				toggleStatus: {
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_TOGGLE_JOB_STATUS_ERROR:
			return {
				...state,
				toggleStatus: {
					loading: false,
					success: false,
					error: payload,
				},
			}

		case EMPLOYER_JOB_DETAIL:
			return { ...state, detail: { loading: true } }

		case EMPLOYER_JOB_DETAIL_SUCCESS:
			return {
				...state,
				detail: {
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_JOB_DETAIL_ERROR:
			return {
				...state,
				detail: {
					loading: false,
					success: false,
					error: payload,
				},
			}

		case EMPLOYER_JOB_LIST:
			return { ...state, list: { loading: true } }

		case EMPLOYER_JOB_LIST_SUCCESS:
			return {
				...state,
				list: {
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_JOB_LIST_ERROR:
			return {
				...state,
				list: {
					loading: false,
					success: false,
					error: payload,
				},
			}

		default:
			return state
	}
}

export default employerJobReducer
