import React from 'react'
import { Link } from 'react-router-dom'

import PostFirstJobHalfImage from '../../../../assets/images/dashboardPostJobHalf.png'
import './postFirstJob.css'

const PostFirstJob: React.FC<any> = (props: any) => {
	return (
		<div className='EmployerPostFirstJob'>
			<div className='EmployerPostFirstJob__Image'>
				<img src={PostFirstJobHalfImage} />
			</div>
			<div className='EmployerPostFirstJob__Text'>
				<div className='EmployerPostFirstJob__Text--Title'>
					Post your first Job
				</div>
				<div className='EmployerPostFirstJob__Text--Description'>
					Add information to your profile to find better candidates
				</div>
				<div className='EmployerPostFirstJob__Text--Button'>
					<Link to={'/employer/post-job'}>Creat new Job</Link>
				</div>
			</div>
		</div>
	)
}

export default PostFirstJob
