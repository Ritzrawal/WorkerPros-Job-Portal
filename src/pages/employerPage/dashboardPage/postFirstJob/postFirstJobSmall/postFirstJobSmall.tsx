import React from 'react'
import { Link } from 'react-router-dom'

import PostFirstJobFullImage from '../../../../../assets/images/dashboardPostJobFull.png'
import './postFirstJobSmall.css'

const PostFirstJobSmall: React.FC<any> = (props: any) => {
	return (
		<div className='EmployerPostFirstJobSmall'>
			<div className='EmployerPostFirstJobSmall__Text'>
				<div className='EmployerPostFirstJobSmall__Text--Title'>
					Post your first Job
				</div>
				<div className='EmployerPostFirstJobSmall__Text--Description'>
					Join the largest community of skilled construction workers
				</div>
				<div className='EmployerPostFirstJobSmall__Text--Button'>
					<Link to={'/employer/post-job'}>Create new Job</Link>
				</div>
			</div>
			<div className='EmployerPostFirstJobSmall__Image'>
				<img src={PostFirstJobFullImage} />
			</div>
		</div>
	)
}

export default PostFirstJobSmall
