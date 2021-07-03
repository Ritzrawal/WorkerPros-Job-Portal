import { Dispatch } from 'redux'

import { get } from '../../utils/http'

import {
	CERTIFICATE_LIST,
	CERTIFICATE_LIST_SUCCESS,
	CERTIFICATE_LIST_ERROR,
} from './actionTypes'

export const certificateListAction = () => (dispatch: Dispatch) => {
	const certificateListActionURL = `${process.env.REACT_APP_API_BASE_URL}/default-certs`

	dispatch({
		type: CERTIFICATE_LIST,
	})

	get(certificateListActionURL)
		.then((response: any) => {
			dispatch({
				type: CERTIFICATE_LIST_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: CERTIFICATE_LIST_ERROR,
				payload: error,
			})
		})
}
