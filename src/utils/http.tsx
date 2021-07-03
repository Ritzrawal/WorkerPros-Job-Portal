import axios from 'axios'

const getHeaders = () => ({
	headers: {
		'Request-Date': new Date(),
		'CLIENT-AUTH': process.env.REACT_APP_CLIENT_ID,
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
})

// axios.interceptors.response.use(
// 	(response: any) => {
// 		return response
// 	},
// 	(error: any) => {
// 		if (
// 			error &&
// 			error.response &&
// 			error.response.data &&
// 			error.response.data === 'Unauthorized'
// 		) {
// 			location.replace('/logout')
// 		} else {
// 			return error
// 		}
// 	}
// )

export const get = async (url: string): Promise<any> => {
	return axios.get(url, getHeaders())
}

export const post = (url: string, params: any): Promise<any> => {
	return axios.post(url, params, getHeaders())
}

export const put = (url: string, params: any): Promise<any> => {
	return axios.put(url, params, getHeaders())
}

export const deleteThis = (url: string): Promise<any> => {
	return axios.delete(url, getHeaders())
}
