import {
	WORKER_DASHBOARD_DATA_COUNT,
	WORKER_DASHBOARD_DATA_COUNT_SUCCESS,
	WORKER_DASHBOARD_DATA_COUNT_ERROR,
} from '../action/actionTypes'

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
} from '../action/socialFeatureActionTypes'

const initialState = {
	workerDashboardDataCount: {
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
	dashBoardDeletePost: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
	dashBoardLikeUnlikePost: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
	dashBoardCommentPost: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
}

const workerDashboardReducer = (state = initialState, action: any) => {
	const { type, payload } = action

	switch (type) {
		case WORKER_DASHBOARD_DATA_COUNT:
			return {
				...state,
				workerDashboardDataCount: {
					loading: true,
				},
			}

		case WORKER_DASHBOARD_DATA_COUNT_SUCCESS:
			return {
				...state,
				workerDashboardDataCount: {
					loading: false,
					success: true,
					data: payload,
				},
			}
		case WORKER_DASHBOARD_DATA_COUNT_ERROR:
			return {
				...state,
				workerDashboardDataCount: {
					loading: false,
					success: false,
					error: payload,
				},
			}
		case DASHBOARD_ADD_POST:
			return {
				...state,
				dashBoardAddPost: {
					...state.dashBoardAddPost,
					loading: true,
				},
			}

		case DASHBOARD_ADD_POST_SUCCESS:
			return {
				...state,
				dashBoardAddPost: {
					...state.dashBoardAddPost,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case DASHBOARD_ADD_POST_ERROR:
			return {
				...state,
				dashBoardAddPost: {
					...state.dashBoardAddPost,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case DASHBOARD_GET_POSTS:
			return {
				...state,
				dashBoardPosts: {
					...state.dashBoardPosts,
					loading: true,
				},
			}

		case DASHBOARD_GET_POSTS_SUCCESS:
			return {
				...state,
				dashBoardPosts: {
					...state.dashBoardPosts,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case DASHBOARD_GET_POSTS_ERROR:
			return {
				...state,
				dashBoardPosts: {
					...state.dashBoardPosts,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case DASHBOARD_DELETE_POST:
			return {
				...state,
				dashBoardDeletePost: {
					...state.dashBoardDeletePost,
					loading: true,
				},
			}

		case DASHBOARD_DELETE_POST_SUCCESS:
			return {
				...state,
				dashBoardDeletePost: {
					...state.dashBoardDeletePost,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case DASHBOARD_DELETE_POST_ERROR:
			return {
				...state,
				dashBoardDeletePost: {
					...state.dashBoardDeletePost,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case DASHBOARD_LIKE_UNLIKE_POST: {
			return {
				...state,
				dashBoardLikeUnlikePost: {
					...state.dashBoardLikeUnlikePost,
					loading: true,
				},
			}
		}

		case DASHBOARD_LIKE_UNLIKE_POST_SUCCESS: {
			return {
				...state,
				dashBoardLikeUnlikePost: {
					...state.dashBoardLikeUnlikePost,
					loading: false,
					success: true,
					data: payload,
				},
			}
		}

		case DASHBOARD_LIKE_UNLIKE_POST_ERROR: {
			return {
				...state,
				dashBoardLikeUnlikePost: {
					...state.dashBoardLikeUnlikePost,
					loading: false,
					success: false,
					error: payload,
				},
			}
		}

		case DASHBOARD_POST_COMMENT: {
			return {
				...state,
				dashBoardCommentPost: {
					...state.dashBoardCommentPost,
					loading: true,
				},
			}
		}

		case DASHBOARD_POST_COMMENT_SUCCESS: {
			return {
				...state,
				dashBoardCommentPost: {
					...state.dashBoardCommentPost,
					loading: false,
					success: true,
					data: payload,
				},
			}
		}

		case DASHBOARD_POST_COMMENT_ERROR: {
			return {
				...state,
				dashBoardCommentPost: {
					...state.dashBoardCommentPost,
					loading: false,
					success: false,
					error: payload,
				},
			}
		}

		default:
			return state
	}
}

export default workerDashboardReducer
