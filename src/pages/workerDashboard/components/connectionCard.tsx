import React, { useState } from 'react'
import './dashBoardCards.css'
import UserImage from '../../../assets/images/profile.png'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import MutualIcon from '../../../assets/images/worker-dashboard/mutual.png'
import { ProfileDummyImage } from '../../../component/logosAndIcons'
import WorkerDetailModal from '../../../component/common/modal/candidateDetailModal/candidateDetailModal'
import { singleProfileAction } from '../../../store/action/profileAction'
interface Props {
	test?: string
	type?: string
	buttonTitle?: string
	userImage?: string
	firstName?: string
	lastName?: string
	companyName?: string
	backgroundColor?: any
	userId?: string
	showroute?: any
	onConnectClick?: () => void
	onClickProfile: (flag: any) => void
	singleProfileAction: (id: string) => void
}

const ConnectionCard: React.FC<Props> = (props: Props) => {
	const history = useHistory()
	const [color, setColor] = useState(false)
	const [show, setShow] = useState(false)
	const [currentCandidate, setCurrentCandidate] = useState('')
	const onConnect = () => {
		console.log('hello userid', props.userId)
		setColor(!color)
	}
	const onProfileClick = (id) => {
		if (props.showroute) {
			setShow(props.showroute)
		}

		console.log('single card', props.showroute, show)
		props.singleProfileAction(id)
		props.onClickProfile(true)
		if (props.showroute) {
			history.push('/display/profile')
		}
	}

	return (
		<div className='connectionCardMainDiv'>
			<>
				{currentCandidate !== '' && (
					<WorkerDetailModal
						candidateDetail={currentCandidate}
						closeCandidateDetail={() => setCurrentCandidate('')}
					/>
				)}
			</>
			<div
				className='connectionCardImageDiv'
				onClick={() => onProfileClick(props.userId)}
			>
				<div className='connectionCardImageInnerDiv'>
					<img
						src={
							props.userImage
								? `${process.env.REACT_APP_IMAGE_URL}${props.userImage}`
								: ProfileDummyImage
						}
					/>
				</div>
			</div>
			<div className='connectionCardUserInfoDiv'>
				<span
					className='connectionCardName'
					onClick={() => onProfileClick(props.userId)}
				>
					{props.firstName ? props.firstName : 'Paul'}{' '}
					{props.lastName
						? props.lastName.length < 10
							? props.lastName
							: `${props.lastName.slice(0, 10)}...`
						: 'Peterson'}
				</span>
				<span className='connectionCardOverview'>
					Professional Carpentry at Sob Systems
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

			<div className='connectionCardButtonDiv' onClick={onConnect}>
				<button className={color ? 'ButtonOnclickOnConnect' : ''}>
					{color ? 'connected' : props.buttonTitle}
				</button>
			</div>
		</div>
	)
}

export default connect(null, { singleProfileAction })(ConnectionCard)
