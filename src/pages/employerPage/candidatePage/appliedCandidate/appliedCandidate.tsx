import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'reactstrap'

import {
	employerAppliedJobCandidateListAction,
	employerAppliedJobInterviewCandidateListAction,
} from '../../../../store/action/employerCandidateAction'

import AppliedCandidateJobBox from './appliedCandidateJobBox/appliedCandidateJobBox'

import './appliedCandidate.css'

interface Props {
	employerAppliedJobList: any
	employerAppliedJobCandidateList: any
	employerAppliedJobInterviewCandidateList: any
	employerAppliedJobCandidateListAction: (jobId: string) => void
	employerAppliedJobInterviewCandidateListAction: (jobId: string) => void
	detailId: any
	detailType: any
}

const AppliedCandidate: React.FC<Props> = (props: Props) => {
	const {
		employerAppliedJobList,
		employerAppliedJobCandidateList,
		employerAppliedJobInterviewCandidateList,
		employerAppliedJobCandidateListAction,
		employerAppliedJobInterviewCandidateListAction,
		detailId,
		detailType,
	} = props

	useEffect(() => {
		if (detailId) {
			employerAppliedJobCandidateListAction(detailId)
			employerAppliedJobInterviewCandidateListAction(detailId)
		}
	}, [detailId])

	return (
		<>
			<div className='EmployerAppliedCandidate'>
				{employerAppliedJobList.loading ? (
					<Spinner />
				) : (
					employerAppliedJobList.data &&
					employerAppliedJobList.data.map((j: any, index) => (
						<div
							key={index}
							className='EmployerAppliedCandidate__AppliedCandidateJobBox'
						>
							<AppliedCandidateJobBox
								jobId={j._id}
								title={j.title}
								location={j.address.city}
								pay={`${j.pay_rate.min}-${j.pay_rate.max}`}
								newCandidate={j.new_applicants_count}
								totalCandidate={j.applicants_count}
								employerAppliedJobCandidateList={
									employerAppliedJobCandidateList
								}
								employerAppliedJobInterviewCandidateList={
									employerAppliedJobInterviewCandidateList
								}
								isListOpen={j._id === detailId}
								detailType={detailType}
							/>
						</div>
					))
				)}
			</div>
		</>
	)
}

const mapStateToProps = (state) => ({
	employerAppliedJobCandidateList:
		state.employerCandidateReducer.appliedJob.data,
	employerAppliedJobInterviewCandidateList:
		state.employerCandidateReducer.interview.data,
})

const actions = {
	employerAppliedJobCandidateListAction,
	employerAppliedJobInterviewCandidateListAction,
}

export default connect(mapStateToProps, actions)(AppliedCandidate)
