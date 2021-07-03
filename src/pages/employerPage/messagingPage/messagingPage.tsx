import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import {
	getCandidateMessages,
	candidateGetConversationDetail,
	candidateSendMessage,
	updateSendMessage,
	candidateGetMoreConversationDetail,
	getMoreCandidateMessages,
} from '../../../store/action/socialFeatureAction'

import Navbar from '../../../component/employer/navbar/navbar'
import Sidebar from '../../../component/employer/sidebar/sidebar'

import MessageList from './messageList/messageList'
import MessageDetail from './messageDetail/messageDetail'
import MessageInfo from './messageInfo/messageInfo'

import './messagingPage.css'

interface Props {
	getCandidateMessages: (search?: string) => void
	candidateMessagesList: any
	candidateGetConversationDetail: (conversationID: string) => void
	candidateConversationDetail: any
	employerProfileDetail: any
	candidateSendMessage: (messageParams) => void
	updateSendMessage: (messageParams: any) => void
	candidateGetMoreConversationDetail: (
		conversationID: string,
		page: number
	) => void
	getMoreCandidateMessages: (page: number, search?: string) => void
	match: any
}

const MessagingPage: React.FC<Props> = (props: Props) => {
	const {
		getCandidateMessages,
		candidateMessagesList,
		candidateGetConversationDetail,
		candidateConversationDetail,
		employerProfileDetail,
		candidateSendMessage,
		updateSendMessage,
		candidateGetMoreConversationDetail,
		getMoreCandidateMessages,
		match,
	} = props

	const currentMessageId = match.params.messageid

	useEffect(() => {
		getCandidateMessages()
	}, [])

	useEffect(() => {
		if (currentMessageId) {
			candidateGetConversationDetail(currentMessageId)
		}
	}, [match.params.messageid])

	const getCurrentMessage = () => {
		let currentMessage = null

		if (currentMessageId) {
			const [filteredCurrentMessage] = candidateMessagesList.data.filter(
				(c) => c.conversation_id === currentMessageId
			)

			currentMessage = filteredCurrentMessage
		}

		return currentMessage
	}

	const sendMessage = (message) => {
		const currentMessage: any = getCurrentMessage()

		if (currentMessage && message !== '') {
			candidateSendMessage({
				message,
				conversation_id: currentMessage.conversation_id,
				receiver_id: currentMessage.receiver_id,
			})
		}
	}

	const getMoreMessage = (page) => {
		const currentMessageId = match.params.messageid

		candidateGetMoreConversationDetail(currentMessageId, page)
	}

	return (
		<>
			<Navbar />
			<div className='EmployerMessage'>
				<Sidebar collapse={true} />
				<div className='EmployerMessage__Body'>
					<div className='EmployerMessage__Body--MessageList'>
						<MessageList
							messageList={candidateMessagesList}
							currentMessage={getCurrentMessage()}
							updateSendMessage={updateSendMessage}
							getCandidateMessages={getCandidateMessages}
							getMoreCandidateMessages={getMoreCandidateMessages}
						/>
					</div>
					<div className='EmployerMessage__Body--MessageDetail'>
						{currentMessageId && candidateConversationDetail.success ? (
							<MessageDetail
								messageDetail={candidateConversationDetail}
								currentUser={employerProfileDetail.data?.user}
								sendMessage={sendMessage}
								getMoreMessage={getMoreMessage}
								currentMessage={getCurrentMessage()}
							/>
						) : null}
					</div>
					<div className='EmployerMessage__Body--MessageInfo'>
						{currentMessageId && getCurrentMessage() ? (
							<MessageInfo currentMessage={getCurrentMessage()} />
						) : null}
					</div>
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state) => ({
	candidateMessagesList: state.socialFeatureReducer.candidateMessagesList,
	candidateConversationDetail:
		state.socialFeatureReducer.candidateConversationDetail,
	employerProfileDetail: state.employerProfileReducer.detail,
})

const actions = {
	getCandidateMessages,
	candidateGetConversationDetail,
	candidateSendMessage,
	updateSendMessage,
	candidateGetMoreConversationDetail,
	getMoreCandidateMessages,
}

export default connect(mapStateToProps, actions)(MessagingPage)
