import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { post } from '../utils/http'
interface PrivateRouteProps extends RouteProps {
	// tslint:disable-next-line:no-any
	component: any
}

const PrivateRoute = (props: PrivateRouteProps) => {
	const { component: Component, ...rest } = props

	const isAuthenticated = () => {
		let isAuthenticated = false

		const token = localStorage.getItem('token')

		if (token) {
			isAuthenticated = true
		}

		return isAuthenticated
	}
	const role = localStorage.getItem('role')
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

export default connect(mapStateToProps, {})(PrivateRoute)
