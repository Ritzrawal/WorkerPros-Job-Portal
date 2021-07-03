import React, { useEffect } from 'react'
import Navigation from './navigation'
import FindJobs from './findJobs'
import { useHistory } from 'react-router-dom'
import TopCompanies from './topCompanies'
import bgImage from '../../../assets/images/landing-page/bg.png'
import { Link } from 'react-router-dom'
import {
	ButtonComponent,
	ButtonWhite,
} from '../../../component/common/buttons/buttonComponent'

import './landingPage.css'
import '../../../styles/responsive2.css'

interface Props {
	num: number
}

const LandingPage: React.FC<Props> = () => {
	const history = useHistory()
	useEffect(() => {
		if (
			localStorage.getItem('token') &&
			localStorage.getItem('role') === 'worker'
		) {
			history.push('/worker-dashboard')
		}

		if (
			localStorage.getItem('token') &&
			localStorage.getItem('role') === 'employer'
		) {
			history.push('/employer/dashboard')
		}
	}, [])
	return (
		<div>
			<div className='landHeader'>
				<div className='overlay-div'></div>
				<div
					className='landHeader-innerdiv'
					style={{ backgroundImage: `url(${bgImage})` }}
				>
					<div className='headLeft'>
						<div className='headLeft-content'>
							<span className='easywus'>It&apos;s Easy With Us</span>
							<h1>Build Your Future With WorkerPros</h1>
							<p className='JoinInfo'>
								Join the largest community of skilled
								<br />
								construction workers that are expanding <br />
								their network and finding new career
								<br />
								oppurtunities.{' '}
							</p>

							{localStorage.getItem('token') ? (
								''
							) : (
								<div className='buttonDiv'>
									<Link style={{ textDecoration: 'none' }} to='/signup'>
										<ButtonComponent
											buttonTitle='Get Started'
											width={180}
											height={50}
										/>
									</Link>

									<Link style={{ textDecoration: 'none' }} to='/login'>
										<ButtonWhite buttonTitle='Log In' width={180} height={50} />
									</Link>

									{/* <button className='getStarted'>Get Started</button>
								<button className='login'>Log In</button> */}
								</div>
							)}
						</div>
					</div>
					{/* <div className='headRight'>
						<img src={bgImage}></img>
					</div> */}
				</div>
			</div>

			<div>
				<Navigation num={3} />
			</div>
			<div>
				<FindJobs num={3} />
			</div>
			<div>
				<TopCompanies showDownload={true} />
			</div>
		</div>
	)
}

export default LandingPage
