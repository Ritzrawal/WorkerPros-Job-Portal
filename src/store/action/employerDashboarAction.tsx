import { Dispatch } from 'redux'

import { get } from '../../utils/http'

import {
	EMPLOYER_DASHBOARD_MESSAGE_LIST,
	EMPLOYER_DASHBOARD_MESSAGE_LIST_SUCCESS,
	EMPLOYER_DASHBOARD_MESSAGE_LIST_ERROR,
	EMPLOYER_DASHBOARD_NOTIFICATION_LIST,
	EMPLOYER_DASHBOARD_NOTIFICATION_LIST_SUCCESS,
	EMPLOYER_DASHBOARD_NOTIFICATION_LIST_ERROR,
	EMPLOYER_DASHBOARD_DATA_COUNT,
	EMPLOYER_DASHBOARD_DATA_COUNT_SUCCESS,
	EMPLOYER_DASHBOARD_DATA_COUNT_ERROR,
} from './actionTypes'

export const dashboardMessageListAction = () => (dispatch: Dispatch) => {
	const dashboardMessageListActionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/dashboard/message`

	dispatch({
		type: EMPLOYER_DASHBOARD_MESSAGE_LIST,
	})

	get(dashboardMessageListActionURL)
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_DASHBOARD_MESSAGE_LIST_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_DASHBOARD_MESSAGE_LIST_ERROR,
				payload: error,
			})
		})
}

export const dashboardNotificationListAction = () => (dispatch: Dispatch) => {
	const dashboardNotificationListActionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/dashboard/notifications`

	dispatch({
		type: EMPLOYER_DASHBOARD_NOTIFICATION_LIST,
	})

	get(dashboardNotificationListActionURL)
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_DASHBOARD_NOTIFICATION_LIST_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_DASHBOARD_NOTIFICATION_LIST_ERROR,
				payload: error,
			})
		})
}

export const dashboardDataCountAction = () => (dispatch: Dispatch) => {
	const dashboardDataCountActionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/dashboard/data-counts`

	dispatch({
		type: EMPLOYER_DASHBOARD_DATA_COUNT,
	})

	get(dashboardDataCountActionURL)
		.then((response: any) => {
			dispatch({
				type: EMPLOYER_DASHBOARD_DATA_COUNT_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: EMPLOYER_DASHBOARD_DATA_COUNT_ERROR,
				payload: error,
			})
		})
}
