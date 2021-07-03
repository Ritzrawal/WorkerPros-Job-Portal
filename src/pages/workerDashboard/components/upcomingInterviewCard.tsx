import React from 'react'
import './dashBoardCards.css'

interface Props {
	test?: string
}

const InterviewCard: React.FC<Props> = (props: Props) => {
	return (
		<div className='InterviewCardMainDiv'>
			<div className='InterviewCardTitle'> Upcoming InterViews</div>
			<div className='InterviewListDiv'>
				<ul className='InterviewUL'>
					<li>
						<div className='InterviewDateDiv'>
							<span className='interviewDate'>12</span>
							<span className='interviewMonth'>Mar</span>
						</div>
						<div className='InterviewJob'>
							<span className='interviewjobName'>A Corporation Building </span>
							<span className='interviewjobType'>General Labor</span>
						</div>
					</li>
					<li>
						<div className='InterviewDateDiv'>
							<span className='interviewDate'>12</span>
							<span className='interviewMonth'>Mar</span>
						</div>
						<div className='InterviewJob'>
							<span className='interviewjobName'>A Corporation Building </span>
							<span className='interviewjobType'>General Labor</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default InterviewCard
