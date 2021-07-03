import {
	LOGIN_DATA,
	LOGIN_ERROR,
	LOG_OUT,
	SIGN_UP,
	SINGNUP_ERROR,
	GOOGLE_SIGNUP_SUCCESS,
	GOOGLE_SIGNUP_ERROR,
	FORGET_PASSWORD,
	PASSWORD_ERROR,
	NEW_PASSWORD,
	NEWPASSWORD_ERROR,
	SWITCH_ACTIVE,
	SWITCH_INACTIVE,
	GOOGLE_LOGIN_SUCCESS,
	GOOGLE_LOGIN_ERROR,
} from './actionTypes'
import { Dispatch } from 'redux'
import { SetLocalStorage } from '../../utils/storage'
// import { useDispatch } from 'react-redux'
import axios from 'axios'

const baseUrl = 'http://3.140.255.38/api/v1'
interface Props {
	openSnackbarHandler: (mesg: string) => void
}
interface SignupType {
	first_name: string
	last_name: string
	email: string
	password: string
	role: string
}
export const loginAction = (email: string, password: any) => (
	dispatch: Dispatch
) => {
	console.log('console action', email)
	axios
		.post(`${baseUrl}/sign-in`, {
			email: email,
			password: password,
		})
		.then((res) => {
			localStorage.setItem('role', res.data.data.user.role)
			SetLocalStorage(res.data.data.access_token)
			dispatch({
				type: LOGIN_DATA,
				payload: res.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: LOGIN_ERROR,
				payload: error.response.data.message,
			})
		)
}

export const googleLoginAction = (
	first_name: string,
	last_name: string,
	email: string,
	profile_id: string,
	profile_image: string
) => (dispatch: Dispatch) => {
	axios
		.post(`${baseUrl}/auth/google`, {
			first_name: first_name,
			last_name: last_name,
			email: email,
			profile_id: profile_id,
			profile_image: profile_image,
			role: 'worker',
		})
		.then((res) => {
			localStorage.setItem('token', res.data.data.access_token)
			localStorage.setItem('role', 'worker')
			dispatch({
				type: GOOGLE_SIGNUP_SUCCESS,
				payload: res.data.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: GOOGLE_SIGNUP_ERROR,
				payload: error.response.data.message,
			})
		)
}
export const googleSignInAction = (profile_id: string) => (
	dispatch: Dispatch
) => {
	console.log('google login form', profile_id)
	axios
		.post(`${baseUrl}/auth/google/signIn`, {
			profile_id: profile_id,

			// password: password,
		})
		.then((res) => {
			localStorage.setItem('token', res.data.data.access_token)
			localStorage.setItem('role', 'worker')
			// console.log('local token', res.data.data.access_token)
			dispatch({
				type: GOOGLE_LOGIN_SUCCESS,
				payload: res.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: GOOGLE_LOGIN_ERROR,
				payload: error.response.data.message,
			})
		)
}
export const signupAction = (
	first_name: string,
	last_name: string,
	company_name: string,
	email: string,
	password: string,
	role: string
) => (dispatch: Dispatch) => {
	console.log('console signup action data', first_name)
	axios
		.post(`${baseUrl}/sign-up`, {
			company_name: company_name,
			first_name: first_name,
			last_name: last_name,
			email: email,
			password: password,
			role: role,
			// password: password,
		})
		.then((res) => {
			localStorage.setItem('token', res.data.data.access_token)
			localStorage.setItem('role', res.data.data.user.role)
			console.log('role', res.data.data.user.role)
			dispatch({
				type: SIGN_UP,
				payload: res.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: SINGNUP_ERROR,
				payload: error.response.data.message,
			})
		)
}
export const forgetPasswordAction = (email: string) => (dispatch: Dispatch) => {
	axios
		.post(`${baseUrl}/forgot-password`, {
			email: email,
		})
		.then((res) => {
			console.log('forget password', res)
			dispatch({
				type: FORGET_PASSWORD,
				payload: res.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: PASSWORD_ERROR,
				payload: error.response.data,
			})
		)
}
export const changePasswordAction = (
	authorization: string,
	password: string
) => (dispatch: Dispatch) => {
	console.log('change password details ', authorization, password)
	axios
		.post(`${baseUrl}/change-password`, {
			authorization: authorization,
			password: password,
		})
		.then((res) => {
			console.log('password reset ', res)
			dispatch({
				type: NEW_PASSWORD,
				payload: res.data,
			})
		})

		.catch((error) =>
			dispatch({
				type: NEWPASSWORD_ERROR,
				payload: error.response.data.message,
			})
		)
}
export const switchActive = () => (dispatch: Dispatch) => {
	dispatch({ type: SWITCH_ACTIVE })
}
export const switchInactive = () => (dispatch: Dispatch) => {
	dispatch({ type: SWITCH_INACTIVE })
}

export const logOutAction = () => (dispatch: Dispatch) => {
	dispatch({ type: LOG_OUT })
}
