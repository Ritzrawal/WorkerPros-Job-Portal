import { Dispatch } from 'redux'
// import { useDispatch } from 'react-redux'
import { get } from '../../utils/http'
import axios from 'axios'
import {
	BENEFITS_DATA,
	JOB_TYPE,
	COMPANY_SIZE,
	DEV_TYPE,
	CERT_TYPE,
	TRADE_UPDATE,
	GENERAL_UPDATE,
	WORK_UPDATE,
	CERT_UPDATE,
	WORKPREF_UPDATE,
	PROFILE_INFO,
	PROFILE_SINGLE_INFO,
	WORKER_PROFILE_DETAIL,
	PROFILE_INFO_ERROR,
} from './actionTypes'
const baseUrl = 'http://3.140.255.38/api/v1'
export const profileBenifitsAction = () => (dispatch: Dispatch) => {
	axios
		.get(`${baseUrl}/default-pref-benefits`, {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'CLIENT-AUTH': process.env.REACT_APP_CLIENT_ID,
			},
		})
		.then((res) => {
			dispatch({
				type: BENEFITS_DATA,
				payload: res.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: BENEFITS_DATA,
				payload: error,
			})
		)
}
export const profileJobTypeAction = () => (dispatch: Dispatch) => {
	axios
		.get(`${baseUrl}/default-pref-job-type`, {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'CLIENT-AUTH': process.env.REACT_APP_CLIENT_ID,
			},
		})
		.then((res) => {
			dispatch({
				type: JOB_TYPE,
				payload: res.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: JOB_TYPE,
				payload: error,
			})
		)
}
export const profileCompanySizeAction = () => (dispatch: Dispatch) => {
	axios
		.get(`${baseUrl}/default-pref-company-size`, {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'CLIENT-AUTH': process.env.REACT_APP_CLIENT_ID,
			},
		})

		.then((res) => {
			dispatch({
				type: COMPANY_SIZE,
				payload: res.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: COMPANY_SIZE,
				payload: error,
			})
		)
}
export const profileDevTypesAction = () => (dispatch: Dispatch) => {
	axios
		.get(`${baseUrl}/default-pref-dev-type`, {
			headers: {
				'CLIENT-AUTH': process.env.REACT_APP_CLIENT_ID,
			},
		})
		.then((res) => {
			dispatch({
				type: DEV_TYPE,
				payload: res.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: DEV_TYPE,
				payload: error,
			})
		)
}
export const profileCertificateAction = () => (dispatch: Dispatch) => {
	axios
		.get(`${baseUrl}/default-certs`, {
			headers: {
				'CLIENT-AUTH': process.env.REACT_APP_CLIENT_ID,
			},
		})
		.then((res) => {
			dispatch({
				type: CERT_TYPE,
				payload: res.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: CERT_TYPE,
				payload: error,
			})
		)
}
export const profileAllInfoAction = () => (dispatch: Dispatch) => {
	const workerProfileDetailActionURL = `${process.env.REACT_APP_API_BASE_URL}/worker/profile-info`

	dispatch({
		type: WORKER_PROFILE_DETAIL,
	})

	get(workerProfileDetailActionURL)
		.then((response: any) => {
			dispatch({
				type: PROFILE_INFO,
				payload: response.data,
			})
		})
		.catch((error: any) => {
			dispatch({
				type: PROFILE_INFO_ERROR,
				payload: error,
			})
		})
}

export const singleProfileAction = (profileId: string) => async (
	dispatch: Dispatch
) => {
	await axios
		.get(`${baseUrl}/view-profile/${profileId}`, {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		.then((res) => {
			dispatch({
				type: PROFILE_SINGLE_INFO,
				payload: res.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: PROFILE_INFO,
				payload: error,
			})
		)
}
// Action for the Update profile using the PUT Request

export const profileTradeUpdateAction = (tradedata: any) => (
	dispatch: Dispatch
) => {
	axios
		.put(
			`${baseUrl}/worker/update-profile-trade`,
			{
				categories: tradedata,
			},
			{
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}
		)
		.then((res) => {
			dispatch({
				type: TRADE_UPDATE,
				payload: res.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: TRADE_UPDATE,
				payload: error,
			})
		)
}
export const profileGeneralUpdateAction = (
	image: any,
	form: any,
	generaldata: any,
	checked: boolean
) => (dispatch: Dispatch) => {
	const formData = new FormData()
	const travel_will = {
		distance: generaldata[0],
		high_demand_city: checked,
	}
	formData.append('address', JSON.stringify(form))
	formData.append('travel_will', JSON.stringify(travel_will))
	formData.append('profile_image', image)

	axios
		.put(`${baseUrl}/worker/update-profile-general`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		.then((res) => {
			dispatch({
				type: GENERAL_UPDATE,
				payload: res.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: GENERAL_UPDATE,
				payload: error,
			})
		)
}
export const profileWorkExpUpdateAction = (data: any) => async (
	dispatch: Dispatch
) => {
	await axios

		.put(
			`${baseUrl}/worker/update-profile-work`,
			{
				work_experience: data,
			},
			{
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}
		)
		.then((res) => {
			dispatch({
				type: WORK_UPDATE,
				payload: res.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: WORK_UPDATE,
				payload: error.response,
			})
		)
}
export const profileCertUpdateAction = (data: any) => (dispatch: Dispatch) => {
	// const newdata = data.toString()
	axios
		.put(
			`${baseUrl}/worker/update-profile-cert`,
			{
				certificates: data,
			},
			{
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}
		)
		.then((res) => {
			dispatch({
				type: CERT_UPDATE,
				payload: res.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: CERT_UPDATE,
				payload: error,
			})
		)
}
export const profileWorkPrefenceUpdateAction = (
	benefits: any,
	job_type: any,
	company_size: any,
	development_type: any
) => (dispatch: Dispatch) => {
	axios
		.put(
			`${baseUrl}/worker/update-profile-work-pref`,
			{
				work_preferences: {
					benefits: benefits,
					job_type: job_type,
					company_size: company_size,
					development_type: development_type,
				},
			},
			{
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}
		)
		.then((res) => {
			dispatch({
				type: WORKPREF_UPDATE,
				payload: res,
			})
		})

		.catch((error) =>
			dispatch({
				type: WORKPREF_UPDATE,
				payload: error.status,
			})
		)
}
