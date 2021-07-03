import { Dispatch } from 'redux'
import { fileUpload } from '../../service/file'
import { get, post, deleteThis } from '../../utils/http'

import {
	DASHBOARD_GET_POSTS_SUCCESS,
	DASHBOARD_GET_POSTS_ERROR,
	ADMIN_DASHBOARD_DELETE_POST,
	ADMIN_DASHBOARD_DELETE_POST_SUCCESS,
	ADMIN_DASHBOARD_DELETE_POST_ERROR,
	CANDIDATE_GET_CONVERSATION_SUCCESS,
	CANDIDATE_GET_CONVERSATION_ERROR,
} from './socialFeatureActionTypes'
import {
	ADMIN_LOGIN,
	ADMIN_LOGIN_SUCCESS,
	ADMIN_LOGIN_ERROR,
	ADMIN_TRADEPERSON,
	ADMIN_TRADEPERSON_SUCCESS,
	ADMIN_TRADEPERSON_ERROR,
	ADMIN_COMPANY,
	ADMIN_COMPANY_SUCCESS,
	ADMIN_COMPANY_ERROR,
	ADMIN_MESSAGE_DELETE,
	ADMIN_MESSAGE_DELETE_SUCESS,
	ADMIN_MESSAGE_DELETE_ERROR,
	ADMIN_REGISTER,
	ADMIN_REGISTER_SUCCESS,
	ADMIN_REGISTER_ERROR,
	ADMIN_DATACOUNT,
	ADMIN_DATACOUNT_SUCCESS,
	ADMIN_DATACOUNT_ERROR,
	ADMIN_RESOLVED,
	ADMIN_RESOLVED_SUCCESS,
	ADMIN_RESOLVED_ERROR,
} from './actionTypes'
//======================================admin Login Page==============================//

export const adminLoginAction = (params: any) => (dispatch: Dispatch) => {
	const adminLoginPage = `${process.env.REACT_APP_API_BASE_URL}/admin/sign-in`
	dispatch({
		type: ADMIN_LOGIN,
	})

	post(adminLoginPage, params)
		.then((res) => {
			localStorage.setItem('role', res.data.data.user.role)
			localStorage.setItem('token', res.data.data.access_token)
			dispatch({
				type: ADMIN_LOGIN_SUCCESS,
				payload: res.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: ADMIN_LOGIN_ERROR,
				payload: error.response.data.message,
			})
		)
}
export const adminRegisterAction = (params: any) => (dispatch: Dispatch) => {
	const adminLoginPage = `${process.env.REACT_APP_API_BASE_URL}/admin/addAdmin`
	dispatch({
		type: ADMIN_REGISTER,
	})

	post(adminLoginPage, params)
		.then((res) => {
			dispatch({
				type: ADMIN_REGISTER_SUCCESS,
				payload: res.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: ADMIN_REGISTER_ERROR,
				payload: error.response.data.message,
			})
		)
}
// ================admin Resolve Ticket ==================================//
export const adminResolveAction = (params: any) => (dispatch: Dispatch) => {
	console.log('status', params)
	const adminLoginPage = `${process.env.REACT_APP_API_BASE_URL}/admin/ticket/resolve?conversation_id=${params.conversation_id}&status=${params.status}`
	dispatch({
		type: ADMIN_RESOLVED,
	})

	post(adminLoginPage, params)
		.then((res) => {
			dispatch({
				type: ADMIN_RESOLVED_SUCCESS,
				payload: res.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: ADMIN_RESOLVED_ERROR,
				payload: error.response.data.message,
			})
		)
}
//==============Company Management =========================//

export const adminCompanyAction = () => (dispatch: Dispatch) => {
	const adminLoginPage = `${process.env.REACT_APP_API_BASE_URL}/admin/get-companies`
	dispatch({
		type: ADMIN_COMPANY,
	})

	get(adminLoginPage)
		.then((res) => {
			dispatch({
				type: ADMIN_COMPANY_SUCCESS,
				payload: res.data.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: ADMIN_COMPANY_ERROR,
				payload: error.response.data.message,
			})
		)
}
//==============TradePerson Management =========================//
export const adminTradePersonAction = () => (dispatch: Dispatch) => {
	const adminLoginPage = `${process.env.REACT_APP_API_BASE_URL}/admin/support/conversations?limit=10&page=1`
	dispatch({
		type: ADMIN_TRADEPERSON,
	})

	get(adminLoginPage)
		.then((res) => {
			dispatch({
				type: ADMIN_TRADEPERSON_SUCCESS,
				payload: res.data.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: ADMIN_TRADEPERSON_ERROR,
				payload: error.response.data.message,
			})
		)
}
//======================Admin Data COunt ==========================================//

export const adminDataCountAction = () => (dispatch: Dispatch) => {
	const adminLoginPage = `${process.env.REACT_APP_API_BASE_URL}/admin/dashboard/data-counts`
	dispatch({
		type: ADMIN_DATACOUNT,
	})

	get(adminLoginPage)
		.then((res) => {
			dispatch({
				type: ADMIN_DATACOUNT_SUCCESS,
				payload: res.data.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: ADMIN_DATACOUNT_ERROR,
				payload: error.response.data.message,
			})
		)
}

//===========================admin delete comment post ======================================//

export const deleteAdminCommentPost = (comment_id: any) => (
	dispatch: Dispatch
) => {
	const deleteCommentPostURL = `${process.env.REACT_APP_API_BASE_URL}/admin/deleteComment/${comment_id}`
	const getDashboardPostsURL = `${process.env.REACT_APP_API_BASE_URL}/worker/get-posts`

	dispatch({
		type: ADMIN_DASHBOARD_DELETE_POST,
	})

	deleteThis(deleteCommentPostURL)
		.then((response: any) => {
			dispatch({
				type: ADMIN_DASHBOARD_DELETE_POST_SUCCESS,
				payload: response.data.data,
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
		})
		.catch((error: any) => {
			dispatch({
				type: ADMIN_DASHBOARD_DELETE_POST_ERROR,
				payload: error,
			})
		})
}
export const deleteSingleMessage = (message_id: any) => (
	dispatch: Dispatch
) => {
	const deleteMessageURL = `${process.env.REACT_APP_API_BASE_URL}/admin/message/deleteMessage/${message_id}`
	const getAllmessageURL = `${process.env.REACT_APP_API_BASE_URL}/admin/conversations`

	dispatch({
		type: ADMIN_MESSAGE_DELETE,
	})

	deleteThis(deleteMessageURL)
		.then((response: any) => {
			dispatch({
				type: ADMIN_MESSAGE_DELETE_SUCESS,
				payload: response.data.data,
			})
			get(getAllmessageURL)
				.then((response: any) => {
					dispatch({
						type: CANDIDATE_GET_CONVERSATION_SUCCESS,
						payload: response.data.data,
					})
				})
				.catch((error: any) => {
					dispatch({
						type: CANDIDATE_GET_CONVERSATION_ERROR,
						payload: error,
					})
				})
		})
		.catch((error: any) => {
			dispatch({
				type: ADMIN_MESSAGE_DELETE_ERROR,
				payload: error,
			})
		})
}
