import { Dispatch } from 'redux'

import { get } from '../../utils/http'
import {
	CATEGORY_LIST,
	CATEGORY_LIST_SUCCESS,
	CATEGORY_LIST_ERROR,
} from './actionTypes'

export const categoryListAction = () => (dispatch: Dispatch) => {
	const categoryListActionURL = `${process.env.REACT_APP_API_BASE_URL}/categories`

	dispatch({
		type: CATEGORY_LIST,
	})

	get(categoryListActionURL)
		.then((response: any) => {
			dispatch({
				type: CATEGORY_LIST_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: CATEGORY_LIST_ERROR,
				payload: error,
			})
		})
}
