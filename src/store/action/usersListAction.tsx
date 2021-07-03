import { Dispatch } from 'redux'

import { get } from '../../utils/http'

import {
	GET_USER_SUGGESTION,
	GET_USER_SUGGESTION_SUCCESS,
	GET_USER_SUGGESTION_ERROR,
} from '../action/actionTypes'

export const getUserSuggestion = () => (dispatch: Dispatch) => {
	const getUserSuggestionURL = `${process.env.REACT_APP_API_BASE_URL}/worker/get-user-suggestions`

	dispatch({
		type: GET_USER_SUGGESTION,
	})

	get(getUserSuggestionURL)
		.then((response: any) => {
			dispatch({
				type: GET_USER_SUGGESTION_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: GET_USER_SUGGESTION_ERROR,
				payload: error,
			})
		})
}
