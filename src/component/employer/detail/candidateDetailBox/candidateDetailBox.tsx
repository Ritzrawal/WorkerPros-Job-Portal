import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faStar,
	faTimes,
	faBookmark,
	faBan,
	faPencilRuler,
} from '@fortawesome/free-solid-svg-icons'
import MOMENT from 'moment'

import { ButtonWithCusmWithLogo, ButtonWithCustyomeStyling } from '../../../'
import { ProfileDummyImage } from '../../../logosAndIcons'

import './candidateDetailBox.css'

interface Props {
	candidateDetail: any
	openInviteDetailModal: () => void
}
const CandidateDetailBox: React.FC<Props> = (props: Props) => {
	const { candidateDetail, openInviteDetailModal } = props

	const getPrimaryCategory = (category) => {
		const [primaryCategpry] = category.filter((c) => c.is_primary)

		return primaryCategpry
	}

	return (
		<div className='CandidateDetailBox'>
			<div className='CandidateDetailBox__Header'>
				<div className='CandidateDetailBox__Header--Image'>
					<img
						src={
							candidateDetail.profile_image
								? `${process.env.REACT_APP_IMAGE_URL}${candidateDetail.profile_image}`
								: ProfileDummyImage
						}
					></img>
				</div>
				<div className='CandidateDetailBox__Header--Detail'>
					<div className='CandidateDetailBox__Header--Detail--Name'>
						<div>{`${candidateDetail.first_name} ${candidateDetail.last_name}`}</div>
						<div className='CandidateDetailBox__Header--Detail--Name--Rating'>
							<FontAwesomeIcon icon={faStar} />
							3.5
						</div>
					</div>
					<div className='CandidateDetailBox__Header--Detal--Joined'>
						Joined {MOMENT(candidateDetail.created_at).fromNow()}
					</div>
					<div className='CandidateDetailBox__Header--Detail--Category'>
						{getPrimaryCategory(candidateDetail.categories)
							? getPrimaryCategory(candidateDetail.categories).title
							: ''}
					</div>
				</div>
				<div className='CandidateDetailBox__Header--Option'>
					<div className='CandidateDetailBox__Header--Option--Close'>
						<Link to={'/employer/invite/candidate'}>
							<FontAwesomeIcon icon={faTimes} />
						</Link>
					</div>
					<div className='CandidateDetailBox__Header--Option--Button'>
						<button onClick={openInviteDetailModal}>Invite</button>
						<FontAwesomeIcon icon={faBan} />
						<FontAwesomeIcon icon={faBookmark} />
					</div>
				</div>
			</div>
			<div className='CandidateDetailBox__Trade'>
				<div className='CandidateDetailBox__Trade--Title'>Trade</div>
				<div className='CandidateDetailBox__Trade--Body'>
					{candidateDetail.categories.map((c: any, index) => (
						<div
							key={index}
							className='CandidateDetailBox__Trade--Body--Container'
						>
							<ButtonWithCusmWithLogo
								faIcon={faPencilRuler}
								color='#FFFFFF'
								backgroundColor='#234476'
								borderColor='#234476'
								buttonYear={c.experience_time}
								buttonTitle={c.title}
							/>
						</div>
					))}
				</div>
			</div>
			<div className='CandidateDetailBox__Skill'>
				<div className='CandidateDetailBox__Skill--Title'>Skills</div>
				<div className='CandidateDetailBox__Skill--Detail'>
					{candidateDetail.categories.map((c: any, index) => (
						<div
							key={index}
							className='CandidateDetailBox__Skill--Detail--List'
						>
							<div className='CandidateDetailBox__Skill--Detail--List--Title'>
								{c.title}
							</div>
							<div className='CandidateDetailBox__Skill--Detail--List--Body'>
								{c.skills.map((s: any, index) => (
									<div
										key={index}
										className='CandidateDetailBox__Skill--Detail--List--Body--Container'
									>
										<ButtonWithCustyomeStyling
											buttonTitle={s}
											padding={'3px'}
											color={'#234476'}
											borderColor={'#F2F4FA'}
											backgroundColor={'#F2F4FA'}
										/>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='CandidateDetailBox__Experience'>
				<div className='CandidateDetailBox__Experience--Title'>Experience</div>
				<div className='CandidateDetailBox__Experience--Detail'>
					{candidateDetail.work_experience.map((e: any, index) => (
						<div
							key={index}
							className='CandidateDetailBox__Experience--Detail--List'
						>
							<div className='CandidateDetailBox__Experience--Detail--List--Title'>
								{e.company_name}
							</div>
							<div className='CandidateDetailBox__Experience--Detail--List--Year'>
								{e.from.month} {e.from.year} - {e.to.month} {e.to.year}
							</div>
							<div className='CandidateDetailBox__Experience--Detail--List--Info'>
								<div className='CandidateDetailBox__Experience--Detail--List--Info--Single'>
									<div className='CandidateDetailBox__Experience--Detail--List--Info--Single--Title'>
										Building Type
									</div>
									<div className='CandidateDetailBox__Experience--Detail--List--Info--Single--Detail'>
										Commercial
									</div>
								</div>
								<div className='CandidateDetailBox__Experience--Detail--List--Info--Single'>
									<div className='CandidateDetailBox__Experience--Detail--List--Info--Single--Title'>
										Project Type
									</div>
									<div className='CandidateDetailBox__Experience--Detail--List--Info--Single--Detail'>
										New Build
									</div>
								</div>
								<div className='CandidateDetailBox__Experience--Detail--List--Info--Single'>
									<div className='CandidateDetailBox__Experience--Detail--List--Info--Single--Title'>
										Role
									</div>
									<div className='CandidateDetailBox__Experience--Detail--List--Info--Single--Detail'>
										{e.role}
									</div>
								</div>
								<div className='CandidateDetailBox__Experience--Detail--List--Info--Single'>
									<div className='CandidateDetailBox__Experience--Detail--List--Info--Single--Title'>
										Trade
									</div>
									<div className='CandidateDetailBox__Experience--Detail--List--Info--Single--Detail'>
										General Labour
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default CandidateDetailBox
