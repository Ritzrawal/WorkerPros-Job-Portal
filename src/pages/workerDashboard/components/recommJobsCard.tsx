import React, { useState, useEffect } from 'react'
import './dashBoardCards.css'
import Image from '../../../assets/images/worker-dashboard/person-1.png'
import SaveJobIcon from '../../../assets/images/worker-dashboard/savejobIcon.png'
import { connect } from 'react-redux'
import ReactFontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'
import {
	BabyLogo,
	Shield,
	Umbrella,
	Insurance,
} from '../../../component/common/card/JobCardLogos'
import { applyJob, saveJob } from '../../../store/action/job'

interface Props {
	test?: string
	jobTitle?: string
	jobLocation?: string
	payRateMin?: number
	payRateMax?: number
	companyName?: string
	companyImage?: string
	jobId: string
	applyJob: (id: string) => void
	saveJob: (id: string) => void
	savedStatus: boolean
	appliedStatus: boolean
}

const RecommendedJobCard: React.FC<Props> = (props: Props) => {
	const { saveJob, applyJob, jobId, savedStatus, appliedStatus } = props
	const [saved, setSaved] = useState(false)
	const initiateSaveUnsave = () => {
		setSaved(!saved)
		saveJob(jobId)
	}

	const initiateApplyDeapply = () => {
		applyJob(jobId)
	}
	return (
		<div className='recomJobCardMainDiv'>
			<div className='recomJobCardTopSection'>
				<div className='recomJobCardImageDiv'>
					<img
						src={
							props.companyImage
								? `${process.env.REACT_APP_IMAGE_URL}${props.companyImage} `
								: Image
						}
					/>
				</div>
				<div className='recomJobCardApplyDiv'>
					<button
						className={
							appliedStatus
								? 'dashboardButtonApplied'
								: 'dashboardButtonNotApplied'
						}
						onClick={initiateApplyDeapply}
					>
						{appliedStatus ? 'Applied' : 'Apply'}
					</button>
					{/* <img src={SaveJobIcon} /> */}
					<ReactFontAwesome
						onClick={initiateSaveUnsave}
						className={savedStatus ? 'saved' : ' unsaved'}
						name='bookmark'
					/>
				</div>
			</div>
			<div className='recomJobCardMidSection'>
				<div className='recomJobCardJobName'>
					<Link
						style={{ textDecoration: 'none' }}
						to={`/jobdescription/${props.jobId}`}
					>
						<span style={{ textDecoration: 'none', color: '#000000' }}>
							{props.jobTitle}
						</span>
					</Link>
				</div>
				<div className='recomJobCardJobLocation'>
					<span className='recomCompanyName'>{props.companyName}</span>
					<span className='recomCompanyLocation'>{props.jobLocation}</span>
				</div>
			</div>
			<div className='recomJobcardBottomSection'>
				<span className='recomHourly'>
					Hourly Rate: <span className='recomDollar'>$</span>
					<span className='recomRate'>
						{props.payRateMin}-{props.payRateMax}
					</span>
				</span>
				<div className='recomCardPerksLogoDiv'>
					<ul className='recomCardPerksUL'>
						<li>
							<img src={BabyLogo} />
						</li>
						<li>
							<img src={Umbrella} />
						</li>
						<li>
							<img src={Insurance} />
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	saved: state.job.savedJob,
})

export default connect(mapStateToProps, { saveJob, applyJob })(
	RecommendedJobCard
)
