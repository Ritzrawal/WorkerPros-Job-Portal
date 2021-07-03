import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { post } from '../utils/http'
interface PrivateRouteProps extends RouteProps {
	// tslint:disable-next-line:no-any
	component: any
}

const PrivateRouteWorker = (props: PrivateRouteProps) => {
	const { component: Component, ...rest } = props

	const isAuthenticated = () => {
		let isAuthenticated = false

		const token = localStorage.getItem('token')
		const role = localStorage.getItem('role')

		if (token && role === 'worker') {
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
							pathname: '/login',
							state: { from: routeProps.location },
						}}
					/>
				)
			}
		/>
	)
}
const mapStateToProps = (state: any) => ({
	prop: state.prop,
	isAuthenticated: state.loginReducer.isAuthenticated,
})

export default connect(mapStateToProps, {})(PrivateRouteWorker)
