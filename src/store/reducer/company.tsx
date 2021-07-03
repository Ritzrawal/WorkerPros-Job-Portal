import {
	GET_COMPANIES,
	GET_COMPANIES_SUCCESS,
	GET_COMPANIES_ERROR,
	GET_TOP_COMPANIES,
	GET_TOP_COMPANIES_SUCCESS,
	GET_TOP_COMPANIES_ERROR,
	FILTER_COMPANIES,
	FILTER_COMPANIES_SUCCESS,
	FILTER_COMPANIES_ERROR,
	SAVE_UNSAVE_COMPANY,
	SAVE_UNSAVE_COMPANY_SUCCESS,
	SAVE_UNSAVE_COMPANY_ERROR,
} from '../action/actionTypes'

const initialstate = {
	list: {
		loading: true,
		success: false,
		data: null,
		error: null,
	},
	top: {
		loading: true,
		success: false,
		data: null,
		error: null,
	},
	saved: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
	saveUnsave: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
}

const company = (state = initialstate, action: any) => {
	const { type, payload } = action

	switch (type) {
		case GET_COMPANIES:
			return {
				...state,
				list: {
					...state.list,
					loading: true,
				},
			}

		case GET_COMPANIES_SUCCESS:
			return {
				...state,
				list: {
					...state.list,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case GET_COMPANIES_ERROR:
			return {
				...state,
				list: {
					...state.list,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case GET_TOP_COMPANIES:
			return {
				...state,
				top: {
					...state.top,
					loading: true,
				},
			}

		case GET_TOP_COMPANIES_SUCCESS:
			return {
				...state,
				top: {
					...state.top,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case GET_TOP_COMPANIES_ERROR:
			return {
				...state,
				top: {
					...state.top,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case FILTER_COMPANIES:
			return {
				...state,
				list: {
					...state.list,
					loading: true,
				},
			}

		case FILTER_COMPANIES_SUCCESS:
			return {
				...state,
				list: {
					...state.list,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case FILTER_COMPANIES_ERROR:
			return {
				...state,
				list: {
					...state.list,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case SAVE_UNSAVE_COMPANY:
			return {
				...state,
				saveUnsave: {
					...state.saveUnsave,
					loading: true,
					success: false,
				},
			}

		case SAVE_UNSAVE_COMPANY_SUCCESS:
			return {
				...state,
				saveUnsave: {
					...state.saveUnsave,
					loading: true,
					success: false,
					data: payload,
				},
			}

		case SAVE_UNSAVE_COMPANY_ERROR:
			return {
				...state,
				saveUnsave: {
					...state.saveUnsave,
					loading: false,
					success: false,
					error: payload,
				},
			}

		default:
			return state
	}
}

export default company
