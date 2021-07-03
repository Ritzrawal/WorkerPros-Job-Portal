import React, { useState } from 'react'
import './invitationsCard.css'
import Person from '../../../assets/images/worker-dashboard/person-3.png'
import { MutualIcon } from '../../../component/logosAndIcons'

interface Props {
	value?: string
}

const InvitationData = [
	'Marta Scorces',
	'Paul Sicorsy',
	'Alia Viscos',
	'Sushmit Rajaure',
	'Manish Pradhan',
	'Ritesh Rawal',
]

const InvitationListComponent: React.FC<Props> = (props: Props) => {
	let [invitationCount, setInvitationCount] = useState(3)
	const invitationList = InvitationData.slice(0, invitationCount).map(
		(value, index) => {
			return (
				<li key={index}>
					<div className='invitationListImageDiv'>
						<img src={Person} />
					</div>
					<div className='invitationUserDetail'>
						<span className='invitationUserName'>{value}</span>
						<span className='invitationUserProfession'>
							General Labord at Bost Buildings
						</span>
						<span className='invitationUserMutual'>
							<img src={MutualIcon} /> 8 Mutual connections
						</span>
					</div>
					<div className='invitationIgnoreAcceptDiv'>
						<button className='invitationIgnoreBtn'>Ignore</button>
						<button className='invitationAcceptBtn'>Accept</button>
					</div>
				</li>
			)
		}
	)
	return (
		<div className='invitationListMainContainer'>
			<div className='invitationsListDiv'>
				<ul className='invitationsUL'>{invitationList}</ul>
			</div>
			<div
				className='showAllInvitationsDiv'
				onClick={() => {
					setInvitationCount((invitationCount += 3))
				}}
			>
				Show All Invitations
			</div>
		</div>
	)
}

export default InvitationListComponent
