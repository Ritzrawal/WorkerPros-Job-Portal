import React from 'react'
import FontAwesome from 'react-fontawesome'
import './cardStyle.css'

interface Props {
	mainImg?: string
	companyLogo?: string
	location?: string
	type?: string
	name?: string
	totalJobs?: number
}

const TopCompaniesCard: React.FC<Props> = (props: Props) => {
	return (
		<div className='company-info'>
			<div className='company-image'>
				<img src={props.mainImg} />

				<div className='company-dp'>
					<img
						src={
							props.companyLogo
								? `${process.env.REACT_APP_IMAGE_URL}${props.companyLogo} `
								: 'https://picsum.photos/200/300'
						}
					/>
				</div>
			</div>
			<div className='company-texts'>
				<h3>{props.name}</h3>
				<p className='company-type'>{props.type}</p>
				<p className='company-location'>
					{' '}
					<FontAwesome
						style={{ fontSize: '12px', marginRight: '5px' }}
						name='map-marker'
					/>
					{props.location}
				</p>
				<button>See {props.totalJobs} Open Jobs</button>
			</div>
		</div>
	)
}

export default TopCompaniesCard
