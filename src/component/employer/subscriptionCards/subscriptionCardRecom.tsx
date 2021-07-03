import React from 'react'
import './subscriptionCard.css'
import ReactFontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'
import { Spinner } from 'reactstrap'

interface Props {
	id: string
	value?: string
	plan: string
	price: number
	jobsQuota: number
	features: any
	isEmployer: boolean
	onClick: (planId: string) => void
	isLoading: boolean
}

const SubscriptionCardRecom: React.FC<Props> = (props: Props) => {
	const {
		id,
		jobsQuota,
		features,
		price,
		plan,
		isEmployer,
		onClick,
		isLoading,
	} = props
	return (
		<div className='subscriptionCardRecomMainContainer'>
			<div className='subscriptionCardRecommended'>Recommended For You</div>
			<div className='subscriptionCardTopSection recom'>
				<span className='subscriptionCardTopSectionPlanTitle'>
					{' '}
					{plan} Plan
				</span>
				<div className='subscriptionCardPriceDiv'>
					<span className='subscriptionCardPriceDollar'>$</span>
					<span className='subscriptionCardPrice'>{price}</span>
					<span className='subscriptionCardPricePerMonth'>/ month</span>
				</div>
				<span className='subscriptionCardJobToPost'>
					{jobsQuota} Jobs to post
				</span>
			</div>
			<div className='subscriptionCardBottomSection'>
				<ul>
					{features.map((f, index) => (
						<li key={index}>
							{' '}
							<ReactFontAwesome name='check-circle' />
							{f}
						</li>
					))}
				</ul>
				{isEmployer ? (
					<button
						onClick={() => onClick(id)}
						disabled={isLoading}
						className='subscriptionCardSelectPlanButton'
					>
						{' '}
						{isLoading ? <Spinner size={'sm'} /> : 'Select Plan'}
					</button>
				) : (
					<Link style={{ textDecoration: 'none' }} to='/login'>
						<button className='subscriptionCardSelectPlanButton'>
							{' '}
							Select Plan
						</button>
					</Link>
				)}
			</div>
		</div>
	)
}

export default SubscriptionCardRecom
