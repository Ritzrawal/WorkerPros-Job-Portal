import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import renderHTML from 'react-render-html'

import { ButtonWithCustyomeStyling } from '../../../../component'
import ToggleBox from '../../../../component/employer/input/toggleBox/toggleBox'

import LocationIcon from '../../../../assets/images/icons/location-icon.png'

import './manageJobBox.css'

interface Props {
	jobId: string
	active: boolean
	title: any
	location: string
	pay: any
	description: string
	applicantCount: any
	newApplicantCount: any
	messageCount: any
	interviewCount: any
	categories: any
	employerToggleJobStatus: (jobId: string) => void
}

const ManageJobBox: React.FC<Props> = (props: Props) => {
	const {
		jobId,
		active,
		title,
		location,
		pay,
		description,
		applicantCount,
		newApplicantCount,
		messageCount,
		interviewCount,
		categories,
		employerToggleJobStatus,
	} = props

	const [activeJob, setActiveJob] = useState(active)

	const toggleJobStatus = (jobId: string) => {
		employerToggleJobStatus(jobId)
		setActiveJob(!activeJob)
	}

	return (
		<div className='EmployerManageJobBox'>
			<div className='EmployerManageJobBox__Detail'>
				<div className='EmployerManageJobBox__Detail--Title'>
					<Link to={`/employer/job-detail/${jobId}`}>{title}</Link>
				</div>
				<div className='EmployerManageJobBox__Detail--Overview'>
					<div className='EmployerManageJobBox__Detail--Overview--Location'>
						<img src={LocationIcon} /> {location}
					</div>
					{/* <div className='EmployerManageJobBox__Detail--Overview--Pay'>
						$ {pay}
					</div> */}
				</div>
				<div className='EmployerManageJobBox__Detail--Description'>
					{renderHTML(description)}
				</div>
				<div className='EmployerManageJobBox__Detail--Category'>
					{categories.map((c: any, index) => (
						<div
							key={index}
							className='EmployerManageJobBox__Detail--Category--Container'
						>
							<ButtonWithCustyomeStyling
								buttonTitle={c.title}
								padding={'3px 13px'}
								color={'#808FA6'}
								borderColor={'#F2F4FA'}
								backgroundColor={'#F2F4FA'}
							/>
						</div>
					))}
				</div>
			</div>
			<div className='EmployerManageJobBox__Overview'>
				<div className='EmployerManageJobBox__Overview--Status'>
					<div className='EmployerManageJobBox__Overview--Status--Text'>
						Activated
					</div>
					<div className='EmployerManageJobBox__Overview--Status--ToggleBox'>
						<ToggleBox
							label={'Activated'}
							checked={activeJob}
							name={'activated'}
							value={'activated'}
							placeholder={'Activated'}
							onChange={() => toggleJobStatus(jobId)}
						/>
					</div>
				</div>
				<div className='EmployerManageJobBox__Overview--Count'>
					<div className='EmployerManageJobBox__Overview--Count--Applicant'>
						<div className='EmployerManageJobBox__Overview--Count--Applicant--Number'>
							{applicantCount > 0 ? (
								<Link to={`/employer/applied/candidate/${jobId}/candidate`}>
									{applicantCount}
								</Link>
							) : (
								0
							)}
							{newApplicantCount > 0 ? (
								<span>{newApplicantCount} new</span>
							) : null}
						</div>
						<div className='EmployerManageJobBox__Overview--Count--Applicant--Title'>
							Applicant
						</div>
					</div>
					<div className='EmployerManageJobBox__Overview--Count--Message'>
						<div className='EmployerManageJobBox__Overview--Count--Message--Number'>
							{messageCount}
						</div>
						<div className='EmployerManageJobBox__Overview--Count--Message--Title'>
							Message
						</div>
					</div>
					<div className='EmployerManageJobBox__Overview--Count--Interview'>
						<div className='EmployerManageJobBox__Overview--Count--Interview--Number'>
							{interviewCount > 0 ? (
								<Link to={`/employer/applied/candidate/${jobId}/interview`}>
									{interviewCount}
								</Link>
							) : (
								0
							)}
						</div>
						<div className='EmployerManageJobBox__Overview--Count--Interview--Title'>
							Interview
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ManageJobBox
