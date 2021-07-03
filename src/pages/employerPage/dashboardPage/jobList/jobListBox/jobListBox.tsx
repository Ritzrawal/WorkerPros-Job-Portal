import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

import './jobListBox.css'

interface Props {
	title: any
	applicantCount: any
	newApplicantCount: any
	interviewCount: any
}

const JobListBox: React.FC<Props> = (props: Props) => {
	const { title, applicantCount, newApplicantCount, interviewCount } = props

	return (
		<div className='EmployerJobListBox'>
			<div className='EmployerJobListBox__Detail'>
				<div className='EmployerJobListBox__Detail--Title'>{title}</div>
				<div className='EmployerJobListBox__Detail--Count'>
					<div className='EmployerJobListBox__Detail--Count--Applicant'>
						<div className='EmployerJobListBox__Detail--Count--Applicant--Title'>
							{applicantCount}
							{newApplicantCount > 0 ? (
								<span>({newApplicantCount} new)</span>
							) : null}
						</div>
						<div className='EmployerJobListBox__Detail--Count--Applicant--Body'>
							Applicant
						</div>
					</div>
					<div className='EmployerJobListBox__Detail--Count--Message'>
						<div className='EmployerJobListBox__Detail--Count--Message--Title'>
							25
						</div>
						<div className='EmployerJobListBox__Detail--Count--Message--Body'>
							Message
						</div>
					</div>
					<div className='EmployerJobListBox__Detail--Count--Interview'>
						<div className='EmployerJobListBox__Detail--Count--Interview--Title'>
							{interviewCount}
						</div>
						<div className='EmployerJobListBox__Detail--Count--Interview--Body'>
							Interview
						</div>
					</div>
				</div>
			</div>
			<div className='EmployerJobListBox__Link'>
				<FontAwesomeIcon icon={faAngleRight} />
			</div>
		</div>
	)
}

export default JobListBox
