import React from 'react'
import './cardStyle.css'
import FontAwesome from 'react-fontawesome'

interface Props {
	day: string
	value?: string
	startTime?: string
	endTime?: string
}

const WorkScheduleCardComponent: React.FC<Props> = (props: Props) => {
	return (
		<div className='WorkScheduleCard'>
			<span className='WorkDay'>{props.day}</span> <br />
			<hr />
			<span className='startTime'>
				{' '}
				<FontAwesome name='circle' /> {props.startTime} -
			</span>
			<br />
			<span className='endTime'>
				{' '}
				<FontAwesome name='circle' /> {props.endTime}
			</span>
		</div>
	)
}

export default WorkScheduleCardComponent

{
	/* <p className='am_pm'>PM</p>
<p className='am_pm'>AM</p> */
}
