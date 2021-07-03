import React, { useEffect } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { post } from '../utils/http'
interface PrivateRouteProps extends RouteProps {
	// tslint:disable-next-line:no-any
	component: any
}

const PrivateRouteAdmin = (props: PrivateRouteProps) => {
	const { component: Component, ...rest } = props

	const isAuthenticated = () => {
		let isAuthenticated = false

		const token = localStorage.getItem('token')
		const role = localStorage.getItem('role')

		if (token && role === 'super-admin') {
			isAuthenticated = true

			console.log('role check', role)
		}

		return isAuthenticated
	}
	useEffect(() => {
		const role = localStorage.getItem('role')
		console.log('role check1', role)
	}, [])
	return (
		<Route
			{...rest}
			render={(routeProps) =>
				isAuthenticated() ? (
					<Component {...routeProps} />
				) : (
					<Redirect
						to={{
							pathname: '/admin/login',
							state: { from: routeProps.location },
						}}
					/>
				)
			}
		/>
	)
}

export default PrivateRouteAdmin