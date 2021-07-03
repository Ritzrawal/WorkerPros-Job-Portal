import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { employerAppliedJobListAction } from '../../../store/action/employerJobAction'
import { employerInviteCandidateListAction } from '../../../store/action/employerCandidateAction'

import Navbar from '../../../component/employer/navbar/navbar'
import Sidebar from '../../../component/employer/sidebar/sidebar'

import InviteCandidate from './inviteCandidate/inviteCandidate'
import AppliedCandidate from './appliedCandidate/appliedCandidate'

import './candidatePage.css'

interface Props {
	employerAppliedJobList: any
	employerAppliedJobListAction: (params: any) => void
	employerInviteCandidateList: any
	employerInviteCandidateListAction: () => void
	match: any
	history: any
}

const CandidatePage: React.FC<Props> = (props: Props) => {
	const {
		employerAppliedJobList,
		employerAppliedJobListAction,
		employerInviteCandidateList,
		employerInviteCandidateListAction,
		match,
		history,
	} = props

	const candidateType = match.params.candidatetype
	const detailId = match.params.detailid ? match.params.detailid : null
	const detailType = match.params.detailtype ? match.params.detailtype : null

	if (candidateType !== 'applied' && candidateType !== 'invite') {
		history.push('/employer/applied/candidate')
	}

	const [currentPage, setCurrentPage] = useState(1)

	const limit = 10

	useEffect(() => {
		const params = '?page=1&limit=10'
		employerAppliedJobListAction(params)
		employerInviteCandidateListAction()
	}, [])

	useEffect(() => {
		if (candidateType === 'invite') {
			document.getElementById('EmployerCandidate')?.scrollIntoView()
		}
	}, [detailId])

	return (
		<>
			<Navbar />
			<div className='EmployerCandidate'>
				<Sidebar collapse={true} />
				<div className='EmployerCandidate__Body'>
					<div
						id='EmployerCandidate'
						className='EmployerCandidate__Body--Title'
					>
						Candidates
					</div>
					<div className='EmployerCandidate__Body--SubTitle'>
						<div
							className={`EmployerCandidate__Body--SubTitle--Applied ${
								candidateType === 'applied' ? 'Active' : ''
							}`}
						>
							<Link to={'/employer/applied/candidate'}>Applied</Link>
						</div>
						<div
							className={`EmployerCandidate__Body--SubTitle--Invite ${
								candidateType === 'invite' ? 'Active' : ''
							}`}
						>
							<Link to={'/employer/invite/candidate'}>Invite</Link>
						</div>
					</div>
					<div className='EmployerCandidate__Body--Container'>
						{candidateType === 'applied' && (
							<div className='EmployerCandidate__Body--Container--Applied'>
								<AppliedCandidate
									employerAppliedJobList={employerAppliedJobList}
									detailId={detailId}
									detailType={detailType}
								/>
							</div>
						)}

						{candidateType === 'invite' && (
							<div className='EmployerCandidate__Body--Container--Invite'>
								<InviteCandidate
									employerInviteCandidateList={employerInviteCandidateList}
									detailId={detailId}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state) => ({
	employerAppliedJobList: state.employerJobReducer.applied,
	employerInviteCandidateList: state.employerCandidateReducer.invite,
	candidateSendMessageData: state.socialFeatureReducer.candidateSendMessage,
	employerJobList: state.employerJobReducer.list,
})

const actions = {
	employerAppliedJobListAction,
	employerInviteCandidateListAction,
}

export default connect(mapStateToProps, actions)(CandidatePage)
