import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Spinner } from 'reactstrap'
import Moment from 'moment'

import DropdownBox from '../../../../component/employer/input/dropdownBox/dropdownBox'
import { MessagePageMessageCard } from '../../../../component'
import {
	ProfileDummyImage,
	MessageSendIcon,
	MessageAttachIcon,
} from '../../../../component/logosAndIcons'

import LikeIcon from '../../../../assets/images/icons/like.png'
import UnLikeIcon from '../../../../assets/images/icons/unlike.png'
import LocationIcon from '../../../../assets/images/icons/location-icon.png'
import AppliedIcon from '../../../../assets/images/icons/appliedIcon.png'
import ScreeningIcon from '../../../../assets/images/icons/screeningIcon.png'
import InterviewIcon from '../../../../assets/images/icons/interviewIcon.png'
import OfferedIcon from '../../../../assets/images/icons/offeredIcon.png'
import HiredIcon from '../../../../assets/images/icons/hiredIcon.png'
import './messageDetail.css'

const CANDIDATE_PHASE = [
	{
		title: `<img src='${AppliedIcon}' style='height: 15px; width: 15px; margin-top: -4px;margin-right: 8px;' />Applied`,
		value: 'applied',
	},
	{
		title: `<img src='${ScreeningIcon}' style='height: 15px; width: 15px; margin-top: -4px;margin-right: 8px;' />Screening`,
		value: 'screening',
	},
	{
		title: `<img src="${InterviewIcon}" style='height: 15px; width: 15px; margin-top: -4px;margin-right: 8px;' />Interview`,
		value: 'interview',
	},
	{
		title: `<img src="${OfferedIcon}" style='height: 15px; width: 15px; margin-top: -4px;margin-right: 8px;' />Offered`,
		value: 'offered',
	},
	{
		title: `<img src="${HiredIcon}" style='height: 15px; width: 15px; margin-top: -4px;margin-right: 8px;' />Hired`,
		value: 'hired',
	},
]

interface Props {
	messageDetail: any
	currentUser: any
	sendMessage: (message: any) => void
	getMoreMessage: (page: number) => void
	currentMessage: any
}

const MessageDetail: React.FC<Props> = (props: Props) => {
	const {
		messageDetail,
		currentUser,
		sendMessage,
		getMoreMessage,
		currentMessage,
	} = props

	const [phase, setPhase] = useState('applied')
	const [messageLike, setMessageLike] = useState('')
	const [messagePage, setMessagePage] = useState(1)
	const [message, setMessage] = useState('')

	const sendMessageOnPress = (event) => {
		if (event.code === 'Enter' || event.key === 'Enter') {
			sendMessage(message)
			setMessage('')
		}
	}

	const sendMessageOnClick = () => {
		sendMessage(message)
		setMessage('')
	}

	const changePhase = (event) => {
		const { name, value } = event.target

		setPhase(value)
	}

	// scroll the message to the bottom (start)
	// useLayoutEffect(() => {
	// 	var messageDetailListWindow: any = document.querySelector(
	// 		'.EmployerMessageDetail__List'
	// 	)
	// 	messageDetailListWindow.scrollTo(0, messageDetailListWindow.scrollHeight)
	// })

	const updateMessagePage = () => {
		const newPage = messagePage + 1
		setMessagePage(newPage)
		getMoreMessage(newPage)
	}

	return (
		<div className='EmployerMessageDetail'>
			<div className='EmployerMessageDetail__Title'>General Labour</div>
			<div className='EmployerMessageDetail__Info'>
				<div className='EmployerMessageDetail__Info--Location'>
					<img src={LocationIcon} />
					Charlote
				</div>
				<div className='EmployerMessageDetail__Info--Date'>
					Conversation started{' '}
					{Moment(currentMessage?.created_at).format('YYYY-MM-DD')}
				</div>
			</div>
			<div className='EmployerMessageDetail__Option'>
				<div className='EmployerMessageDetail__Option--Dropdown'>
					<DropdownBox
						custom
						internalPadding={'8px'}
						error={false}
						label={''}
						option={CANDIDATE_PHASE}
						name={'type'}
						value={phase}
						placeholder={'Select Phase'}
						onChange={changePhase}
					/>
				</div>
				<div
					className={`EmployerMessageDetail__Option--Like ${
						messageLike === 'like' ? 'Active' : ''
					}`}
					onClick={() => setMessageLike('like')}
				>
					<img src={LikeIcon} />
				</div>
				<div
					className={`EmployerMessageDetail__Option--UnLike ${
						messageLike === 'unlike' ? 'Active' : ''
					}`}
					onClick={() => setMessageLike('unlike')}
				>
					<img src={UnLikeIcon} />
				</div>
			</div>
			{messageDetail.loading ? (
				<div className='EmployerMessageDetail__Loader'>
					<Spinner size='md' />
				</div>
			) : null}
			<div id='ScrollableDiv' className='EmployerMessageDetail__List'>
				{messageDetail.data && messageDetail.data.length ? (
					<InfiniteScroll
						dataLength={messageDetail.data.length}
						next={updateMessagePage}
						hasMore={true}
						style={{
							display: 'flex',
							flexDirection: 'column-reverse',
							overflow: 'hidden',
						}} //To put endMessage and loader to the top.
						inverse={true}
						loader={null}
						scrollableTarget='ScrollableDiv'
					>
						{messageDetail.data.map((m: any, index) => (
							<div
								key={index}
								className='EmployerMessageDetail__List--MessagePageMessageCard'
							>
								<MessagePageMessageCard
									text={m.message}
									name={m.name}
									messageTime={m.created_at}
									messageText={m.message}
									senderImage={
										m.profile_image
											? `${process.env.REACT_APP_IMAGE_URL}${m.profile_image}`
											: ProfileDummyImage
									}
									receiverImage={
										m.profile_image
											? `${process.env.REACT_APP_IMAGE_URL}${m.profile_image}`
											: ProfileDummyImage
									}
									currentUserId={currentUser?.user_id}
									messageSenderId={m.sender_id}
								/>
							</div>
						))}
					</InfiniteScroll>
				) : null}
			</div>
			<div className='EmployerMessageDetail__Box'>
				<div className='EmployerMessageDetail__Box--Container'>
					<div className='EmployerMessageDetail__Box--Container--Input'>
						<input
							type={'text'}
							name={'message'}
							value={message}
							placeholder={'Send Message'}
							onChange={(event) => setMessage(event.target.value)}
							autoComplete={'off'}
							onKeyUp={sendMessageOnPress}
						/>
					</div>
					<div className='EmployerMessageDetail__Box--Container--RightIcon'>
						<div
							className='EmployerMessageDetail__Box--Container--RightIcon--Attach'
							onClick={sendMessageOnClick}
						>
							<img src={MessageAttachIcon} />
						</div>
						<div
							className='EmployerMessageDetail__Box--Container--RightIcon--Send'
							onClick={sendMessageOnClick}
						>
							<img src={MessageSendIcon} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MessageDetail
