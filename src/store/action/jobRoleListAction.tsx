import { Dispatch } from 'redux'

import { get } from '../../utils/http'

import {
	JOB_ROLE_LIST,
	JOB_ROLE_LIST_SUCCESS,
	JOB_ROLE_LIST_ERROR,
} from './actionTypes'

export const jobRoleListAction = () => (dispatch: Dispatch) => {
	const jobRoleListActionURL = `${process.env.REACT_APP_API_BASE_URL}/default-exp-roles`

	dispatch({
		type: JOB_ROLE_LIST,
	})

	get(jobRoleListActionURL)
		.then((response: any) => {
			dispatch({
				type: JOB_ROLE_LIST_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: JOB_ROLE_LIST_ERROR,
				payload: error,
			})
		})
}
