import { Dispatch } from 'redux'

import { get, post } from '../../utils/http'

import {
	EMPLOYER_GET_TEAM_MEMBER,
	EMPLOYER_GET_TEAM_MEMBER_SUCCESS,
	EMPLOYER_GET_TEAM_MEMBER_ERROR,
	EMPLOYER_GET_TEAM_MEMBER_DETAIL,
	EMPLOYER_GET_TEAM_MEMBER_DETAIL_SUCCESS,
	EMPLOYER_GET_TEAM_MEMBER_DETAIL_ERROR,
	EMPLOYER_ADD_TEAM_MEMBER,
	EMPLOYER_ADD_TEAM_MEMBER_SUCCESS,
	EMPLOYER_ADD_TEAM_MEMBER_ERROR,
	EMPLOYER_ADD_TEAM_MEMBER_CLEAR,
} from './actionTypes'

export const employerGetTeamMemberAction = () => async (dispatch: Dispatch) => {
	const employerGetTeamMemberActionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/getTeamMembers`

	dispatch({
		type: EMPLOYER_GET_TEAM_MEMBER,
	})

	get(employerGetTeamMemberActionURL)
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_GET_TEAM_MEMBER_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_GET_TEAM_MEMBER_ERROR,
				payload: error,
			})
		})
}

export const employerGetTeamMemberDetailAction = (memberId: any) => async (
	dispatch: Dispatch
) => {
	const employerGetTeamMemberDetailActionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/getTeamMember/${memberId}`

	dispatch({
		type: EMPLOYER_GET_TEAM_MEMBER_DETAIL,
	})

	get(employerGetTeamMemberDetailActionURL)
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_GET_TEAM_MEMBER_DETAIL_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_GET_TEAM_MEMBER_DETAIL_ERROR,
				payload: error,
			})
		})
}

export const employerAddTeamMemberAction = (params: any) => async (
	dispatch: Dispatch
) => {
	const employerAddTeamMemberActionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/add-team-member`

	dispatch({
		type: EMPLOYER_ADD_TEAM_MEMBER,
	})

	post(employerAddTeamMemberActionURL, params)
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_ADD_TEAM_MEMBER_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_ADD_TEAM_MEMBER_ERROR,
				payload: error.response.data.message,
			})
		})
}

export const employerAddTeamMemberClear = () => (dispatch: Dispatch) => {
	dispatch({
		type: EMPLOYER_ADD_TEAM_MEMBER_CLEAR,
	})
}
