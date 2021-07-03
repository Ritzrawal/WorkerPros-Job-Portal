import {
	JOB_POST,
	JOB_POST_SUCCESS,
	JOB_POST_ERROR,
	CLEAR_JOB_POST,
} from '../action/actionTypes'

const initialstate = {
	loading: false,
	success: false,
	data: null,
	error: null,
}

const jobPostReducer = (state = initialstate, action: any) => {
	const { type, payload } = action

	switch (type) {
		case JOB_POST:
			return { ...state, loading: true }

		case JOB_POST_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				data: payload,
			}

		case JOB_POST_ERROR:
			return {
				...state,
				loading: false,
				success: false,
				error: payload,
			}

		case CLEAR_JOB_POST:
			return {
				loading: false,
				success: false,
				data: null,
				error: null,
			}

		default:
			return state
	}
}

export default jobPostReducer
