import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faStar,
	faTimes,
	faPencilRuler,
	faAngleDown,
} from '@fortawesome/free-solid-svg-icons'
import MOMENT from 'moment'
import { Modal } from 'reactstrap'

import {
	employerLikeCandidateProfileAction,
	employerUnlikeCandidateProfileAction,
	employerAppliedJobCandidatePhaseChangeAction,
} from '../../../../store/action/employerCandidateAction'

import { ButtonWithCusmWithLogo, ButtonWithCustyomeStyling } from '../../../'
import DropdownBox from '../../input/dropdownBox/dropdownBox'

import LikeIcon from '../../../../assets/images/icons/like.png'
import UnLikeIcon from '../../../../assets/images/icons/unlike.png'
import AppliedIcon from '../../../../assets/images/icons/appliedIcon.png'
import ScreeningIcon from '../../../../assets/images/icons/screeningIcon.png'
import InterviewIcon from '../../../../assets/images/icons/interviewIcon.png'
import OfferedIcon from '../../../../assets/images/icons/offeredIcon.png'
import HiredIcon from '../../../../assets/images/icons/hiredIcon.png'
import './candidateDetailModal.css'

const CANDIDATE_PHASE = [
	{
		title: `<img src='${AppliedIcon}' style='height: 15px; width: 15px; margin-top: -4px;margin-right: 8px;' />Applied`,
		value: 'applied',
	},
	{
		title: `<img src='${ScreeningIcon}' style='height: 15px; width: 15px; margin-top: -4px;margin-right: 8px;' />Screening`,
		value: 'screening',
	},
	{
		title: `<img src="${InterviewIcon}" style='height: 15px; width: 15px; margin-top: -4px;margin-right: 8px;' />Interview`,
		value: 'interview',
	},
	{
		title: `<img src="${OfferedIcon}" style='height: 15px; width: 15px; margin-top: -4px;margin-right: 8px;' />Offered`,
		value: 'offered',
	},
	{
		title: `<img src="${HiredIcon}" style='height: 15px; width: 15px; margin-top: -4px;margin-right: 8px;' />Hired`,
		value: 'hired',
	},
]
interface Props {
	candidateDetail: any
	closeCandidateDetail: () => void
	employerLikeCandidateProfileAction: (candidateId: string) => void
	employerLikeCandidateProfileState: any
	employerUnlikeCandidateProfileAction: (candidateId: string) => void
	employerUnlikeCandidateProfileState: any
	employerAppliedJobCandidatePhaseChangeAction: (
		applicationId: string,
		phase: string
	) => void
}
const CandidateDetailModal: React.FC<Props> = (props: Props) => {
	const {
		candidateDetail,
		closeCandidateDetail,
		employerLikeCandidateProfileAction,
		employerUnlikeCandidateProfileAction,
		employerAppliedJobCandidatePhaseChangeAction,
	} = props
	console.log({ candidateDetail })

	const history = useHistory()

	const [phase, setPhase] = useState(candidateDetail.phase)
	const [like, setLike] = useState(candidateDetail.like)
	const [unlike, setUnlike] = useState(candidateDetail.dislike)

	const getPrimaryCategory = (category) => {
		const [primaryCategory] = category.filter((c) => c.is_primary)

		return primaryCategory
	}

	const changePhase = (event) => {
		const { name, value } = event.target

		setPhase(value)
		employerAppliedJobCandidatePhaseChangeAction(candidateDetail._id, value)

		if (value === 'interview') {
			history.push(`/employer/schedule-interview/${candidateDetail.user_id}`)
		}
	}

	const likeCandidate = () => {
		if (!like) {
			setUnlike(false)
		}
		setLike(!like)
		employerLikeCandidateProfileAction(candidateDetail.user_id)
	}

	const unlikeCandidate = () => {
		if (!unlike) {
			setLike(false)
		}
		setUnlike(!unlike)
		employerUnlikeCandidateProfileAction(candidateDetail.user_id)
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
								candidateDetail.worker_detail.profile_image
									? `${process.env.REACT_APP_IMAGE_URL}${candidateDetail.worker_detail.profile_image}`
									: 'https://via.placeholder.com/15'
							}
						></img>
					</div>
					<div className='CandidateDetailModal__Header--Detail'>
						<div className='CandidateDetailModal__Header--Detail--Name'>
							<div>{`${candidateDetail.worker_detail.first_name} ${candidateDetail.worker_detail.last_name}`}</div>
							<div className='CandidateDetailModal__Header--Detail--Name--Rating'>
								<FontAwesomeIcon icon={faStar} />
								3.5
							</div>
						</div>
						<div className='CandidateDetailModal__Header--Detal--Joined'>
							Joined {MOMENT(candidateDetail.created_at).fromNow()}
						</div>
						<div className='CandidateDetailModal__Header--Detail--Category'>
							{getPrimaryCategory(candidateDetail.worker_detail.categories)
								? getPrimaryCategory(candidateDetail.worker_detail.categories)
										.title
								: ''}
						</div>
					</div>
					<div className='CandidateDetailModal__Header--Option'>
						<div className='CandidateDetailModal__Header--Option--Button'>
							<button>Message</button>
							<button>Hire</button>
						</div>
						<div className='CandidateDetailModal__Header--Option--Type'>
							<div className='CandidateDetailModal__Header--Option--Type--Dropdown'>
								<DropdownBox
									custom={true}
									internalPadding={'8px'}
									error={false}
									label={''}
									option={CANDIDATE_PHASE}
									name={'type'}
									value={phase}
									placeholder={'Select Phase'}
									onChange={changePhase}
								/>
							</div>
							<div
								className={`CandidateDetailModal__Header--Option--Type--Like ${
									like ? 'Active' : ''
								}`}
								onClick={likeCandidate}
							>
								<img src={LikeIcon} />
							</div>
							<div
								className={`CandidateDetailModal__Header--Option--Type--UnLike ${
									unlike ? 'Active' : ''
								}`}
								onClick={unlikeCandidate}
							>
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
						{candidateDetail.worker_detail.categories.map((c: any, index) => (
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
						{candidateDetail.worker_detail.categories.map((c: any, index) => (
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
						{candidateDetail.worker_detail.work_experience.map(
							(e: any, index) => (
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
							)
						)}
					</div>
				</div>
			</div>
		</Modal>
	)
}

const mapStateToProps = (state) => ({
	employerLikeCandidateProfileState: state.employerCandidateReducer.likeProfile,
	employerUnlikeCandidateProfileState:
		state.employerCandidateReducer.unlikeProfile,
	employerAppliedJobCandidatePhaseChangeState:
		state.employerCandidateReducer.phaseChange.data,
})

const actions = {
	employerLikeCandidateProfileAction,
	employerUnlikeCandidateProfileAction,
	employerAppliedJobCandidatePhaseChangeAction,
}

export default connect(mapStateToProps, actions)(CandidateDetailModal)
