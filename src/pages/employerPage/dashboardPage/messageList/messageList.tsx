import React from 'react'
import { Link } from 'react-router-dom'

import MessageListBox from './messageListBox/messageListBox'

import './messageList.css'

interface Props {
	candidateMessagesList: any
}

const MessageList: React.FC<Props> = (props: Props) => {
	const { candidateMessagesList } = props

	return (
		<div className='EmployerDashboardMessageList'>
			<div className='EmployerDashboardMessageList__Title'>
				<div className='EmployerDashboardMessageList__Title--Left'>
					Messages
				</div>
				<div className='EmployerDashboardMessageList__Title--Right'>
					<Link to={'/employer/message'}>All Messages</Link>
				</div>
			</div>
			<div className='EmployerDashboardMessageList__Body'>
				{candidateMessagesList &&
					candidateMessagesList.map((m, index) => {
						if (index < 3) {
							return (
								<div
									key={index}
									className='EmployerDashboardMessageList__Body--MessageListBox BottomBorder'
								>
									<MessageListBox
										conversationId={m.conversation_id}
										image={m.profile_image}
										name={m.name}
										time={m.message?.created_at}
										message={m.message.message}
									/>
								</div>
							)
						}
					})}
			</div>
		</div>
	)
}

export default MessageList
