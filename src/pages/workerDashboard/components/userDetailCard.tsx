import React from 'react'
import UserImage from '../../../assets/images/profile.png'
import PlusLogo from '../../../assets/images/worker-dashboard/plus.png'
import './dashBoardCards.css'

interface Props {
	test?: string
	firstname?: string
	lastname?: string
	image?: string
	applicationCount?: number
	gigsDone?: number
	profileViews?: number
	interviews?: number
	workExperience?: any
}

const UserDetailCard: React.FC<Props> = (props: Props) => {
	return (
		<div className='userDetailCardMainDiv'>
			<div className='userDetailImageDiv'>
				<div className='userDetailImageInnerDiv'>
					<img className='userDetailImage' src={props.image}></img>
				</div>
			</div>
			<div className='userDetailOverView'>
				<span className='userDetailName'>
					{props.firstname} {props.lastname}
				</span>
				<p className='userDetailText'>
					{props.workExperience &&
					props.workExperience[0] &&
					props.workExperience[0].role
						? props.workExperience[0].role
						: null}{' '}
					at{' '}
					{props.workExperience &&
					props.workExperience[0] &&
					props.workExperience[0].company_name
						? props.workExperience[0].company_name
						: null}
				</p>
			</div>
			<div className='ApplicationsSentDiv'>
				<ul className='userDetailCardUL'>
					<li>
						{' '}
						<span className='userDetailsTitle'>Application Sent</span>{' '}
						<span className='userDetailsNumber'>{props.applicationCount}</span>
					</li>
					<li>
						{' '}
						<span className='userDetailsTitle'>Gigs Done</span>{' '}
						<span className='userDetailsNumber'>{props.gigsDone}</span>
					</li>
					<li>
						{' '}
						<span className='userDetailsTitle'>Profile Views</span>{' '}
						<span className='userDetailsNumber'>{props.profileViews}</span>
					</li>
					<li>
						{' '}
						<span className='userDetailsTitle'>Interviews</span>{' '}
						<span className='userDetailsNumber'>{props.interviews}</span>
					</li>
				</ul>
			</div>
			<hr />
			<div className='userDetailCompleteProfile'>
				<span className='completeProfile'>Complete Your Profile</span>

				<span className='addTrades'>
					{' '}
					<img src={PlusLogo} />
					Add Aditional Trades
				</span>
			</div>
		</div>
	)
}

export default UserDetailCard
