import React from 'react'
import {
	EMPLOYER_SEARCH,
	EMPLOYER_SEARCH_SUCCESS,
	EMPLOYER_SEARCH_ERROR,
} from '../action/actionTypes'

interface Props {
	name: string
}
const initialstate = {
	employer: {
		loading: true,
		success: false,
		data: [],
		error: [],
	},
}
const searchReducer = (state = initialstate, action: any) => {
	const { type, payload } = action

	switch (type) {
		case EMPLOYER_SEARCH:
			return {
				...state,
				employer: {
					...state.employer,
					loading: true,
				},
			}

		case EMPLOYER_SEARCH_SUCCESS:
			return {
				...state,
				employer: {
					...state.employer,
					loading: false,
					success: true,
					data: payload,
				},
			}

		case EMPLOYER_SEARCH_ERROR:
			return {
				...state,
				employer: {
					...state.employer,
					loading: false,
					success: false,
					error: payload,
				},
			}

		default:
			return state
	}
}
export default searchReducer
