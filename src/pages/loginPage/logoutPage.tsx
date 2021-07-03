import React from 'react'
import { Redirect } from 'react-router-dom'
import { logOutAction } from '../../store/action/loginAction'

const LogOutPage = () => {
	localStorage.removeItem('token')
	logOutAction()

	return <Redirect to='/login' />
}

export default LogOutPage
