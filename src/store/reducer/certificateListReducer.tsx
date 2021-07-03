import {
	CERTIFICATE_LIST,
	CERTIFICATE_LIST_SUCCESS,
	CERTIFICATE_LIST_ERROR,
} from '../action/actionTypes'

const initialstate = {
	loading: true,
	success: false,
	data: null,
	error: null,
}

const certificateListReduer = (state = initialstate, action: any) => {
	const { type, payload } = action

	switch (type) {
		case CERTIFICATE_LIST:
			return { ...state, loading: true }

		case CERTIFICATE_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				data: payload,
			}

		case CERTIFICATE_LIST_ERROR:
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

export default certificateListReduer
