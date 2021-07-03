import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

import './reviewBox.css'

interface Props {
	number: string
	title: string
}

const ReviewBox: React.FC<Props> = (props: Props) => {
	const { number, title } = props
	return (
		<div className='EmployerReviewBox'>
			<div className='EmployerReviewBox__Number'>{number}</div>
			<div className='EmployerReviewBox__Title'>{title}</div>
			<div className='EmployerReviewBox__Link'>
				<FontAwesomeIcon icon={faAngleRight} />
			</div>
		</div>
	)
}

export default ReviewBox
