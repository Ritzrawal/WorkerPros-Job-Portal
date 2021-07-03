import React, { useEffect } from 'react'
import { SwitchButtonComponent } from '../../component'
import ButtonComponent from '../../component/common/buttons/buttonComponent'

import { Link } from 'react-router-dom'
import { HeaderPage, HeaderPage2 } from '../headerPage'
import { connect } from 'react-redux'
import HeroImg from '../../assets/images/how-it-works/bg.png'

import './howitworksPage.css'
import AppleIcon from '../../assets/images/apple.png'
import AndroidIcon from '../../assets/images/android.png'
import HowItWorksTradePerson from './forTradeperson/howItWorksTradePerson'
import HowItWorksEmployer from './forEmployer/howItWorksEmployer'

interface Props {
	name?: 'Hello'
	visible: boolean
}

const HowitWorksPage: React.FC<Props> = (props: Props) => {
	console.log(props.visible, 'PropsVisibility')
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	return (
		<div>
			<div>
				{localStorage.getItem('token') ? (
					<HeaderPage2 title='WorkerPros' />
				) : (
					<HeaderPage title='WorkerPros' />
				)}
			</div>
			<div className='HowItWorksMainContainerOuterContainer'>
				<div className='HowItWorksMainContainer'>
					<div className='HeaderContainer'>
						<div className='left_content'>
							<h1>HOW WorkerPros</h1>
							<h2>features work</h2>
							<p>
								Connecting tradespeople with colleagues
								<br /> and career opporutnities
							</p>

							<Link
								style={{ textDecoration: 'none', color: 'none' }}
								to='/signup'
							>
								<ButtonComponent
									buttonTitle='Get Started'
									width={180}
									height={50}
								/>
							</Link>

							<div className='app_icon-text'>
								<p>DOWNLOAD THE APP</p>
								<div className='app_icon'>
									<img src={AppleIcon}></img>
									<img src={AndroidIcon}></img>
								</div>
							</div>
						</div>
						<div className='right_content'>
							<img src={HeroImg}></img>
						</div>
					</div>
					<div className='SwitchButtonDiv'>
						<div className='SwitchButtonInnerDiv'>
							<SwitchButtonComponent
								onClick={() => {
									console.log('Yoooo')
								}}
								test='testing text'
								buttonTitle='Hello data'
							/>{' '}
						</div>{' '}
					</div>

					{props.visible ? <HowItWorksEmployer /> : <HowItWorksTradePerson />}
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	visible: state.loginReducer.visible,
})

export default connect(mapStateToProps)(HowitWorksPage)
