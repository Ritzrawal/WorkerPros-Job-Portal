import { Dispatch } from 'redux'
import { fileUpload } from '../../service/file'
import { get, post, deleteThis } from '../../utils/http'

import {
	WORKER_DASHBOARD_DATA_COUNT,
	WORKER_DASHBOARD_DATA_COUNT_SUCCESS,
	WORKER_DASHBOARD_DATA_COUNT_ERROR,
} from './actionTypes'

import {
	DASHBOARD_ADD_POST,
	DASHBOARD_ADD_POST_SUCCESS,
	DASHBOARD_ADD_POST_ERROR,
	DASHBOARD_GET_POSTS,
	DASHBOARD_GET_POSTS_SUCCESS,
	DASHBOARD_GET_POSTS_ERROR,
	DASHBOARD_DELETE_POST,
	DASHBOARD_DELETE_POST_SUCCESS,
	DASHBOARD_DELETE_POST_ERROR,
	DASHBOARD_LIKE_UNLIKE_POST,
	DASHBOARD_LIKE_UNLIKE_POST_SUCCESS,
	DASHBOARD_LIKE_UNLIKE_POST_ERROR,
	DASHBOARD_POST_COMMENT,
	DASHBOARD_POST_COMMENT_SUCCESS,
	DASHBOARD_POST_COMMENT_ERROR,
} from './socialFeatureActionTypes'

export const workerDashboardDataCountAction = () => async (
	dispatch: Dispatch
) => {
	const workerDashboardDataCountURL = `${process.env.REACT_APP_API_BASE_URL}/worker/dashboard/data-counts`

	dispatch({
		type: WORKER_DASHBOARD_DATA_COUNT,
	})

	get(workerDashboardDataCountURL)
		.then((response: any) => {
			dispatch({
				type: WORKER_DASHBOARD_DATA_COUNT_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: WORKER_DASHBOARD_DATA_COUNT_ERROR,
				payload: error,
			})
		})
}

//Worker Dashboard Actions

export const addDashboardPost = (params: any) => (dispatch: Dispatch) => {
	const addDashboardPostURL = `${process.env.REACT_APP_API_BASE_URL}/worker/add-post`
	const getDashboardPostsURL = `${process.env.REACT_APP_API_BASE_URL}/worker/get-posts`

	dispatch({
		type: DASHBOARD_ADD_POST,
	})

	if (params.image !== '') {
		fileUpload('post', params.image).then((response) => {
			const newParams = {
				message: params.message,
				files: [response.data.data],
			}
			post(addDashboardPostURL, newParams)
				.then((response: any) => {
					dispatch({
						type: DASHBOARD_ADD_POST_SUCCESS,
						payload: response.data,
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
						type: DASHBOARD_ADD_POST_ERROR,
						payload: error,
					})
				})
		})
	} else {
		const newParams = {
			message: params.message,
		}
		post(addDashboardPostURL, newParams)
			.then((response: any) => {
				dispatch({
					type: DASHBOARD_ADD_POST_SUCCESS,
					payload: response.data,
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
					type: DASHBOARD_ADD_POST_ERROR,
					payload: error,
				})
			})
	}
}

export const getDashboardPosts = () => (dispatch: Dispatch) => {
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

export const deleteDashboardPost = (params: any) => (dispatch: Dispatch) => {
	const deleteDashboardPostURL = `${process.env.REACT_APP_API_BASE_URL}/worker/post/${params}`
	const getDashboardPostsURL = `${process.env.REACT_APP_API_BASE_URL}/worker/get-posts`

	dispatch({
		type: DASHBOARD_DELETE_POST,
	})

	deleteThis(deleteDashboardPostURL)
		.then((response: any) => {
			dispatch({
				type: DASHBOARD_DELETE_POST_SUCCESS,
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
				type: DASHBOARD_DELETE_POST_ERROR,
				payload: error,
			})
		})
}

// Like unlike dashboard posts

export const likeUnlikePost = (params: any) => (dispatch: Dispatch) => {
	const likeUnlikePostURL = `${process.env.REACT_APP_API_BASE_URL}/worker/post/${params}/like-unlike`
	const getDashboardPostsURL = `${process.env.REACT_APP_API_BASE_URL}/worker/get-posts`
	dispatch({
		type: DASHBOARD_ADD_POST,
	})

	get(likeUnlikePostURL)
		.then((response) => {
			dispatch({
				type: DASHBOARD_LIKE_UNLIKE_POST_SUCCESS,
				payload: response.data,
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
		.catch((error) => {
			dispatch({
				type: DASHBOARD_ADD_POST_ERROR,
				payload: error,
			})
		})
}

//Comment on Post

export const commentOnPost = (postId: any, headers: any) => (
	dispatch: Dispatch
) => {
	const dashBoardCommentOnPost = `${process.env.REACT_APP_API_BASE_URL}/worker/post/${postId}/comment`
	const getDashboardPostsURL = `${process.env.REACT_APP_API_BASE_URL}/worker/get-posts`

	dispatch({
		type: DASHBOARD_POST_COMMENT,
	})

	post(dashBoardCommentOnPost, headers)
		.then((response: any) => {
			dispatch({
				type: DASHBOARD_POST_COMMENT_SUCCESS,
				payload: response.data,
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
		.catch((error) => {
			dispatch({
				type: DASHBOARD_POST_COMMENT_ERROR,
				payload: error,
			})
		})
}
//delete comment
export const deleteCommentPost = (comment_id: any) => (dispatch: Dispatch) => {
	const deleteCommentPostURL = `${process.env.REACT_APP_API_BASE_URL}/worker/comment/${comment_id}`
	const getDashboardPostsURL = `${process.env.REACT_APP_API_BASE_URL}/worker/get-posts`

	dispatch({
		type: DASHBOARD_DELETE_POST,
	})

	deleteThis(deleteCommentPostURL)
		.then((response: any) => {
			dispatch({
				type: DASHBOARD_DELETE_POST_SUCCESS,
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
				type: DASHBOARD_DELETE_POST_ERROR,
				payload: error,
			})
		})
}
