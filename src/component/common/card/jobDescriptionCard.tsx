import React from 'react'
import './cardStyle.css'

interface Props {
	title: string
	value: string
}

const JobDescriptionCardComponent: React.FC<Props> = (props: Props) => {
	return (
		<div className='NoLogoCard'>
			<span className='CardTitle'>{props.title} </span>
			<br />
			<span className='CardValue'>{props.value}</span>
		</div>
	)
}

export default JobDescriptionCardComponent
