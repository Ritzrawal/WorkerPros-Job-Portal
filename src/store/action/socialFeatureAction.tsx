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
	CANDIDATE_GET_MESSAGES,
	CANDIDATE_GET_MESSAGES_SUCCESS,
	CANDIDATE_GET_MESSAGES_ERROR,
	CANDIDATE_GET_CONVERSATION,
	CANDIDATE_GET_CONVERSATION_SUCCESS,
	CANDIDATE_GET_CONVERSATION_ERROR,
	CANDIDATE_SEND_MESSAGE,
	CANDIDATE_SEND_MESSAGE_SUCCESS,
	CANDIDATE_SEND_MESSAGE_ERROR,
	CANDIDATE_RECEIVE_MESSAGE,
	CANDIDATE_RECEIVE_MESSAGE_SUCCESS,
	CANDIDATE_RECEIVE_MESSAGE_ERROR,
	CANDIDATE_GET_MORE_CONVERSATION,
	CANDIDATE_GET_MORE_MESSAGES,
} from './socialFeatureActionTypes'

import { Dispatch } from 'redux'

import { fileUpload } from '../../service/file'

import { get, post } from '../../utils/http'

export const getUsersSuggestion = () => (dispatch: Dispatch) => {
	const getUsersSuggestionURL = `${process.env.REACT_APP_API_BASE_URL}/worker/get-user-suggestions`
	dispatch({
		type: GET_USERS_SUGGESTION,
	})

	get(getUsersSuggestionURL)
		.then((response: any) => {
			dispatch({
				type: GET_USERS_SUGGESTION_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: GET_USERS_SUGGESTION_ERROR,
				payload: error,
			})
		})
}

export const getCompaniesToFollow = () => (dispatch: Dispatch) => {
	const getCompaniesToFollowURL = `${process.env.REACT_APP_API_BASE_URL}/worker/get-company-suggestions`

	dispatch({
		type: GET_COMPANIES_TO_FOLLOW,
	})

	get(getCompaniesToFollowURL)
		.then((response: any) => {
			dispatch({
				type: GET_COMPANIES_TO_FOLLOW_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: GET_COMPANIES_TO_FOLLOW_ERROR,
				payload: error,
			})
		})
}

export const getUserInvitations = () => (dispatch: Dispatch) => {
	const getUserInvitationsURL = `${process.env.REACT_APP_API_BASE_URL}/worker/get-company-suggestions`

	dispatch({
		type: GET_USER_INVITATIONS,
	})

	get(getUserInvitationsURL)
		.then((response: any) => {
			dispatch({
				type: GET_USER_INVITATIONS_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: GET_USER_INVITATIONS_ERROR,
				payload: error,
			})
		})
}

//Worker Dashboard Actions

export const addDashboardPost = (dispatch: Dispatch) => {
	const addDashboardPostURL = `${process.env.REACT_APP_API_BASE_URL}/worker/add-post`

	dispatch({
		type: DASHBOARD_ADD_POST,
	})

	get(addDashboardPostURL)
		.then((response: any) => {
			dispatch({
				type: DASHBOARD_ADD_POST_SUCCESS,
				payload: response.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: DASHBOARD_ADD_POST_ERROR,
				payload: error,
			})
		})
}

export const getDashboardPosts = (dispatch: Dispatch) => {
	const getDashboardPostsURL = `${process.env.REACT_APP_API_BASE_URL}/worker/get-posts`

	dispatch({
		type: DASHBOARD_GET_POSTS,
	})

	get(getDashboardPostsURL)
		.then((response: any) => {
			dispatch({
				type: DASHBOARD_GET_POSTS_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: DASHBOARD_GET_POSTS_ERROR,
				payload: error,
			})
		})
}

// Candidate Messages Section

