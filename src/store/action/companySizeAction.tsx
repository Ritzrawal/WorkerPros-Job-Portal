import { Dispatch } from 'redux'

import { get } from '../../utils/http'

import {
	GET_COMPANY_SIZE,
	GET_COMPANY_SIZE_ERROR,
	GET_COMPANY_SIZE_SUCCESS,
} from '../action/actionTypes'

export const getCompanySize = (params: any) => (dispatch: Dispatch) => {
	const getCompanySizeURL = `${process.env.REACT_APP_API_BASE_URL}/default-pref-company-size?`

	dispatch({
		type: GET_COMPANY_SIZE,
	})

	get(getCompanySizeURL)
		.then((response: any) => {
			dispatch({
				type: GET_COMPANY_SIZE_SUCCESS,
				payload: response.data.data.default_company_size,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: GET_COMPANY_SIZE_ERROR,
				payload: error,
			})
		})
}
