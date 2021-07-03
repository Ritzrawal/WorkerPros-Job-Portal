import React, { useEffect, useState } from 'react'
import './dashBoardCards.css'
import { FormGroup, Input } from 'reactstrap'
import WritePost from '../../../assets/images/worker-dashboard/writePost.png'
import GalleryIcon from '../../../assets/images/worker-dashboard/gallery.png'
import VideoIcon from '../../../assets/images/worker-dashboard/video.png'
import { ImageUploadField, VideoUploadField } from '../components'
import FontAwesome from 'react-fontawesome'

interface Props {
	test?: string
	changePostData: (event: any) => void
	addPost: (event: any) => void
	caption: string
	setImageInPost: (event: any) => void
	setVideoInPost: (event: any) => void
	toggleImageUploadField: () => void
	toggleVideoUploadField: () => void
	clearImage: () => void
	clearVideo: () => void
	logo: string
	video: string
	disablePost?: boolean
	showImageField: boolean
	showVideoField: boolean
}

const WritePostComponent: React.FC<Props> = (props: Props) => {
	const {
		setImageInPost,
		setVideoInPost,
		video,
		clearImage,
		clearVideo,
		logo,
		showImageField,
		showVideoField,
		toggleImageUploadField,
		toggleVideoUploadField,
	} = props

	const updateLogo = (event: any) => {
		setImageInPost(event)
	}

	const updateVideo = (event: any) => {
		setVideoInPost(event)
	}

	return (
		<div className='writePostMainDiv'>
			<div className='SearchBarDiv'>
				<FormGroup className='writePostInputContainer'>
					<Input
						className='inputTextField'
						placeholder='Write a new post...'
						value={props.caption}
						name='postText'
						onChange={props.changePostData}
						autoComplete={'off'}
					></Input>
					<img className='writePostPlaceholderImage' src={WritePost} />{' '}
				</FormGroup>
			</div>
			{showImageField && (
				<div className='dashBoardImageUploadContainer'>
					{' '}
					<FontAwesome
						onClick={() => {
							toggleImageUploadField()
							clearImage()
						}}
						name='times'
					/>
					<ImageUploadField
						logoPreview={logo}
						updateLogo={updateLogo}
						logo={logo}
					/>
				</div>
			)}

			{showVideoField && (
				<div className='dashBoardImageUploadContainer'>
					{' '}
					<FontAwesome
						onClick={() => {
							toggleVideoUploadField()
							clearImage()
						}}
						name='times'
					/>
					<VideoUploadField
						updateVideo={updateVideo}
						videoPreview={video}
						video={video}
					/>
				</div>
			)}

			<div className='addPostDiv'>
				<div>
					<span
						onClick={() => {
							toggleImageUploadField()
							clearImage()
						}}
						className='addPostText'
					>
						{' '}
						<img src={GalleryIcon} /> Add a image
					</span>
					<span className='addPostText'>
						{' '}
						<img src={VideoIcon} /> Add a video
					</span>
				</div>
				<div className='AddPostButtonDiv'>
					<button onClick={props.addPost} disabled={props.disablePost}>
						Post
					</button>
				</div>
			</div>
		</div>
	)
}

export default WritePostComponent
