import { Dispatch } from 'redux'

import { put, get } from '../../utils/http'

import { fileUpload } from '../../service/file'

import {
	EMPLOYER_UPDATE_PROFILE,
	EMPLOYER_UPDATE_PROFILE_SUCCESS,
	EMPLOYER_UPDATE_PROFILE_ERROR,
	CLEAR_EMPLOYER_UPDATE_PROFILE,
	EMPLOYER_UPDATE_COMPANY_PROFILE,
	EMPLOYER_UPDATE_COMPANY_PROFILE_SUCCESS,
	EMPLOYER_UPDATE_COMPANY_PROFILE_ERROR,
	CLEAR_EMPLOYER_UPDATE_COMPANY_PROFILE,
	EMPLOYER_PROFILE_DETAIL,
	EMPLOYER_PROFILE_DETAIL_SUCCESS,
	EMPLOYER_PROFILE_DETAIL_ERROR,
} from './actionTypes'

export const employerUpdateProfileAction = (params: any) => async (
	dispatch: Dispatch
) => {
	const employerUpdateProfileActionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/update-company`

	dispatch({
		type: EMPLOYER_UPDATE_PROFILE,
	})

	let newParams = params
	let fileError: any = null
	if (
		newParams.profile_image &&
		newParams.profile_image !== '' &&
		newParams.profile_image.size
	) {
		try {
			const fileResponse = await fileUpload(
				'profile_image',
				params.profile_image
			)
			newParams = { ...newParams, profile_image: fileResponse.data.data }
		} catch (error) {
			fileError = error
		}
	}

	if (fileError) {
		dispatch({
			type: EMPLOYER_UPDATE_PROFILE_ERROR,
			payload: fileError.response.data.message.error
				? fileError.response.data.message.error
				: fileError.response.data.message,
		})
	} else {
		put(employerUpdateProfileActionURL, newParams)
			.then((response: any) => {
				dispatch({
					type: EMPLOYER_UPDATE_PROFILE_SUCCESS,
					payload: response.data.data,
				})
			})
			.catch((error: any) => {
				dispatch({
					type: EMPLOYER_UPDATE_PROFILE_ERROR,
					payload: error,
				})
			})
	}
}

export const clearUpdateProfileAction = () => (dispatch: Dispatch) => {
	dispatch({
		type: CLEAR_EMPLOYER_UPDATE_PROFILE,
	})
}

export const employerUpdateCompanyProfileAction = (params: any) => async (
	dispatch: Dispatch
) => {
	const employerUpdateCompanyProfileActionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/update-company-detail`

	dispatch({
		type: EMPLOYER_UPDATE_COMPANY_PROFILE,
	})

	let newParams = params
	let fileError: any = null
	if (
		newParams.profile_image &&
		newParams.profile_image !== '' &&
		newParams.profile_image.size
	) {
		try {
			const fileResponse = await fileUpload(
				'profile_image',
				params.profile_image
			)
			newParams = { ...newParams, profile_image: fileResponse.data.data }
		} catch (error) {
			fileError = error
		}
	}

	if (
		newParams.images &&
		newParams.images.length &&
		newParams.images[0] !== '' &&
		newParams.images[0].size
	) {
		try {
			const fileResponse = await fileUpload('cover_image', params.images[0])
			newParams = { ...newParams, images: fileResponse.data.data }
		} catch (error) {
			fileError = error
		}
	}

	if (fileError) {
		dispatch({
			type: EMPLOYER_UPDATE_COMPANY_PROFILE_ERROR,
			payload: fileError.response.data.message.error
				? fileError.response.data.message.error
				: fileError.response.data.message,
		})
	} else {
		put(employerUpdateCompanyProfileActionURL, newParams)
			.then((response: any) => {
				dispatch({
					type: EMPLOYER_UPDATE_COMPANY_PROFILE_SUCCESS,
					payload: response.data.data,
				})
			})
			.catch((error: any) => {
				dispatch({
					type: EMPLOYER_UPDATE_COMPANY_PROFILE_ERROR,
					payload: error,
				})
			})
	}
}

export const clearUpdateCompanyProfileAction = () => (dispatch: Dispatch) => {
	dispatch({
		type: CLEAR_EMPLOYER_UPDATE_COMPANY_PROFILE,
	})
}

export const employerProfileDetailAction = () => (dispatch: Dispatch) => {
	const employerProfileDetailActionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/get-profile-info`

	// dispatch({
	// 	type: EMPLOYER_PROFILE_DETAIL,
	// })

	get(employerProfileDetailActionURL)
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_PROFILE_DETAIL_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_PROFILE_DETAIL_ERROR,
				payload: error,
			})
		})
}
