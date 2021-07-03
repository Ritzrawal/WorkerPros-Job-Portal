/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import './candidateMessagesPage.css'
import CandidateMessenger from './messenger/messenger'
import MessagePageConversation from './conversation/conversation'
import {
	getAdminMessages,
	candidateSendMessage,
	adminGetConversationDetail,
	updateSendMessage,
	updateNewSendMessage,
} from '../../../../store/action/socialFeatureAction'

import io from 'socket.io-client'

import { getUsersSuggestion } from '../../../../store/action/socialFeatureAction'
import { profileAllInfoAction } from '../../../../store/action/profileAction'
import { connect } from 'react-redux'

interface Props {
	getAdminMessages: () => void
	candidateSendMessage: (message: any) => void
	adminGetConversationDetail: (convoID: string) => void
	getUsersSuggestion: () => void
	candidateMessagesList: any
	conversationDetail: any
	userSuggestionList: any
	sentMessageStatus: any
	profileinfo: any
	updateSendMessage: (messageAddOnList: any) => void
	updateNewSendMessage: (newMessageAddOnList: any) => void
}

const socket = io(`${process.env.REACT_APP_API_SOCKET_URL}`)

const AdminMessagesPages: React.FC<Props> = (props: Props) => {
	let {
		getAdminMessages,
		candidateSendMessage,
		candidateMessagesList,
		adminGetConversationDetail,
		conversationDetail,
		getUsersSuggestion,
		userSuggestionList,
		sentMessageStatus,
		profileinfo,
		updateSendMessage,
		updateNewSendMessage,
	} = props

	let [currentConversationID, setCurrentConversationID] = useState({
		conversationId: '',
		receiverId: '',
		job: null,
	})

	let [currentConvoDate, setCurrentConvoStateDate] = useState('')

	let [messageParams, setMessageParams] = useState({
		message: '',
		conversation_id: currentConversationID.conversationId,
		receiver_id: currentConversationID.receiverId,
	})

	useEffect(() => {
		if (!sentMessageStatus.loading && sentMessageStatus.success)
			setMessageParams({ ...messageParams, message: '' })
	}, [sentMessageStatus])

	//-------------------------

	const updateMessageParams = (event: any, emoji: boolean) => {
		if (emoji === false) {
			setMessageParams({ ...messageParams, message: event.target.value })
		} else {
			setMessageParams({
				...messageParams,
				message: `${messageParams.message}  ${event.emoji}`,
			})
		}
	}

	// let addMessageOnListData = {
	// 	...messageParams,
	// 	profile_image: profileinfo.profile_image ? profileinfo.profile_image : null,
	// 	created_at: moment().format(),
	// 	name: `${profileinfo.first_name} ${profileinfo.last_name}`,
	// 	sender_id: profileinfo._id,
	// 	read: false,
	// }

	/* ----------------------Send Message----------------------------*/

	const sendMessageTo = (event: any) => {
		if (event.key === 'Enter') {
			event.preventDefault()
			setMessageParams({ ...messageParams, message: '' })
			console.log('check', messageParams)
			candidateSendMessage(messageParams)
		}
	}

	const setCurrentConvoDate = (convoDate: any) => {
		setCurrentConvoStateDate(convoDate)
	}

	const setCurrentConvoId = (
		receiverID: any,
		conversationID: any,
		job: any
	) => {
		setCurrentConversationID({
			...currentConversationID,
			conversationId: conversationID,
			receiverId: receiverID,
			job: job,
		})

		setMessageParams({
			...messageParams,
			receiver_id: receiverID,
			conversation_id: conversationID,
		})

		adminGetConversationDetail(conversationID)
	}

	useEffect(() => {
		console.log('check details  ', conversationDetail, messageParams)
		getAdminMessages()
		getUsersSuggestion()
	}, [])

	useEffect(() => {
		if (profileinfo && profileinfo._id) {
			socket.off(`${profileinfo.user_id}-new-message`)
			socket.on(`${profileinfo.user_id}-new-message`, (data) => {
				updateNewSendMessage(data)
			})
		}
	}, [profileinfo])

	return (
		<div className='messagesPageMainContainer'>
			<div className='messagesPageInnerContainer'>
				<div className='messagesPageMessengerSection'>
					<CandidateMessenger
						setCurrentConvoID={setCurrentConvoId}
						messagesList={candidateMessagesList}
						updateSendMessage={updateSendMessage}
						setCurrentConvoDate={setCurrentConvoDate}
						userSuggestionList={userSuggestionList}
					/>
				</div>
				<div className='messagesPageConversationSectionAdmin'>
					{conversationDetail.success ? (
						<MessagePageConversation
							conversationID={currentConversationID.conversationId}
							updateMessageParams={updateMessageParams}
							sendMessage={candidateSendMessage}
							sendMessageTo={sendMessageTo}
							conversationDetail={conversationDetail}
							currentMessage={messageParams.message}
							currentConvoDate={currentConvoDate}
						/>
					) : (
						<div className='ClickAMessageDiv'>
							<h3>Click any messages on left.</h3>
						</div>
					)}
				</div>
				{/* <div className='messagesPageJobDescriptionSection'>
					<MessageJobDescription job={currentConversationID.job} />
				</div> */}
			</div>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	candidateMessagesList: state.socialFeatureReducer.candidateMessagesList,
	sentMessageStatus: state.socialFeatureReducer.candidateSendMessage,
	conversationDetail: state.socialFeatureReducer.candidateConversationDetail,
	userSuggestionList: state.socialFeatureReducer.userSuggestions,
	profileinfo: state.profileReducer.profileinfo,
})

const actions = {
	getAdminMessages,
	candidateSendMessage,
	adminGetConversationDetail,
	getUsersSuggestion,
	profileAllInfoAction,
	updateSendMessage,
	updateNewSendMessage,
}

export default connect(mapStateToProps, actions)(AdminMessagesPages)
