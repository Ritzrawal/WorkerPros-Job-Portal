import React from 'react'
import FontAwesome from 'react-fontawesome'

import appleImage from '../../../../assets/images/apple.png'
import androidImage from '../../../../assets/images/android.png'

import './downloadApp.css'

const DownloadApp: React.FC<any> = (props: any) => {
	return (
		<div className='EmployerDownloadApp'>
			<div className='EmployerDownloadApp__Title'>Download Our App</div>
			<div className='EmployerDownloadApp__Description'>
				Join the largest community of skilled construction workers looking
			</div>
			<div className='EmployerDownloadApp__Button'>
				<div className='EmployerDownloadApp__Button--Left'>
					<button>
						<FontAwesome
							style={{ fontSize: '25px', marginRight: '8px' }}
							name='apple'
						/>
						Download
					</button>
				</div>
				<div className='EmployerDownloadApp__Button--Right'>
					<button>
						<FontAwesome
							style={{ fontSize: '25px', marginRight: '8px' }}
							name='android'
						/>
						Download
					</button>
				</div>
			</div>
		</div>
	)
}

export default DownloadApp
