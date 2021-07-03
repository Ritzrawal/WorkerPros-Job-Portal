import envVar from './config'

export const API_URL = `${envVar.baseUrl}${envVar.basePath}`
export const endpoint = envVar.baseUrl
export const socketEndPoint = envVar.socketUrl
export const endpointpath = envVar.sockPath
export const APPID = envVar.facebookId
export const fileSize = 26214400

export const config = {
	header: {
		'Content-Type': 'application/x-www-form-urlencoded',
	},
}
