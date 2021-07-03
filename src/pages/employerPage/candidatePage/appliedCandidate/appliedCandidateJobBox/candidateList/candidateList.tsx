import React, { useState } from 'react'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

import CandidateListBox from './candidateListBox/candidateListBox'

import CandidateDetailModal from '../../../../../../component/employer/modal/candidateDetailModal/candidateDetailModal'
import DropdownBox from '../../../../../../component/employer/input/dropdownBox/dropdownBox'

import AppliedIcon from '../../../../../../assets/images/icons/appliedIcon.png'
import ScreeningIcon from '../../../../../../assets/images/icons/screeningIcon.png'
import InterviewIcon from '../../../../../../assets/images/icons/interviewIcon.png'
import OfferedIcon from '../../../../../../assets/images/icons/offeredIcon.png'
import HiredIcon from '../../../../../../assets/images/icons/hiredIcon.png'
import './candidateList.css'

const FILTER_OPTIONS = [
	{
		title: `All`,
		value: '',
	},
	{
		title: `<img src='${AppliedIcon}' style='height: 15px; width: 15px; margin-top: -4px;margin-right: 8px;' />Applied`,
		value: 'applied',
	},
	{
		title: `<img src='${ScreeningIcon}' style='height: 15px; width: 15px; margin-top: -4px;margin-right: 8px;' />Screening`,
		value: 'screening',
	},
	{
		title: `<img src="${InterviewIcon}" style='height: 15px; width: 15px; margin-top: -4px;margin-right: 8px;' />Interview`,
		value: 'interview',
	},
	{
		title: `<img src="${OfferedIcon}" style='height: 15px; width: 15px; margin-top: -4px;margin-right: 8px;' />Offered`,
		value: 'offered',
	},
	{
		title: `<img src="${HiredIcon}" style='height: 15px; width: 15px; margin-top: -4px;margin-right: 8px;' />Hired`,
		value: 'hired',
	},
]

interface Props {
	employerAppliedJobCandidateList: any
}

const CandidateList: React.FC<Props> = (props: Props) => {
	const { employerAppliedJobCandidateList } = props

	const [filter, setFilter] = useState('')
	const [currentCandidate, setCurrentCandidate] = useState('')

	const getFilteredList = (list: any, filterKey: string) => {
		if (filterKey === '' || filterKey.toLowerCase() === 'all') return list

		const filteredList = list.filter(
			(f) => f.phase.toLowerCase() === filterKey.toLowerCase()
		)

		return filteredList
	}

	return (
		<>
			{currentCandidate !== '' && (
				<CandidateDetailModal
					candidateDetail={currentCandidate}
					closeCandidateDetail={() => setCurrentCandidate('')}
				/>
			)}
			<div className='EmployerCandidateList'>
				<div className='EmployerCandidateList__Filter'>
					<div className='EmployerCandidateList__Filter--Dropdown'>
						<DropdownBox
							custom
							internalPadding={'5px'}
							rightIcon={faAngleDown}
							error={false}
							label={''}
							option={FILTER_OPTIONS}
							name={'filter'}
							value={filter}
							placeholder={'All'}
							onChange={(event) => setFilter(event.target.value)}
						/>
					</div>
				</div>
				<div className='EmployerCandidateList__Body'>
					{employerAppliedJobCandidateList && employerAppliedJobCandidateList
						? getFilteredList(employerAppliedJobCandidateList, filter).map(
								(e: any, index) => (
									<div
										key={index}
										className='EmployerCandidateList__Body--CandidateListBox'
									>
										<CandidateListBox
											name={`${e.worker_detail.first_name} ${e.worker_detail.last_name}`}
											category={e.worker_detail.categories}
											phase={e.phase}
											image={e.worker_detail.profile_image}
											location={e.worker_detail.address.city}
											openCandidateModal={() => setCurrentCandidate(e)}
										/>
									</div>
								)
						  )
						: null}
				</div>
			</div>
		</>
	)
}

export default CandidateList
