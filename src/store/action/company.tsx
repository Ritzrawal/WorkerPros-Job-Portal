import { Dispatch } from 'redux'

import { get, post } from '../../utils/http'

import {
	GET_COMPANIES,
	GET_COMPANIES_SUCCESS,
	GET_COMPANIES_ERROR,
	GET_TOP_COMPANIES,
	GET_TOP_COMPANIES_SUCCESS,
	GET_TOP_COMPANIES_ERROR,
	FILTER_COMPANIES,
	FILTER_COMPANIES_SUCCESS,
	FILTER_COMPANIES_ERROR,
	SAVE_UNSAVE_COMPANY,
	SAVE_UNSAVE_COMPANY_SUCCESS,
	SAVE_UNSAVE_COMPANY_ERROR,
} from '../action/actionTypes'

export const getCompanies = (params: any) => (dispatch: Dispatch) => {
	const getCompaniesURL = `${process.env.REACT_APP_API_BASE_URL}/companies?${
		params ? params : ''
	}`
	dispatch({
		type: GET_COMPANIES,
	})

	get(getCompaniesURL)
		.then((response: any) => {
			dispatch({
				type: GET_COMPANIES_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: GET_COMPANIES_ERROR,
				payload: error,
			})
		})
}

export const getTopCompanies = (params: any) => (dispatch: Dispatch) => {
	const getCompaniesURL = `${
		process.env.REACT_APP_API_BASE_URL
	}/companies?get_type=top${params ? params : ''}`
	dispatch({
		type: GET_TOP_COMPANIES,
	})

	get(getCompaniesURL)
		.then((response: any) => {
			dispatch({
				type: GET_TOP_COMPANIES_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: GET_TOP_COMPANIES_ERROR,
				payload: error,
			})
		})
}

export const filterCompanies = (params: any) => (dispatch: Dispatch) => {
	const filterCompanyURL = `${process.env.REACT_APP_API_BASE_URL}/companies${params}`
	dispatch({
		type: FILTER_COMPANIES,
	})

	get(filterCompanyURL)
		.then((response: any) => {
			dispatch({
				type: FILTER_COMPANIES_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: FILTER_COMPANIES_ERROR,
				payload: error,
			})
		})
}

export const saveUnsaveCompany = (id: string) => (dispatch: Dispatch) => {
	const saveUnsaveCompanyURL = `${process.env.REACT_APP_API_BASE_URL}/worker/save-unsave-company/${id}`
	dispatch({
		type: SAVE_UNSAVE_COMPANY,
	})

	post(saveUnsaveCompanyURL, id)
		.then((response) => {
			dispatch({
				type: SAVE_UNSAVE_COMPANY_SUCCESS,
				payload: response.data,
			})
		})
		.catch((error) => {
			dispatch({
				type: SAVE_UNSAVE_COMPANY_ERROR,
				payload: error,
			})
		})
}
