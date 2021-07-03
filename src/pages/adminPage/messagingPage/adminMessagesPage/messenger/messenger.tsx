import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Input, Spinner, Badge } from 'reactstrap'

import './messenger.css'
import {
	BlueSearchIcon,
	ProfileDummyImage,
	sendMessageSound,
} from '../../../../../component/logosAndIcons'

import { AdminMessagesCard } from '../../../../../component'
import io from 'socket.io-client'
import { SwitchButtonComponentCustom } from '../../../../../component'

interface Props {
	text?: string
	messagesList: any
	userSuggestionList?: any
	setCurrentConvoID: (receiverId: any, conversationId: any, job: any) => void
	setCurrentConvoDate: (date: any) => void
	updateSendMessage: (message: any) => void
}

const socket = io(`${process.env.REACT_APP_API_SOCKET_URL}`)

const CandidateMessenger = (props: Props) => {
	const [currentConvoId, setCurrentConvoId] = useState(null)
	const {
		messagesList,
		setCurrentConvoID,
		updateSendMessage,
		setCurrentConvoDate,
	} = props

	const socketListener = (convoId: any) => {
		let audio = new Audio(sendMessageSound)
		socket.off(convoId)
		socket.once(convoId, (data) => {
			audio.play()
			updateSendMessage(data)
		})
	}
	useEffect(() => {
		console.log('message', messagesList)
	}, [messagesList])

	return (
		<div className='candidateMessengerMainContainer'>
			<span className='candidateMessengerTitle'>Chats</span>
			<Badge className='AdminTotalChatBadge'>
				<span>{messagesList?.data?.length}</span>
			</Badge>
			<div className='AdminSwitchComponentCustomize'>
				<SwitchButtonComponentCustom />
			</div>

			<div className='candidateMessengerSearchDiv'>
				<div className='searchMessagesInnerDiv'>
					<Form style={{ width: '100%' }}>
						<FormGroup className='searchMessagesInputContainer'>
							<Input
								className='searchMessagesSearchBox'
								placeholder='Search Messages'
							></Input>
							<img
								className='searchMessagesPlaceholderImage'
								src={BlueSearchIcon}
							/>{' '}
						</FormGroup>
					</Form>
				</div>
			</div>
			<select
				className='AdminMessagingSelectCustomize'
				// onChange={(e: any) => {
				// 	setCurrentConversationID({
				// 		...currentConversationID,
				// 		conversationId: '',
				// 		receiverId: e.target.value,
				// 	})
				// 	setMessageParams({
				// 		...messageParams,
				// 		receiver_id: e.target.value,
				// 		conversation_id: '',
				// 	})
				// }}
			>
				{props.userSuggestionList.data.map((value: any, index) => {
					return (
						<option key={index} value={value.user_id}>
							{value.first_name}
						</option>
					)
				})}
			</select>
			<div className='candidateMessengerMessageCardDiv'>
				{messagesList.loading ? (
					<div className='Loading__Container'>
						<Spinner />
					</div>
				) : messagesList.data.length === 0 ? (
					<div className='noMessageDiv'>No Messages!</div>
				) : (
					messagesList.data.map((value, index) => {
						socketListener(value.conversation_id)
						// return (
						// 	<AdminMessagesCard
						// 		key={index}
						// 		profile={value.members}
						// 		company_name='Microsoft'
						// 		active={currentConvoId === value.conversation_id ? true : false}
						// 		time={
						// 			value.message ? value.message.created_at : value.created_at
						// 		}
						// 		last_message={value.message ? value.message.message : ''}
						// 		profile_image={
						// 			value.profile_image
						// 				? `${process.env.REACT_APP_IMAGE_URL}${value.profile_image}`
						// 				: ProfileDummyImage
						// 		}
						// 		clickHandler={() => {
						// 			setCurrentConvoDate(value.created_at)
						// 			setCurrentConvoId(value.conversation_id)
						// 			setCurrentConvoID(
						// 				value.receiver_id,
						// 				value.conversation_id,
						// 				value.job
						// 			)
						// 		}}
						// 	/>
						// )
					})
				)}
			</div>
		</div>
	)
}

export default CandidateMessenger
