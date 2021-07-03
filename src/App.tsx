import React from 'react'
import RouterComponent from './router/router'
import { title } from 'process'
import './utils/normalize.css'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

import { Elements, CardElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const App = () => {
	// const stripeKey: any = process.env.STRIPE_PUBLISHABLE_KEY
	const stripePromise = loadStripe(
		'pk_test_51J2QbMDIG2VeLqkfsWvOIElAdCmPzBMEmr367WI1wE9WWrAzbwhAxz0cCFHQ6XVDQ9mGrvsLMt8Hj9uTCOoYWeCI00Rt3VRNKf'
	)

	return (
		<div className='App'>
			<Elements stripe={stripePromise}>
				<RouterComponent title={title} />
			</Elements>
		</div>
	)
}

export default App
