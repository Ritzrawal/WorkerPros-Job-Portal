import {
	JOBS_LIST,
	JOBS_CATEGORY_LIST,
	COUNTRY_LIST,
	JOBS_CATEGORY_SKILLS,
} from './actionTypes'
import axios from 'axios'

import { Dispatch } from 'redux'

const baseUrl = 'http://3.140.255.38/api/v1'

import FindJobsDummyData from '../dummyData/findJobs.json'

const jobsListAction = (value: string) => (dispatch: Dispatch) => {
	axios
		.get(`${process.env.REACT_APP_API_BASE_URL}/jobs`)
		.then((res) => {
			dispatch({
				type: JOBS_LIST,
				payload: res.data.jobs,
			})
		})
		.catch((error) => {
			console.log(error, 'Heres the error')
		})
}

const jobsCategoryListAction = () => (dispatch: Dispatch) => {
	axios
		.get(`${process.env.REACT_APP_API_BASE_URL}/categories`, {
			headers: {
				'CLIENT-AUTH': process.env.REACT_APP_CLIENT_ID,
			},
		})
		.then((res) => {
			dispatch({
				type: JOBS_CATEGORY_LIST,
				payload: res.data.data,
			})
			console.log(res.data)
		})
		.catch((err) => {
			console.log(err)
		})
}
const jobsCategorySkillsAction = (category_id) => (dispatch: Dispatch) => {
	axios
		.get(
			`${process.env.REACT_APP_API_BASE_URL}/category/${category_id}/skills`,
			{
				headers: {
					'CLIENT-AUTH': process.env.REACT_APP_CLIENT_ID,
				},
			}
		)
		.then((res) => {
			dispatch({
				type: JOBS_CATEGORY_SKILLS,
				payload: res.data.data,
			})
			console.log(res.data)
		})
		.catch((err) => {
			console.log(err)
		})
}
const countryStateAction = () => (dispatch: Dispatch) => {
	axios
		.get(`${process.env.REACT_APP_API_BASE_URL}/states-and-cities`, {
			headers: {
				'CLIENT-AUTH': process.env.REACT_APP_CLIENT_ID,
			},
		})
		.then((res) => {
			dispatch({
				type: COUNTRY_LIST,
				payload: res.data.data,
			})
			console.log('hello action console', res.data.data)
		})
		.catch((err) => {
			console.log(err)
		})
}

export {
	jobsListAction,
	jobsCategoryListAction,
	countryStateAction,
	jobsCategorySkillsAction,
}
