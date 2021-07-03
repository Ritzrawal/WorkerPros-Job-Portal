import React from 'react'
import {
	GET_SUBSCRIPTION,
	GET_SUBSCRIPTION_SUCCESS,
	GET_SUBSCRIPTION_ERROR,
	SUBSCRIBE_SUBSCRIPTION,
	SUBSCRIBE_SUBSCRIPTION_SUCCESS,
	SUBSCRIBE_SUBSCRIPTION_ERROR,
	SUBSCRIBE_SUBSCRIPTION_CLEAR,
} from '../action/actionTypes'

interface Props {
	name: string
}
const initialstate = {
	list: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
	subscribe: {
		loading: false,
		success: false,
		data: [],
		error: [],
	},
}
const subscriptionReducer = (state = initialstate, action: any) => {
	const { type, payload } = action

	switch (type) {
		case GET_SUBSCRIPTION:
			return {
				...state,
				list: {
					...state.list,
					loading: true,
				},
			}

		case GET_SUBSCRIPTION_SUCCESS:
			return {
				...state,
				list: {
					...state.list,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case GET_SUBSCRIPTION_ERROR:
			return {
				...state,
				list: {
					...state.list,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case SUBSCRIBE_SUBSCRIPTION:
			return {
				...state,
				subscribe: {
					...state.subscribe,
					loading: true,
				},
			}

		case SUBSCRIBE_SUBSCRIPTION_SUCCESS:
			return {
				...state,
				subscribe: {
					...state.subscribe,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case SUBSCRIBE_SUBSCRIPTION_ERROR:
			return {
				...state,
				subscribe: {
					...state.subscribe,
					loading: false,
					success: false,
					error: payload,
				},
			}

		case SUBSCRIBE_SUBSCRIPTION_CLEAR:
			return {
				...state,
				subscribe: {
					loading: false,
					success: false,
					data: [],
					error: [],
				},
			}

		default:
			return state
	}
}
export default subscriptionReducer
