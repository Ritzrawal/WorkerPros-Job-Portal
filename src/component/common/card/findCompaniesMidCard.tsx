import React from 'react'
import './cardStyle.css'
import CardImage from '../../../assets/images/find-companies-page/midCardImage.png'
import FontAwesome from 'react-fontawesome'
import ButtonComponent from '../buttons/buttonComponent'
import { Link } from 'react-router-dom'
interface Props {
	name?: string
	jobs?: boolean
}

const CompanyMidCardComponent: React.FC<Props> = (props: Props) => {
	return (
		<div className='midCardMainContainer'>
			<div className='midCardLeft'>
				<img src={CardImage}></img>
			</div>

			{props.jobs ? (
				<div
					style={{ display: 'flex', marginLeft: '0px' }}
					className='midCardRight'
				>
					<div>
						<h2>Find The Best Jobs Near You</h2>
						<p style={{ height: '71px', color: '#8897AE' }}>
							We’re looking for someone with outstanding interface design skills
							who can join our team and create a frictionless user experience.
						</p>
					</div>
					<div className='midCardButtonDiv'>
						<Link style={{ textDecoration: 'none' }} to='/signup'>
							<ButtonComponent
								height={50}
								width={220}
								buttonTitle='Get Started'
							/>
						</Link>
					</div>
				</div>
			) : (
				<div className='midCardRight'>
					<h2>Download The App</h2>
					<p style={{ height: '71px', color: '#8897AE' }}>
						We’re looking for someone with outstanding interface design skills
						who can join our team and create a frictionless user experience.
					</p>
					<div className='download-app-button-div'>
						<button>
							<FontAwesome
								style={{ fontSize: '25px', marginRight: '8px' }}
								name='apple'
							/>{' '}
							Download
						</button>
						<button>
							<FontAwesome
								style={{ fontSize: '25px', marginRight: '8px' }}
								name='android'
							/>{' '}
							Download
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default CompanyMidCardComponent
