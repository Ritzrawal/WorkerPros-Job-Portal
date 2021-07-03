import {
	GET_USER_SUGGESTION,
	GET_USER_SUGGESTION_ERROR,
	GET_USER_SUGGESTION_SUCCESS,
} from '../action/actionTypes'

const initialstate = {
	usersList: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
}

const usersListReducer = (state = initialstate, action: any) => {
	const { type, payload } = action

	switch (type) {
		case GET_USER_SUGGESTION:
			return {
				...state,
				usersList: {
					...state.usersList,
					loading: true,
				},
			}

		case GET_USER_SUGGESTION_SUCCESS:
			return {
				...state,
				usersList: {
					...state.usersList,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case GET_USER_SUGGESTION_ERROR:
			return {
				...state,
				usersList: {
					...state.usersList,
					loading: false,
					success: false,
					error: payload,
				},
			}

		default:
			return state
	}
}

export default usersListReducer
