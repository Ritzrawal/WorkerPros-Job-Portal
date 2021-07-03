import React, { useEffect, useState } from 'react'
import './dashBoardCards.css'
import FontAwesome from 'react-fontawesome'
import Moment from 'moment'
import { Modal, ModalBody, FormGroup, Input, Tooltip } from 'reactstrap'
import { connect } from 'react-redux'
import { ButtonComponent } from '../../../component'
import {
	LikeLogo,
	ShareLogo,
	CommentLogo,
	ProfileDummyImage,
} from '../../../component/logosAndIcons'

import $ from 'jquery'

import {
	deleteDashboardPost,
	commentOnPost,
	likeUnlikePost,
} from '../../../store/action/workerDashboardAction'

interface Props {
	deleteDashboardPost: (params: any) => void
	likeUnlikePost: (params: any) => void
	commentOnPost: (params: any, data: any) => void

	test?: string
	firstName?: string
	lastName?: string
	userImage?: string
	createdAt?: string
	postImage?: string
	postText?: string
	deletePost?: any
	postId?: string
	accountUserImage?: string
	postUserId?: string
	accountUserId?: string
	accountFirstName?: string
	likeUnlikePostData?: any
	comments: []
	postLiked?: boolean
	totalPostLikes: number
}

const ImagePostComponent: React.FC<Props> = (props: Props) => {
	const {
		firstName,
		lastName,
		userImage,
		createdAt,
		postText,
		postImage,
		postId,
		deleteDashboardPost,
		likeUnlikePost,
		accountUserImage,
		accountFirstName,
		postUserId,
		accountUserId,
		comments,
		postLiked,
		totalPostLikes,
		commentOnPost,
	} = props

	let [showPostMenu, setShowPostMenu] = useState(false)
	const [modal, setModal] = useState(false)
	const [imageModal, setImageModal] = useState(false)
	const toggle = () => setModal(!modal)
	let [showCommentsNumber, setCommentsNumber] = useState(3)

	const [tooltipOpen, setTooltipOpen] = useState(false)

	const [commentMessage, setCommentMessage] = useState({
		message: '',
	})

	const changePostComment = (event: any) => {
		event.preventDefault()
		const { value } = event.target
		setCommentMessage({
			message: value,
		})
	}

	const toggleTooltip = () => setTooltipOpen(!tooltipOpen)

	const toggleLikePost = () => {
		likeUnlikePost(postId)
	}

	const togglePostMenu = () => {
		setShowPostMenu(!showPostMenu)
	}

	const togglePostView = () => {
		setImageModal(!imageModal)
	}

	// const HASHTAG_FORMATTER = (postText) => {
	// 	return postText.replace(/(^|\s)(#[a-z\d-]+)/gi, (m, h1, h2) => {
	// 		return h1 + h2
	// 	})
	// }

	useEffect(() => {
		$(document).ready(function () {
			$('p').html(function (_, html) {
				return html.replace(/(\#\w+)/g, '<span class="blueColorHash">$1</span>')
			})
		})
	}, [postText])

	//For adding comment on post

	const addPostComment = (postId: any, event: any, commentMessage: any) => {
		if (event.key === 'Enter' && event.target.value !== '') {
			commentOnPost(postId, commentMessage)
			setCommentMessage({
				message: '',
			})
		}
	}

	return (
		<div className='imagePostMainDiv'>
			{showPostMenu && (
				<div
					onClick={() => {
						togglePostMenu()
						toggle()
					}}
					onMouseLeave={() => togglePostMenu()}
					className='dashBoardPostMenu'
				>
					Delete this post
				</div>
			)}

			<div className='imagePostTopSection'>
				<div className='imagePostuserImageDiv'>
					<img
						src={
							userImage
								? `${process.env.REACT_APP_IMAGE_URL}${userImage}`
								: ProfileDummyImage
						}
					/>
				</div>{' '}
				<div className='imagePostUserInfo'>
					<span className='imagePostUserName'>
						{firstName} {lastName}
					</span>
					<span className='imagePostTime'>{Moment(createdAt).fromNow()}</span>
				</div>
			</div>
			<div className='imagePostTextSection'>
				<p>{postText}</p>
			</div>
			{postImage && (
				<div onClick={togglePostView} className='imagePostImageSection'>
					<img src={`${process.env.REACT_APP_IMAGE_URL}${postImage}`} />
				</div>
			)}
			{totalPostLikes !== 0 && (
				<div className='totalLikesDashboard'>
					{' '}
					{totalPostLikes} {`${totalPostLikes < 2 ? 'like' : 'likes'}`}
				</div>
			)}

			<div className='LikeCommentDiv'>
				<span onClick={toggleLikePost} className='imagePostLike'>
					{' '}
					{/* <Tooltip
						placement='right'
						isOpen={tooltipOpen}
						target='TooltipExample'
						toggle={toggleTooltip}
					>
						Hello world!
					</Tooltip> */}
					<FontAwesome
						className={` ${
							postLiked ? 'likeButtonDashBoard liked' : 'likeButtonDashBoard'
						}`}
						name='thumbs-up'
					/>
					Like
				</span>
				<span className='imagePostComment'>
					{' '}
					{/* <img src={CommentLogo} /> */}
					<FontAwesome className='likeButtonDashBoard' name='comment' />
					Comment
				</span>
				<span className='imagePostShare'>
					{' '}
					<FontAwesome className='likeButtonDashBoard' name='share' />
					{/* <img src={ShareLogo} /> */}
					Share
				</span>
			</div>
			<div className='imagePostComponentAddCommentDiv'>
				<FormGroup className='writeCommentInputContainer'>
					<Input
						className='dashBoardCommentInputField'
						placeholder={`Comment as ${accountFirstName}`}
						value={commentMessage.message}
						name='postComment'
						onChange={changePostComment}
						autoComplete={'off'}
						onKeyDown={(e) => addPostComment(postId, e, commentMessage)}
					></Input>
					<img
						className='writeCommentPlaceholderImage'
						src={
							userImage
								? `${process.env.REACT_APP_IMAGE_URL}${accountUserImage}`
								: ProfileDummyImage
						}
					/>{' '}
				</FormGroup>
			</div>
			<div className='postComments'>
				{comments?.slice(0, showCommentsNumber).map((value: any, index) => {
					return (
						<div className='dashBoardCommentInputField' key={index}>
							<img
								className='dashBoardCommentUserImage'
								src={
									value.user.profile_image
										? `${process.env.REACT_APP_IMAGE_URL}${value.user.profile_image}`
										: ProfileDummyImage
								}
							></img>
							<div className='postCommentTexts'>
								{' '}
								<div className='postCommentNameTimeDiv'>
									<span className='dashboardCommenterName'>
										{value.user.first_name} {value.user.last_name}
									</span>
									<span className='dashboardCommentTime'>
										{Moment(value.created_at).fromNow()}
									</span>
								</div>
								<span className='dashboardCommenterComment'>
									{value.message}
								</span>
							</div>
						</div>
					)
				})}
			</div>
			{comments?.length > 3 && (
				<div
					onClick={() => setCommentsNumber((showCommentsNumber += 3))}
					className='loadMoreCommentsDashboard'
				>
					Load More Comments
				</div>
			)}

			{accountUserId === postUserId ? (
				<FontAwesome onClick={togglePostMenu} name='ellipsis-h' />
			) : (
				''
			)}

			<>
				<Modal
					fade={false}
					isOpen={modal}
					toggle={toggle}
					className='storyModal'
				>
					<ModalBody>
						<div className='JobDescription_LoginAlertDiv'>
							<h3>Are you sure you want to delete this post ?</h3>
							<div className='JobDescription_LoginAlertDiv_Button'>
								<ButtonComponent
									width={120}
									height={50}
									buttonTitle={'Cancel'}
									clickHandler={() => {
										toggle()
									}}
								/>
								{'       '}
								<ButtonComponent
									width={120}
									height={50}
									buttonTitle={'Delete'}
									borderColor='#c23616'
									backgroundColor='#c23616'
									clickHandler={() => {
										toggle()
										deleteDashboardPost(postId)
									}}
								/>{' '}
							</div>
						</div>
					</ModalBody>
				</Modal>
			</>
			<>
				<Modal
					isOpen={imageModal}
					toggle={togglePostView}
					className='postImageViewModal'
					fade={false}
				>
					<ModalBody>
						<div className='imageViewModal'>
							<img src={`${process.env.REACT_APP_IMAGE_URL}${postImage}`} />
						</div>
					</ModalBody>
				</Modal>
			</>
		</div>
	)
}

const mapStatesToProps = (state: any) => ({
	deletePost: state.workerDashboardReducer.deleteDashboardPost,
	likeUnlikePostData: state.workerDashboardReducer.dashBoardLikeUnlikePost,
	profileinfo: state.profileReducer.profileinfo,
})

export default connect(mapStatesToProps, {
	deleteDashboardPost,
	likeUnlikePost,
	commentOnPost,
})(ImagePostComponent)
