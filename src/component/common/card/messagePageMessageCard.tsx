import React, { useState } from 'react'
import './cardStyle.css'
import { ProfileDummyImage } from '../../logosAndIcons'
import { Modal, ModalBody, FormGroup, Input } from 'reactstrap'
import renderHTML from 'react-render-html'
import Moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faTimes,
	faMapMarker,
	faDollarSign,
} from '@fortawesome/free-solid-svg-icons'
interface Props {
	text?: string
	name?: string
	messageTime?: string
	messageText?: string
	senderImage?: string
	receiverImage?: string
	currentUserId?: string
	messageSenderId?: string
	companyname?: string
	active?: boolean
	show?: boolean
	onDelete?: () => void
}

const MessagePageMessageCard: React.FC<Props> = (props: Props) => {
	const {
		name,
		messageTime,
		messageText,
		receiverImage,
		senderImage,
		currentUserId,
		messageSenderId,
		companyname,
		active,
		show,
		onDelete,
	} = props

	const [modal, setModal] = useState(false)
	const [imageModal, setImageModal] = useState(false)
	const toggle = () => setModal(!modal)

	const togglePostView = () => {
		setImageModal(!imageModal)
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			<div
				className={`messagePageConversationMessageCard ${
					currentUserId === messageSenderId ? 'sentMessageDesign' : ''
				} `}
			>
				<div className='messageCardLeft'>
					{' '}
					<img src={receiverImage}></img>
				</div>
				<div className='messageCardRight'>
					<div className='messageCardUserInfo'>
						<span className='messageCardRightName'>{name}</span>{' '}
						{companyname && (
							<span className='messageCardCompanyName'>{companyname}</span>
						)}
						<span className='messageCardRightTime'>
							{Moment(messageTime).format('h:mm a')}
						</span>
					</div>

					<span className='messageCardRightBottom'>
						{renderHTML(messageText)}
					</span>
				</div>
				<>
					<Modal
						isOpen={imageModal}
						toggle={togglePostView}
						className='postImageViewModal'
						fade={false}
					>
						<ModalBody>
							<div className='imageViewModal'>
								<img src={`${process.env.REACT_APP_IMAGE_URL}${messageText}`} />
							</div>
						</ModalBody>
					</Modal>
				</>
			</div>
			{show && !active && (
				<div style={{ paddingLeft: 20 }} onClick={onDelete}>
					<FontAwesomeIcon
						className='SupportIconAwesomeCustomize'
						icon={faTimes}
					/>
				</div>
			)}
		</div>
	)
}

export default MessagePageMessageCard
