import {
	EMPLOYER_UPDATE_PROFILE,
	EMPLOYER_UPDATE_PROFILE_SUCCESS,
	EMPLOYER_UPDATE_PROFILE_ERROR,
	CLEAR_EMPLOYER_UPDATE_PROFILE,
	EMPLOYER_UPDATE_COMPANY_PROFILE,
	EMPLOYER_UPDATE_COMPANY_PROFILE_SUCCESS,
	EMPLOYER_UPDATE_COMPANY_PROFILE_ERROR,
	CLEAR_EMPLOYER_UPDATE_COMPANY_PROFILE,
	EMPLOYER_PROFILE_DETAIL,
	EMPLOYER_PROFILE_DETAIL_SUCCESS,
	EMPLOYER_PROFILE_DETAIL_ERROR,
} from '../action/actionTypes'

const initialstate = {
	update: {
		loading: false,
		success: false,
		data: null,
		error: null,
	},
	updateCompany: {
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
}

const employerProfileReducer = (state = initialstate, action: any) => {
	const { type, payload } = action

	switch (type) {
		case EMPLOYER_UPDATE_PROFILE:
			return { ...state, update: { loading: true } }

		case EMPLOYER_UPDATE_PROFILE_SUCCESS:
			return {
				...state,
				update: {
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_UPDATE_PROFILE_ERROR:
			return {
				...state,
				update: {
					loading: false,
					success: false,
					error: payload,
				},
			}

		case CLEAR_EMPLOYER_UPDATE_PROFILE:
			return {
				...state,
				update: {
					loading: false,
					success: false,
					data: null,
					error: null,
				},
			}

		case EMPLOYER_UPDATE_COMPANY_PROFILE:
			return { ...state, updateCompany: { loading: true } }

		case EMPLOYER_UPDATE_COMPANY_PROFILE_SUCCESS:
			return {
				...state,
				updateCompany: {
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_UPDATE_COMPANY_PROFILE_ERROR:
			return {
				...state,
				updateCompany: {
					loading: false,
					success: false,
					error: payload,
				},
			}

		case CLEAR_EMPLOYER_UPDATE_COMPANY_PROFILE:
			return {
				...state,
				updateCompany: {
					loading: false,
					success: false,
					data: null,
					error: null,
				},
			}

		case EMPLOYER_PROFILE_DETAIL:
			return { ...state, detail: { loading: true } }

		case EMPLOYER_PROFILE_DETAIL_SUCCESS:
			return {
				...state,
				detail: {
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_PROFILE_DETAIL_ERROR:
			return {
				...state,
				detail: {
					loading: false,
					success: false,
					error: payload,
				},
			}
		default:
			return state
	}
}

export default employerProfileReducer
