import React, { ReactElement } from 'react'
import { HeaderPage, HeaderPage2 } from '../headerPage'
// import LoginPage  from '../'
import LandingPage from './landingPage/landingPage'
interface Props {
	title: string
	buttonTitle: string
}

const HomePage: React.FC<Props> = (props: Props) => {
	return (
		<div>
			<div>
				{localStorage.getItem('token') ? (
					<HeaderPage2 title='WorkerPros' />
				) : (
					<HeaderPage title='WorkerPros' />
				)}
			</div>
			<LandingPage num={3} />
			<div className='NavigationHeader'></div>
			{/* <div className='BodyContainer'>
				<div className='LeftHalfContainer'>
					<SignupPage title='Signup Page' buttonTitle='Hello data' />
				</div>
				<div className='RightHalfContainer'>
					<div className='RightHalfButton'>
						<SwitchButtonComponent buttonTitle='Hello data' />
					</div>
				</div>
			</div> */}
		</div>
	)
}
export default HomePage
