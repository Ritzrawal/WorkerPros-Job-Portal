import React, { useState, useEffect } from 'react'
import './conversation.css'
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
}

const SupportMessagePageConversation: React.FC<Props> = (props: Props) => {
	const {
		updateMessageParams,
		sendMessageTo,
		sendMessageOnClick,
		conversationDetail,
		currentMessage,
		currentConversation,
		currentUserId,
	} = props
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
								<div key={index} style={{ width: '90%' }}>
									<MessagePageMessageCard
										currentUserId={currentUserId}
										messageTime={value.created_at}
										companyname='Microsoft'
										messageSenderId={value.sender_id}
										name={value.name}
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
			</div>
		</div>
	)
}

export default SupportMessagePageConversation
