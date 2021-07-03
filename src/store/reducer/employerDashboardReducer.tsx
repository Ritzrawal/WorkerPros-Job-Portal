import {
	EMPLOYER_DASHBOARD_MESSAGE_LIST,
	EMPLOYER_DASHBOARD_MESSAGE_LIST_SUCCESS,
	EMPLOYER_DASHBOARD_MESSAGE_LIST_ERROR,
	EMPLOYER_DASHBOARD_NOTIFICATION_LIST,
	EMPLOYER_DASHBOARD_NOTIFICATION_LIST_SUCCESS,
	EMPLOYER_DASHBOARD_NOTIFICATION_LIST_ERROR,
	EMPLOYER_DASHBOARD_DATA_COUNT,
	EMPLOYER_DASHBOARD_DATA_COUNT_SUCCESS,
	EMPLOYER_DASHBOARD_DATA_COUNT_ERROR,
} from '../action/actionTypes'

const initialstate = {
	message: {
		loading: true,
		success: false,
		data: null,
		error: null,
	},
	notification: {
		loading: true,
		success: false,
		data: null,
		error: null,
	},
	dataCount: {
		loading: true,
		success: false,
		data: null,
		error: null,
	},
}

const employerDashboardReducer = (state = initialstate, action: any) => {
	const { type, payload } = action

	switch (type) {
		case EMPLOYER_DASHBOARD_MESSAGE_LIST:
			return {
				...state,
				message: {
					...state.message,
					loading: true,
				},
			}

		case EMPLOYER_DASHBOARD_MESSAGE_LIST_SUCCESS:
			return {
				...state,
				message: {
					...state.message,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_DASHBOARD_MESSAGE_LIST_ERROR:
			return {
				...state,
				message: {
					...state.message,

					loading: false,
					success: false,
					error: payload,
				},
			}

		case EMPLOYER_DASHBOARD_NOTIFICATION_LIST:
			return {
				...state,
				notification: {
					loading: true,
				},
			}

		case EMPLOYER_DASHBOARD_NOTIFICATION_LIST_SUCCESS:
			return {
				...state,
				notification: {
					...state.notification,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_DASHBOARD_NOTIFICATION_LIST_ERROR:
			return {
				...state,
				notification: {
					...state.notification,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case EMPLOYER_DASHBOARD_DATA_COUNT:
			return {
				...state,
				dataCount: {
					loading: true,
				},
			}

		case EMPLOYER_DASHBOARD_DATA_COUNT_SUCCESS:
			return {
				...state,
				dataCount: {
					...state.dataCount,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_DASHBOARD_DATA_COUNT_ERROR:
			return {
				...state,
				dataCount: {
					...state.dataCount,
					loading: false,
					success: false,
					error: payload,
				},
			}

		default:
			return state
	}
}

export default employerDashboardReducer
