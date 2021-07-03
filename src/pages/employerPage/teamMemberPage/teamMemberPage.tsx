import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Moment from 'moment'

import {
	employerGetTeamMemberAction,
	employerAddTeamMemberAction,
	employerAddTeamMemberClear,
} from '../../../store/action/employerTeamMemberAction'

import Navbar from '../../../component/employer/navbar/navbar'
import Sidebar from '../../../component/employer/sidebar/sidebar'

import AddMemberForm from './addMemberForm/addMemberForm'
import MemberDetail from './memberDetail/memberDetail'

import { ProfileDummyImage } from '../../../component/logosAndIcons'

import './teamMemberPage.css'

interface Props {
	employerGetTeamMemberAction: () => void
	employerGetTeamMemberState: any
	employerAddTeamMemberAction: (params: any) => void
	employerAddTeamMemberState: any
	employerAddTeamMemberClear: () => void
	match: any
}

const TeamMemberPage: React.FC<any> = (props: any) => {
	const {
		employerGetTeamMemberAction,
		employerGetTeamMemberState,
		employerAddTeamMemberAction,
		employerAddTeamMemberState,
		employerAddTeamMemberClear,
		match,
	} = props

	const currentMember = match.params.memberId

	useEffect(() => {
		employerGetTeamMemberAction()
	}, [])

	const getCurrentMemberDetail = () => {
		let currentMemberDetail = null

		if (
			currentMember !== '' &&
			employerGetTeamMemberState.data &&
			employerGetTeamMemberState.data.length
		) {
			const [currentMemberFiltered] = employerGetTeamMemberState.data.filter(
				(m) => m.user.user_id === currentMember
			)
			currentMemberDetail = currentMemberFiltered
		}

		return currentMemberDetail
	}

	return (
		<>
			<Navbar />
			<div className='EmployerTeamMember'>
				<Sidebar collapse={true} />
				<div className='EmployerTeamMember__Body'>
					<div className='EmployerTeamMember__Body--Title'>Team</div>
					<div className='EmployerTeamMember__Body--Detail'>
						<div className='EmployerTeamMember__Body--Detail--Left'>
							<div className='EmployerTeamMember__Body--Detail--Left--Member'>
								{employerGetTeamMemberState.success &&
								employerGetTeamMemberState.data
									? employerGetTeamMemberState.data.map((m, index) => (
											<Link
												key={index}
												to={`/employer/team-member/${m.user.user_id}`}
											>
												<div
													className={`EmployerTeamMember__Body--Detail--Left--Member--Info ${
														currentMember === m.user.user_id ? 'Active' : ''
													}`}
												>
													<div className='EmployerTeamMember__Body--Detail--Left--Member--Info--Image'>
														<img
															src={
																m.user.profile_image
																	? `${process.env.REACT_APP_IMAGE_URL}${m.user.profile_image}`
																	: ProfileDummyImage
															}
														/>
													</div>
													<div className='EmployerTeamMember__Body--Detail--Left--Member--Info--Name'>
														{m.user.first_name} {m.user.last_name}
													</div>
													<div className='EmployerTeamMember__Body--Detail--Left--Member--Info--Time'>
														{Moment(m.created_at).fromNow()}
													</div>
												</div>
											</Link>
									  ))
									: null}
							</div>
							<Link to={'/employer/team-member'}>
								<div className='EmployerTeamMember__Body--Detail--Left--Button'>
									<FontAwesomeIcon icon={faPlus} />
									Add New TeamMember
								</div>
							</Link>
						</div>
						<div className='EmployerTeamMember__Body--Detail--Right'>
							<div className='EmployerTeamMember__Body--Detail--Right--Form'>
								{currentMember ? (
									<MemberDetail
										currentMemberDetail={getCurrentMemberDetail()}
									/>
								) : (
									<AddMemberForm
										employerAddTeamMember={employerAddTeamMemberAction}
										employerAddTeamMemberState={employerAddTeamMemberState}
										employerAddTeamMemberClear={employerAddTeamMemberClear}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state) => ({
	employerGetTeamMemberState: state.employerTeamMemberReducer.list,
	employerAddTeamMemberState: state.employerTeamMemberReducer.add,
})

const actions = {
	employerGetTeamMemberAction,
	employerAddTeamMemberAction,
	employerAddTeamMemberClear,
}

export default connect(mapStateToProps, actions)(TeamMemberPage)
