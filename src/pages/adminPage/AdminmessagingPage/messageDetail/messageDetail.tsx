import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Spinner, Modal } from 'reactstrap'
import Moment from 'moment'
import { Input } from 'reactstrap'
import DropdownBox from '../../../../component/employer/input/dropdownBox/dropdownBox'
import { connect } from 'react-redux'
import { MessagePageMessageCard } from '../../../../component'
import {
	ProfileDummyImage,
	MessageSendIcon,
	MessageAttachIcon,
} from '../../../../component/logosAndIcons'
import {
	deleteSingleMessage,
	adminResolveAction,
} from '../../../../store/action/adminAction'

import { ButtonWithCustyomeStyling } from '../../../../component'
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
	deleteSingleMessage: (id: string) => void
	adminResolveAction: (params: any) => void
	active: boolean
}

const MessageDetail: React.FC<Props> = (props: Props) => {
	const {
		messageDetail,
		currentUser,
		sendMessage,
		getMoreMessage,
		currentMessage,
		deleteSingleMessage,
		adminResolveAction,
		active,
	} = props

	const [phase, setPhase] = useState<any>({
		status: 'open',
		conversation_id: messageDetail.data[0].conversation_id,
	})
	const [messageLike, setMessageLike] = useState('')
	const [messagePage, setMessagePage] = useState(1)
	const [message, setMessage] = useState('')
	const [show, setShow] = useState(false)
	const [status, setStatus] = useState('')
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
		console.log('hello any', messageDetail.data[0].conversation_id)
		const { name, value } = event.target

		setPhase({
			...phase,
			status: value,
			conversation_id: messageDetail.data[0].conversation_id,
		})
		adminResolveAction(phase)
	}

	// scroll the message to the bottom (start)
	// useLayoutEffect(() => {
	// 	var messageDetailListWindow: any = document.querySelector(
	// 		'.AdminMessageDetail__List'
	// 	)
	// 	messageDetailListWindow.scrollTo(0, messageDetailListWindow.scrollHeight)
	// })

	const updateMessagePage = () => {
		const newPage = messagePage + 1
		setMessagePage(newPage)
		getMoreMessage(newPage)
	}
	const cancelCommentDelete = () => {
		setShow(!show)
	}
	const onMessageDeleate = (id) => {
		deleteSingleMessage(id)
	}

	return (
		<div className='AdminMessageDetail'>
			{active ? (
				<div className='AdminMessageDetailsSupportTab'>
					<div className='AdminMessageDetail__Info'>
						<div className='AdminMessageDetail__Title'>General Labour</div>
						<div className='AdminMessageDetail__Info--Date'>
							started {Moment(currentMessage?.created_at).format(' MMMM Do ')}{' '}
						</div>
					</div>
					<div className='AdminFilterInputCustomizeOuterContainerSupport'>
						<Input
							className='AdminFilterInputCustomize'
							type='select'
							name='select'
							id='adminselect'
							onChange={changePhase}
						>
							<option>open</option>
							<option>resolved</option>
						</Input>
					</div>
				</div>
			) : (
				<div>
					<div className='AdminMessageDetail__Title'>General Labour</div>
					<div className='AdminMessageDetail__Info'>
						<div className='AdminMessageDetail__Info--Date'>
							started {Moment(currentMessage?.created_at).format(' MMMM Do ')}{' '}
							MICROSOFT
						</div>
					</div>
				</div>
			)}
			{messageDetail.loading ? (
				<div className='AdminMessageDetail__Loader'>
					<Spinner size='md' />
				</div>
			) : null}
			<div id='ScrollableDiv' className='AdminMessageDetail__List'>
				{messageDetail.data && messageDetail?.data?.length ? (
					<InfiniteScroll
						dataLength={messageDetail?.data?.length}
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
								className='AdminMessageDetail__List--MessagePageMessageCard'
							>
								<MessagePageMessageCard
									onDelete={() => onMessageDeleate(m.message_id)}
									text={m.message}
									name={m.name}
									companyname='Microsoft'
									messageTime={m.created_at}
									show={true}
									active={active}
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
				<Modal
					isOpen={show}
					centered
					toggle={cancelCommentDelete}
					className='ModalContainerCustomizerAlert'
				>
					<p className='DeleteModalTetxCustomize'>
						Are you want sure you want to Delete?
					</p>
					<div className='ModalCustomizerButton'>
						<ButtonWithCustyomeStyling
							clickHandler={cancelCommentDelete}
							buttonTitle='Cancle'
							paddingLeft={20}
							paddingRight={20}
							color='#2EC2E2'
							backgroundColor='#FFFFFF'
							borderColor='#2EC2E2'
							marginRight={19}
						/>
						<ButtonWithCustyomeStyling
							clickHandler={() => onMessageDeleate}
							buttonTitle='Delete'
							paddingLeft={20}
							paddingRight={20}
							color='#FFFFFF'
							backgroundColor='#CB1E1E'
							borderColor='#CB1E1E'
							marginRight={19}
						/>
					</div>
				</Modal>
			</div>
			{active && (
				<div className='AdminMessageDetail__Box'>
					<div className='AdminMessageDetail__Box--Container'>
						<div className='AdminMessageDetail__Box--Container--Input'>
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
						<div className='AdminMessageDetail__Box--Container--RightIcon'>
							<div
								className='AdminMessageDetail__Box--Container--RightIcon--Attach'
								onClick={sendMessageOnClick}
							>
								<img src={MessageAttachIcon} />
							</div>
							<div
								className='AdminMessageDetail__Box--Container--RightIcon--Send'
								onClick={sendMessageOnClick}
							>
								<img src={MessageSendIcon} />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default connect(null, { deleteSingleMessage, adminResolveAction })(
	MessageDetail
)
