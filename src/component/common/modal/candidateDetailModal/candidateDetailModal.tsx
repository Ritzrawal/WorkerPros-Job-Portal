import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faStar,
	faTimes,
	faPencilRuler,
	faAngleDown,
} from '@fortawesome/free-solid-svg-icons'
import MOMENT from 'moment'
import { Modal } from 'reactstrap'

import { ButtonWithCusmWithLogo, ButtonWithCustyomeStyling } from '../../../'

import LikeIcon from '../../../../assets/images/icons/like.png'
import UnLikeIcon from '../../../../assets/images/icons/unlike.png'
import AppliedIcon from '../../../../assets/images/icons/appliedIcon.png'
import ScreeningIcon from '../../../../assets/images/icons/screeningIcon.png'
import InterviewIcon from '../../../../assets/images/icons/interviewIcon.png'
import OfferedIcon from '../../../../assets/images/icons/offeredIcon.png'
import HiredIcon from '../../../../assets/images/icons/hiredIcon.png'
import './candidateDetailModal.css'

interface Props {
	candidateDetail: any
	closeCandidateDetail: () => void
}
const WorkerDetailModal: React.FC<Props> = (props: Props) => {
	const { candidateDetail, closeCandidateDetail } = props

	const [phase, setPhase] = useState('Interview')

	const getPrimaryCategory = (category) => {
		const [primaryCategpry] = category.filter((c) => c.is_primary)

		return primaryCategpry
	}

	return (
		<Modal
			isOpen={true}
			toggle={closeCandidateDetail}
			size={'lg'}
			centered={true}
		>
			<div className='CandidateDetailModal'>
				<div className='CandidateDetailModal__Header'>
					<div className='CandidateDetailModal__Header--Image'>
						<img
							src={
								candidateDetail.profile_image
									? `${process.env.REACT_APP_IMAGE_URL}${candidateDetail.profile_image}`
									: 'https://via.placeholder.com/15'
							}
						></img>
					</div>
					<div className='CandidateDetailModal__Header--Detail'>
						<div className='CandidateDetailModal__Header--Detail--Name'>
							<div>{`${candidateDetail.first_name} ${candidateDetail.last_name}`}</div>
							<div className='CandidateDetailModal__Header--Detail--Name--Rating'>
								<FontAwesomeIcon icon={faStar} />
								3.5
							</div>
						</div>
						<div className='CandidateDetailModal__Header--Detal--Joined'>
							Joined {MOMENT(candidateDetail.created_at).fromNow()}
						</div>
						<div className='CandidateDetailModal__Header--Detail--Category'>
							{getPrimaryCategory(candidateDetail.categories)
								? getPrimaryCategory(candidateDetail.categories).title
								: ''}
						</div>
					</div>
					<div className='CandidateDetailModal__Header--Option'>
						<div className='CandidateDetailModal__Header--Option--Button'>
							<button>Message</button>
							<button>Hire</button>
						</div>
						<div className='CandidateDetailModal__Header--Option--Type'>
							<div className='CandidateDetailModal__Header--Option--Type--Like'>
								<img src={LikeIcon} />
							</div>
							<div className='CandidateDetailModal__Header--Option--Type--UnLike'>
								<img src={UnLikeIcon} />
							</div>
						</div>
					</div>
					<div
						className='CandidateDetailModal__Header--Close'
						onClick={closeCandidateDetail}
					>
						<FontAwesomeIcon icon={faTimes} />
					</div>
				</div>
				<div className='CandidateDetailModal__Trade'>
					<div className='CandidateDetailModal__Trade--Title'>Trade</div>
					<div className='CandidateDetailModal__Trade--Body'>
						{candidateDetail.categories.map((c: any, index) => (
							<div
								key={index}
								className='CandidateDetailModal__Trade--Body--Container'
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
				<div className='CandidateDetailModal__Skill'>
					<div className='CandidateDetailModal__Skill--Title'>Skills</div>
					<div className='CandidateDetailModal__Skill--Detail'>
						{candidateDetail.categories.map((c: any, index) => (
							<div
								key={index}
								className='CandidateDetailModal__Skill--Detail--List'
							>
								<div className='CandidateDetailModal__Skill--Detail--List--Title'>
									{c.title}
								</div>
								<div className='CandidateDetailModal__Skill--Detail--List--Body'>
									{c.skills.map((s: any, index) => (
										<div
											key={index}
											className='CandidateDetailModal__Skill--Detail--List--Body--Container'
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
				<div className='CandidateDetailModal__Experience'>
					<div className='CandidateDetailModal__Experience--Title'>
						Experience
					</div>
					<div className='CandidateDetailModal__Experience--Detail'>
						{candidateDetail.work_experience.map((e: any, index) => (
							<div
								key={index}
								className='CandidateDetailModal__Experience--Detail--List'
							>
								<div className='CandidateDetailModal__Experience--Detail--List--Title'>
									{e.company_name}
								</div>
								<div className='CandidateDetailModal__Experience--Detail--List--Year'>
									{e.from.month} {e.from.year} - {e.to.month} {e.to.year}
								</div>
								<div className='CandidateDetailModal__Experience--Detail--List--Info'>
									<div className='CandidateDetailModal__Experience--Detail--List--Info--Single'>
										<div className='CandidateDetailModal__Experience--Detail--List--Info--Single--Title'>
											Building Type
										</div>
										<div className='CandidateDetailModal__Experience--Detail--List--Info--Single--Detail'>
											Commercial
										</div>
									</div>
									<div className='CandidateDetailModal__Experience--Detail--List--Info--Single'>
										<div className='CandidateDetailModal__Experience--Detail--List--Info--Single--Title'>
											Project Type
										</div>
										<div className='CandidateDetailModal__Experience--Detail--List--Info--Single--Detail'>
											New Build
										</div>
									</div>
									<div className='CandidateDetailModal__Experience--Detail--List--Info--Single'>
										<div className='CandidateDetailModal__Experience--Detail--List--Info--Single--Title'>
											Role
										</div>
										<div className='CandidateDetailModal__Experience--Detail--List--Info--Single--Detail'>
											{e.role}
										</div>
									</div>
									<div className='CandidateDetailModal__Experience--Detail--List--Info--Single'>
										<div className='CandidateDetailModal__Experience--Detail--List--Info--Single--Title'>
											Trade
										</div>
										<div className='CandidateDetailModal__Experience--Detail--List--Info--Single--Detail'>
											General Labour
										</div>
									</div>
								</div>
								<div className='CandidateDetailModal__Experience--Detail--List--Reference'>
									<div className='CandidateDetailModal__Experience--Detail--List--Reference--Button'>
										<button>
											<FontAwesomeIcon icon={faAngleDown} /> 3 References
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default WorkerDetailModal