export const getCandidateMessages = (search?: string) => (
	dispatch: Dispatch
) => {
	const getCandidateMessagesURL = `${
		process.env.REACT_APP_API_BASE_URL
	}/conversations?page=1&limit=10${search ? `&name=${search}` : ''}`

	dispatch({
		type: CANDIDATE_GET_MESSAGES,
	})

	get(getCandidateMessagesURL)
		.then((response: any) => {
			dispatch({
				type: CANDIDATE_GET_MESSAGES_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error) => {
			dispatch({
				type: CANDIDATE_GET_MESSAGES_ERROR,
				payload: error,
			})
		})
}

export const getMoreCandidateMessages = (page, search?: string) => (
	dispatch: Dispatch,
	getState
) => {
	const getCandidateMessagesURL = `${
		process.env.REACT_APP_API_BASE_URL
	}/conversations?page=${page}&limit=10${search ? `&name=${search}` : ''}`
	const candidateMessagesList = getState().socialFeatureReducer
		.candidateMessagesList.data

	dispatch({
		type: CANDIDATE_GET_MORE_MESSAGES,
	})

	get(getCandidateMessagesURL)
		.then((response: any) => {
			let payload = response.data.data

			if (page > 1) {
				payload = [...candidateMessagesList, ...payload]
			}

			dispatch({
				type: CANDIDATE_GET_MESSAGES_SUCCESS,
				payload,
			})
		})
		.catch((error) => {
			dispatch({
				type: CANDIDATE_GET_MESSAGES_ERROR,
				payload: error,
			})
		})
}

export const updateNewSendMessage = (addNewMessageOnListData: any) => (
	dispatch: Dispatch,
	getState
) => {
	//update conversation list
	let conversationList = getState().socialFeatureReducer.candidateMessagesList
		.data
	console.log({ conversationList })

	const recievedNewMessageList = {
		conversation_id: addNewMessageOnListData.conversation_id,
		created_at: addNewMessageOnListData.created_at,
		job: addNewMessageOnListData.job ? addNewMessageOnListData.job : null,
		job_id: addNewMessageOnListData.job_id
			? addNewMessageOnListData.job_id
			: null,
		message: {
			created_at: addNewMessageOnListData.created_at,
			message: addNewMessageOnListData.message,
		},
		name: addNewMessageOnListData.name,
		profile_image: addNewMessageOnListData.profile_image,
		receiver_id: addNewMessageOnListData.receiver_id,
	}

	dispatch({
		type: CANDIDATE_GET_MESSAGES_SUCCESS,
		payload: [recievedNewMessageList, ...conversationList],
	})
}

export const setMessageRead = (currentConvoId: any) => (
	dispatch: Dispatch,
	getState
) => {
	let conversationList = getState().socialFeatureReducer.candidateMessagesList
		.data

	let newConversationList = conversationList.map((value: any, index) => {
		if (value.conversation_id === currentConvoId) {
			return { ...value, message: { ...value.message, read: true } }
		} else return value
	})

	console.log('new conversation list', newConversationList)
	dispatch({
		type: CANDIDATE_GET_MESSAGES_SUCCESS,
		payload: newConversationList,
	})
}

export const updateSendMessage = (addMessageOnListData: any) => (
	dispatch: Dispatch,
	getState
) => {
	//update conversation list
	let conversationList = getState().socialFeatureReducer.candidateMessagesList
		.data
	console.log({ conversationList })

	let [recievedMessageList] = conversationList.filter(
		(m) => m.conversation_id === addMessageOnListData.conversation_id
	)
	recievedMessageList = {
		...recievedMessageList,
		message: {
			...recievedMessageList.message,
			created_at: addMessageOnListData.created_at,
			message: addMessageOnListData.message,
			read: false,
		},
	}

	const filterMessageList = conversationList.filter(
		(m) => m.conversation_id != addMessageOnListData.conversation_id
	)

	dispatch({
		type: CANDIDATE_GET_MESSAGES_SUCCESS,
		payload: [recievedMessageList, ...filterMessageList],
	})

	//update current conversation
	let currentConversationMessage = getState().socialFeatureReducer
		.candidateConversationDetail.data

	if (
		currentConversationMessage.length &&
		currentConversationMessage[0].conversation_id ===
			addMessageOnListData.conversation_id
	) {
		dispatch({
			type: CANDIDATE_GET_CONVERSATION_SUCCESS,
			payload: [{ ...addMessageOnListData }, ...currentConversationMessage],
		})
	}
}

export const candidateSendMessage = (params: any) => (dispatch: Dispatch) => {
	const candidateSendMessageURL = `${process.env.REACT_APP_API_BASE_URL}/send-message`

	dispatch({
		type: CANDIDATE_SEND_MESSAGE,
	})

	if (params.files && params.files !== '') {
		fileUpload('post', params.files).then((response) => {
			let newParams: any = {
				message: `${params.message} <a target='_blank' href='${
					process.env.REACT_APP_IMAGE_URL + response.data.data
				}' ><img  classname="messageCardImage" src='${
					process.env.REACT_APP_IMAGE_URL + response.data.data
				}'></img></a>`,
				receiver_id: params.receiver_id,
				conversation_id: params.conversation_id,
			}
			if (params.job_id) {
				newParams.job_id = params.job_id
			}
			post(candidateSendMessageURL, newParams)
				.then((response: any) => {
					dispatch({
						type: CANDIDATE_SEND_MESSAGE_SUCCESS,
						payload: response.data,
					})
				})
				.catch((error) => {
					dispatch({
						type: CANDIDATE_SEND_MESSAGE_ERROR,
						payload: error,
					})
				})
		})
	} else {
		let newMessageParamsWithoutFile: any = {
			message: params.message,
			conversation_id: params.conversation_id,
			receiver_id: params.receiver_id,
			job_id: params.job_id,
		}
		if (params.job_id) {
			newMessageParamsWithoutFile.job_id = params.job_id
		}
		post(candidateSendMessageURL, newMessageParamsWithoutFile)
			.then((response: any) => {
				dispatch({
					type: CANDIDATE_SEND_MESSAGE_SUCCESS,
					payload: response.data,
				})
			})
			.catch((error) => {
				dispatch({
					type: CANDIDATE_SEND_MESSAGE_ERROR,
					payload: error,
				})
			})
	}
}

export const candidateGetConversationDetail = (convoID: any) => (
	dispatch: Dispatch
) => {
	const getCandidateMessagesURL = `${process.env.REACT_APP_API_BASE_URL}/conversation/${convoID}/messages?page=1&limit=10`

	dispatch({
		type: CANDIDATE_GET_CONVERSATION,
	})

	get(getCandidateMessagesURL)
		.then((response: any) => {
			dispatch({
				type: CANDIDATE_GET_CONVERSATION_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error) => {
			dispatch({
				type: CANDIDATE_GET_CONVERSATION_ERROR,
				payload: error,
			})
		})
}

export const candidateGetMoreConversationDetail = (
	convoID: any,
	page?: any
) => (dispatch: Dispatch, getState) => {
	const getCandidateMessagesURL = `${process.env.REACT_APP_API_BASE_URL}/conversation/${convoID}/messages?page=${page}&limit=10`

	const candidateConversationDetail = getState().socialFeatureReducer
		.candidateConversationDetail.data

	dispatch({
		type: CANDIDATE_GET_MORE_CONVERSATION,
	})

	get(getCandidateMessagesURL)
		.then((response: any) => {
			let payload = response.data.data

			if (page > 1) {
				payload = [...candidateConversationDetail, ...payload]
			}

			dispatch({
				type: CANDIDATE_GET_CONVERSATION_SUCCESS,
				payload,
			})
		})
		.catch((error) => {
			dispatch({
				type: CANDIDATE_GET_CONVERSATION_ERROR,
				payload: error,
			})
		})
}

///admin socail feed management

export const getAdminMessages = () => (dispatch: Dispatch) => {
	const getCandidateMessagesURL = `${process.env.REACT_APP_API_BASE_URL}/admin/conversations`

	dispatch({
		type: CANDIDATE_GET_MESSAGES,
	})

	get(getCandidateMessagesURL)
		.then((response: any) => {
			dispatch({
				type: CANDIDATE_GET_MESSAGES_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error) => {
			dispatch({
				type: CANDIDATE_GET_MESSAGES_ERROR,
				payload: error,
			})
		})
}
export const getAdminSearchMessages = (name: string) => (
	dispatch: Dispatch
) => {
	const getCandidateMessagesURL = `${process.env.REACT_APP_API_BASE_URL}/admin/conversations?name=${name}`

	dispatch({
		type: CANDIDATE_GET_MESSAGES,
	})

	get(getCandidateMessagesURL)
		.then((response: any) => {
			dispatch({
				type: CANDIDATE_GET_MESSAGES_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error) => {
			dispatch({
				type: CANDIDATE_GET_MESSAGES_ERROR,
				payload: error,
			})
		})
}
//http://3.140.255.38/api/v1/admin/support/conversations?name=ritesh&limit=10&page=1
export const getSupportMessages = () => (dispatch: Dispatch) => {
	const adminLoginPage = `${process.env.REACT_APP_API_BASE_URL}/admin/support/conversations?limit=10`
	dispatch({
		type: CANDIDATE_GET_MESSAGES,
	})

	get(adminLoginPage)
		.then((res) => {
			dispatch({
				type: CANDIDATE_GET_MESSAGES_SUCCESS,
				payload: res.data.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: CANDIDATE_GET_MESSAGES_ERROR,
				payload: error.response.data.message,
			})
		)
}
export const getSupportSearchMessages = (search: any) => (
	dispatch: Dispatch
) => {
	const adminLoginPage = `${process.env.REACT_APP_API_BASE_URL}/admin/support/conversations?name=${search}`
	dispatch({
		type: CANDIDATE_GET_MESSAGES,
	})

	get(adminLoginPage)
		.then((res) => {
			dispatch({
				type: CANDIDATE_GET_MESSAGES_SUCCESS,
				payload: res.data.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: CANDIDATE_GET_MESSAGES_ERROR,
				payload: error.response.data.message,
			})
		)
}

export const adminGetConversationDetail = (convoID: any) => (
	dispatch: Dispatch
) => {
	const getCandidateMessagesURL = `${process.env.REACT_APP_API_BASE_URL}/admin/conversation/${convoID}/messages?page=1&limit=10`

	dispatch({
		type: CANDIDATE_GET_CONVERSATION,
	})

	get(getCandidateMessagesURL)
		.then((response: any) => {
			dispatch({
				type: CANDIDATE_GET_CONVERSATION_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error) => {
			dispatch({
				type: CANDIDATE_GET_CONVERSATION_ERROR,
				payload: error,
			})
		})
}

export const adminGetMoreConversationDetail = (convoID: any, page?: any) => (
	dispatch: Dispatch,
	getState
) => {
	const getCandidateMessagesURL = `${process.env.REACT_APP_API_BASE_URL}/admin/conversation/${convoID}/messages?page=${page}&limit=10`

	const candidateConversationDetail = getState().socialFeatureReducer
		.candidateConversationDetail.data

	dispatch({
		type: CANDIDATE_GET_MORE_CONVERSATION,
	})

	get(getCandidateMessagesURL)
		.then((response: any) => {
			let payload = response.data.data

			if (page > 1) {
				payload = [...candidateConversationDetail, ...payload]
			}

			dispatch({
				type: CANDIDATE_GET_CONVERSATION_SUCCESS,
				payload,
			})
		})
		.catch((error) => {
			dispatch({
				type: CANDIDATE_GET_CONVERSATION_ERROR,
				payload: error,
			})
		})
}
export const adminSendMessage = (params: any) => (dispatch: Dispatch) => {
	const adminSendMessageURL = `${process.env.REACT_APP_API_BASE_URL}/support/send-message`

	dispatch({
		type: CANDIDATE_SEND_MESSAGE,
	})

	if (params.files && params.files !== '') {
		fileUpload('post', params.files).then((response) => {
			const newParams = {
				message: `${params.message} <a target='_blank' href='${
					process.env.REACT_APP_IMAGE_URL + response.data.data
				}' ><img  classname="messageCardImage" src='${
					process.env.REACT_APP_IMAGE_URL + response.data.data
				}'></img></a>`,
				conversation_id: params.conversation_id,
			}
			post(adminSendMessageURL, newParams)
				.then((response: any) => {
					dispatch({
						type: CANDIDATE_SEND_MESSAGE_SUCCESS,
						payload: response.data,
					})
				})
				.catch((error) => {
					dispatch({
						type: CANDIDATE_SEND_MESSAGE_ERROR,
						payload: error,
					})
				})
		})
	} else {
		let newMessageParamsWithoutFile = {
			message: params.message,
			conversation_id: params.conversation_id,
		}
		post(adminSendMessageURL, newMessageParamsWithoutFile)
			.then((response: any) => {
				dispatch({
					type: CANDIDATE_SEND_MESSAGE_SUCCESS,
					payload: response.data,
				})
			})
			.catch((error) => {
				dispatch({
					type: CANDIDATE_SEND_MESSAGE_ERROR,
					payload: error,
				})
			})
	}
}
