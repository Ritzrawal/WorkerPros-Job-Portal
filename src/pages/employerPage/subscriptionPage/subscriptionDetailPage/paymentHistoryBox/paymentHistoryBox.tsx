import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import './paymentHistoryBox.css'

const PaymentHistoryBox: React.FC<any> = (props: any) => {
	const [showDetail, setShowDetail] = useState(props.show)

	return (
		<div className='EmployerPaymentHistoryBox'>
			<div className='EmployerPaymentHistoryBox__Info'>
				<div className='EmployerPaymentHistoryBox__Info--Plan'>
					Standard Plan
				</div>
				<div className='EmployerPaymentHistoryBox__Info--Price'>$102,45</div>
				<div className='EmployerPaymentHistoryBox__Info--Date'>
					18 october 2020
				</div>
				<div className='EmployerPaymentHistoryBox__Info--Status'>
					<span>Paid</span>
				</div>
				<div className='EmployerPaymentHistoryBox__Info--Icon'>
					<span onClick={() => setShowDetail(!showDetail)}>
						<FontAwesomeIcon icon={showDetail ? faAngleUp : faAngleDown} />
					</span>
				</div>
			</div>
			{showDetail ? (
				<div className='EmployerPaymentHistoryBox__Detail'>
					<div className='EmployerPaymentHistoryBox__Detail--Reference'>
						<div className='EmployerPaymentHistoryBox__Detail--Reference--Made'>
							<div className='EmployerPaymentHistoryBox__Detail--Reference--Made--Title'>
								Made On
							</div>
							<div className='EmployerPaymentHistoryBox__Detail--Reference--Made--Body'>
								17:56 12/23/2020
							</div>
						</div>
						<div className='EmployerPaymentHistoryBox__Detail--Reference--Status'>
							<div className='EmployerPaymentHistoryBox__Detail--Reference--Status--Title'>
								Status
							</div>
							<div className='EmployerPaymentHistoryBox__Detail--Reference--Status--Body'>
								Completed
							</div>
						</div>
						<div className='EmployerPaymentHistoryBox__Detail--Reference--Payment'>
							<div className='EmployerPaymentHistoryBox__Detail--Reference--Payment--Title'>
								Payment Id
							</div>
							<div className='EmployerPaymentHistoryBox__Detail--Reference--Payment--Body'>
								345
							</div>
						</div>
					</div>
					<div className='EmployerPaymentHistoryBox__Detail--Price'>
						<div className='EmployerPaymentHistoryBox__Detail--Price--Card'>
							<div className='EmployerPaymentHistoryBox__Detail--Price--Card--Title'>
								Card
							</div>
							<div className='EmployerPaymentHistoryBox__Detail--Price--Card--Body'>
								1415 **** **** 2344
							</div>
						</div>
						<div className='EmployerPaymentHistoryBox__Detail--Price--Fee'>
							<div className='EmployerPaymentHistoryBox__Detail--Price--Fee--Title'>
								Fee
							</div>
							<div className='EmployerPaymentHistoryBox__Detail--Price--Fee--Body'>
								$3.26
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default PaymentHistoryBox
