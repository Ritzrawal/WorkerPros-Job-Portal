import React, { useState } from 'react'
import './dashBoardCards.css'
import {
	Person1,
	addStory,
	rightArrowBlue,
	StoryCloseLogo,
	StoryArrLeft,
	StoryArrRight,
	StoryViewImage,
	StoryViewHeart,
	StoryViewComment,
} from '../../../component/logosAndIcons'
import { Button, Modal } from 'reactstrap'
import { ProfileDummyImage } from '../../../component/logosAndIcons'
import { Form, FormGroup, Input, Spinner } from 'reactstrap'

interface Props {
	test?: string
	storiesList: any
	userImage: string
}

// let storiesList = [
// 	'Marta Scorces',
// 	'Paul Sicorsy',
// 	'Alia Viscos',
// 	'Sushmit Rajaure',
// 	'Manish Pradhan',
// ]

const DashboardStories: React.FC<Props> = (props: Props) => {
	const [modal, setModal] = useState(false)
	let [storyTitle, setStoryTitle] = useState('Sushmit Rajaure')
	let [storyDpImage, setStoryDpImage] = useState(ProfileDummyImage)
	let [storyStart, setStoryStart] = useState(0)
	let [storyEnd, setStoryEnd] = useState(5)
	const toggle = () => setModal(!modal)
	var storyTimeout: any

	const storyOnclick = (
		event: React.MouseEvent<Element, MouseEvent>,
		image: string
	) => {
		console.log('Clicked')
		toggle()
		const target: any = event.target as EventTarget
		target.querySelector('.userStoriesImage').style.border = 'none'
		setStoryTitle(target.id)
		setStoryDpImage(image)
		storyTimeout = setTimeout(() => {
			setModal(false)
		}, 3000)
	}

	const stopStoryTimer = () => {
		console.log('Clicked')
		window.clearTimeout(storyTimeout)
	}

	const showMoreStories = () => {
		setStoryStart((storyStart += 5))
		setStoryEnd((storyEnd += 5))
	}

	let userStories = props.storiesList.data
		.slice(storyStart, storyEnd)
		.map((value, index) => {
			return (
				<li
					id={value.first_name}
					onClick={(e: any) =>
						storyOnclick(
							e,
							value.profile_image
								? `${process.env.REACT_APP_IMAGE_URL}${value.profile_image} `
								: ProfileDummyImage
						)
					}
					className='userStoriesLi'
					key={index}
				>
					<div className='storyImageDiv'>
						<img
							className='userStoriesImage'
							src={
								value.profile_image
									? `${process.env.REACT_APP_IMAGE_URL}${value.profile_image}`
									: ProfileDummyImage
							}
						/>
						<span className='storyBottomText'>
							{value.first_name < 12
								? value.first_name
								: `${value.first_name.slice(0, 12)}...`}
						</span>
					</div>
				</li>
			)
		})

	return (
		<div className='storiesMainContainer'>
			{props.storiesList.loading ? (
				<div className='loaderDiv'>
					<Spinner color='grey' />
				</div>
			) : (
				<ul className='dashBoardStoryUL'>
					<li className='dashBoardAddStory'>
						<div className='storyImageDiv'>
							<img style={{ padding: '3px' }} src={props.userImage} />
							<span className='storyBottomText'>Add a story</span>
						</div>
						<img className='addStoryPlus' src={addStory} />
					</li>
					{userStories}
					<div onClick={showMoreStories} className='storyRightArrDiv'>
						{' '}
						<img src={rightArrowBlue} />
					</div>
				</ul>
			)}

			<div>
				<Modal isOpen={modal} toggle={toggle} className='storyModal'>
					<div className='storyViewCardMain'>
						<div className='storyViewCard'>
							{/* <ModalHeader toggle={toggle}>{storyTitle}</ModalHeader> */}
							<div className='storyViewCardTopSection'>
								<div className='bar'>
									<div className='in'></div>
								</div>
								<div className='storyViewUserInfo'>
									<div className='storyViewUserImage'>
										<img
											src={storyDpImage ? storyDpImage : ProfileDummyImage}
										/>
									</div>
									<div className='storyUserInfotext'>
										{' '}
										<span className='storyViewCardName'>{storyTitle}</span>
										<br />
										<span
											style={{ marginTop: '-20px' }}
											className='storyPostTime'
										>
											1h
										</span>
									</div>
								</div>
							</div>

							<img src={StoryViewImage} />
							<img
								onClick={() => {
									setModal(false)
								}}
								className='storyCloseLogo'
								src={StoryCloseLogo}
							/>
							<img className='storyLeftLogo' src={StoryArrLeft} />
							<img className='storyRightLogo' src={StoryArrRight} />

							<br />
							<div className='storyViewBottomSection'>
								<div className='storyViewBottomLogos'>
									<span className='storyheart'>
										{' '}
										<img src={StoryViewHeart} /> 12
									</span>
									<span className='storycomment'>
										<img src={StoryViewComment} /> 4
									</span>
								</div>
								<div className='storyViewBottomInput'>
									<Form>
										<FormGroup className='writePostInputContainer'>
											<Input
												onFocus={stopStoryTimer}
												className='inputTextField'
												placeholder='Reply...'
											></Input>
											<img className='writePostPlaceholderImage' />{' '}
										</FormGroup>
									</Form>
								</div>
							</div>
						</div>
					</div>
				</Modal>
			</div>
		</div>
	)
}

export default DashboardStories
