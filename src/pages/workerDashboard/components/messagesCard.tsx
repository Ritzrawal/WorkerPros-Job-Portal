import React from 'react'
import './dashBoardCards.css'
import Person3 from '../../../assets/images/worker-dashboard/person-3.png'
import MessageNum from '../../../assets/images/worker-dashboard/messageNum.png'
import { ProfileDummyImage } from '../../../component/logosAndIcons'
import renderHTML from 'react-render-html'
import { Spinner } from 'reactstrap'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Link } from 'react-router-dom'

interface Props {
	test?: string
	conversationData: any
}

const MessageCard: React.FC<Props> = (props: Props) => {
	const { conversationData } = props
	console.log('Conversation list from messages card', conversationData)
	return (
		<div className='messageCardMainDiv'>
			<div className='messageCardTitle'>
				<span>Messages</span>
			</div>
			<div className='messageList'>
				<ul className='messageCardUL'>
					{conversationData.loading ? (
						<div style={{ marginBottom: '15px', color: 'grey' }}>
							<SkeletonTheme color='#95afc0' highlightColor='#2ec2e2'>
								<p>
									<Skeleton count={3} />
								</p>
							</SkeletonTheme>
						</div>
					) : conversationData.data.length === 0 ? (
						<div className='noMessageDashboard'>
							No Messages! <br /> Send your first message by clicking on
							messages tab from Navigation Bar.
						</div>
					) : (
						conversationData.data.slice(0, 3).map((value, index) => {
							return (
								<Link
									style={{ textDecoration: 'none' }}
									to={`/messages/${value.conversation_id}/${value.receiver_id}`}
									key={index}
								>
									<li key={index}>
										<div className='messageCardImageDiv'>
											<div className='messageCardInnerDiv'>
												<img
													src={
														value.profile_image
															? process.env.REACT_APP_IMAGE_URL +
															  value.profile_image
															: ProfileDummyImage
													}
												/>
											</div>
										</div>
										<div className='messageCardMessageDiv'>
											<span className='messageCardUserName'>{value.name}</span>
											<span className='messageCardUserMessage'>
												{value.message && !value.message.is_admin_deleted
													? value.message.message.length < 30
														? renderHTML(value.message.message)
														: `${renderHTML(
																value.message.message?.slice(0, 30)
														  )}...`
													: 'Your message has been deleted due to violation of terms and condition'}
											</span>
										</div>
										{!value.message.read && (
											<span className='messageNumLogoDiv'>
												{value.total_unread}
											</span>
										)}
									</li>
								</Link>
							)
						})
					)}
				</ul>
			</div>
		</div>
	)
}

export default MessageCard
