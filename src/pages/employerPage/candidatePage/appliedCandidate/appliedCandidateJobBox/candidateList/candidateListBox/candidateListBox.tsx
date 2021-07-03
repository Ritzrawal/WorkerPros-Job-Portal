import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import renderHTML from 'react-render-html'

import { ButtonWithCustyomeStyling } from '../../../../../../../component'

import { ProfileDummyImage } from '../../../../../../../component/logosAndIcons'

import AppliedIcon from '../../../../../../../assets/images/icons/appliedIcon.png'
import ScreeningIcon from '../../../../../../../assets/images/icons/screeningIcon.png'
import InterviewIcon from '../../../../../../../assets/images/icons/interviewIcon.png'
import OfferedIcon from '../../../../../../../assets/images/icons/offeredIcon.png'
import HiredIcon from '../../../../../../../assets/images/icons/hiredIcon.png'
import './candidateListBox.css'

interface Props {
	name: string
	phase: string
	image: string
	category: any
	location: string
	openCandidateModal: () => void
}

const CandidateListBox: React.FC<Props> = (props: Props) => {
	const { name, phase, image, category, location, openCandidateModal } = props

	const getPhase = (phase) => {
		switch (phase) {
			case 'applied':
				return `<img src='${AppliedIcon}' style='height: 15px; width: 15px; margin-top: -4px;margin-right: 8px;' />Applied`

			case 'screening':
				return `<img src='${ScreeningIcon}' style='height: 15px; width: 15px; margin-top: -4px;margin-right: 8px;' />Screening`

			case 'interview':
				return `<img src="${InterviewIcon}" style='height: 15px; width: 15px; margin-top: -4px;margin-right: 8px;' />Interview`

			case 'offered':
				return `<img src="${OfferedIcon}" style='height: 15px; width: 15px; margin-top: -4px;margin-right: 8px;' />Offered`

			case 'hired':
				return `<img src="${HiredIcon}" style='height: 15px; width: 15px; margin-top: -4px;margin-right: 8px;' />Hired`

			default:
				return null
		}
	}

	return (
		<div className='EmployerCandidateListBox' onClick={openCandidateModal}>
			<div className='EmployerCandidateListBox__Info'>
				<div className='EmployerCandidateListBox__Info--Image'>
					<img
						src={
							image
								? `https://workerpros-images.s3.amazonaws.com/${image}`
								: ProfileDummyImage
						}
					></img>
				</div>
				<div className='EmployerCandidateListBox__Info--Detail'>
					<div className='EmployerCandidateListBox__Info--Detail--Name'>
						{name}
					</div>
					<div className='EmployerCandidateListBox__Info--Detail--Category'>
						General Labour
					</div>
					<div className='EmployerCandidateListBox__Info--Detail--Status'>
						{renderHTML(getPhase(phase))}
					</div>
				</div>
			</div>
			<div className='EmployerCandidateListBox__Category'>
				<ButtonWithCustyomeStyling
					buttonTitle={'Category'}
					padding={'0px'}
					color={'#808FA6'}
					borderColor={'#F2F4FA'}
					backgroundColor={'#F2F4FA'}
				/>
			</div>
			<div className='EmployerCandidateListBox__Location'>
				<FontAwesomeIcon icon={faMapMarkerAlt} />
				{location}
			</div>
		</div>
	)
}

export default CandidateListBox
