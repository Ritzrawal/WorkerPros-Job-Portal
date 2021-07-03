import React from 'react'

import {
	JOBS_LIST,
	JOBS_CATEGORY_LIST,
	JOBS_CATEGORY_SKILLS,
	COUNTRY_LIST,
} from '../action/actionTypes'

import FindJobsDummyData from '../dummyData/findJobs.json'

const initialstate = {
	data: [],
	statelist: [],
	skills: [],
}

const jobsListReducer = (state = initialstate, action: any) => {
	switch (action.type) {
		case JOBS_LIST:
			return {
				...state,
				data: action.payload,
			}
		case JOBS_CATEGORY_LIST:
			return {
				...state,
				data: action.payload,
			}
		case JOBS_CATEGORY_SKILLS:
			return {
				...state,
				skills: action.payload,
			}
		case COUNTRY_LIST:
			return {
				...state,
				statelist: action.payload.country_states_cities,
			}
		default:
			return state
	}
}

export default jobsListReducer
