import React from 'react'
import { Link } from 'react-router-dom'

import './completeProfile.css'

interface Props {
	dashboardDataCount: any
}

const CompleteProfile: React.FC<Props> = (props: Props) => {
	const { dashboardDataCount } = props
	return (
		<div className='EmployerCompleteProfile'>
			<div className='EmployerCompleteProfile__Detail'>
				<div className='EmployerCompleteProfile__Detail--Title'>
					Complete Profile
				</div>
				<div className='EmployerCompleteProfile__Detail--Body'>
					Add information to your profile to find better candidate
				</div>
				<div className='EmployerCompleteProfile__Detail--Button'>
					<Link to={'/employer/update-company-profile'}>
						<button>Complete Profile</button>
					</Link>
				</div>
			</div>
			<div className='EmployerCompleteProfile__Number'>
				<div className='EmployerCompleteProfile__Number--Container'>
					<div className='EmployerCompleteProfile__Number--Container--Title'>
						{dashboardDataCount && dashboardDataCount.profile_complete
							? `${Math.ceil(dashboardDataCount.profile_complete)}%`
							: '0%'}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CompleteProfile
