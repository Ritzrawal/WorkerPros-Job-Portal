import {
	GET_COMPANY_SIZE,
	GET_COMPANY_SIZE_SUCCESS,
	GET_COMPANY_SIZE_ERROR,
} from '../action/actionTypes'

const initialstate = {
	companySize: {
		loading: true,
		success: false,
		data: null,
		error: null,
	},
}

const companySizeReducer = (state = initialstate, action: any) => {
	const { type, payload } = action

	switch (type) {
		case GET_COMPANY_SIZE:
			return {
				...state,
				companySize: {
					...state.companySize,
					loading: true,
				},
			}

		case GET_COMPANY_SIZE_SUCCESS:
			return {
				...state,
				companySize: {
					...state.companySize,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case GET_COMPANY_SIZE_ERROR:
			return {
				...state,
				companySize: {
					...state.companySize,
					loading: false,
					success: false,
					error: payload,
				},
			}
		default:
			return state
	}
}

export default companySizeReducer
