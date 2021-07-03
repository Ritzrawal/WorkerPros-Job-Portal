import React, { useEffect, useState, createRef } from 'react'
import { Toast, ToastBody, Modal, ModalFooter } from 'reactstrap'
// import './dashBoardCards.css'
import FontAwesome from 'react-fontawesome'
import Moment from 'moment'
import { ButtonWithCustyomeStyling } from '../../../component'
import { connect } from 'react-redux'
import { ProfileDummyImage } from '../../../component/logosAndIcons'

import $ from 'jquery'

import {
	deleteDashboardPost,
	commentOnPost,
	likeUnlikePost,
} from '../../../store/action/workerDashboardAction'

interface Props {
	deleteDashboardPost: (params: any) => void
	likeUnlikePost: (params: any) => void
	addPostComment: (postId: string, event: any) => void
	changePostComment: (event: any) => void
	commentMessage?: string
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
	comments?: []
	postLiked?: boolean
	totalPostLikes?: any
	ref?: any
	updateDynamicHeight: any
}

const AdminImagePostComponent: React.FC<Props> = (props: Props) => {
	const {
		firstName,
		lastName,
		userImage,
		createdAt,
		postText,
		postImage,
		postId,
		totalPostLikes,
		likeUnlikePost,
		deleteDashboardPost,
		updateDynamicHeight,
	} = props

	let [showPostMenu, setShowPostMenu] = useState(false)
	const [modal, setModal] = useState(false)
	const [show, setShow] = useState(false)
	const [imageModal, setImageModal] = useState(false)
	const toggle = () => setModal(!modal)

	const toggleLikePost = () => {
		likeUnlikePost(postId)
	}

	const togglePostMenu = () => {
		setShowPostMenu(!showPostMenu)
	}

	const togglePostView = () => {
		setImageModal(!imageModal)
	}
	const cancelConfirm = () => {
		setShow(!show)
		// deleteDashboardPost(postId)
	}
	const deletePostAdmin = () => {
		deleteDashboardPost(postId)
		setShow(!show)
	}

	useEffect(() => {
		$(document).ready(function () {
			$('p').html(function (_, html) {
				return html.replace(/(\#\w+)/g, '<span class="blueColorHash">$1</span>')
			})
		})
	}, [postText])

	const divResized = () => {
		console.log('div is resized')
	}
	const divRef: any = createRef()
	useEffect(() => {
		if (divRef.current) {
			divRef.current.addEventListener('resize', divResized)

			const boundingRect = divRef.current.getBoundingClientRect()
			const { width, height } = boundingRect

			if (height && width) {
				updateDynamicHeight(height)
			}
		}
	})

	return (
		<div className='imagePostMainDiv' ref={divRef}>
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
				<div className='AdminSocialRemoveButtonContainer'>
					<ButtonWithCustyomeStyling
						clickHandler={cancelConfirm}
						buttonTitle='Remove'
						paddingLeft={20}
						paddingRight={20}
						color='#CB1E1E'
						backgroundColor='#FFFFFF'
						borderColor='#CB1E1E'
						marginRight={19}
					/>
				</div>
				<Modal
					isOpen={show}
					centered
					toggle={cancelConfirm}
					className='ModalContainerCustomizerAlert'
				>
					<p className='DeleteModalTetxCustomize'>
						Are you want sure you want to Delete?
					</p>
					<div className='ModalCustomizerButton'>
						<ButtonWithCustyomeStyling
							clickHandler={cancelConfirm}
							buttonTitle='Cancle'
							paddingLeft={20}
							paddingRight={20}
							color='#2EC2E2'
							backgroundColor='#FFFFFF'
							borderColor='#2EC2E2'
							marginRight={19}
						/>
						<ButtonWithCustyomeStyling
							clickHandler={deletePostAdmin}
							buttonTitle='Delete'
							paddingLeft={20}
							paddingRight={20}
							color='#FFFFFF'
							backgroundColor='#CB1E1E'
							borderColor='#CB1E1E'
							marginRight={19}
						/>
					</div>
				</Modal>
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
					{totalPostLikes} {`${totalPostLikes < 2 ? 'Like' : 'Likes'}`}
				</div>
			)}

			<div className='LikeCommentDiv'>
				<span className='imagePostLike'>
					<FontAwesome className='likeButtonDashBoard' name='thumbs-up' />
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
})(AdminImagePostComponent)
