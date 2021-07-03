import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import {
	getAdminMessages,
	getSupportMessages,
	adminGetConversationDetail,
	adminSendMessage,
	updateSendMessage,
	getAdminSearchMessages,
	getSupportSearchMessages,
	adminGetMoreConversationDetail,
} from '../../../store/action/socialFeatureAction'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import InputBox from '../../../component/employer/input/inputBox/inputBox'
import { SwitchButtonComponentCustom } from '../../../component'
import { AdminSidebar, AdminNavbar } from '../../../component/admin'
import MessageList from './messageList/messageList'
import MessageDetail from './messageDetail/messageDetail'
import MessageInfo from './messageInfo/messageInfo'
import './messagingPage.css'
const MESSAGE_TYPES = {
	CANDIDATE: 'CANDIDATE',
	BUSINESS: 'BUSINESS',
}

interface Props {
	getAdminMessages: () => void
	getAdminSearchMessages: (value: string) => void
	getSupportSearchMessages: (value: any) => void
	getSupportMessages: () => void
	candidateMessagesList: any
	adminGetConversationDetail: (conversationID: string) => void
	candidateConversationDetail: any
	employerProfileDetail: any
	adminSendMessage: (messageParams) => void
	updateSendMessage: (messageParams: any) => void
	adminGetMoreConversationDetail: (conversationID: string, page: number) => void
	match: any
	active: boolean
}

const AdminMessagingPage: React.FC<Props> = (props: Props) => {
	const [messageType, setMessageType] = useState(MESSAGE_TYPES.CANDIDATE)
	const {
		getAdminMessages,
		getAdminSearchMessages,
		getSupportSearchMessages,
		getSupportMessages,
		candidateMessagesList,
		adminGetConversationDetail,
		candidateConversationDetail,
		employerProfileDetail,
		adminSendMessage,
		updateSendMessage,
		adminGetMoreConversationDetail,
		match,
		active,
	} = props
	const [search, setSearch] = useState('')
	const [supportsearch, setSupportSearch] = useState('')
	const currentMessageId = match.params.messageid

	useEffect(() => {
		{
			active ? getSupportMessages() : getAdminMessages()
		}
	}, [active])

	useEffect(() => {
		if (currentMessageId) {
			adminGetConversationDetail(currentMessageId)
		}
	}, [match.params.messageid, candidateMessagesList.data.conversation_id])

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
			adminSendMessage({
				message,
				conversation_id: currentMessage.conversation_id,
				// receiver_id: currentMessage.receiver_id,
			})
		}
	}

	const getMoreMessage = (page) => {
		const currentMessageId = match.params.messageid

		adminGetMoreConversationDetail(currentMessageId, page)
	}
	const searchMessage = (event: any) => {
		let value = event.target.value
		setSearch(value)
		getAdminSearchMessages(search)
	}
	const searchSupportMessage = (event: any) => {
		let value = event.target.value
		setSupportSearch(value)
		getSupportSearchMessages(supportsearch)
	}

	return (
		<>
			<AdminNavbar />
			<div className='AdminMessage'>
				<AdminSidebar collapse={true} />

				<div className='AdminMessage__Body'>
					<div className='AdminMessage__Body--MessageList'>
						<div className='AdminMessage_body_OptionContainer'>
							<div className='AdminEmployerMessageList__Title'>
								Chats{' '}
								<span>
									{candidateMessagesList.data
										? candidateMessagesList?.data?.length
										: 0}
								</span>
							</div>
							<SwitchButtonComponentCustom />
						</div>
						{active ? (
							<div className='AdminEmployerMessageList__Search'>
								<InputBox
									leftIcon={faSearch}
									leftIconColor={'#2EC2E2'}
									internalPadding={'10px'}
									border={'none'}
									error={false}
									label={''}
									type={'text'}
									name={'supportsearch'}
									value={supportsearch}
									placeholder={'Search Messages'}
									onChange={searchSupportMessage}
								/>
							</div>
						) : (
							<div className='AdminEmployerMessageList__Search'>
								<InputBox
									leftIcon={faSearch}
									leftIconColor={'#2EC2E2'}
									internalPadding={'10px'}
									border={'none'}
									error={false}
									label={''}
									type={'text'}
									name={'search'}
									value={search}
									placeholder={'Search Messages'}
									onChange={searchMessage}
								/>
							</div>
						)}

						{!candidateMessagesList.loading && candidateMessagesList.success ? (
							<MessageList
								dataCount={candidateConversationDetail?.data?.length}
								messageList={candidateMessagesList.data}
								currentMessage={getCurrentMessage()}
								updateSendMessage={updateSendMessage}
							/>
						) : null}
					</div>
					<div className='AdminMessage__Body--MessageDetail'>
						{currentMessageId && candidateConversationDetail.success ? (
							<MessageDetail
								active={active}
								messageDetail={candidateConversationDetail}
								currentUser={employerProfileDetail.data?.user}
								sendMessage={sendMessage}
								getMoreMessage={getMoreMessage}
								currentMessage={getCurrentMessage()}
							/>
						) : null}
					</div>
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state) => ({
	active: state.loginReducer.visible,
	candidateMessagesList: state.socialFeatureReducer.candidateMessagesList,
	candidateConversationDetail:
		state.socialFeatureReducer.candidateConversationDetail,
	employerProfileDetail: state.employerProfileReducer.detail,
})

const actions = {
	getAdminMessages,
	getAdminSearchMessages,
	getSupportMessages,
	getSupportSearchMessages,
	adminGetConversationDetail,
	adminSendMessage,
	updateSendMessage,
	adminGetMoreConversationDetail,
}

export default connect(mapStateToProps, actions)(AdminMessagingPage)
