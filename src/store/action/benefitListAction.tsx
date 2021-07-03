import { Dispatch } from 'redux'

import { get } from '../../utils/http'

import {
	BENEFIT_LIST,
	BENEFIT_LIST_SUCCESS,
	BENEFIT_LIST_ERROR,
} from './actionTypes'

export const benefitListAction = () => (dispatch: Dispatch) => {
	const benefitListActionURL = `${process.env.REACT_APP_API_BASE_URL}/default-pref-benefits`

	dispatch({
		type: BENEFIT_LIST,
	})

	get(benefitListActionURL)
		.then((response: any) => {
			dispatch({
				type: BENEFIT_LIST_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: BENEFIT_LIST_ERROR,
				payload: error,
			})
		})
}
