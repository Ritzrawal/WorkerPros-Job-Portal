import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import InfiniteScroll from 'react-infinite-scroll-component'

import InputBox from '../../../../component/employer/input/inputBox/inputBox'
import { MessagesCard } from '../../../../component'

import FilterIcon from '../../../../assets/images/filterIcon.png'
import './messageList.css'
import { getValue } from '../../../../service/storage'

const MESSAGE_TYPES = {
	CANDIDATE: 'CANDIDATE',
	BUSINESS: 'BUSINESS',
}

const socket = io(`${process.env.REACT_APP_API_SOCKET_URL}`)
interface Props {
	messageList: any
	currentMessage?: any
	updateSendMessage: (params: any) => void
	getCandidateMessages: (search?: string) => void
	getMoreCandidateMessages: (page: number, search?: string) => void
}

const MessageList: React.FC<Props> = (props: Props) => {
	const {
		messageList,
		currentMessage,
		updateSendMessage,
		getCandidateMessages,
		getMoreCandidateMessages,
	} = props
	console.log({ messageList })

	const [messageType, setMessageType] = useState(MESSAGE_TYPES.CANDIDATE)
	const [search, setSearch] = useState('')
	const [conversationPage, setConversationPage] = useState(1)

	const socketListener = (conversationId) => {
		socket.off(conversationId)
		socket.once(conversationId, (data) => {
			updateSendMessage(data)
		})
	}

	const searchMessage = (event: any) => {
		const { name, value } = event.target

		setSearch(value)
		getCandidateMessages(value)
	}

	const updateConversationPage = () => {
		const newPage = conversationPage + 1

		setConversationPage(newPage)

		if (search !== '') {
			getMoreCandidateMessages(newPage, search)
		} else {
			getMoreCandidateMessages(newPage)
		}
	}

	const getUnreadMessageCount = () => {
		let totalUnread = 0

		if (messageList.data || messageList.data.length) {
			messageList.data.forEach((m) => {
				if (m.total_unread) {
					totalUnread = totalUnread + m.total_unread
				}
			})
		}

		return totalUnread
	}

	return (
		<div className='EmployerMessageList'>
			<div className='EmployerMessageList__Title'>
				Messenger <span>{getUnreadMessageCount()}</span>
			</div>
			<div className='EmployerMessageList__Option'>
				<div
					className={`EmployerMessageList__Option--Candidate ${
						messageType === MESSAGE_TYPES.CANDIDATE ? 'Active' : ''
					}`}
					onClick={() => setMessageType(MESSAGE_TYPES.CANDIDATE)}
				>
					Candidate
				</div>
				<div
					className={`EmployerMessageList__Option--Business ${
						messageType === MESSAGE_TYPES.BUSINESS ? 'Active' : ''
					}`}
					onClick={() => setMessageType(MESSAGE_TYPES.BUSINESS)}
				>
					Business
				</div>
			</div>
			<div className='EmployerMessageList__Search'>
				<InputBox
					leftIcon={faSearch}
					leftIconColor={'#2EC2E2'}
					rightImage={FilterIcon}
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
			<div id='ScrollableDiv' className='EmployerMessageList__List'>
				{messageList.data && messageList.data.length ? (
					<InfiniteScroll
						dataLength={messageList.data.length}
						next={updateConversationPage}
						hasMore={true}
						loader={null}
						scrollableTarget='ScrollableDiv'
					>
						{messageList.data.map((m: any, index) => {
							socketListener(m.conversation_id)

							return (
								<div
									key={index}
									className='EmployerMessageList__List--MessageListBox'
								>
									<Link to={`/employer/message/${m.conversation_id}`}>
										<MessagesCard
											isAdminDeleted={m.message.is_admin_deleted}
											profile_image={`${process.env.REACT_APP_IMAGE_URL}${m.profile_image}`}
											unreadCount={m.total_unread}
											name={m.name}
											time={m.message?.created_at}
											last_message={m.message?.message}
											active={
												currentMessage &&
												currentMessage.conversation_id === m.conversation_id
													? true
													: false
											}
											clickHandler={() => console.log('test')}
										/>
									</Link>
								</div>
							)
						})}
					</InfiniteScroll>
				) : null}
			</div>
		</div>
	)
}

export default MessageList
