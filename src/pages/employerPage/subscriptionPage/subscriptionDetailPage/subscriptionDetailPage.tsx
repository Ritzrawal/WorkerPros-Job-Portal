import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faEdit } from '@fortawesome/free-solid-svg-icons'

import Navbar from '../../../../component/employer/navbar/navbar'
import Sidebar from '../../../../component/employer/sidebar/sidebar'

import PaymentHistoryBox from './paymentHistoryBox/paymentHistoryBox'

import UpgradePlanIllustration from '../../../../assets/images/upgradePlanIllustration.png'

import './subscriptionDetailPage.css'

const SubscriptionDetailPage: React.FC<any> = (props: any) => {
	return (
		<>
			<Navbar />
			<div className='EmployerSubscriptionDetail'>
				<Sidebar />
				<div className='EmployerSubscriptionDetail__Body'>
					<div className='EmployerSubscriptionDetail__Body--Left'>
						<div className='EmployerSubscriptionDetail__Body--Left--Title'>
							Subscription
						</div>
						<div className='EmployerSubscriptionDetail__Body--Left--Card'>
							<div className='EmployerSubscriptionDetail__Body--Left--Card--Plan'>
								<div className='EmployerSubscriptionDetail__Body--Left--Card--Plan--Title'>
									Standard Plan
								</div>
								<div className='EmployerSubscriptionDetail__Body--Left--Card--Plan--Price'>
									$<span>199</span>/month
								</div>
								<div className='EmployerSubscriptionDetail__Body--Left--Card--Plan--Button'>
									<Link to={'/employer/subscription/list'}>
										<button>Change Plan</button>
									</Link>
								</div>
							</div>
							<div className='EmployerSubscriptionDetail__Body--Left--Card--Payment'>
								<div className='EmployerSubscriptionDetail__Body--Left--Card--Payment--Title'>
									Next Payment
								</div>
								<div className='EmployerSubscriptionDetail__Body--Left--Card--Payment--Date'>
									<div className='EmployerSubscriptionDetail__Body--Left--Card--Payment--Date--Icon'>
										<FontAwesomeIcon
											icon={faCalendar}
											color={'#2EC2E2'}
											fontSize={'14px'}
										/>
									</div>
									<div className='EmployerSubscriptionDetail__Body--Left--Card--Payment--Date--Text'>
										<div className='EmployerSubscriptionDetail__Body--Left--Card--Payment--Date--Text--Count'>
											In 6 Days
										</div>
										<div className='EmployerSubscriptionDetail__Body--Left--Card--Payment--Date--Text--Full'></div>
										Feburary 18, 2020
									</div>
								</div>
								<div className='EmployerSubscriptionDetail__Body--Left--Card--Payment--Button'>
									<button>Manage</button>
								</div>
							</div>
						</div>
						<div className='EmployerSubscriptionDetail__Body--Left--PaymentHistory'>
							<div className='EmployerSubscriptionDetail__Body--Left--PaymentHistory--Title'>
								Payment History
							</div>
							<div className='EmployerSubscriptionDetail__Body--Left--PaymentHistory--List'>
								<div className='EmployerSubscriptionDetail__Body--Left--PaymentHistory--List--PaymentHistoryBox'>
									<PaymentHistoryBox show={true} />
								</div>
								<div className='EmployerSubscriptionDetail__Body--Left--PaymentHistory--List--PaymentHistoryBox'>
									<PaymentHistoryBox />
								</div>
								<div className='EmployerSubscriptionDetail__Body--Left--PaymentHistory--List--PaymentHistoryBox'>
									<PaymentHistoryBox />
								</div>
							</div>
						</div>
					</div>
					<div className='EmployerSubscriptionDetail__Body--Right'>
						<div className='EmployerSubscriptionDetail__Body--Right--PaymentInformation'>
							<div className='EmployerSubscriptionDetail__Body--Right--PaymentInformation--Header'>
								<div className='EmployerSubscriptionDetail__Body--Right--PaymentInformation--Header--Title'>
									Payment Information
								</div>
								<div className='EmployerSubscriptionDetail__Body--Right--PaymentInformation--Header--Icon'>
									<FontAwesomeIcon
										icon={faEdit}
										color={'#2EC2E2'}
										fontSize={'14px'}
									/>
								</div>
							</div>
							<div className='EmployerSubscriptionDetail__Body--Right--PaymentInformation--Body'>
								<div className='EmployerSubscriptionDetail__Body--Right--PaymentInformation--Body--Image'>
									card image
								</div>
								<div className='EmployerSubscriptionDetail__Body--Right--PaymentInformation--Body--Text'>
									<div className='EmployerSubscriptionDetail__Body--Right--PaymentInformation--Body--Text--Number'>
										Master Card: <span>1823</span>
									</div>
									<div className='EmployerSubscriptionDetail__Body--Right--PaymentInformation--Body--Text--Date'>
										Exp Date: <span>17/02</span>
									</div>
								</div>
							</div>
							<div className='EmployerSubscriptionDetail__Body--Right--PaymentInformation--Footer'>
								<div className='EmployerSubscriptionDetail__Body--Right--PaymentInformation--Footer--Name'>
									Boston Constuction
								</div>
								<div className='EmployerSubscriptionDetail__Body--Right--PaymentInformation--Footer--Address'>
									46 Mill Pond Dr.
									<br />
									Charlotte NC, 465423
								</div>
							</div>
						</div>
						<div className='EmployerSubscriptionDetail__Body--Right--UpgradePlan'>
							<div className='EmployerSubscriptionDetail__Body--Right--UpgradePlan--Image'>
								<img src={UpgradePlanIllustration} />
							</div>
							<div className='EmployerSubscriptionDetail__Body--Right--UpgradePlan--Title'>
								Upgrade to the next plan
							</div>
							<div className='EmployerSubscriptionDetail__Body--Right--UpgradePlan--Description'>
								And post up to 5 jobs
							</div>
							<div className='EmployerSubscriptionDetail__Body--Right--UpgradePlan--Button'>
								<button>Upgrade</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SubscriptionDetailPage
