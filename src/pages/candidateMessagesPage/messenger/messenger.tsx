import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Input, Spinner } from 'reactstrap'
import { Link } from 'react-router-dom'
import renderHTML from 'react-render-html'

import './messenger.css'
import {
	BlueSearchIcon,
	ProfileDummyImage,
	textMessageAlert,
} from '../../../component/logosAndIcons'
import { MessagesCard } from '../../../component'
import io from 'socket.io-client'
import MessageList from '../../employerPage/dashboardPage/messageList/messageList'

interface Props {
	text?: string
	messagesList: any
	setCurrentConvoID: (receiverId: any, conversationId: any, job: any) => void
	setCurrentConvoDate: (date: any) => void
	updateSendMessage: (message: any) => void
	setCurrentMessageRead: (conversation_id: string) => void
	convoId: string
}

const socket = io(`${process.env.REACT_APP_API_SOCKET_URL}`)

const CandidateMessenger = (props: Props) => {
	const [currentConvoId, setCurrentConvoId] = useState(null)
	let [unreadMessageCount, setUnreadMessageCount] = useState(0)
	const {
		messagesList,
		setCurrentConvoID,
		updateSendMessage,
		setCurrentConvoDate,
		setCurrentMessageRead,
		convoId,
	} = props

	let [messagesListData, setMessagesListData] = useState([])

	useEffect(() => {
		if (!messagesList.loading && messagesList.success && messagesList.data) {
			let newMessageList = messagesList.data
			setMessagesListData(newMessageList)
		}
	}, [messagesList])

	const socketListener = (convoId: any) => {
		let audio = new Audio(textMessageAlert)
		socket.off(convoId)
		socket.once(convoId, (data) => {
			audio.play()
			updateSendMessage(data)
		})
	}

	const filterMessages = (event: any) => {
		let value = event.target.value
		let newMessageList = messagesList.data
		if (messagesListData && messagesListData.length && value !== '') {
			newMessageList = messagesListData.filter(
				(val: any) => val.name.toLowerCase().search(value.toLowerCase()) !== -1
			)
		}
		setMessagesListData(newMessageList)
	}

	const getUnreadMessageCount = () => {
		let unreadMessage = 0

		if (messagesListData && messagesListData.length) {
			messagesListData.forEach((m: any) => {
				if (m.total_unread) {
					unreadMessage = unreadMessage + m.total_unread
				}
			})
		}

		return unreadMessage
	}

	return (
		<div className='candidateMessengerMainContainer'>
			<div className='candidateMessengerSearchDiv'>
				<span className='candidateMessengerTitle'>
					Messenger <span>{getUnreadMessageCount()}</span>
				</span>
				<div className='searchMessagesInnerDiv'>
					<Form style={{ width: '100%' }}>
						<FormGroup className='searchMessagesInputContainer'>
							<Input
								className='searchMessagesSearchBox'
								placeholder='Search Messages'
								onChange={filterMessages}
							></Input>
							<img
								className='searchMessagesPlaceholderImage'
								src={BlueSearchIcon}
							/>{' '}
						</FormGroup>
					</Form>
				</div>
			</div>
			<div className='candidateMessengerMessageCardDiv'>
				{messagesList.loading ? (
					<div className='Loading__Container'>
						<Spinner />
					</div>
				) : messagesListData.length === 0 ? (
					<div className='noMessageDiv'>No Messages!</div>
				) : (
					messagesListData.map((value: any, index) => {
						socketListener(value.conversation_id)
						return (
							<Link
								style={{ textDecoration: 'none' }}
								to={`/messages/${value.conversation_id}/${value.receiver_id}`}
								key={index}
							>
								<MessagesCard
									key={index}
									isAdminDeleted={value.message.is_admin_deleted}
									name={value.name}
									active={convoId === value.conversation_id ? true : false}
									time={
										value.message ? value.message.created_at : value.created_at
									}
									last_message={value.message ? value.message.message : ''}
									read_unread={value.message.read}
									unreadCount={value.total_unread}
									profile_image={
										value.profile_image
											? `${process.env.REACT_APP_IMAGE_URL}${value.profile_image}`
											: ProfileDummyImage
									}
									clickHandler={() => {
										setCurrentConvoDate(value.created_at)
										setCurrentConvoId(value.conversation_id)
										setCurrentMessageRead(value.conversation_id)
										setCurrentConvoID(
											value.receiver_id,
											value.conversation_id,
											value.job
										)
									}}
								/>
							</Link>
						)
					})
				)}
			</div>
		</div>
	)
}

export default CandidateMessenger
