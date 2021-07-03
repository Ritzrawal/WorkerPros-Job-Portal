import React, { MouseEvent } from 'react'
import ShareLogo from '../../../assets/images/job-description/share.png'
import ButtonComponent from '../buttons/buttonComponent'
import { ButtonCustom } from '../buttons/buttonComponent'

import './cardStyle.css'

interface Props {
	saveJob: (params: any) => void
	applyJob: (params: any) => void
	openAlertModal: () => void
	openShareModal: () => void

	currentUrl: string
	saveJobStatus: boolean
	image?: string
	CompanyName?: string
	CompanyLocation?: string
	ApplyStatus?: string
	jobId?: string
}

const JobDescriptionRightCard: React.FC<Props> = (props: Props) => {
	const changeSaveText = (event: React.MouseEvent<Element, MouseEvent>) => {
		localStorage.getItem('token')
			? props.saveJob(props.jobId)
			: props.openAlertModal()
	}

	const applyJob = () => {
		localStorage.getItem('token')
			? props.applyJob(props.jobId)
			: props.openAlertModal()
	}

	return (
		<div className='JobRightCard'>
			<div className='rightCardImage'>
				<img src={props.image}></img>
			</div>

			<ButtonComponent
				clickHandler={applyJob}
				width={281}
				height={50}
				backgroundColor={props.ApplyStatus ? '#234476' : ''}
				borderColor={props.ApplyStatus ? '#234476' : ''}
				buttonTitle={props.ApplyStatus ? 'Applied' : 'Apply Now'}
			/>
			<button
				style={{
					background: props.saveJobStatus ? '#234476' : '',
					border: props.saveJobStatus ? 'none' : '',
					color: props.saveJobStatus ? '#ffffff' : '',
				}}
				onClick={(e: any) => changeSaveText(e)}
				className='ShareButton'
			>
				{props.saveJobStatus ? 'Job Saved' : 'Save Job'}
			</button>
			<button
				onClick={props.openShareModal}
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
				className='ShareButton share'
			>
				{' '}
				<img
					style={{
						marginRight: '10px',
					}}
					src={ShareLogo}
				></img>
				Share
			</button>
		</div>
	)
}

export default JobDescriptionRightCard
