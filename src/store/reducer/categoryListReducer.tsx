import {
	CATEGORY_LIST,
	CATEGORY_LIST_SUCCESS,
	CATEGORY_LIST_ERROR,
} from '../action/actionTypes'

const initialstate = {
	loading: true,
	success: false,
	data: null,
	error: null,
}

const categoryListReducer = (state = initialstate, action: any) => {
	const { type, payload } = action

	switch (type) {
		case CATEGORY_LIST:
			return { ...state, loading: true }

		case CATEGORY_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				data: payload,
			}

		case CATEGORY_LIST_ERROR:
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

export default categoryListReducer
