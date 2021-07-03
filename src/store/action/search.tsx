import { Dispatch } from 'redux'

import { get } from '../../utils/http'

import {
	EMPLOYER_SEARCH,
	EMPLOYER_SEARCH_SUCCESS,
	EMPLOYER_SEARCH_ERROR,
} from '../action/actionTypes'

export const employerSearchAction = (params) => (dispatch: Dispatch) => {
	const employerSearchActionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/search/${params}`
	dispatch({
		type: EMPLOYER_SEARCH,
	})

	get(employerSearchActionURL)
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_SEARCH_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_SEARCH_ERROR,
				payload: error,
			})
		})
}

export const candidateSearchAction = (params) => (dispatch: Dispatch) => {
	const candidateSearchActionURL = `${process.env.REACT_APP_API_BASE_URL}/worker/search/${params}`
	dispatch({
		type: EMPLOYER_SEARCH,
	})

	get(candidateSearchActionURL)
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_SEARCH_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_SEARCH_ERROR,
				payload: error,
			})
		})
}
