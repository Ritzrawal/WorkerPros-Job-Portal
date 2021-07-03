import React from 'react'
import {
	LOGIN_DATA,
	LOGIN_ERROR,
	LOG_OUT,
	SIGN_UP,
	SINGNUP_ERROR,
	GOOGLE_LOGIN_ERROR,
	GOOGLE_LOGIN_SUCCESS,
	GOOGLE_SIGNUP_SUCCESS,
	GOOGLE_SIGNUP_ERROR,
	FORGET_PASSWORD,
	PASSWORD_ERROR,
	SWITCH_ACTIVE,
	NEW_PASSWORD,
	SWITCH_INACTIVE,
	NEWPASSWORD_ERROR,
} from '../action/actionTypes'

interface Props {
	name: string
}
const initialstate = {
	data: [],
	googledata: [],
	password: [],
	passrror: '',
	newmessage: '',
	sucessmessage: '',
	visible: false,
	error: '',
	googleerror: '',
	signerror: '',
	signup: [],
	token: '',
	signin: false,
	loggedin: false,
	isAuthenticated: localStorage.getItem('token') ? true : false,
}
const loginReducer = (state = initialstate, action: any) => {
	switch (action.type) {
		case LOGIN_DATA:
			return {
				...state,
				data: action.payload.data,
				loggedin: action.payload.status,
				token: action.payload.data.access_token,
				isAuthenticated: true,
			}
		case LOGIN_ERROR:
			return {
				...state,
				error: action.payload,
				isAuthenticated: false,
			}
		case SIGN_UP:
			return {
				...state,
				signup: action.payload.data,
				isAuthenticated: true,
				signin: action.payload.status,
			}
		case SINGNUP_ERROR:
			return {
				...state,
				isAuthenticated: false,
				signerror: action.payload,
			}
		case GOOGLE_SIGNUP_SUCCESS:
			return {
				...state,
				googledata: action.payload,
				// signin: action.payload.status,
			}
		case GOOGLE_LOGIN_ERROR:
			return {
				...state,
				googleerror: action.payload.data,
			}
		case GOOGLE_SIGNUP_ERROR:
			return {
				...state,
				googleerror: action.payload,
			}
		case FORGET_PASSWORD:
			return {
				...state,
				password: action.payload.data,
				passrror: action.payload.message,
			}
		case PASSWORD_ERROR:
			return {
				...state,
				passrror: action.payload.message,
			}
		case NEWPASSWORD_ERROR:
			return {
				...state,
				sucessmessage: action.payload,
			}
		case NEW_PASSWORD:
			return {
				...state,
				newmessage: action.payload.message,
			}
		case SWITCH_ACTIVE: {
			return {
				...state,
				visible: true,
			}
		}
		case SWITCH_INACTIVE: {
			return {
				...state,
				visible: false,
			}
		}
		case LOG_OUT: {
			return { ...state }
		}

		default:
			return state
	}
}
export default loginReducer
