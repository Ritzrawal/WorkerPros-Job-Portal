import React from 'react'
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
} from '../action/actionTypes'

interface Props {
	name: string
}
const initialstate = {
	benifits: [],
	jobtype: [],
	profileinfo: [],
	company: [],
	devtype: [],
	uperror: [],
	cerificate: [],
	uptrade: [],
	upgeneral: [],
	upwork: [],
	upcert: [],
	upworkpref: [],
	singleprofileinfo: [],
}
const profileReducer = (state = initialstate, action: any) => {
	switch (action.type) {
		case BENEFITS_DATA:
			return {
				...state,
				benifits: action.payload.data,
			}
		case JOB_TYPE:
			return {
				...state,
				jobtype: action.payload.data,
			}
		case COMPANY_SIZE:
			return {
				...state,
				company: action.payload.data,
			}
		case DEV_TYPE:
			return {
				...state,
				devtype: action.payload.data,
			}
		case CERT_TYPE:
			return {
				...state,
				cerificate: action.payload.data,
			}
		case TRADE_UPDATE:
			return {
				...state,
				uptrade: action.payload.data,
			}
		case GENERAL_UPDATE:
			return {
				...state,
				upgeneral: action.payload.data,
			}
		case WORK_UPDATE:
			return {
				...state,
				uperror: action.payload.message,
				upwork: action.payload.data.message,
			}
		case CERT_UPDATE:
			return {
				...state,
				upcert: action.payload.data,
			}
		case WORKPREF_UPDATE:
			return {
				...state,
				upworkpref: action.payload.data,
			}
		case PROFILE_INFO:
			return {
				...state,
				profileinfo: action.payload.data,
			}
		case PROFILE_SINGLE_INFO:
			return {
				...state,
				singleprofileinfo: action.payload.data,
			}

		default:
			return state
	}
}
export default profileReducer
