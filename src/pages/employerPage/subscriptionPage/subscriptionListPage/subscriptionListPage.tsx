import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useStripe } from '@stripe/react-stripe-js'

import {
	getSubscriptionAction,
	subscribeSubscriptionAction,
	subscribeSubscriptionClearAction,
} from '../../../../store/action/subscription'

import Navbar from '../../../../component/employer/navbar/navbar'
import { HeaderPage } from '../../../headerPage'
import './subscriptionListPage.css'
import ToggleBox from '../../../../component/employer/input/toggleBox/toggleBox'
import SubscriptionCardNormal from '../../../../component/employer/subscriptionCards/subscriptionCardNormal'
import SubscriptionCardRecom from '../../../../component/employer/subscriptionCards/subscriptionCardRecom'
interface Props {
	getSubscriptionAction: () => void
	getSubscriptionState: any
	subscribeSubscriptionAction: (subscriptionId: string) => void
	subscribeSubscriptionState: any
	subscribeSubscriptionClearAction: () => void
	match: any
}

const SubscriptionListPage: React.FC<Props> = (props: Props) => {
	const {
		getSubscriptionAction,
		getSubscriptionState,
		subscribeSubscriptionAction,
		subscribeSubscriptionState,
		subscribeSubscriptionClearAction,
		match,
	} = props

	const stripe = useStripe()

	const [currentSubscription, setCurrentSubscription] = useState('')
	const [monthlyPlan, setMonthlyPlan] = useState(false)

	useEffect(() => {
		getSubscriptionAction()
	}, [])

	const changePlan = (subscriptionId) => {
		setCurrentSubscription(subscriptionId)
		subscribeSubscriptionAction(subscriptionId)
	}

	useEffect(() => {
		if (
			stripe &&
			!subscribeSubscriptionState.loading &&
			subscribeSubscriptionState.success &&
			subscribeSubscriptionState.data &&
			subscribeSubscriptionState.data.session
		) {
			setCurrentSubscription('')

			subscribeSubscriptionClearAction()

			stripe.redirectToCheckout({
				sessionId: subscribeSubscriptionState.data.session,
			})
		}
	}, [stripe, subscribeSubscriptionState])

	return (
		<div className='SubscriptionListPageMainContainer'>
			<div>
				{' '}
				{match.path === '/employer/subscription/list' ? (
					<Navbar />
				) : (
					<HeaderPage title='WorkerPros' />
				)}
			</div>
			<div className='SubscriptionListPageBanner'>
				<div className='SubscriptionListPageBannerContent'>
					<div className='SubscriptionListPageBannerTitle'>
						<h2>
							Expand your job search and find <br /> more skilled tradesmen
						</h2>
						<span>Your future workforce starts here</span>
					</div>
					<div className='SubscriptionListPageMonthlyYearly'>
						<span className='SubscriptionListPageMonthly'>Monthly</span>
						<ToggleBox
							label={'Activated'}
							checked={!monthlyPlan}
							name={'activated'}
							value={'activated'}
							placeholder={'Activated'}
							onChange={() => setMonthlyPlan(!monthlyPlan)}
						/>
						<span className='SubscriptionListPageYearly'>Yearly</span>
						<span className='SubscriptionListPageDiscount'>20% Discount</span>
					</div>
				</div>
			</div>
			<div className='SubscriptionListPageCardContainer'>
				{getSubscriptionState &&
				getSubscriptionState.data &&
				getSubscriptionState.data.length > 2 ? (
					<>
						<SubscriptionCardNormal
							id={getSubscriptionState.data[0]._id}
							plan={getSubscriptionState.data[0].plan}
							price={getSubscriptionState.data[0].price}
							features={getSubscriptionState.data[0].features}
							jobsQuota={getSubscriptionState.data[0].job_limit}
							isEmployer={match.path === '/employer/subscription/list'}
							onClick={changePlan}
							isLoading={
								getSubscriptionState.data[0]._id == currentSubscription
							}
						/>
						<SubscriptionCardRecom
							id={getSubscriptionState.data[1]._id}
							plan={getSubscriptionState.data[1].plan}
							price={getSubscriptionState.data[1].price}
							features={getSubscriptionState.data[1].features}
							jobsQuota={getSubscriptionState.data[1].job_limit}
							isEmployer={match.path === '/employer/subscription/list'}
							onClick={changePlan}
							isLoading={
								getSubscriptionState.data[1]._id == currentSubscription
							}
						/>
						<SubscriptionCardNormal
							id={getSubscriptionState.data[2]._id}
							plan={getSubscriptionState.data[2].plan}
							price={getSubscriptionState.data[2].price}
							features={getSubscriptionState.data[2].features}
							jobsQuota={getSubscriptionState.data[2].job_limit}
							isEmployer={match.path === '/employer/subscription/list'}
							onClick={changePlan}
							isLoading={
								getSubscriptionState.data[2]._id == currentSubscription
							}
						/>
					</>
				) : null}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	getSubscriptionState: state.subscriptionReducer.list,
	subscribeSubscriptionState: state.subscriptionReducer.subscribe,
})
const actions = {
	getSubscriptionAction,
	subscribeSubscriptionAction,
	subscribeSubscriptionClearAction,
}
export default connect(mapStateToProps, actions)(SubscriptionListPage)
