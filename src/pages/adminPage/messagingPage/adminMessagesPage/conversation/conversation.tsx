import React, { useState, useEffect } from 'react'
import './conversation.css'
import { connect } from 'react-redux'
import { MessagePageMessageCard } from '../../../../../component'
import { Form, FormGroup, Input, Spinner } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaugh } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import {
	MessageAttachIcon,
	MessageSendIcon,
	ProfileDummyImage,
} from '../../../../../component/logosAndIcons'
import Picker from 'emoji-picker-react'

interface Props {
	test?: string
	sendMessage: (message: any, params: any) => void
	updateMessageParams: (event: any, emoji: boolean) => void
	sendMessageTo: (event: any) => void
	sendMessageOnClick?: () => void
	conversationID: string
	conversationDetail: any
	currentMessage?: string
	currentConvoDate?: string
	currentConversation?: any
	currentUserId?: string
	active?: boolean
}

const MessagePageConversation: React.FC<Props> = (props: Props) => {
	const {
		updateMessageParams,
		sendMessageTo,
		sendMessageOnClick,
		conversationDetail,
		currentMessage,
		currentConversation,
		currentUserId,
		active,
	} = props

	const [chosenEmoji, setChosenEmoji] = useState('')
	let [showEmojiSelect, setShowEmojiSelect] = useState(false)
	const [show] = useState(true)

	const onEmojiClick: any = (event, emojiObject) => {
		updateMessageParams(emojiObject, true)
	}

	useEffect(() => {
		var messagePageWindow: any = document.querySelector(
			'.messagePageConversationMessagesContainer'
		)
		messagePageWindow.scrollTo(0, messagePageWindow.scrollHeight)
	})

	return (
		<div className='messagePageConversationMainContainerAdmin'>
			{active ? (
				<div className='messagePageConversationSupport'>
					<div className='messageConversationLabor'>
						<div className='messagePageConversationCategoryType'>
							General Labor
							{currentConversation && currentConversation.name}
							{/* {currentConversation.created_at} */}
						</div>
						<span className='messagePageConversationStarted'>
							Started{' '}
							{moment(
								currentConversation && currentConversation.created_at
							).format(' MMMM Do ')}{' '}
						</span>
					</div>
					<div>
						<Input
							className='AdminFilterInputCustomize'
							type='select'
							name='select'
							id='exampleSelect'
						>
							<option>Active</option>
							<option>Resolved</option>
						</Input>
					</div>
				</div>
			) : (
				<div className='messagePageConversationTopSection'>
					<span className='messagePageConversationCategoryType'>
						General Labor
						{currentConversation && currentConversation.name}
						{/* {currentConversation.created_at} */}
					</span>
					<span className='messagePageConversationStarted'>
						Started{' '}
						{moment(
							currentConversation && currentConversation.created_at
						).format(' MMMM Do ')}
						MiCROSOFT
					</span>
				</div>
			)}

			<div className='messagePageConversationMessagesSection'>
				<div
					id='messagesContainerBro'
					className='messagePageConversationMessagesContainer'
				>
					{conversationDetail.loading ? (
						<div className='loaderDiv'>
							<Spinner color='grey' />
						</div>
					) : (
						conversationDetail.data.map((value: any, index) => {
							return (
								<div style={{ width: '80%' }} key={index}>
									<MessagePageMessageCard
										currentUserId={currentUserId}
										active={active}
										messageTime={value.created_at}
										companyname='Microsoft'
										messageSenderId={value.sender_id}
										name={value.name}
										show={show}
										messageText={value.message}
										receiverImage={
											value.profile_image
												? process.env.REACT_APP_IMAGE_URL + value.profile_image
												: ProfileDummyImage
										}
										key={index}
									/>
								</div>
							)
						})
					)}
				</div>
				{active && (
					<div className='messagePageConversationTextFieldSection'>
						<Form>
							<FormGroup className='messagePageConversationTextFieldInputContainerAdmin'>
								<div>
									<Input
										onChange={(e) => updateMessageParams(e, false)}
										className='messagePageConversationTextField'
										onKeyDown={(e) => sendMessageTo(e)}
										placeholder='Type something here...'
										value={currentMessage}
									></Input>
								</div>

								<div>
									<FontAwesomeIcon
										onClick={() => setShowEmojiSelect(!showEmojiSelect)}
										className='messengerEmojiIcon'
										icon={faLaugh}
									/>
									<img
										onClick={sendMessageOnClick}
										className='messagePageConversationTextFieldSendIcon'
										src={MessageSendIcon}
									/>{' '}
									<img
										className='messagePageConversationTextFieldAttachIcon'
										src={MessageAttachIcon}
									/>{' '}
								</div>
							</FormGroup>
						</Form>
						{showEmojiSelect && (
							<div className='messageEmojiSelector'>
								{chosenEmoji ? null : null}
								<Picker disableSearchBar={true} onEmojiClick={onEmojiClick} />
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
const mapStateToProps = (state) => {
	return {
		active: state.loginReducer.visible,
	}
}
export default connect(mapStateToProps, null)(MessagePageConversation)
