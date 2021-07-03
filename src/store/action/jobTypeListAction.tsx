import { Dispatch } from 'redux'

import { get } from '../../utils/http'

import {
	JOB_TYPE_LIST,
	JOB_TYPE_LIST_SUCCESS,
	JOB_TYPE_LIST_ERROR,
} from './actionTypes'

export const jobTypeListAction = () => (dispatch: Dispatch) => {
	const jobTypeListActionURL = `${process.env.REACT_APP_API_BASE_URL}/default-pref-job-type`

	dispatch({
		type: JOB_TYPE_LIST,
	})

	get(jobTypeListActionURL)
		.then((response: any) => {
			dispatch({
				type: JOB_TYPE_LIST_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: JOB_TYPE_LIST_ERROR,
				payload: error,
			})
		})
}
