import React from 'react'
import LocationLogo from '../../../assets/images/job-description/location.png'
import './cardStyle.css'

interface Props {
	image?: string
	CompanyName?: string
	CompanyLocation?: string
	jobTitle: string
}

const JobDescriptionBottomCardComponent: React.FC<Props> = (props: Props) => {
	return (
		<div className='JobBottomCard'>
			<div className='bottomCardImage'>
				<img src={props.image}></img>
			</div>

			<span className='bottomCardText'>
				{props.jobTitle.length < 15
					? props.jobTitle
					: `${props.jobTitle.slice(0, 15)}...`}
			</span>
			<div style={{ marginTop: '10px' }}>
				<span className='BottomCardCompanyName'>{props.CompanyName}</span>
				<br />
				<span className='CompanyLocation'>
					{' '}
					<img style={{ marginRight: '5px' }} src={LocationLogo}></img>
					{props.CompanyLocation}
				</span>
			</div>
		</div>
	)
}

export default JobDescriptionBottomCardComponent
