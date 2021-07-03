import React from 'react'
import Moment from 'moment'

import MemberPermissionForm from '../memberPermissionForm/memberPermissionForm'

import { ProfileDummyImage } from '../../../../component/logosAndIcons'
import './memberDetail.css'

interface Props {
	currentMemberDetail: any
}

const MemberDetail: React.FC<Props> = (props: Props) => {
	const { currentMemberDetail } = props
	console.log({ currentMemberDetail })

	return (
		<div className='EmployerMemberDetail'>
			{currentMemberDetail ? (
				<>
					<div className='EmployerMemberDetail__Info'>
						<div className='EmployerMemberDetail__Info--Image'>
							<img
								src={
									currentMemberDetail.user.profile_image
										? `${process.env.REACT_APP_IMAGE_URL}${currentMemberDetail.user.profile_image}`
										: ProfileDummyImage
								}
							/>
						</div>
						<div className='EmployerMemberDetail__Info--Detail'>
							<div className='EmployerMemberDetail__Info--Detail--Name'>
								{currentMemberDetail.user.first_name}{' '}
								{currentMemberDetail.user.last_name}
							</div>
							<div className='EmployerMemberDetail__Info--Detail--Email'>
								{currentMemberDetail.email}
							</div>
							<div className='EmployerMemberDetail__Info--Detail--Time'>
								{Moment(currentMemberDetail.created_at).fromNow()}
							</div>
						</div>
						<div className='EmployerMemberDetail__Info--Activity'>
							<div className='EmployerMemberDetail__Info--Activity--Title'>
								Last Activity:
							</div>
							<div className='EmployerMemberDetail__Info--Activity--Body'>
								10 Min Ago
							</div>
						</div>
					</div>
					<div className='EmployerMemberDetail__ResetPassword'>
						<div className='EmployerMemberDetail__ResetPassword--Title'>
							Reset Password
						</div>
						<div className='EmployerMemberDetail__ResetPassword--Description'>
							He short story brought international attention
						</div>
						<div className='EmployerMemberDetail__ResetPassword--Button'>
							<button>Reset Password</button>
						</div>
					</div>
					<div className='EmployerMemberDetail__SuspendAccount'>
						<div className='EmployerMemberDetail__SuspendAccount--Title'>
							Suspend account
						</div>
						<div className='EmployerMemberDetail__SuspendAccount--Description'>
							He short story brought international attention and was even
							translated into French
						</div>
						<div className='EmployerMemberDetail__SuspendAccount--Button'>
							<button>Suspend Account</button>
						</div>
					</div>
					<div className='EmployerMemberDetail__RemoveAccount'>
						<div className='EmployerMemberDetail__RemoveAccount--Title'>
							Remove account
						</div>
						<div className='EmployerMemberDetail__RemoveAccount--Description'>
							He short story brought international attention
						</div>
						<div className='EmployerMemberDetail__RemoveAccount--Button'>
							<button>Remove Account</button>
						</div>
					</div>
					<div className='EmployerMemberDetail__Permission'>
						<MemberPermissionForm
							permissions={currentMemberDetail.user.permissions}
						/>
					</div>
				</>
			) : null}
		</div>
	)
}

export default MemberDetail
