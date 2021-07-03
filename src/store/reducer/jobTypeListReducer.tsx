import {
	JOB_TYPE_LIST,
	JOB_TYPE_LIST_SUCCESS,
	JOB_TYPE_LIST_ERROR,
} from '../action/actionTypes'

const initialstate = {
	loading: true,
	success: false,
	data: null,
	error: null,
}

const jobTypeListReducer = (state = initialstate, action: any) => {
	const { type, payload } = action

	switch (type) {
		case JOB_TYPE_LIST:
			return { ...state, loading: true }

		case JOB_TYPE_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				data: payload,
			}

		case JOB_TYPE_LIST_ERROR:
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

export default jobTypeListReducer
