import React, { useEffect, useState } from 'react'
import { HeaderPage, HeaderPage2 } from '../headerPage'
import {
	ConnectionCard,
	CompaniesToFollowCard,
} from '../workerDashboard/components'
import { connect } from 'react-redux'
import {
	getUsersSuggestion,
	getCompaniesToFollow,
} from '../../store/action/socialFeatureAction'

//Components Import

import InvitationListComponent from './components/invitationListComponent'

import './invitationPage.css'

const CompanyData = ['A', 'B', 'C']

interface Props {
	value?: string
	getUsersSuggestion: () => void
	getCompaniesToFollow: () => void
	userSuggestionList: any
	companiesToFollowList: any
}

const InvitationPage: React.FC<Props> = (props: Props) => {
	const [single, setSingle] = useState(false)
	const [showroute] = useState(true)
	useEffect(() => {
		props.getUsersSuggestion()
		props.getCompaniesToFollow()
	}, [])
	const onProfileClick = () => {
		setSingle(true)
	}

	const peopleYouMayKnow = props.userSuggestionList.data
		.slice(0, 6)
		.map((value, index) => {
			return (
				<ConnectionCard
					userImage={value.profile_image}
					firstName={value.first_name}
					lastName={value.last_name}
					showroute={showroute}
					onClickProfile={onProfileClick}
					userId={value.user_id}
					buttonTitle='Connect'
					key={index}
				/>
			)
		})

	const companyToFollow = props.companiesToFollowList.data
		.slice(0, 3)
		.map((value, index) => {
			return (
				<CompaniesToFollowCard
					companyName={value.company_name}
					companyImage={value.profile_image}
					buttonTitle='Follow'
					key={index}
					type='company'
				/>
			)
		})

	return (
		<div>
			<div>
				<HeaderPage2 title='WorkerPros' />
			</div>
			<div className='invitationPageMainContainer'>
				<div className='invitationPageLeft'>
					{' '}
					<h2 className='invitationPageTitle'>Invitations</h2>
					<div className='invitationLeftInnerDiv'>
						<div className='invitationPageStats'>
							<span className='invitationPageStatTitle'>Your Statistics</span>
							<ul className='invitationPageStatUL'>
								<li>
									<span className='userDetailsTitle'>Requests</span>{' '}
									<span className='userDetailsNumber'>12</span>
								</li>
								<li>
									<span className='userDetailsTitle'>Connections</span>{' '}
									<span className='userDetailsNumber'>124</span>
								</li>
								<li>
									<span className='userDetailsTitle'>Companies you follow</span>{' '}
									<span className='userDetailsNumber'>5</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className='invitationPageRight'>
					<InvitationListComponent />

					<div className='mutualPeopleDiv'>
						<div className='peopleYouMayKnowDiv'>
							<span className='peopleyouMayKnowTitle'>People You May Know</span>
						</div>
						<div className='mutualPeopleContainer'>{peopleYouMayKnow}</div>
					</div>
					<div className='companyToFollowDiv'>
						<div className='peopleYouMayKnowDiv'>
							<span className='peopleyouMayKnowTitle'>Companies To Follow</span>
						</div>{' '}
						<div className='companyToFollowContainer'>{companyToFollow}</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	userSuggestionList: state.socialFeatureReducer.userSuggestions,
	companiesToFollowList: state.socialFeatureReducer.companiesToFollow,
})

export default connect(mapStateToProps, {
	getUsersSuggestion,
	getCompaniesToFollow,
})(InvitationPage)
