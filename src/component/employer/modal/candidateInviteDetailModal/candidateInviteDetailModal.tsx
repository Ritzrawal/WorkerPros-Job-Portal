import React, { useState } from 'react'
import { Modal } from 'reactstrap'

import TextBox from '../../../employer/input/textBox/textBox'
import DropdownBox from '../../../employer/input/dropdownBox/dropdownBox'

import LocationIcon from '../../../../assets/images/icons/location-icon.png'

import './candidateInviteDetailModal.css'

interface Props {
	candidateInviteDetail: any
	closeCandidateInviteDetail: () => void
	onCandidateInvite: (params: any) => any
	jobList: any
}
const CandidateInviteDetailModal: React.FC<Props> = (props: Props) => {
	const {
		candidateInviteDetail,
		closeCandidateInviteDetail,
		onCandidateInvite,
		jobList,
	} = props

	const [formData, setFormData] = useState({ message: '', job: '' })

	const changeFormData = (event: any) => {
		const { name, value } = event.target

		setFormData({ ...formData, [name]: value })
	}

	const getPrimaryCategory = (category) => {
		const [primaryCategpry] = category.filter((c) => c.is_primary)

		return primaryCategpry
	}

	const getJobOptions = (list) => {
		if (!list || !list.length) return []

		const jobOption = list.map((l: any) => ({ title: l.title, value: l._id }))

		return jobOption
	}

	const candidateInvite = () => {
		const messageParams = {
			job_id: formData.job,
			message: formData.message,
			receiver_id: candidateInviteDetail.user_id,
		}

		onCandidateInvite(messageParams)

		closeCandidateInviteDetail()
	}

	return (
		<Modal
			isOpen={true}
			toggle={closeCandidateInviteDetail}
			size={'md'}
			centered={true}
		>
			<div className='CandidateInviteDetailModal'>
				<div className='CandidateInviteDetailModal__Title'>Invite To Job</div>
				<div className='CandidateInviteDetailModal__Info'>
					<div className='CandidateInviteDetailModal__Info--Image'>
						<img
							src={`${process.env.REACT_APP_IMAGE_URL}${candidateInviteDetail.profile_image}`}
						/>
					</div>
					<div className='CandidateInviteDetailModal__Info--Detail'>
						<div className='CandidateInviteDetailModal__Info--Detail--Name'>
							{`${candidateInviteDetail.first_name} ${candidateInviteDetail.last_name}`}
						</div>
						<div className='CandidateInviteDetailModal__Info--Detail--Category'>
							{getPrimaryCategory(candidateInviteDetail.categories)
								? getPrimaryCategory(candidateInviteDetail.categories).title
								: ''}
						</div>
						<div className='CandidateInviteDetailModal__Info--Detail--Location'>
							<img src={LocationIcon} /> {candidateInviteDetail.address.city}
						</div>
					</div>
				</div>
				<div className='CandidateInviteDetailModal__Message'>
					<TextBox
						error={false}
						label={'Message'}
						name={'message'}
						value={formData.message}
						placeholder={'Type Here...'}
						rows={'5'}
						onChange={changeFormData}
					/>
				</div>
				<div className='CandidateInviteDetailModal__Job'>
					<DropdownBox
						error={false}
						label={'Choose a Job'}
						option={getJobOptions(jobList)}
						name={'job'}
						value={formData.job}
						placeholder={'Choose a Job'}
						onChange={changeFormData}
					/>
				</div>
				<div className='CandidateInviteDetailModal__Footer'>
					<div className='CandidateInviteDetailModal__Footer--Info'>
						You have <span>15</span> invite left
					</div>
					<div className='CandidateInviteDetailModal__Footer--Button'>
						<button onClick={candidateInvite}>Invite</button>
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default CandidateInviteDetailModal
