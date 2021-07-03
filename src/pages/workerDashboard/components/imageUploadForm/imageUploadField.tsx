import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import FontAwesome from 'react-fontawesome'

import './imageUploadField.css'

interface Props {
	logoPreview: string
	logo: string
	updateLogo: (event: any) => void
}

const ImageUploadField: React.FC<Props> = (props: Props) => {
	const { logoPreview, updateLogo } = props

	let clickHandler: any = null

	return (
		<div className='AddImageDashboardForm'>
			<div className='AddImageDashboardForm__Form'>
				<div className='AddImageDashboardForm__Form--Logo'>
					<div className='AddImageDashboardForm__Form--Logo--Upload'>
						<div className='AddImageDashboardForm__Form--Logo--Upload--Image'>
							<img src={logoPreview}></img>
						</div>
						<input
							type='file'
							name='logo'
							hidden={true}
							onChange={updateLogo}
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

export default ImageUploadField
