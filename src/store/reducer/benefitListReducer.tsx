import {
	BENEFIT_LIST,
	BENEFIT_LIST_SUCCESS,
	BENEFIT_LIST_ERROR,
} from '../action/actionTypes'

const initialstate = {
	loading: true,
	success: false,
	data: null,
	error: null,
}

const benefitListReducer = (state = initialstate, action: any) => {
	const { type, payload } = action

	switch (type) {
		case BENEFIT_LIST:
			return { ...state, loading: true }

		case BENEFIT_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				data: payload,
			}

		case BENEFIT_LIST_ERROR:
			return {
				...state,
				loading: false,
				success: false,
				error: payload,
			}

		default:
			return state
	}
}

export default benefitListReducer
