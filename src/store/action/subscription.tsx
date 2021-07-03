import { Dispatch } from 'redux'

import { get, post } from '../../utils/http'

import {
	GET_SUBSCRIPTION,
	GET_SUBSCRIPTION_SUCCESS,
	GET_SUBSCRIPTION_ERROR,
	SUBSCRIBE_SUBSCRIPTION,
	SUBSCRIBE_SUBSCRIPTION_SUCCESS,
	SUBSCRIBE_SUBSCRIPTION_ERROR,
	SUBSCRIBE_SUBSCRIPTION_CLEAR,
} from '../action/actionTypes'

export const getSubscriptionAction = () => (dispatch: Dispatch) => {
	const getSubscriptionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/subscription/getPlan`
	dispatch({
		type: GET_SUBSCRIPTION,
	})

	get(getSubscriptionURL)
		.then((response: any) => {
			dispatch({
				type: GET_SUBSCRIPTION_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: GET_SUBSCRIPTION_ERROR,
				payload: error,
			})
		})
}

export const subscribeSubscriptionAction = (subscriptionId) => (
	dispatch: Dispatch
) => {
	const getSubscriptionURL = `${process.env.REACT_APP_API_BASE_URL}/employer/subscription/getSubscribed/${subscriptionId}?plan_status=SUBSCRIBED`
	dispatch({
		type: SUBSCRIBE_SUBSCRIPTION,
	})

	post(getSubscriptionURL, {})
		.then((response: any) => {
			dispatch({
				type: SUBSCRIBE_SUBSCRIPTION_SUCCESS,
				payload: response.data.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: SUBSCRIBE_SUBSCRIPTION_ERROR,
				payload: error,
			})
		})
}

export const subscribeSubscriptionClearAction = () => (dispatch: Dispatch) => {
	dispatch({
		type: SUBSCRIBE_SUBSCRIPTION_CLEAR,
	})
}
