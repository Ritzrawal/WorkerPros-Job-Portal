import {
	GET_JOB_CATEGORIES,
	GET_JOB_CATEGORIES_SUCCESS,
	GET_JOB_CATEGORIES_ERROR,
	GET_JOBS,
	GET_JOBS_SUCCESS,
	GET_JOBS_ERROR,
	FILTER_JOBS,
	FILTER_JOBS_SUCCESS,
	FILTER_JOBS_ERROR,
	GET_SAVED_JOBS,
	GET_SAVED_JOBS_SUCCESS,
	GET_SAVED_JOBS_ERROR,
	ADD_REMOVE_FAVOURITE_JOB,
	ADD_REMOVE_FAVOURITE_JOB_SUCCESS,
	ADD_REMOVE_FAVOURITE_JOB_ERROR,
	APPLY_JOB,
	APPLY_JOB_ERROR,
	APPLY_JOB_SUCCESS,
	GET_JOB_DESCRIPTION,
	GET_JOB_DESCRIPTION_SUCCESS,
	GET_JOB_DESCRIPTION_ERROR,
	GET_JOB_APPLICATIONS,
	GET_JOB_APPLICATIONS_SUCCESS,
	GET_JOB_APPLICATIONS_ERROR,
	GET_COMPANY_JOBS_LIST,
	GET_COMPANY_JOBS_LIST_SUCCESS,
	GET_COMPANY_JOBS_LIST_ERROR,
	GET_RECOMMENDED_JOBS,
	GET_RECOMMENDED_JOBS_SUCCESS,
	GET_RECOMMENDED_JOBS_ERROR,
} from '../action/actionTypes'

const initialstate = {
	category: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
	list: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
	saved: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
	favourite: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
	applied: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
	description: {
		loading: true,
		success: false,
		data: null,
		error: [],
	},
	applicationList: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
	companyJobsList: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
	recommendedJobs: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
}

const job = (state = initialstate, action: any) => {
	const { type, payload } = action

	switch (type) {
		case GET_JOB_CATEGORIES:
			return {
				...state,
				category: {
					...state.category,
					loading: true,
				},
			}

		case GET_JOB_CATEGORIES_SUCCESS:
			return {
				...state,
				category: {
					...state.category,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case GET_JOB_CATEGORIES_ERROR:
			return {
				...state,
				category: {
					...state.category,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case GET_JOBS:
			return {
				...state,
				list: {
					...state.list,
					loading: true,
				},
			}

		case GET_JOBS_SUCCESS:
			return {
				...state,
				list: {
					...state.list,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case GET_JOBS_ERROR:
			return {
				...state,
				list: {
					...state.list,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case GET_RECOMMENDED_JOBS:
			return {
				...state,
				recommendedJobs: {
					...state.recommendedJobs,
					loading: true,
				},
			}

		case GET_RECOMMENDED_JOBS_SUCCESS:
			return {
				...state,
				recommendedJobs: {
					...state.recommendedJobs,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case GET_RECOMMENDED_JOBS_ERROR:
			return {
				...state,
				recommendedJobs: {
					...state.recommendedJobs,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case FILTER_JOBS:
			return {
				...state,
				list: {
					...state.list,
					loading: true,
				},
			}

		case FILTER_JOBS_SUCCESS:
			return {
				...state,
				list: {
					...state.list,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case FILTER_JOBS_ERROR:
			return {
				...state,
				list: {
					...state.list,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case GET_SAVED_JOBS:
			return {
				...state,
				saved: {
					...state.saved,
					loading: true,
				},
			}

		case GET_SAVED_JOBS_SUCCESS:
			return {
				...state,
				saved: {
					...state.saved,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case GET_SAVED_JOBS_ERROR:
			return {
				...state,
				saved: {
					...state.saved,
					loading: false,
					success: false,
					error: payload,
				},
			}
		case APPLY_JOB:
			return {
				...state,
				applied: {
					...state.applied,
					loading: true,
				},
			}

		case APPLY_JOB_SUCCESS:
			return {
				...state,
				applied: {
					...state.applied,
					loading: false,
					success: true,
					error: payload,
				},
			}

		case APPLY_JOB_ERROR:
			return {
				...state,
				applied: {
					...state.applied,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case GET_JOB_DESCRIPTION:
			return {
				...state,
				description: {
					...state.description,
					loading: true,
				},
			}
		case GET_JOB_DESCRIPTION_SUCCESS:
			return {
				...state,
				description: {
					...state.description,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case GET_JOB_DESCRIPTION_ERROR:
			return {
				...state,
				description: {
					...state.description,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case GET_JOB_APPLICATIONS:
			return {
				...state,
				applicationList: {
					...state.applicationList,
					loading: true,
				},
			}

		case GET_JOB_APPLICATIONS_SUCCESS:
			return {
				...state,
				applicationList: {
					...state.applicationList,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case GET_JOB_APPLICATIONS_ERROR:
			return {
				...state,
				applicationList: {
					...state.applicationList,
					loading: false,
					success: false,
					data: payload,
				},
			}

		case GET_COMPANY_JOBS_LIST: {
			return {
				...state,
				companyJobsList: {
					...state.companyJobsList,
					loading: true,
				},
			}
		}

		case GET_COMPANY_JOBS_LIST_SUCCESS: {
			return {
				...state,
				companyJobsList: {
					...state.companyJobsList,
					loading: false,
					success: true,
					data: payload,
				},
			}
		}

		case GET_COMPANY_JOBS_LIST_ERROR: {
			return {
				...state,
				companyJobsList: {
					...state.companyJobsList,
					loading: false,
					success: false,
					data: payload,
				},
			}
		}

		default:
			return state
	}
}

export default job
