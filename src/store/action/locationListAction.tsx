import { Dispatch } from 'redux'

import { get } from '../../utils/http'
import {
	LOCATION_LIST,
	LOCATION_LIST_SUCCESS,
	LOCATION_LIST_ERROR,
} from './actionTypes'

export const locationListAction = () => async (dispatch: Dispatch) => {
	const locationListActionURL = `${process.env.REACT_APP_API_BASE_URL}/states-and-cities`

	await dispatch({
		type: LOCATION_LIST,
	})

	get(locationListActionURL)
		.then((response: any) => {
			dispatch({
				type: LOCATION_LIST_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: LOCATION_LIST_ERROR,
				payload: error,
			})
		})
}
