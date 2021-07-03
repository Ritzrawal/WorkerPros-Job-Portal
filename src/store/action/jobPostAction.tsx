import { Dispatch } from 'redux'

import { post } from '../../utils/http'

import {
	JOB_POST,
	JOB_POST_SUCCESS,
	JOB_POST_ERROR,
	CLEAR_JOB_POST,
} from './actionTypes'

export const jobPostAction = (params: any) => (dispatch: Dispatch) => {
	const jobPostActionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/create-job`

	dispatch({
		type: JOB_POST,
	})

	post(jobPostActionURL, params)
		.then((response: any) => {
			dispatch({
				type: JOB_POST_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: JOB_POST_ERROR,
				payload: error,
			})
		})
}

export const clearJobPostAction = () => (dispatch: Dispatch) => {
	dispatch({
		type: CLEAR_JOB_POST,
	})
}
