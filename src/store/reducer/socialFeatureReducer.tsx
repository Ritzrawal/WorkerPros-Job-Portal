import {
	GET_USERS_SUGGESTION,
	GET_USERS_SUGGESTION_SUCCESS,
	GET_USERS_SUGGESTION_ERROR,
	GET_COMPANIES_TO_FOLLOW,
	GET_COMPANIES_TO_FOLLOW_SUCCESS,
	GET_COMPANIES_TO_FOLLOW_ERROR,
	GET_USER_INVITATIONS,
	GET_USER_INVITATIONS_SUCCESS,
	GET_USER_INVITATIONS_ERROR,
	DASHBOARD_ADD_POST,
	DASHBOARD_ADD_POST_SUCCESS,
	DASHBOARD_ADD_POST_ERROR,
	DASHBOARD_GET_POSTS,
	DASHBOARD_GET_POSTS_SUCCESS,
	DASHBOARD_GET_POSTS_ERROR,
	CANDIDATE_GET_CONVERSATION,
	CANDIDATE_GET_CONVERSATION_SUCCESS,
	CANDIDATE_GET_CONVERSATION_ERROR,
	CANDIDATE_SEND_MESSAGE,
	CANDIDATE_SEND_MESSAGE_SUCCESS,
	CANDIDATE_SEND_MESSAGE_ERROR,
	CANDIDATE_RECEIVE_MESSAGE,
	CANDIDATE_RECEIVE_MESSAGE_SUCCESS,
	CANDIDATE_RECEIVE_MESSAGE_ERROR,
	CANDIDATE_GET_MESSAGES,
	CANDIDATE_GET_MESSAGES_SUCCESS,
	CANDIDATE_GET_MESSAGES_ERROR,
	CANDIDATE_GET_MORE_CONVERSATION,
	CANDIDATE_GET_MORE_MESSAGES,
} from '../action/socialFeatureActionTypes'

const initialState = {
	userSuggestions: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
	userInvitations: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
	companiesToFollow: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
	dashBoardPosts: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
	dashBoardAddPost: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
	candidateMessagesList: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
	candidateConversationDetail: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
	candidateSendMessage: {
		loading: false,
		success: false,
		data: [],
		error: [],
	},
	candidateReceiveMessage: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
}

const socialFeatureReducer = (state = initialState, action: any) => {
	const { type, payload } = action

	switch (type) {
		case GET_USER_INVITATIONS:
			return {
				...state,
				userInvitations: {
					...state.userInvitations,
					loading: true,
				},
			}

		case GET_USER_INVITATIONS_SUCCESS:
			return {
				...state,
				userInvitations: {
					...state.userInvitations,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case GET_USER_INVITATIONS_ERROR:
			return {
				...state,
				userInvitations: {
					...state.userInvitations,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case GET_COMPANIES_TO_FOLLOW:
			return {
				...state,
				companiesToFollow: {
					...state.companiesToFollow,
					loading: true,
				},
			}

		case GET_COMPANIES_TO_FOLLOW_SUCCESS:
			return {
				...state,
				companiesToFollow: {
					...state.companiesToFollow,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case GET_COMPANIES_TO_FOLLOW_ERROR:
			return {
				...state,
				companiesToFollow: {
					...state.companiesToFollow,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case GET_USERS_SUGGESTION:
			return {
				...state,
				userSuggestions: {
					...state.userSuggestions,
					loading: true,
				},
			}

		case GET_USERS_SUGGESTION_SUCCESS:
			return {
				...state,
				userSuggestions: {
					...state.userSuggestions,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case GET_USERS_SUGGESTION_ERROR:
			return {
				...state,
				userSuggestions: {
					...state.userSuggestions,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case DASHBOARD_ADD_POST:
			return {
				...state,
				dashboardAddPost: {
					...state.dashBoardAddPost,
					loading: true,
				},
			}

		case DASHBOARD_ADD_POST_SUCCESS:
			return {
				...state,
				dashboardAddPost: {
					...state.dashBoardAddPost,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case DASHBOARD_ADD_POST_ERROR:
			return {
				...state,
				dashboardAddPost: {
					...state.dashBoardAddPost,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case DASHBOARD_GET_POSTS:
			return {
				...state,
				dashboardPosts: {
					...state.dashBoardPosts,
					loading: true,
				},
			}

		case DASHBOARD_GET_POSTS_SUCCESS:
			return {
				...state,
				dashboardPosts: {
					...state.dashBoardPosts,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case DASHBOARD_GET_POSTS_ERROR:
			return {
				...state,
				dashboardPosts: {
					...state.dashBoardPosts,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case CANDIDATE_GET_MESSAGES: {
			return {
				...state,
				candidateMessagesList: {
					...state.candidateMessagesList,
					loading: true,
					error: false,
					success: false,
					data: [],
				},
			}
		}

		case CANDIDATE_GET_MESSAGES_SUCCESS: {
			return {
				...state,
				candidateMessagesList: {
					...state.candidateMessagesList,
					loading: false,
					success: true,
					data: payload,
				},
			}
		}
		case CANDIDATE_GET_MESSAGES_ERROR: {
			return {
				...state,
				candidateMessagesList: {
					...state.candidateMessagesList,
					loading: false,
					success: false,
					error: payload,
				},
			}
		}

		case CANDIDATE_GET_MORE_MESSAGES: {
			return {
				...state,
				candidateMessagesList: {
					...state.candidateMessagesList,
					loading: true,
				},
			}
		}

		case CANDIDATE_GET_CONVERSATION: {
			return {
				...state,
				candidateConversationDetail: {
					...state.candidateConversationDetail,
					loading: true,
					error: false,
					success: false,
					data: [],
				},
			}
		}

		case CANDIDATE_GET_CONVERSATION_SUCCESS: {
			return {
				...state,
				candidateConversationDetail: {
					...state.candidateConversationDetail,
					loading: false,
					success: true,
					data: payload,
				},
			}
		}

		case CANDIDATE_GET_CONVERSATION_ERROR: {
			return {
				...state,
				candidateConversationDetail: {
					...state.candidateConversationDetail,
					loading: false,
					success: false,
					error: payload,
				},
			}
		}

		case CANDIDATE_GET_MORE_CONVERSATION: {
			return {
				...state,
				candidateConversationDetail: {
					...state.candidateConversationDetail,
					loading: true,
				},
			}
		}

		default:
			return state
	}
}

export default socialFeatureReducer
