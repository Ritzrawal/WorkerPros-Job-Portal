import React from 'react'
import './dashBoardCards.css'
import UserImage from '../../../assets/images/profile.png'
import MutualIcon from '../../../assets/images/worker-dashboard/mutual.png'
import { ProfileDummyImage } from '../../../component/logosAndIcons'

interface Props {
	test?: string
	type?: string
	buttonTitle?: string
	companyImage?: string

	companyName: string
}

const CompaniesToFollowCard: React.FC<Props> = (props: Props) => {
	return (
		<div className='connectionCardMainDiv'>
			<div className='connectionCardImageDiv'>
				<div className='connectionCardImageInnerDiv'>
					<img
						src={
							props.companyImage
								? `${process.env.REACT_APP_IMAGE_URL}${props.companyImage}`
								: ProfileDummyImage
						}
					/>
				</div>
			</div>
			<div className='connectionCardUserInfoDiv'>
				<span className='connectionCardName'>
					{props.companyName.length < 20
						? props.companyName
						: `${props.companyName?.slice(0, 20)}...`}
				</span>
				<span className='connectionCardOverview'>
					Buildings in Boston and other cities
				</span>
			</div>
			{props.type === 'company' ? (
				<div className='connectionCardMutual'> 11k Followers</div>
			) : (
				<div className='connectionCardMutual'>
					{' '}
					<img src={MutualIcon} /> 8 Mutual Connections
				</div>
			)}

			<div className='connectionCardButtonDiv'>
				<button>{props.buttonTitle}</button>
			</div>
		</div>
	)
}

export default CompaniesToFollowCard
