import React, { useState, useEffect } from 'react'
import Header from '../headerPage/headerComponent2'
import './candidateMessagesPage.css'
import CandidateMessenger from './messenger/messenger'
import MessagePageConversation from './conversation/conversation'
import MessageJobDescription from './messageJobDescription/messageJobDescription'
import moment from 'moment'
import {
	getCandidateMessages,
	candidateSendMessage,
	candidateGetConversationDetail,
	updateSendMessage,
	updateNewSendMessage,
	setMessageRead,
	candidateGetMoreConversationDetail,
} from '../../store/action/socialFeatureAction'

import io from 'socket.io-client'

import { getUsersSuggestion } from '../../store/action/socialFeatureAction'
import { profileAllInfoAction } from '../../store/action/profileAction'
import { connect } from 'react-redux'
import {
	ProfileDummyImage,
	textMessageAlert,
} from '../../component/logosAndIcons'

interface Props {
	getCandidateMessages: () => void
	candidateSendMessage: (message: any) => void
	candidateGetConversationDetail: (convoID: string) => void
	setMessageRead: (conversationID: string) => void
	getUsersSuggestion: () => void
	candidateMessagesList: any
	conversationDetail: any
	userSuggestionList: any
	sentMessageStatus: any
	profileinfo: any
	updateSendMessage: (messageAddOnList: any) => void
	updateNewSendMessage: (newMessageAddOnList: any) => void
	candidateGetMoreConversationDetail: (
		conversationID: string,
		page: number
	) => void
	match: any
	history: any
}

const socket = io(`${process.env.REACT_APP_API_SOCKET_URL}`)

