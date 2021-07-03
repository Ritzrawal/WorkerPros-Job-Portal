import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import { ButtonWithCustyomeStyling } from '../../../../../component'

import LocationIcon from '../../../../../assets/images/icons/location-icon.png'
import { ProfileDummyImage } from '../../../../../component/logosAndIcons'

import './inviteCandidateBox.css'

interface Props {
	id: string
	name: string
	image: string
	category: any
	address: any
}

const InviteCandidateBox: React.FC<Props> = (props: Props) => {
	const { id, name, image, category, address } = props

	const getPrimaryCategory = (category) => {
		const [primaryCategpry] = category.filter((c) => c.is_primary)

		return primaryCategpry
	}

	const filterPrimaryCategory = (category) => {
		return category.filter((c) => !c.is_primary)
	}

	return (
		<div className='EmployerInviteCandidateBox'>
			<Link to={`/employer/invite/candidate/${id}`}>
				<div className='EmployerInviteCandidateBox__Info'>
					<div className='EmployerInviteCandidateBox__Info--Image'>
						<img
							src={
								image
									? `${process.env.REACT_APP_IMAGE_URL}${image}`
									: ProfileDummyImage
							}
						></img>
					</div>
					<div className='EmployerInviteCandidateBox__Info--Detail'>
						<div className='EmployerInviteCandidateBox__Info--Detail--Name'>
							{name}
						</div>
						<div className='EmployerInviteCandidateBox__Info--Detail--Skill'>
							{getPrimaryCategory(category)
								? getPrimaryCategory(category).title
								: ''}
						</div>
					</div>
					<div className='EmployerInviteCandidateBox__Info--Option'>
						<FontAwesomeIcon icon={faEllipsisV} />
					</div>
				</div>
			</Link>
			<div className='EmployerInviteCandidateBox__Category'>
				{filterPrimaryCategory(category).map((c: any, index) => (
					<div
						key={index}
						className='EmployerInviteCandidateBox__Category--Container'
					>
						<ButtonWithCustyomeStyling
							buttonTitle={c.title}
							padding={'3px'}
							color={'#808FA6'}
							borderColor={'#F2F4FA'}
							backgroundColor={'#F2F4FA'}
						/>
					</div>
				))}
			</div>
			<div className='EmployerInviteCandidateBox__Location'>
				<img src={LocationIcon} /> {address.city}
			</div>
		</div>
	)
}

export default InviteCandidateBox
