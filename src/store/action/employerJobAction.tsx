import { Dispatch } from 'redux'

import { get } from '../../utils/http'

import {
	EMPLOYER_DASHBOARD_JOB_LIST,
	EMPLOYER_DASHBOARD_JOB_LIST_SUCCESS,
	EMPLOYER_DASHBOARD_JOB_LIST_ERROR,
	EMPLOYER_JOB_LIST,
	EMPLOYER_JOB_LIST_SUCCESS,
	EMPLOYER_JOB_LIST_ERROR,
	EMPLOYER_PUBLISHED_JOB_LIST,
	EMPLOYER_PUBLISHED_JOB_LIST_SUCCESS,
	EMPLOYER_PUBLISHED_JOB_LIST_ERROR,
	EMPLOYER_DRAFT_JOB_LIST,
	EMPLOYER_DRAFT_JOB_LIST_SUCCESS,
	EMPLOYER_DRAFT_JOB_LIST_ERROR,
	EMPLOYER_EXPIRED_JOB_LIST,
	EMPLOYER_EXPIRED_JOB_LIST_SUCCESS,
	EMPLOYER_EXPIRED_JOB_LIST_ERROR,
	EMPLOYER_APPLIED_JOB_LIST,
	EMPLOYER_APPLIED_JOB_LIST_SUCCESS,
	EMPLOYER_APPLIED_JOB_LIST_ERROR,
	EMPLOYER_TOGGLE_JOB_STATUS,
	EMPLOYER_TOGGLE_JOB_STATUS_SUCCESS,
	EMPLOYER_TOGGLE_JOB_STATUS_ERROR,
	EMPLOYER_JOB_DETAIL,
	EMPLOYER_JOB_DETAIL_SUCCESS,
	EMPLOYER_JOB_DETAIL_ERROR,
} from './actionTypes'

export const employerDashboardJobListAction = () => (dispatch: Dispatch) => {
	const employerDashboardJobListActionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/dashboard/jobs`

	dispatch({
		type: EMPLOYER_DASHBOARD_JOB_LIST,
	})

	get(employerDashboardJobListActionURL)
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_DASHBOARD_JOB_LIST_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_DASHBOARD_JOB_LIST_ERROR,
				payload: error,
			})
		})
}

export const employerPublishedJobListAction = (params: any) => (
	dispatch: Dispatch
) => {
	const employerPublishedJobListActionURL = `${
		process.env.REACT_APP_API_BASE_URL
	}/employer/get-jobs?phase=published${params ? params : ''}`

	dispatch({
		type: EMPLOYER_PUBLISHED_JOB_LIST,
	})

	get(employerPublishedJobListActionURL)
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_PUBLISHED_JOB_LIST_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_PUBLISHED_JOB_LIST_ERROR,
				payload: error,
			})
		})
}

export const employerDraftJobListAction = (params: any) => (
	dispatch: Dispatch
) => {
	const employerDraftJobListActionURL = `${
		process.env.REACT_APP_API_BASE_URL
	}/employer/get-jobs?phase=draft${params ? params : ''}`

	dispatch({
		type: EMPLOYER_DRAFT_JOB_LIST,
	})

	get(employerDraftJobListActionURL)
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_DRAFT_JOB_LIST_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_DRAFT_JOB_LIST_ERROR,
				payload: error,
			})
		})
}

export const employerExpiredJobListAction = (params: any) => (
	dispatch: Dispatch
) => {
	const employerExpiredJobListActionURL = `${
		process.env.REACT_APP_API_BASE_URL
	}/employer/get-jobs?phase=expired${params ? params : ''}`

	dispatch({
		type: EMPLOYER_EXPIRED_JOB_LIST,
	})

	get(employerExpiredJobListActionURL)
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_EXPIRED_JOB_LIST_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_EXPIRED_JOB_LIST_ERROR,
				payload: error,
			})
		})
}

export const employerAppliedJobListAction = (params: any) => (
	dispatch: Dispatch
) => {
	const employerAppliedJobListActionURL = `${
		process.env.REACT_APP_API_BASE_URL
	}/employer/get-applied-jobs${params ? params : ''}`

	dispatch({
		type: EMPLOYER_APPLIED_JOB_LIST,
	})

	get(employerAppliedJobListActionURL)
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_APPLIED_JOB_LIST_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_APPLIED_JOB_LIST_ERROR,
				payload: error,
			})
		})
}

export const employerToggleJobStatusAction = (
	jobId: string,
	jobType: string
) => (dispatch: Dispatch) => {
	const employerToggleJobStatusActionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/activate-deactivate-job/${jobId}`

	// console.log({ jobType })

	dispatch({
		type: EMPLOYER_TOGGLE_JOB_STATUS,
	})

	get(employerToggleJobStatusActionURL)
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_TOGGLE_JOB_STATUS_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_TOGGLE_JOB_STATUS_ERROR,
				payload: error,
			})
		})
}

export const employerJobDetailAction = (jobId: any) => (dispatch: Dispatch) => {
	const employerJobDetailActionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/jobs/${jobId}`

	dispatch({
		type: EMPLOYER_JOB_DETAIL,
	})

	get(employerJobDetailActionURL)
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_JOB_DETAIL_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_JOB_DETAIL_ERROR,
				payload: error,
			})
		})
}

export const employerJobListAction = () => (dispatch: Dispatch) => {
	const employerJobListActionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/get-jobs`

	dispatch({
		type: EMPLOYER_JOB_LIST,
	})

	get(employerJobListActionURL)
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_JOB_LIST_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_JOB_LIST_ERROR,
				payload: error,
			})
		})
}
