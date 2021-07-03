import { Dispatch } from 'redux'

import { get, post } from '../../utils/http'

import {
	EMPLOYER_APPLIED_JOB_CANDIDATE_LIST,
	EMPLOYER_APPLIED_JOB_CANDIDATE_LIST_SUCCESS,
	EMPLOYER_APPLIED_JOB_CANDIDATE_LIST_ERROR,
	EMPLOYER_APPLIED_JOB_INTERVIEW_CANDIDATE_LIST,
	EMPLOYER_APPLIED_JOB_INTERVIEW_CANDIDATE_LIST_SUCCESS,
	EMPLOYER_APPLIED_JOB_INTERVIEW_CANDIDATE_LIST_ERROR,
	EMPLOYER_APPLIED_JOB_CANDIDATE_PHASE_CHANGE,
	EMPLOYER_APPLIED_JOB_CANDIDATE_PHASE_CHANGE_SUCCESS,
	EMPLOYER_APPLIED_JOB_CANDIDATE_PHASE_CHANGE_ERROR,
	EMPLOYER_INVITE_CANDIDATE_LIST,
	EMPLOYER_INVITE_CANDIDATE_LIST_SUCCESS,
	EMPLOYER_INVITE_CANDIDATE_LIST_ERROR,
	EMPLOYER_LIKE_CANDIDATE_PROFILE,
	EMPLOYER_LIKE_CANDIDATE_PROFILE_SUCCESS,
	EMPLOYER_LIKE_CANDIDATE_PROFILE_ERROR,
	EMPLOYER_UNLIKE_CANDIDATE_PROFILE,
	EMPLOYER_UNLIKE_CANDIDATE_PROFILE_SUCCESS,
	EMPLOYER_UNLIKE_CANDIDATE_PROFILE_ERROR,
} from './actionTypes'

export const employerAppliedJobCandidateListAction = (jobId: string) => (
	dispatch: Dispatch
) => {
	const employerAppliedJobCandidateListActionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/job/${jobId}/candidates`

	dispatch({
		type: EMPLOYER_APPLIED_JOB_CANDIDATE_LIST,
	})

	get(employerAppliedJobCandidateListActionURL)
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_APPLIED_JOB_CANDIDATE_LIST_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_APPLIED_JOB_CANDIDATE_LIST_ERROR,
				payload: error,
			})
		})
}

export const employerAppliedJobInterviewCandidateListAction = (
	jobId: string
) => (dispatch: Dispatch) => {
	const employerAppliedJobInterviewCandidateListActionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/job/${jobId}/candidates?phase=interview`

	dispatch({
		type: EMPLOYER_APPLIED_JOB_INTERVIEW_CANDIDATE_LIST,
	})

	get(employerAppliedJobInterviewCandidateListActionURL)
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_APPLIED_JOB_INTERVIEW_CANDIDATE_LIST_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_APPLIED_JOB_INTERVIEW_CANDIDATE_LIST_ERROR,
				payload: error,
			})
		})
}

export const employerAppliedJobCandidatePhaseChangeAction = (
	applicationId: string,
	phase: string
) => (dispatch: Dispatch) => {
	const employerAppliedJobCandidatePhaseChangeActionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/application/${applicationId}/change-phase/${phase}`

	dispatch({
		type: EMPLOYER_APPLIED_JOB_CANDIDATE_PHASE_CHANGE,
	})

	get(employerAppliedJobCandidatePhaseChangeActionURL)
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_APPLIED_JOB_CANDIDATE_PHASE_CHANGE_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_APPLIED_JOB_CANDIDATE_PHASE_CHANGE_ERROR,
				payload: error,
			})
		})
}

export const employerInviteCandidateListAction = () => (dispatch: Dispatch) => {
	const employerInviteCandidateListActionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/get-user-suggestions`

	dispatch({
		type: EMPLOYER_INVITE_CANDIDATE_LIST,
	})

	get(employerInviteCandidateListActionURL)
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_INVITE_CANDIDATE_LIST_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_INVITE_CANDIDATE_LIST_ERROR,
				payload: error,
			})
		})
}

export const employerLikeCandidateProfileAction = (candidateId: string) => (
	dispatch: Dispatch
) => {
	const employerLikeCandidateProfileActionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/like-Profile/${candidateId}`

	dispatch({
		type: EMPLOYER_LIKE_CANDIDATE_PROFILE,
	})

	post(employerLikeCandidateProfileActionURL, {})
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_LIKE_CANDIDATE_PROFILE_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_LIKE_CANDIDATE_PROFILE_ERROR,
				payload: error,
			})
		})
}

export const employerUnlikeCandidateProfileAction = (candidateId: string) => (
	dispatch: Dispatch
) => {
	const employerUnlikeCandidateProfileActionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/unlike-Profile/${candidateId}`

	dispatch({
		type: EMPLOYER_UNLIKE_CANDIDATE_PROFILE,
	})

	post(employerUnlikeCandidateProfileActionURL, {})
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_UNLIKE_CANDIDATE_PROFILE_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_UNLIKE_CANDIDATE_PROFILE_ERROR,
				payload: error,
			})
		})
}
