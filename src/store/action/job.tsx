import { Dispatch } from 'redux'

import { get } from '../../utils/http'

import {
	GET_JOB_CATEGORIES,
	GET_JOB_CATEGORIES_SUCCESS,
	GET_JOB_CATEGORIES_ERROR,
	GET_JOBS,
	GET_JOBS_SUCCESS,
	GET_JOBS_ERROR,
	FILTER_JOBS,
	FILTER_JOBS_SUCCESS,
	FILTER_JOBS_ERROR,
	GET_SAVED_JOBS,
	GET_SAVED_JOBS_SUCCESS,
	GET_SAVED_JOBS_ERROR,
	APPLY_JOB,
	APPLY_JOB_SUCCESS,
	APPLY_JOB_ERROR,
	ADD_REMOVE_FAVOURITE_JOB,
	ADD_REMOVE_FAVOURITE_JOB_SUCCESS,
	ADD_REMOVE_FAVOURITE_JOB_ERROR,
	SAVE_JOB,
	SAVE_JOB_SUCCESS,
	SAVE_JOB_ERROR,
	GET_JOB_DESCRIPTION,
	GET_JOB_DESCRIPTION_SUCCESS,
	GET_JOB_DESCRIPTION_ERROR,
	GET_JOB_APPLICATIONS,
	GET_JOB_APPLICATIONS_SUCCESS,
	GET_JOB_APPLICATIONS_ERROR,
	GET_COMPANY_JOBS_LIST,
	GET_COMPANY_JOBS_LIST_SUCCESS,
	GET_COMPANY_JOBS_LIST_ERROR,
	GET_RECOMMENDED_JOBS,
	GET_RECOMMENDED_JOBS_SUCCESS,
	GET_RECOMMENDED_JOBS_ERROR,
} from '../action/actionTypes'

export const getJobCategories = () => (dispatch: Dispatch) => {
	const getJobCategoriesURL = `${process.env.REACT_APP_API_BASE_URL}/categories`
	dispatch({
		type: GET_JOB_CATEGORIES,
	})

	get(getJobCategoriesURL)
		.then((response: any) => {
			dispatch({
				type: GET_JOB_CATEGORIES_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: GET_JOB_CATEGORIES_ERROR,
				payload: error,
			})
		})
}

export const getJobs = (params: any) => (dispatch: Dispatch) => {
	const getJobsURL = `${process.env.REACT_APP_API_BASE_URL}/jobs${params}`
	dispatch({
		type: GET_JOBS,
	})

	get(getJobsURL)
		.then((response: any) => {
			dispatch({
				type: GET_JOBS_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: GET_JOBS_ERROR,
				payload: error,
			})
		})
}

export const getRecommendedJobs = (params: any) => (dispatch: Dispatch) => {
	const getJobsURL = `${process.env.REACT_APP_API_BASE_URL}/worker/get-job-suggestions${params}`
	dispatch({
		type: GET_RECOMMENDED_JOBS,
	})

	get(getJobsURL)
		.then((response: any) => {
			dispatch({
				type: GET_RECOMMENDED_JOBS_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: GET_RECOMMENDED_JOBS_ERROR,
				payload: error,
			})
		})
}

export const getCompanyJobs = (companyId: string, params: any) => (
	dispatch: Dispatch
) => {
	const getJobsURL = `${process.env.REACT_APP_API_BASE_URL}/companies/${companyId}/jobs${params}`
	dispatch({
		type: GET_COMPANY_JOBS_LIST,
	})

	get(getJobsURL)
		.then((response: any) => {
			dispatch({
				type: GET_COMPANY_JOBS_LIST_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: GET_COMPANY_JOBS_LIST_ERROR,
				payload: error,
			})
		})
}

export const filterJobs = (params: any) => (dispatch: Dispatch) => {
	const filterJobsURL = `${process.env.REACT_APP_API_BASE_URL}/jobs${params}`
	dispatch({
		type: FILTER_JOBS,
	})

	get(filterJobsURL)
		.then((response: any) => {
			dispatch({
				type: FILTER_JOBS_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: FILTER_JOBS_ERROR,
				payload: error,
			})
		})
}

export const getSavedJobs = (params: any) => (dispatch: Dispatch) => {
	const getSavedJobsURL = `${process.env.REACT_APP_API_BASE_URL}/worker/saved-jobs?${params}`

	dispatch({
		type: GET_SAVED_JOBS,
	})

	get(getSavedJobsURL)
		.then((response: any) => {
			dispatch({
				type: GET_SAVED_JOBS_SUCCESS,
				payload: response.data.data.saved_jobs,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: GET_SAVED_JOBS_ERROR,
				payload: error,
			})
		})
}

