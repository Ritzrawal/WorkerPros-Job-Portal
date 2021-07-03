import {
	ADMIN_LOGIN,
	ADMIN_LOGIN_SUCCESS,
	ADMIN_LOGIN_ERROR,
	ADMIN_TRADEPERSON,
	ADMIN_TRADEPERSON_SUCCESS,
	ADMIN_TRADEPERSON_ERROR,
	ADMIN_COMPANY,
	ADMIN_COMPANY_SUCCESS,
	ADMIN_COMPANY_ERROR,
	ADMIN_DATACOUNT,
	ADMIN_DATACOUNT_ERROR,
	ADMIN_DATACOUNT_SUCCESS,
	ADMIN_RESOLVED_SUCCESS,
	ADMIN_RESOLVED,
	ADMIN_RESOLVED_ERROR,
} from '../action/actionTypes'
const initialstate = {
	login: {
		loading: true,
		success: false,
		data: null,
		error: null,
	},
	worker: {
		loading: true,
		success: false,
		data: null,
		error: null,
	},
	company: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
	datacount: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
	status: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
}

const adminReducer = (state = initialstate, action: any) => {
	const { type, payload } = action

	switch (type) {
		case ADMIN_LOGIN:
			return {
				...state,
				login: {
					...state.login,
					loading: true,
				},
			}

		case ADMIN_LOGIN_SUCCESS:
			return {
				...state,
				login: {
					...state.login,
					loading: false,
					success: true,
					data: payload,
				},
			}
		case ADMIN_LOGIN_ERROR:
			return {
				...state,
				login: {
					...state.login,
					loading: false,
					success: false,
					error: payload,
				},
			}
		case ADMIN_TRADEPERSON:
			return {
				...state,
				worker: {
					...state.worker,
					loading: true,
				},
			}

		case ADMIN_TRADEPERSON_SUCCESS:
			return {
				...state,
				worker: {
					...state.worker,
					loading: false,
					success: true,
					data: payload,
				},
			}
		case ADMIN_TRADEPERSON_ERROR:
			return {
				...state,
				worker: {
					...state.worker,
					loading: false,
					success: false,
					error: payload,
				},
			}
		case ADMIN_COMPANY:
			return {
				...state,
				company: {
					...state.company,
					loading: true,
				},
			}

		case ADMIN_COMPANY_SUCCESS:
			return {
				...state,
				company: {
					...state.company,
					loading: false,
					success: true,
					data: payload,
				},
			}
		case ADMIN_COMPANY_ERROR:
			return {
				...state,
				company: {
					...state.company,
					loading: false,
					success: false,
					error: payload,
				},
			}
		case ADMIN_DATACOUNT:
			return {
				...state,
				datacount: {
					...state.datacount,
					loading: true,
				},
			}

		case ADMIN_DATACOUNT_SUCCESS:
			return {
				...state,
				datacount: {
					...state.datacount,
					loading: false,
					success: true,
					data: payload,
				},
			}
		case ADMIN_DATACOUNT_ERROR:
			return {
				...state,
				datacount: {
					...state.datacount,
					loading: false,
					success: false,
					error: payload,
				},
			}
		case ADMIN_RESOLVED:
			return {
				...state,
				status: {
					...state.status,
					loading: true,
				},
			}

		case ADMIN_RESOLVED_SUCCESS:
			return {
				...state,
				status: {
					...state.status,
					loading: false,
					success: true,
					data: payload,
				},
			}
		case ADMIN_RESOLVED_ERROR:
			return {
				...state,
				status: {
					...state.status,
					loading: false,
					success: false,
					error: payload,
				},
			}

		default:
			return state
	}
}
export default adminReducer