const CandidateMessagesPage: React.FC<Props> = (props: Props) => {
	let {
		getCandidateMessages,
		candidateSendMessage,
		candidateMessagesList,
		candidateGetConversationDetail,
		candidateGetMoreConversationDetail,
		conversationDetail,
		getUsersSuggestion,
		userSuggestionList,
		setMessageRead,
		sentMessageStatus,
		profileinfo,
		updateSendMessage,
		updateNewSendMessage,
		match,
	} = props

	let [currentConversationID, setCurrentConversationID] = useState({
		conversationId: '',
		receiverId: '',
		job: null,
	})

	// ------------------  For getting current conversation detail

	const getCurrentConversationDetail = () => {
		const currentConversationId = props.match.params.convoId

		const [currentConversation] = candidateMessagesList.data.filter(
			(value) => value.conversation_id === currentConversationId
		)
		return currentConversation
	}

	let [currentConvoDate, setCurrentConvoStateDate] = useState('')

	let [messageParams, setMessageParams] = useState({
		message: '',
		files: '',
		conversation_id: currentConversationID.conversationId,
		receiver_id: props.match.params.receiverId,
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

	/* ----------------------Send Message----------------------------*/

	const sendMessageTo = (event: any) => {
		let currentDetail: any = getCurrentConversationDetail()

		if (event.key === 'Enter') {
			event.preventDefault()

			if (currentDetail && currentDetail.job_id) {
				candidateSendMessage({ ...messageParams, job_id: currentDetail.job_id })
			} else {
				candidateSendMessage(messageParams)
			}

			setMessageParams({ ...messageParams, message: '', files: '' })
			setFileAttachment('')
		}
	}

	const sendMessageOnClick = () => {
		let currentDetail: any = getCurrentConversationDetail()

		if (currentDetail && currentDetail.job_id) {
			candidateSendMessage({ ...messageParams, job_id: currentDetail.job_id })
		} else {
			candidateSendMessage(messageParams)
		}

		setMessageParams({ ...messageParams, message: '', files: '' })
		setFileAttachment('')
	}

	const setCurrentConvoDate = (convoDate: any) => {
		setCurrentConvoStateDate(convoDate)
	}

	/* ----------------------Send Message With Attachment----------------------------*/

	let [fileAttached, setFileAttachment] = useState('')

	const updateFileAttachment = (event: any) => {
		const { name, files } = event.target
		setMessageParams({
			...messageParams,
			files: files[0],
		})
		// setFileAttachment(window.URL.createObjectURL(files[0].name))
		setFileAttachment(files[0].name)
	}

	/* ----------------------Set Message Read----------------------------*/

	const setCurrentMessageRead = (conversation_id: string) => {
		console.log('conversation id here bro', conversation_id)
		setMessageRead(conversation_id)
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
		// candidateGetConversationDetail(conversationID)
	}

	useEffect(() => {
		getCandidateMessages()
		getUsersSuggestion()
	}, [])

	//--Get More Messages on Scroll

	const getMoreMessage = (page) => {
		const currentConvoID = match.params.convoId

		candidateGetMoreConversationDetail(currentConvoID, page)
	}

	// ----------------For rendering messages according to convo id params

	useEffect(() => {
		let convoId = props.match.params.convoId
		let receiverId = props.match.params.receiverId
		setMessageParams({ ...messageParams, receiver_id: receiverId })

		candidateGetConversationDetail(convoId)
	}, [props.match.params.convoId, props.match.params.receiverId])

	// ---------------- For getting conversation List of first message on left

	// useEffect(() => {
	// 	if (
	// 		candidateMessagesList &&
	// 		candidateMessagesList.data &&
	// 		candidateMessagesList.data.length
	// 	) {
	// 		props.history.push(
	// 			`/messages/${candidateMessagesList.data[0].conversation_id}/${candidateMessagesList.data[0].receiver_id}`
	// 		)
	// 	}
	// }, [candidateMessagesList])

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
			<div>
				{' '}
				<Header />
			</div>
			<div className='messagesPageInnerContainer'>
				<div className='messagesPageMessengerSection'>
					{/* <div className='newUserSelectMessage'>
						<select
							onChange={(e: any) => {
								setCurrentConversationID({
									...currentConversationID,
									conversationId: '',
									receiverId: e.target.value,
								})
								setMessageParams({
									...messageParams,
									receiver_id: e.target.value,
									conversation_id: '',
								})
							}}
						>
							{userSuggestionList.data.map((value: any, index) => {
								return (
									<option key={index} value={value.user_id}>
										{value.first_name}
									</option>
								)
							})}
						</select>
					</div> */}
					<CandidateMessenger
						setCurrentConvoID={setCurrentConvoId}
						convoId={props.match.params.convoId}
						messagesList={candidateMessagesList}
						updateSendMessage={updateSendMessage}
						setCurrentConvoDate={setCurrentConvoDate}
						setCurrentMessageRead={setCurrentMessageRead}
					/>
				</div>
				<div className='messagesPageConversationSection'>
					{props.match.params.convoId !== null ? (
						<MessagePageConversation
							getMoreMessage={getMoreMessage}
							conversationID={currentConversationID.conversationId}
							updateMessageParams={updateMessageParams}
							sendMessage={candidateSendMessage}
							sendMessageTo={sendMessageTo}
							sendMessageOnClick={sendMessageOnClick}
							conversationDetail={conversationDetail}
							currentMessage={messageParams.message}
							currentConvoDate={currentConvoDate}
							currentConversation={getCurrentConversationDetail()}
							currentUserId={profileinfo.user_id}
							updateLogo={updateFileAttachment}
							logo={fileAttached}
							logoPreview={fileAttached}
						/>
					) : (
						<div className='ClickAMessageDiv'>
							<h3>Click any messages on left.</h3>
						</div>
					)}
				</div>
				<div className='messagesPageJobDescriptionSection'>
					<MessageJobDescription
						currentConversation={getCurrentConversationDetail()}
						job={currentConversationID.job}
					/>
				</div>
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
	getCandidateMessages,
	candidateSendMessage,
	candidateGetConversationDetail,
	getUsersSuggestion,
	profileAllInfoAction,
	updateSendMessage,
	updateNewSendMessage,
	setMessageRead,
	candidateGetMoreConversationDetail,
}

export default connect(mapStateToProps, actions)(CandidateMessagesPage)
