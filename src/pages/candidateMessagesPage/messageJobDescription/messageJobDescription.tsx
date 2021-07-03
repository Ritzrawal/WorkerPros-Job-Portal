import React, { useState, useEffect } from 'react'
import './messageJobDescription.css'
import { ProfileDummyImage } from '../../../component/logosAndIcons'
import renderHTML from 'react-render-html'

interface Props {
	title?: string
	job?: any
	currentConversation: any
}

const MessageJobDescription: React.FC<Props> = (props: Props) => {
	const { job, currentConversation } = props

	let [currentSwitchButtonClass, setCurrentSwitchButtonClass] = useState('')

	if (currentConversation && currentConversation.job) {
		return (
			<div className='messageJobDescriptionMainContainer'>
				<div className='messageJobDescriptionTopSection'>
					<div className='messageJobDescriptionMainInfo'>
						<div className='messagejobDescriptionCompanyLogoDiv'>
							<img
								src={
									currentConversation.job &&
									currentConversation.job.company.profile_image
										? process.env.REACT_APP_IMAGE_URL +
										  currentConversation.job.company.profile_image
										: ProfileDummyImage
								}
							></img>
						</div>
						<div className='jobDescriptionCompanyJobInfo'>
							<span className='messagejobDescriptionCompanyName'>
								{currentConversation.job.company.company_name}
							</span>
							<span className='messagejobDescriptionJobCategory'>
								{currentConversation.job.categories[0].title}
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
							Job Title
						</span>
						<span className='messageJobDescriptionMidSectionDivValue'>
							{currentConversation.job.title}
						</span>
					</div>
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
							{currentConversation.job.categories[0].desired_experience} years
						</span>
					</div>
					<div className='messageJobDescriptionMidSectionDiv'>
						<span className='messageJobDescriptionMidSectionDivTitle'>
							Job Type
						</span>
						<span className='messageJobDescriptionMidSectionDivValue'>
							{currentConversation.job.job_type}
						</span>
					</div>
					<div className='messageJobDescriptionMidSectionDiv'>
						<span className='messageJobDescriptionMidSectionDivTitle'>
							Hourly pay
						</span>
						<span className='messageJobDescriptionMidSectionDivValue'>
							${currentConversation.job.pay_rate.min}-
							{currentConversation.job.pay_rate.max}
						</span>
					</div>
				</div>
				<div className='messageJobDescriptionOverViewSection'>
					<span className='messageJobDescriptionOverViewTitle'>Overview</span>
					<p className='messageJobDescriptionOverViewPara'>
						{renderHTML(currentConversation.job.summary)}
					</p>
				</div>
			</div>
		)
	} else {
		return (
			<div className='NoJobDescriptionMessages'>
				No Job Description for this conversation{' '}
			</div>
		)
	}
}

export default MessageJobDescription