export const getSavedJobsWithFilter = (params: any) => (dispatch: Dispatch) => {
	const getSavedJobsURL = `${process.env.REACT_APP_API_BASE_URL}/worker/saved-jobs?${params}`

	dispatch({
		type: GET_SAVED_JOBS,
	})

	get(getSavedJobsURL)
		.then((response: any) => {
			dispatch({
				type: GET_SAVED_JOBS_SUCCESS,
				payload: response.data.data.saved_jobs,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: GET_SAVED_JOBS_ERROR,
				payload: error,
			})
		})
}
// --------- Apply Job

export const applyJob = (params: any) => (dispatch: Dispatch, getState) => {
	const getApplyJobURL = `${process.env.REACT_APP_API_BASE_URL}/worker/apply-job/${params}`
	const getJobsURL = `${process.env.REACT_APP_API_BASE_URL}/worker/get-job-suggestions`

	dispatch({
		type: APPLY_JOB,
	})

	get(getApplyJobURL)
		.then((response: any) => {
			get(getJobsURL)
				.then((response: any) => {
					dispatch({
						type: GET_RECOMMENDED_JOBS_SUCCESS,
						payload: response.data.data,
					})
				})
				.catch((error: any) => {
					dispatch({
						type: GET_RECOMMENDED_JOBS_ERROR,
						payload: error,
					})
				})
			let currentDescription = getState().job.description.data
			dispatch({
				type: APPLY_JOB_SUCCESS,
				payload: response,
			})

			dispatch({
				type: GET_JOB_DESCRIPTION_SUCCESS,
				payload: {
					...currentDescription,
					applied: !currentDescription.applied,
				},
			})
		})
		.catch((error: any) => {
			dispatch({
				type: APPLY_JOB_ERROR,
				payload: error,
			})
		})
}

//--------- Add remove favourite Job

export const addRemoveFavJob = (params: any) => (
	dispatch: Dispatch,
	getState: any
) => {
	const getApplyJobURL = `${process.env.REACT_APP_API_BASE_URL}/worker/add-remove-favourite-job/${params}`

	dispatch({
		type: ADD_REMOVE_FAVOURITE_JOB,
	})

	get(getApplyJobURL)
		.then((response: any) => {
			let currentDescription = getState().job.description.data
			console.log(currentDescription)

			dispatch({
				type: ADD_REMOVE_FAVOURITE_JOB_SUCCESS,
				payload: response,
			})
			dispatch({
				type: GET_JOB_DESCRIPTION_SUCCESS,
				payload: { ...currentDescription, fav: !currentDescription.fav },
			})
		})
		.catch((error: any) => {
			dispatch({
				type: ADD_REMOVE_FAVOURITE_JOB_ERROR,
				payload: error,
			})
		})
}

//--------- Save Job

export const saveJob = (params: any) => (dispatch: Dispatch, getState: any) => {
	const getApplyJobURL = `${process.env.REACT_APP_API_BASE_URL}/worker/save-unsave-job/${params}`
	const getJobsURL = `${process.env.REACT_APP_API_BASE_URL}/worker/get-job-suggestions`

	dispatch({
		type: SAVE_JOB,
	})

	get(getApplyJobURL)
		.then((response: any) => {
			get(getJobsURL)
				.then((response: any) => {
					dispatch({
						type: GET_RECOMMENDED_JOBS_SUCCESS,
						payload: response.data.data,
					})
				})
				.catch((error: any) => {
					dispatch({
						type: GET_RECOMMENDED_JOBS_ERROR,
						payload: error,
					})
				})
			let currentjobDescription = getState().job.description.data
			dispatch({
				type: SAVE_JOB_SUCCESS,
				payload: response,
			})

			dispatch({
				type: GET_JOB_DESCRIPTION_SUCCESS,
				payload: {
					...currentjobDescription,
					saved: !currentjobDescription.saved,
				},
			})
		})
		.catch((error: any) => {
			dispatch({
				type: SAVE_JOB_ERROR,
				payload: error,
			})
		})
}

// -----------------  Job Description

export const getJobDescription = (params: any) => (dispatch: Dispatch) => {
	const getJobsURL = localStorage.getItem('token')
		? `${process.env.REACT_APP_API_BASE_URL}/worker/get-job/${params}`
		: `${process.env.REACT_APP_API_BASE_URL}/jobs/${params}`
	dispatch({
		type: GET_JOB_DESCRIPTION,
	})

	get(getJobsURL)
		.then((response: any) => {
			dispatch({
				type: GET_JOB_DESCRIPTION_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: GET_JOB_DESCRIPTION_ERROR,
				payload: error,
			})
		})
}

// ---------------- Get Job Application List Actions

export const getJobApplication = (params: any) => (dispatch: Dispatch) => {
	const getJobsURL = `${process.env.REACT_APP_API_BASE_URL}/worker/applications?filters=${params}`

	dispatch({
		type: GET_JOB_APPLICATIONS,
	})

	get(getJobsURL)
		.then((response: any) => {
			console.log(response.data, ' job applications response here ')
			dispatch({
				type: GET_JOB_APPLICATIONS_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: GET_JOB_APPLICATIONS_ERROR,
				payload: error,
			})
		})
}
