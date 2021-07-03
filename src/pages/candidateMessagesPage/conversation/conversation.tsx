import React, { useState, useEffect } from 'react'
import './conversation.css'
import { MessagePageMessageCard } from '../../../component'
import { Form, FormGroup, Input, Spinner } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaugh } from '@fortawesome/free-solid-svg-icons'
import InfiniteScroll from 'react-infinite-scroll-component'
import moment from 'moment'
import {
	MessageAttachIcon,
	MessageSendIcon,
	ProfileDummyImage,
} from '../../../component/logosAndIcons'
import Picker from 'emoji-picker-react'

interface Props {
	sendMessage: (message: any, params: any) => void
	updateMessageParams: (event: any, emoji: boolean) => void
	sendMessageTo: (event: any) => void
	updateLogo: (event: any) => void
	sendMessageOnClick: () => void
	getMoreMessage: (page: number) => void
	conversationID: string
	conversationDetail: any
	currentMessage: string
	currentConvoDate: string
	currentConversation: any
	currentUserId
	logoPreview?: string
	logo?: string
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
		getMoreMessage,
	} = props

	const { logoPreview, updateLogo } = props

	const [chosenEmoji, setChosenEmoji] = useState('')
	const [messagePage, setMessagePage] = useState(1)
	let [showEmojiSelect, setShowEmojiSelect] = useState(false)

	const onEmojiClick: any = (event, emojiObject) => {
		updateMessageParams(emojiObject, true)
	}

	// useEffect(() => {
	// 	var messagePageWindow: any = document.querySelector(
	// 		'.messagePageConversationMessagesContainer'
	// 	)
	// 	messagePageWindow.scrollTo(0, messagePageWindow.scrollHeight)
	// })

	let clickHandler: any = null

	const updateMessagePage = () => {
		const newPage = messagePage + 1
		setMessagePage(newPage)
		getMoreMessage(newPage)
	}

	return (
		<div className='messagePageConversationMainContainer'>
			<div className='messagePageConversationTopSection'>
				<span className='messagePageConversationCategoryType'>
					{currentConversation && currentConversation.name}
				</span>
				<span className='messagePageConversationStarted'>
					Started{' '}
					{moment(currentConversation && currentConversation.created_at).format(
						'dddd, MMMM Do '
					)}{' '}
				</span>
			</div>

			<div className='messagePageConversationMessagesSection'>
				{conversationDetail.loading ? (
					<div className='loaderDivMessagesDetail'>
						<Spinner color='grey' />
					</div>
				) : null}{' '}
				<div
					id='ScrollableDiv'
					className='messagePageConversationMessagesContainer'
				>
					{conversationDetail.data && (
						<InfiniteScroll
							dataLength={conversationDetail.data.length}
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
							{conversationDetail.data.map((value: any, index) => {
								return (
									<div key={index}>
										<MessagePageMessageCard
											currentUserId={currentUserId}
											messageTime={value.created_at}
											messageSenderId={value.sender_id}
											name={value.name}
											messageText={value.message}
											receiverImage={
												value.profile_image
													? process.env.REACT_APP_IMAGE_URL +
													  value.profile_image
													: ProfileDummyImage
											}
										/>
									</div>
								)
							})}
						</InfiniteScroll>
					)}
				</div>
				<div className='messagePageConversationTextFieldSection'>
					<div>
						<input
							type='file'
							name='logo'
							hidden={true}
							onChange={updateLogo}
							ref={(input) => {
								clickHandler = input
							}}
						/>
					</div>
					<div className='fileattachmentMessage'>
						<span>{logoPreview}</span>
					</div>

					<Form>
						<FormGroup className='messagePageConversationTextFieldInputContainer'>
							<div>
								<Input
									onChange={(e) => updateMessageParams(e, false)}
									className='messagePageConversationTextField'
									onKeyDown={(e) => sendMessageTo(e)}
									placeholder={'Send Message'}
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
									onClick={() => clickHandler.click()}
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
			</div>
		</div>
	)
}

export default MessagePageConversation
