import React, { useState } from 'react'
import Moment from 'moment'

import CandidateDetailModal from '../../../../../../component/employer/modal/candidateDetailModal/candidateDetailModal'

import InterviewListBox from './interviewListBox/interviewListBox'

import './interviewList.css'

interface Props {
	jobTitle: string
	employerAppliedJobInterviewCandidateList: any
}

const InterviewList: React.FC<Props> = (props: Props) => {
	const { jobTitle, employerAppliedJobInterviewCandidateList } = props

	const [currentCandidate, setCurrentCandidate] = useState('')

	return (
		<>
			{currentCandidate !== '' && (
				<CandidateDetailModal
					candidateDetail={currentCandidate}
					closeCandidateDetail={() => setCurrentCandidate('')}
				/>
			)}
			<div className='EmployerInterviewList'>
				<div className='EmployerInterviewList__Body'>
					{employerAppliedJobInterviewCandidateList &&
						employerAppliedJobInterviewCandidateList.map((e: any, index) => (
							<div
								key={index}
								className='EmployerInterviewList__Body--InterviewListBox'
							>
								<InterviewListBox
									name={`${e.worker_detail.first_name} ${e.worker_detail.last_name}`}
									image={e.worker_detail.profile_image}
									title={jobTitle}
									date={Moment(e.created_at).format('D MMM')}
									time={Moment(e.created_at).format('hh A')}
									phone={'(704) 689-4942'}
									openCandidateModal={() => setCurrentCandidate(e)}
								/>
							</div>
						))}
				</div>
			</div>
		</>
	)
}

export default InterviewList
