import React, { useState } from 'react'
import Calendar from 'react-calendar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

import EventCalendarBox from './eventCalendarBox/eventCalendarBox'

import './eventCalendar.css'

const EventCalendar: React.FC = (props: any) => {
	const [date, setDate] = useState(new Date())

	return (
		<div className='EmployerEventCalendar'>
			<div className='EmployerEventCalendar__Title'>Calendar</div>
			<div className='EmployerEventCalendar__Calendar'>
				<Calendar
					className={'EmployerEventCalendar__Calendar--Box'}
					prevLabel={<FontAwesomeIcon icon={faAngleLeft} color={'#2EC2E2'} />}
					prev2Label={null}
					nextLabel={<FontAwesomeIcon icon={faAngleRight} color={'#2EC2E2'} />}
					next2Label={null}
					value={date}
					onChange={(date) => setDate(date)}
				/>
			</div>
			<div className='EmployerEventCalendar__Event'>
				<div className='EmployerEventCalendar__Event--Title'>Todays Events</div>
				<div className='EmployerEventCalendar__Event--List'>
					<div className='EmployerEventCalendar__Event--List--EventCalendarBox'>
						<EventCalendarBox />
					</div>
					<div className='EmployerEventCalendar__Event--List--EventCalendarBox'>
						<EventCalendarBox />
					</div>
				</div>
			</div>
		</div>
	)
}

export default EventCalendar
