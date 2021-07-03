import {
	EMPLOYER_GET_TEAM_MEMBER,
	EMPLOYER_GET_TEAM_MEMBER_SUCCESS,
	EMPLOYER_GET_TEAM_MEMBER_ERROR,
	EMPLOYER_GET_TEAM_MEMBER_DETAIL,
	EMPLOYER_GET_TEAM_MEMBER_DETAIL_SUCCESS,
	EMPLOYER_GET_TEAM_MEMBER_DETAIL_ERROR,
	EMPLOYER_ADD_TEAM_MEMBER,
	EMPLOYER_ADD_TEAM_MEMBER_SUCCESS,
	EMPLOYER_ADD_TEAM_MEMBER_ERROR,
	EMPLOYER_ADD_TEAM_MEMBER_CLEAR,
} from '../action/actionTypes'

const initialstate = {
	list: {
		loading: true,
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
	add: {
		loading: false,
		success: false,
		data: null,
		error: null,
	},
}

const employerTeamMemberReducer = (state = initialstate, action: any) => {
	const { type, payload } = action

	switch (type) {
		case EMPLOYER_GET_TEAM_MEMBER:
			return { ...state, list: { loading: true } }

		case EMPLOYER_GET_TEAM_MEMBER_SUCCESS:
			return {
				...state,
				list: {
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_GET_TEAM_MEMBER_ERROR:
			return {
				...state,
				list: {
					loading: false,
					success: false,
					error: payload,
				},
			}

		case EMPLOYER_GET_TEAM_MEMBER_DETAIL:
			return { ...state, detail: { loading: true } }

		case EMPLOYER_GET_TEAM_MEMBER_DETAIL_SUCCESS:
			return {
				...state,
				detail: {
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_GET_TEAM_MEMBER_DETAIL_ERROR:
			return {
				...state,
				detail: {
					loading: false,
					success: false,
					error: payload,
				},
			}

		case EMPLOYER_ADD_TEAM_MEMBER:
			return { ...state, add: { loading: true } }

		case EMPLOYER_ADD_TEAM_MEMBER_SUCCESS:
			return {
				...state,
				add: {
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_ADD_TEAM_MEMBER_ERROR:
			return {
				...state,
				add: {
					loading: false,
					success: false,
					error: payload,
				},
			}

		case EMPLOYER_ADD_TEAM_MEMBER_CLEAR:
			return {
				...state,
				add: {
					loading: false,
					success: false,
					data: null,
					error: null,
				},
			}

		default:
			return state
	}
}

export default employerTeamMemberReducer
