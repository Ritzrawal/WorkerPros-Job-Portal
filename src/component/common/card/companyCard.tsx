import React, { useState } from 'react'

import FontAwesome from 'react-fontawesome'
import { ButtonComponent } from '../../index'
import './cardStyle.css'
import LocationLogo from '../../../assets/images/job-description/location.png'
interface Props {
	description: string
	foundedIn: number
	companyName: string
	jobLocation: string
	totalJobs?: number
	localEmployee?: number
	companyImage?: string
	companyBannerImage?: string
	saveCompany: (id: string) => void
	companyId: string
	categories: []
}

const CompanyCardComponent: React.FC<Props> = (props: Props) => {
	const {
		description,
		foundedIn,
		companyName,
		jobLocation,
		totalJobs,
		companyBannerImage,
		companyImage,
		categories,
		saveCompany,
		companyId,
	} = props

	let jobCategory = categories
	const [heartColorRed, setHeartColor] = useState(false)
	let [jobCatCount, setJobCatCount] = useState(3)

	const toggleHeartColor = () => {
		saveCompany(companyId)
		setHeartColor(!heartColorRed)
	}

	const moreHandler = (event: React.MouseEvent<Element, MouseEvent>) => {
		const target: any = event.target as EventTarget
		target.style.display = 'none'
		setJobCatCount((jobCatCount += 3))
	}

	const renderJobcategories = () => {
		let jobsCategories = jobCategory.map((val: any, index) => {
			if (index < jobCatCount) return <li key={index}>{val.title}</li>
		})
		if (jobCategory.length > 3) return jobsCategories
	}

	return (
		<li className='companyCardMain'>
			<div className='companyLeft'>
				{' '}
				<img
					className='companyImage'
					src={
						companyBannerImage
							? process.env.REACT_APP_IMAGE_URL + companyBannerImage
							: 'https://picsum.photos/200/300'
					}
				></img>
			</div>
			<div className='companyMid'>
				<div className='MidTopSection'>
					<div className='companyMidImageDiv'>
						<img
							className='companyLogo'
							src={
								companyImage
									? process.env.REACT_APP_IMAGE_URL + companyImage
									: 'https://picsum.photos/200/300'
							}
						></img>
					</div>
					<div className='MidSection1'>
						<div>
							<span className='CompanyCardName'>{props.companyName}</span>{' '}
							<span className='CompanyFoundedIn'>
								Founded in {props.foundedIn}
							</span>
						</div>
						<div style={{ marginTop: '10px' }}>
							<span className='CompanyCardLocation'>
								{' '}
								<img src={LocationLogo}></img> Charlotte
							</span>
						</div>
					</div>
				</div>
				<div className='Mid-MidSection'>
					<ul className='JobCategoryUL'>
						{renderJobcategories()}{' '}
						{jobCategory.length > 3 && (
							<span
								style={{ cursor: 'Pointer' }}
								// onClick={(e) => moreHandler(e)}
								className='plusMore'
							>
								+ {jobCategory.length - jobCatCount} more
							</span>
						)}
					</ul>
				</div>
				<div className='Mid-BottomSection'>
					<p>{description}</p>
				</div>
			</div>
			<div className='companyRight'>
				<ButtonComponent
					height={50}
					width={200}
					buttonTitle={`View ${props.totalJobs} Jobs`}
				/>
				<p className='LocalEmployessText'>
					{props.localEmployee} Local{' '}
					{props.localEmployee !== 0 ? 'Employees' : 'Employee'}
				</p>
				<div className='heartLogoDiv' onClick={toggleHeartColor}>
					{heartColorRed ? (
						<FontAwesome className='heart-logoRed' name='heart' />
					) : (
						<i style={{ color: '#808fa6' }} className={`far fa-heart`}></i>
					)}
				</div>
			</div>
		</li>
	)
}

export default CompanyCardComponent
