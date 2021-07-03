const IsLoggedIn = () => {
	const value = localStorage.getItem('token') ? true : false
	return value
}

const SetLocalStorage = (token: string) => {
	console.log('get token value', token)
	localStorage.setItem('token', token)
}

const GetLocalStorage = () => {
	return localStorage.getItem('token')
}

const ClearLocalStorage = () => {
	localStorage.clear()
}

const asyncLocalStorage = {
	setItem: function (key, value) {
		return Promise.resolve().then(function () {
			localStorage.setItem(key, value)
		})
	},
	getItem: function (key) {
		return Promise.resolve().then(function () {
			return localStorage.getItem(key)
		})
	},
}

export {
	IsLoggedIn,
	SetLocalStorage,
	ClearLocalStorage,
	GetLocalStorage,
	asyncLocalStorage,
}
