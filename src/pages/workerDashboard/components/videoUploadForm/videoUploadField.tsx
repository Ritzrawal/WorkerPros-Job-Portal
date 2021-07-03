import './videoUploadField.css'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import FontAwesome from 'react-fontawesome'
import { SampleVideo } from '../../../../component/logosAndIcons'

interface Props {
	videoPreview: string
	video: string
	updateVideo: (event: any) => void
}

const VideoUploadField: React.FC<Props> = (props: Props) => {
	const { videoPreview, updateVideo } = props

	let clickHandler: any = null

	return (
		<div className='AddImageDashboardForm'>
			<div className='AddImageDashboardForm__Form'>
				<div className='AddImageDashboardForm__Form--Logo'>
					<div className='AddImageDashboardForm__Form--Logo--Upload'>
						<video width='100%' height='100%' controls>
							<source src={videoPreview} type='video/mp4'></source>
						</video>
						<input
							type='file'
							name='video'
							hidden={true}
							onChange={updateVideo}
							ref={(input) => {
								clickHandler = input
							}}
						/>

						<button onClick={() => clickHandler.click()}>
							<FontAwesomeIcon icon={faPlus} />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VideoUploadField
