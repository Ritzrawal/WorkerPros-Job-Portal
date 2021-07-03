import React, { useState } from 'react'
import { Modal, Spinner } from 'reactstrap'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

import './paymentModal.css'

interface Props {
	paymentDetail: any
	closePaymentModal: () => void
}

const PaymentModal: React.FC<Props> = (props: Props) => {
	const { paymentDetail, closePaymentModal } = props

	const stripe = useStripe()
	const elements = useElements()

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const testPayment = () => {
		//return is stripe or elements is not initialized
		if (!stripe || !elements) return

		setLoading(true)

		// Get a reference to a mounted CardElement. Elements knows how
		// to find your CardElement because there can only ever be one of
		// each type of element.
		const cardElement: any = elements.getElement(CardElement)

		// Use your card Element with other Stripe.js APIs
		stripe
			.createPaymentMethod({
				type: 'card',
				card: cardElement,
			})
			.then((response) => {
				console.log({ response })
				if (response.error) {
					const errorMessage: any = response.error.message
					setError(errorMessage)
				}
			})
			.catch((error) => {
				console.log({ error })
			})
			.finally(() => setLoading(false))
	}

	return (
		<Modal isOpen={true} toggle={closePaymentModal} size={'md'} centered={true}>
			<div className='EmployerPaymentModal'>
				<div className='EmployerPaymentModal__Header'>
					<div className='EmployerPaymentModal__Header--Title'>Payment For</div>
					<div className='EmployerPaymentModal__Header--Description'>
						Test Description
					</div>
				</div>
				{!paymentDetail || !stripe || !elements ? (
					<div className='EmployerPaymentModal__Loading'>
						<Spinner size={'sm'} />
					</div>
				) : (
					<div className='EmployerPaymentModal__Body'>
						<div className='EmployerPaymentModal__Body--Card'>
							<CardElement onChange={() => setError('')} />
						</div>
						{error !== '' ? (
							<div className='EmployerPaymentModal__Body--Error'>{error}</div>
						) : null}
						<div className='EmployerPaymentModal__Body--Button'>
							<button onClick={testPayment} disabled={loading}>
								{loading ? <Spinner size={'sm'} /> : 'Make Payment'}
							</button>
						</div>
					</div>
				)}
			</div>
		</Modal>
	)
}

export default PaymentModal
