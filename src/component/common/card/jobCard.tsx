import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment from 'moment'
import renderHTML from 'react-render-html'
import './cardStyle.css'
import {
	faCoffee,
	faAngleRight,
	faMapMarkerAlt,
	faDollarSign,
} from '@fortawesome/free-solid-svg-icons'

interface Props {
	image?: string
	descripton: string
	heading: string
	hourPayMin: number
	hourPayMax: number
	featured: boolean
	companyName: string
	jobLocation: string
	categories: []
	rightPartWidth?: boolean
	showCategory?: boolean
}

const JobCardComponent: React.FC<Props> = (props: Props) => {
	let [jobCatCount, setJobCatCount] = useState(3)

	const moreHandler = (event: React.MouseEvent<Element, MouseEvent>) => {
		const target: any = event.target as EventTarget
		target.style.display = 'none'
		setJobCatCount((jobCatCount += 3))
	}
	const renderJobcategories = () => {
		let jobsCategories = props.categories.map((val: any, index) => {
			if (index < jobCatCount) return <li key={index}>{val.title}</li>
		})
		if (props.categories.length > 0) return jobsCategories
	}

	let jobKoDescription = renderHTML(props.descripton)

	return (
		<li className='jobCardLi'>
			<div className='jobs-list-ul-image'>
				<img
					src={
						props.image
							? `${process.env.REACT_APP_IMAGE_URL}${props.image}`
							: 'https://picsum.photos/200/300'
					}
				/>
			</div>
			<div
				style={{ width: props.rightPartWidth ? '' : '' }}
				className='jobs-list-ul-right'
			>
				<div className='JobCardTitle'>
					<h3>{props.heading}</h3>
					{props.featured && <span className='CardFeatured'>Featured</span>}
				</div>

				<div className='jobs-list-right-locationInfo'>
					<div className='jobs-card-subdetails'>
						<p>{props.companyName}</p>
					</div>
					<div className='jobs-card-subdetails'>
						<FontAwesomeIcon
							style={{ color: '#2ec2e2', marginRight: '5px' }}
							icon={faMapMarkerAlt}
						/>{' '}
						{props.jobLocation}{' '}
					</div>
					<div className='jobs-card-subdetails'>
						<p style={{ marginLeft: '10px' }}>
							{' '}
							<span style={{ color: '#2ec2e2' }}>$</span> {props.hourPayMin}-
							{props.hourPayMax}/hr
						</p>
					</div>
				</div>
				<div className='job-text'>{jobKoDescription}</div>
				{props.categories && props.showCategory ? (
					<div className='Mid-MidSection'>
						<ul className='JobCategoryULJobCard'>
							{renderJobcategories()}
							{props.categories.length > 3 ? (
								<span style={{ cursor: 'Pointer' }} className='plusMore'>
									+ {props.categories.length - jobCatCount} more
								</span>
							) : (
								''
							)}
						</ul>
					</div>
				) : (
					''
				)}
			</div>
			<div className='RightArrowDiv'>
				<FontAwesomeIcon icon={faAngleRight} size='2x' />
			</div>
		</li>
	)
}

export default JobCardComponent
