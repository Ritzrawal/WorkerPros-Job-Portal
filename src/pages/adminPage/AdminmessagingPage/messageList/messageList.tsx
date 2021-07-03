import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import InputBox from '../../../../component/employer/input/inputBox/inputBox'
import {
	AdminMessagesCard,
	SwitchButtonComponentCustom,
} from '../../../../component'
import { textMessageAlert } from '../../../../component/logosAndIcons'
import { connect } from 'react-redux'
import FilterIcon from '../../../../assets/images/filterIcon.png'
import './messageList.css'

import {
	getAdminSearchMessages,
	getSupportMessages,
} from '../../../../store/action/socialFeatureAction'
const MESSAGE_TYPES = {
	CANDIDATE: 'CANDIDATE',
	BUSINESS: 'BUSINESS',
}

const socket = io(`${process.env.REACT_APP_API_SOCKET_URL}`)
interface Props {
	messageList: any
	currentMessage?: any
	getAdminSearchMessages: (search: string) => void
	getSupportMessages: () => void
	dataCount?: string
	updateSendMessage: (params: any) => void
}

const MessageList: React.FC<Props> = (props: Props) => {
	const {
		messageList,
		currentMessage,
		updateSendMessage,
		dataCount,
		getAdminSearchMessages,
		getSupportMessages,
	} = props

	const [messageType, setMessageType] = useState(MESSAGE_TYPES.CANDIDATE)
	const [allMessageList, setAllMessageList] = useState(messageList)
	const [search, setSearch] = useState('')

	const socketListener = (conversationId) => {
		console.log('hello soc')
		let audio = new Audio(textMessageAlert)
		socket.off(conversationId)
		socket.once(conversationId, (data) => {
			audio.play()
			console.log('hello socket ', data)
			updateSendMessage(data)
		})
	}

	const searchMessage = (event: any) => {
		let value = event.target.value
		let newMessageList = messageList
		if (messageList && messageList?.length && value !== '') {
			console.log('hello console', messageList)
			getAdminSearchMessages(search)
			// newMessageList = messageList.filter(
			// 	(val: any) => val.name.toLowerCase().search(value.toLowerCase()) !== -1
			// )
		}

		setSearch(value)
		setAllMessageList(newMessageList)
	}

	return (
		<div className='AdminEmployerMessageList'>
			<div className='AdminEmployerMessageList__List'>
				{allMessageList &&
					allMessageList.map((m: any, index) => {
						socketListener(m.conversation_id)

						return (
							<div
								key={index}
								className='AdminEmployerMessageList__List--MessageListBox'
							>
								<Link to={`/admin/messaging/${m.conversation_id}`}>
									<AdminMessagesCard
										profile_image={`${process.env.REACT_APP_IMAGE_URL}${m.profile_image}`}
										profile={m.members}
										list={dataCount}
										name={m?.name}
										time={m.message?.created_at}
										last_message={m.message?.message}
										active={
											currentMessage &&
											currentMessage.conversation_id === m.conversation_id
												? true
												: false
										}
										clickHandler={() => console.log(m.conversation_id)}
									/>
								</Link>
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default connect(null, { getAdminSearchMessages, getSupportMessages })(
	MessageList
)
