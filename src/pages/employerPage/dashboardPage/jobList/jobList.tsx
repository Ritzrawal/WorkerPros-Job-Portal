import React from 'react'
import { Link } from 'react-router-dom'

import JobListBox from './jobListBox/jobListBox'

import './jobList.css'

interface Props {
	employerDashboardJobList: any
}

const JobList: React.FC<Props> = (props: Props) => {
	const { employerDashboardJobList } = props
	return (
		<div className='EmployerJobList'>
			<div className='EmployerJobList__Title'>
				<div className='EmployerJobList__Title--Left'>Jobs</div>
				<div className='EmployerJobList__Title--Right'>
					<Link to={'/employer/manage-job'}>All Jobs</Link>
				</div>
			</div>
			<div className='EmployerJobList__Body'>
				{employerDashboardJobList &&
					employerDashboardJobList.map((d: any, index) => (
						<div
							key={index}
							className='EmployerJobList__Body--JobListBox BottomBorder'
						>
							<JobListBox
								title={d.title}
								applicantCount={d.applicants_count}
								newApplicantCount={d.new_applicants_count}
								interviewCount={d.interviews_count}
							/>
						</div>
					))}
			</div>
		</div>
	)
}

export default JobList
