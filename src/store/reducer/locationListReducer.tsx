import {
	LOCATION_LIST,
	LOCATION_LIST_SUCCESS,
	LOCATION_LIST_ERROR,
} from '../action/actionTypes'

const initialstate = {
	loading: true,
	success: false,
	data: [],
	error: [],
}

const locationListReducer = (state = initialstate, action: any) => {
	const { type, payload } = action

	switch (type) {
		case LOCATION_LIST:
			return { ...state, loading: true }

		case LOCATION_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				data: payload,
			}

		case LOCATION_LIST_ERROR:
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

export default locationListReducer
