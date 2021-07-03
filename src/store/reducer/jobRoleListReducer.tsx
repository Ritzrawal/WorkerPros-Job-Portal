import {
	JOB_ROLE_LIST,
	JOB_ROLE_LIST_SUCCESS,
	JOB_ROLE_LIST_ERROR,
} from '../action/actionTypes'

const initialstate = {
	loading: true,
	success: false,
	data: null,
	error: null,
}

const jobRoleListReducer = (state = initialstate, action: any) => {
	const { type, payload } = action

	switch (type) {
		case JOB_ROLE_LIST:
			return { ...state, loading: true }

		case JOB_ROLE_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				data: payload,
			}

		case JOB_ROLE_LIST_ERROR:
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

export default jobRoleListReducer
