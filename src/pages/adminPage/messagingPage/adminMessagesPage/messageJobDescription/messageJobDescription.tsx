import React, { useState, useEffect } from 'react'
import './messageJobDescription.css'
import { ProfileDummyImage } from '../../../../../component/logosAndIcons'

interface Props {
	title?: string
	job?: any
}

const MessageJobDescription: React.FC<Props> = (props: Props) => {
	const { job } = props

	console.log('job from mesasge job description', job)
	let [currentSwitchButtonClass, setCurrentSwitchButtonClass] = useState('')

	if (job === null) {
		return (
			<div className='NoJobDescriptionMessages'>
				No Job Description for this conversation{' '}
			</div>
		)
	}

	return (
		<div className='messageJobDescriptionMainContainer'>
			<div className='messageJobDescriptionTopSection'>
				<div className='messageJobDescriptionMainInfo'>
					<div className='messagejobDescriptionCompanyLogoDiv'>
						<img
							src={
								job.company.profile_image
									? process.env.REACT_APP_IMAGE_URL + job.company.profile_image
									: ProfileDummyImage
							}
						></img>
					</div>
					<div className='jobDescriptionCompanyJobInfo'>
						<span className='messagejobDescriptionCompanyName'>
							{job.company.company_name}
						</span>
						<span className='messagejobDescriptionJobCategory'>
							{job.categories[0].skills[0]}
						</span>
					</div>
				</div>
				<div className='messageJobDescriptionSwitchButtonDiv'>
					<span
						onClick={() => {
							setCurrentSwitchButtonClass('')
						}}
						className={`messageJobDescriptionButton ${
							currentSwitchButtonClass === '' ? 'active' : ''
						}`}
					>
						Description
					</span>
					<span
						onClick={() => {
							setCurrentSwitchButtonClass('files')
						}}
						className={`messageJobDescriptionFiles ${
							currentSwitchButtonClass === 'files' ? 'active' : ''
						}`}
					>
						Files
					</span>
				</div>
			</div>
			<div className='messageJobDescriptionMidSection'>
				<div className='messageJobDescriptionMidSectionDiv'>
					<span className='messageJobDescriptionMidSectionDivTitle'>
						skill level
					</span>
					<span className='messageJobDescriptionMidSectionDivValue'>
						Senior
					</span>
				</div>
				<div className='messageJobDescriptionMidSectionDiv'>
					<span className='messageJobDescriptionMidSectionDivTitle'>
						Desired Experience
					</span>
					<span className='messageJobDescriptionMidSectionDivValue'>
						{job.categories[0].desired_experience} years
					</span>
				</div>
				<div className='messageJobDescriptionMidSectionDiv'>
					<span className='messageJobDescriptionMidSectionDivTitle'>
						Job Type
					</span>
					<span className='messageJobDescriptionMidSectionDivValue'>
						{job.job_type}
					</span>
				</div>
				<div className='messageJobDescriptionMidSectionDiv'>
					<span className='messageJobDescriptionMidSectionDivTitle'>
						Hourly pay
					</span>
					<span className='messageJobDescriptionMidSectionDivValue'>
						${job.pay_rate.min}-{job.pay_rate.max}
					</span>
				</div>
			</div>
			<div className='messageJobDescriptionOverViewSection'>
				<span className='messageJobDescriptionOverViewTitle'>Overview</span>
				<p className='messageJobDescriptionOverViewPara'>{job.summary}</p>
			</div>
		</div>
	)
}

export default MessageJobDescription
