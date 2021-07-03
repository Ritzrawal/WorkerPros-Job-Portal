import React, { MouseEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { HeaderPage2 } from '../headerPage'
import { getRecommendedJobs } from '../../store/action/job'
import { getUserSuggestion } from '../../store/action/usersListAction'

import {
	ProfileDummyImage,
	PostImageDefault,
} from '../../component/logosAndIcons'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { Link } from 'react-router-dom'

import { applyJob, saveJob } from '../../store/action/job'

import {
	UserDetailCard,
	ConnectionCard,
	InterviewCard,
	MessageCard,
	RecommendedJobCard,
	WritePostComponent,
	ImagePostComponent,
	DashboardStories,
} from './components'

import {
	getCandidateMessages,
	candidateGetConversationDetail,
} from '../../store/action/socialFeatureAction'

import { profileAllInfoAction } from '../../store/action/profileAction'
import {
	workerDashboardDataCountAction,
	addDashboardPost,
	getDashboardPosts,
	commentOnPost,
} from '../../store/action/workerDashboardAction'

import './workerDashboard.css'

interface Props {
	value?: string
	profileinfo: {
		profile_image: string
		first_name: string
		last_name: string
		user: {
			email: string
		}
		user_id: string
		work_experience: []
	}
	addDashboardPost: (params: any) => void
	getDashboardPosts: () => void
	profileAllInfoAction: () => void
	getUserSuggestion: (params: any) => void
	workerDashboardDataCountAction: () => void
	getCandidateMessages: () => void
	commentOnPost: (params: any, data: any) => void
	getRecommendedJobs: (params: any) => void
	applyJob: (params: any) => void
	saveJob: (params: any) => void
	dashBoardDataCount: any
	dashBoardAddPost: any
	dashBoardPosts: any
	dashBoardPostComments: any
	candidateMessagesList: any
	recommendedJobsList: any
	usersList: any
	match?: any
}

const buttons = ['All Posts', 'News']

const WorkerDashboard: React.FC<Props> = (props: Props) => {
	const {
		profileinfo,
		usersList,
		recommendedJobsList,
		dashBoardDataCount,
		getCandidateMessages,
		addDashboardPost,
		commentOnPost,
		dashBoardPostComments,
		dashBoardAddPost,
		dashBoardPosts,
		candidateMessagesList,
	} = props

	let [postLoading, setPostLoading] = useState(false)
	let [showImageUploadField, setImageUploadField] = useState(false)
	let [showVideoUploadField, setVideoUploadField] = useState(false)

	const [newPostData, setNewPostData] = useState({
		message: '',
		image: '',
	})

	const clearImage = () => {
		setNewPostData({ ...newPostData, image: '' })
		setImagePreview('')
	}

	const clearVideo = () => {
		setNewPostData({ ...newPostData, image: '' })
		setVideoPreview('')
	}

	let [imagePreview, setImagePreview] = useState('')

	let [videoPreview, setVideoPreview] = useState('')

	const setImageInPost = (event: any) => {
		const { name, files } = event.target
		setImagePreview(window.URL.createObjectURL(files[0]))
		setNewPostData({ ...newPostData, image: files[0] })
	}

	const setVideoInPost = (event: any) => {
		const { name, files } = event.target
		setVideoPreview(window.URL.createObjectURL(files[0]))
		setNewPostData({ ...newPostData, image: files[0] })
	}

	const changePostData = (event: any) => {
		event.preventDefault()
		const { name, value } = event.target

		if (event.keyCode == 13 || event.key === 'Enter') {
			alert('Enter was pressed was presses')
			// Ensure it is only this code that runs
		} else {
			if (name === 'postText') {
				setNewPostData({ ...newPostData, message: value })
			}
		}
	}

	useEffect(() => {
		props.getUserSuggestion('Test')
		props.getRecommendedJobs('?page=1&limit=10')
		props.workerDashboardDataCountAction()
		props.getDashboardPosts()
		getCandidateMessages()
	}, [])

	//For adding post

	useEffect(() => {
		if (!dashBoardAddPost.loading && dashBoardAddPost.success) {
			setNewPostData({ ...newPostData, message: '', image: '' })
			setImagePreview('')
			setImageUploadField(false)
			setImageUploadField(false)
		}

		setPostLoading(false)
	}, [dashBoardAddPost])

	const showHideVideoUploadField = () => {
		setVideoUploadField(!showVideoUploadField)
	}

	const showHideImageUploadField = () => {
		setImageUploadField(!showImageUploadField)
	}

	const addDashBoardPost = (params: any) => {
		newPostData.message.length < 0
			? console.log('Fill the form')
			: addDashboardPost(newPostData)

		setPostLoading(true)
	}

	useEffect(() => {
		if (!dashBoardPostComments.loading && dashBoardPostComments.success)
			setImagePreview('')

		setPostLoading(false)
	}, [dashBoardPostComments])

	//Fot All And News button on dashboard

	let postsButton = buttons.map((value, index) => {
		return (
			<li
				className='allpostsButton'
				onClick={(e: any) => {
					changeButtonStyling(e)
				}}
				style={{
					backgroundColor: value === 'All Posts' ? '#d5ddea' : 'transparent',
					color: value === 'All Posts' ? '#ffffff' : '#808fa6',
				}}
				key={index}
			>
				{value}
			</li>
		)
	})

	const changeButtonStyling = (
		event: React.MouseEvent<Element, MouseEvent>
	) => {
		const target: any = event.target as EventTarget
		let AllPostButton = document.getElementsByClassName(
			'allpostsButton'
		) as HTMLCollectionOf<HTMLElement>

		for (let i = 0; i < AllPostButton.length; i++) {
			AllPostButton[i].style.border = 'none'
			AllPostButton[i].style.backgroundColor = 'transparent'
			AllPostButton[i].style.color = '#808fa6'
		}

		target.style.border = 'none'
		target.style.borderRadius = '50px'
		target.style.backgroundColor = '#d5ddea'
		target.style.color = '#ffffff'
	}

	console.log('Recommended jobs hai', recommendedJobsList)

	//Getting random number

	return (
		<div className='workerDashboardMainContainer'>
			<div>
				<HeaderPage2 title='WorkerPros' />
			</div>
			<div className='workerDashboardInnerContainer'>
				<div className='workerDashboardInnerDiv'>
					<div className='workerDashboardMainSection'>
						<div className='workerDashboardLeft'>
							<div className='dashBoardPageTitle'>Dashboard</div>
							{dashBoardDataCount.loading ? (
								<div style={{ marginBottom: '15px', color: 'grey' }}>
									<SkeletonTheme color='#95afc0' highlightColor='#2ec2e2'>
										<p>
											<Skeleton count={3} />
										</p>
									</SkeletonTheme>
								</div>
							) : (
								<UserDetailCard
									firstname={
										profileinfo && profileinfo.first_name
											? profileinfo.first_name
											: 'Paul'
									}
									lastname={
										profileinfo && profileinfo.last_name
											? profileinfo.last_name
											: 'Peterson'
									}
									image={
										profileinfo && profileinfo.profile_image
											? `${process.env.REACT_APP_IMAGE_URL}${profileinfo.profile_image}`
											: ProfileDummyImage
									}
									gigsDone={
										dashBoardDataCount.data && dashBoardDataCount.data.gigs_done
											? dashBoardDataCount.data.gigs_done
											: 0
									}
									applicationCount={
										dashBoardDataCount.data &&
										dashBoardDataCount.data.application_count
											? dashBoardDataCount.data.application_count
											: 0
									}
									interviews={
										dashBoardDataCount.data &&
										dashBoardDataCount.data.interview_count
											? dashBoardDataCount.data.interview_count
											: 0
									}
									profileViews={
										dashBoardDataCount.data &&
										dashBoardDataCount.data.profile_view_count
											? dashBoardDataCount.data.profile_view_count
											: 0
									}
									workExperience={profileinfo && profileinfo.work_experience}
								/>
							)}

							<InterviewCard />
							<MessageCard conversationData={candidateMessagesList} />
						</div>
						<div className='workerDashboardMid'>
							<div className='workerDashboardStoriesSection'>
								<DashboardStories
									userImage={
										profileinfo && profileinfo.profile_image
											? `${process.env.REACT_APP_IMAGE_URL}${profileinfo.profile_image}`
											: ProfileDummyImage
									}
									storiesList={usersList}
								/>
							</div>
							{/* <div>
								<>
									
									<span className='recommendedTitle'>People You May Know</span>
									<div className='workerDashboardMutualSection'>
										{/* {usersList.data.slice(0, 3).map((value, index) => {
										return <ConnectionCard key={index} buttonTitle='Connect' />
									})} 
										<ConnectionCard buttonTitle='Connect' />
										<ConnectionCard buttonTitle='Connect' />
										<ConnectionCard buttonTitle='Connect' />
									</div>
								</>
							</div> */}

							<div className='workerDashboardPostsSection'>
								<WritePostComponent
									caption={newPostData.message}
									clearImage={clearImage}
									clearVideo={clearVideo}
									changePostData={changePostData}
									addPost={addDashBoardPost}
									setImageInPost={setImageInPost}
									setVideoInPost={setVideoInPost}
									logo={imagePreview ? imagePreview : PostImageDefault}
									video={videoPreview ? videoPreview : PostImageDefault}
									disablePost={postLoading}
									showImageField={showImageUploadField}
									showVideoField={showVideoUploadField}
									toggleImageUploadField={showHideImageUploadField}
									toggleVideoUploadField={showHideVideoUploadField}
								/>
								<div className='allpostsBtnDiv'>
									<ul className='dashBoardButtonUL'>{postsButton}</ul>
								</div>

								<div className='workerDashboardPosts'>
									{' '}
									{dashBoardPosts.loading ? (
										<div style={{ marginBottom: '15px', color: 'grey' }}>
											<SkeletonTheme color='#95afc0' highlightColor='#2ec2e2'>
												<p>
													<Skeleton count={3} />
												</p>
											</SkeletonTheme>
										</div>
									) : (
										dashBoardPosts.data.map((post, index) => {
											return (
												<ImagePostComponent
													key={index}
													firstName={post.user.first_name}
													lastName={post.user.last_name}
													userImage={post.user.profile_image}
													createdAt={post.created_at}
													postText={post.message}
													postImage={post.files[0]}
													postId={post._id}
													postUserId={post.user_id}
													accountUserId={profileinfo && profileinfo.user_id}
													accountUserImage={
														profileinfo && profileinfo.profile_image
													}
													accountFirstName={
														profileinfo && profileinfo.first_name
													}
													comments={post.comments}
													totalPostLikes={post.total_post_likes}
													postLiked={post.user_like_status}
												/>
											)
										})
									)}
								</div>
							</div>
						</div>
						<div className='workerDashboardRight'>
							<span className='recommendedTitle'>Recommended Jobs</span>
							<div className='recommendedJobsDiv'>
								{!recommendedJobsList.loading ? (
									recommendedJobsList.data &&
									recommendedJobsList.data.slice(0, 2).map((value, index) => {
										return (
											<RecommendedJobCard
												savedStatus={value.saved}
												appliedStatus={value.applied}
												key={index}
												jobTitle={value.title}
												jobLocation={value.address.city}
												companyName={value.company.company_name}
												payRateMax={value.pay_rate.max}
												payRateMin={value.pay_rate.min}
												companyImage={value.company.profile_image}
												jobId={value._id}
											/>
										)
									})
								) : (
									<div style={{ marginBottom: '15px', color: 'grey' }}>
										<SkeletonTheme color='#95afc0' highlightColor='#2ec2e2'>
											<p>
												<Skeleton count={3} />
											</p>
										</SkeletonTheme>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	candidateMessagesList: state.socialFeatureReducer.candidateMessagesList,
	profileinfo: state.profileReducer.profileinfo,
	recommendedJobsList: state.job.recommendedJobs,
	usersList: state.usersListReducer.usersList,
	dashBoardDataCount: state.workerDashboardReducer.workerDashboardDataCount,
	dashBoardAddPost: state.workerDashboardReducer.dashBoardAddPost,
	dashBoardPosts: state.workerDashboardReducer.dashBoardPosts,
	dashBoardPostComments: state.workerDashboardReducer.dashBoardCommentPost,
})

export default connect(mapStateToProps, {
	profileAllInfoAction,
	getDashboardPosts,
	getRecommendedJobs,
	getUserSuggestion,
	workerDashboardDataCountAction,
	getCandidateMessages,
	addDashboardPost,
	commentOnPost,
	applyJob,
	saveJob,
})(WorkerDashboard)
