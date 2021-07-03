import React, { useEffect, useState, useRef } from 'react'
import { Input, Modal } from 'reactstrap'
import Moment from 'moment'
import { AdminSidebar, AdminNavbar } from '../../../component/admin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProfileDummyImage } from '../../../component/logosAndIcons'
import AdminImagePostComponent from './adminImagePost'
import { ButtonWithCustyomeStyling } from '../../../component'
import { connect } from 'react-redux'
import {
	getDashboardPosts,
	deleteDashboardPost,
} from '../../../store/action/workerDashboardAction'
import { deleteAdminCommentPost } from '../../../store/action/adminAction'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import './adminSocial.css'
interface Props {
	title?: string
	getDashboardPosts: () => void
	deleteDashboardPost: (params: string) => void
	deleteAdminCommentPost: (params: string) => void
	admingetPost: any
}

export const SocailManagementPage: React.FC<Props> = (props: Props) => {
	const {
		getDashboardPosts,
		admingetPost,
		deleteDashboardPost,
		deleteAdminCommentPost,
	} = props

	const [show, setShow] = useState(false)
	const [nheight, setnHieght] = useState(null)

	const [dynamicHeight, setDynamicHeight] = useState([])

	useEffect(() => {
		getDashboardPosts()
	}, [getDashboardPosts])

	const deleteDahboard = (params: string) => {
		deleteDashboardPost(params)
	}
	const cancelCommentDelete = () => {
		setShow(!show)
	}
	const deleteComment = (id: string) => {
		console.log('id', id)
		deleteAdminCommentPost(id)
		// setShow(!show)
	}
	// useEffect(() => {
	// 	console.log('parent height', parentRef.offsetLeft)
	// 	if (parentRef.current) {
	// 		let parentHeight = parentRef.current.offsetHeight
	// 		setnHieght(parentHeight)
	// 		console.log('height', parentRef.current.offsetHeight + 'px', nheight)
	// 	}
	// }, [nheight, parentRef.offsetLeft])

	let dynamicHeightArray: any = []
	const updateDynamicHeight = (height, index) => {
		dynamicHeightArray[index] = height

		if (
			admingetPost.data.length > 0 &&
			admingetPost.data.length === dynamicHeightArray.length &&
			JSON.stringify(dynamicHeightArray) !== JSON.stringify(dynamicHeight)
		) {
			setDynamicHeight(dynamicHeightArray)
		}
	}

	return (
		<>
			<AdminNavbar />
			<div className='AdminDashboardSidebarAndContent'>
				<div className='AdminDashboardSidebar'>
					<AdminSidebar />
				</div>
				<div className='AdminContentMainCustomize'>
					<div className='AdminContentInnerContainer'>
						<div className='AdminFilterandInputOuterContainer'>
							<div className='AdminFilterInputCustomizeOuterContainer'>
								<Input
									className='AdminFilterInputCustomize'
									type='select'
									name='select'
									id='exampleSelect'
								>
									<option>All</option>
									<option>Active</option>
									<option>Inactive</option>
									<option>disabled</option>
								</Input>
							</div>
							<div className='AdminSearchandFilter'>
								<div className='AdminSearchBarOuter'>
									<div className='AdminSearchContainer'>
										<FontAwesomeIcon
											className='AdminSearchIconColorChange'
											icon={faSearch}
										/>
										<input
											type='text'
											className='AdminSearchTextInputField'
											name='search'
											placeholder='Search...'
										/>
									</div>
								</div>
							</div>
						</div>
						{admingetPost.data.length &&
							admingetPost.data.map((items, index) => {
								return (
									<div className='AdminSocialCardComponent' key={index}>
										<div className='AdminSocialNewFeedCardContainer'>
											<AdminImagePostComponent
												firstName={items.user.first_name}
												lastName={items.user.last_name}
												createdAt={items.created_at}
												postText={items.message}
												userImage={items.user.profile_image}
												postImage={items.files[0]}
												postId={items._id}
												totalPostLikes={items.total_post_likes}
												addPostComment={deleteDahboard}
												changePostComment={deleteDashboardPost}
												updateDynamicHeight={(height) =>
													updateDynamicHeight(height, index)
												}
											/>
										</div>

										<div
											className='AdminSocialNotificationContainer'
											style={{
												height: dynamicHeight[index]
													? dynamicHeight[index]
													: '',
											}}
										>
											{items?.comments?.map((item, i) => {
												return (
													<div className='AdminimagePostTopSection' key={i}>
														<div className='imagePostuserImageDiv'>
															<img
																src={
																	item.user.profile_image
																		? `${process.env.REACT_APP_IMAGE_URL}${item.user.profile_image}`
																		: ProfileDummyImage
																}
															/>
														</div>
														<div className='AdminCArdContentDisplay'>
															<div className='AdminCardPostImageContainerImage'>
																<div
																	className='AdminimagePostUserInfo'
																	style={{
																		display: 'flex',
																		flexDirection: 'row',
																	}}
																>
																	<span className='AdminimagePostUserName'>
																		{item?.user?.first_name}{' '}
																		{item?.user?.last_name}
																	</span>
																	<span className='AdminimagePostTime'>
																		{Moment(item?.created_at).fromNow()}
																	</span>
																</div>
																<div className='AdminSocialRemoveButtonContainerIcon'>
																	<FontAwesomeIcon
																		style={{ cursor: 'pointer' }}
																		onClick={() => deleteComment(item?.id)}
																		icon={faTimes}
																	/>
																</div>
																<Modal
																	isOpen={show}
																	centered
																	toggle={cancelCommentDelete}
																	className='ModalContainerCustomizerAlert'
																>
																	<p className='DeleteModalTetxCustomize'>
																		Are you want sure you want to Delete?
																	</p>
																	<div className='ModalCustomizerButton'>
																		<ButtonWithCustyomeStyling
																			clickHandler={cancelCommentDelete}
																			buttonTitle='Cancle'
																			paddingLeft={20}
																			paddingRight={20}
																			color='#2EC2E2'
																			backgroundColor='#FFFFFF'
																			borderColor='#2EC2E2'
																			marginRight={19}
																		/>
																		<ButtonWithCustyomeStyling
																			clickHandler={() =>
																				deleteComment(item?.id)
																			}
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
															<div className='AdminContentDisplayCustomize'>
																<p>{item.message}</p>
															</div>
														</div>
													</div>
												)
											})}
										</div>
									</div>
								)
							})}
					</div>
				</div>
			</div>
		</>
	)
}
const mapStateToProps = (state) => {
	return {
		admingetPost: state.workerDashboardReducer.dashBoardPosts,
	}
}

export default connect(mapStateToProps, {
	getDashboardPosts,
	deleteDashboardPost,
	deleteAdminCommentPost,
})(SocailManagementPage)
