import React from 'react'

const isLoggedIn = () => {
	const isAuthenticated = localStorage.getItem('token')
	return isAuthenticated
}
const setValue = (key, value) => {
	const isAuthenticated = localStorage.setItem(key, value)
	return isAuthenticated
}
const getValue = (key) => {
	const isAuthenticated = localStorage.getItem(key)
	return isAuthenticated
}
export { isLoggedIn, setValue, getValue }
