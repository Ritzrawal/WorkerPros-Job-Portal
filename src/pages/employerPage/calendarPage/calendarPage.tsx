import React, { useState, createRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faPlus,
	faAngleLeft,
	faAngleRight,
} from '@fortawesome/free-solid-svg-icons'
import Calendar from 'react-calendar'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import Navbar from '../../../component/employer/navbar/navbar'
import Sidebar from '../../../component/employer/sidebar/sidebar'

import EventBox from './eventBox/eventBox'
import EventModal from './eventModal/eventModal'

import { ProfileDummyImage } from '../../../component/logosAndIcons'

import './calendarPage.css'

const CALENDAR_TYPES = {
	TASK: 'TASK',
	TEAM: 'TEAM',
}

const CalendarPage: React.FC<any> = (props: any) => {
	const [calendarType, setCalendarType] = useState(CALENDAR_TYPES.TEAM)
	const [date, setDate] = useState(new Date())
	const [currentEvent, setCurrentEvent] = useState('')

	let fullCalendarRef: any = createRef()

	const changeMonthOfFullCalendar = (event) => {
		let fullCalendarApi = fullCalendarRef.current.getApi()

		const fullCalendarDisplayedMonth = fullCalendarApi.getDate().getTime()

		const calendarDisplayedMonth = event.activeStartDate.getTime()

		if (calendarDisplayedMonth > fullCalendarDisplayedMonth) {
			fullCalendarApi.next()
		} else {
			fullCalendarApi.prev()
		}
	}

	return (
		<>
			<Navbar />
			<div className='EmployerCalendar'>
				<Sidebar collapse={true} />
				<div className='EmployerCalendar__Body'>
					<div className='EmployerCalendar__Body--Info'>
						<div className='EmployerCalendar__Body--Info--Option'>
							<div
								className={`EmployerCalendar__Body--Info--Option--Task ${
									calendarType === CALENDAR_TYPES.TASK ? 'Active' : ''
								}`}
								onClick={() => setCalendarType(CALENDAR_TYPES.TASK)}
							>
								My Task
							</div>
							<div
								className={`EmployerCalendar__Body--Info--Option--Team ${
									calendarType === CALENDAR_TYPES.TEAM ? 'Active' : ''
								}`}
								onClick={() => setCalendarType(CALENDAR_TYPES.TEAM)}
							>
								My Team
							</div>
						</div>
						<div className='EmployerCalendar__Body--Info--Button'>
							<button>
								<FontAwesomeIcon icon={faPlus} />
								Add new Task
							</button>
						</div>
						<div className='EmployerCalendar__Body--Info--Calendar'>
							<Calendar
								className={'EmployerCalendar__Body--Info--Calendar--Box'}
								prevLabel={
									<FontAwesomeIcon icon={faAngleLeft} color={'#2EC2E2'} />
								}
								prev2Label={null}
								nextLabel={
									<FontAwesomeIcon icon={faAngleRight} color={'#2EC2E2'} />
								}
								next2Label={null}
								value={date}
								onChange={(date) => setDate(date)}
								onActiveStartDateChange={changeMonthOfFullCalendar}
							/>
						</div>
						<div className='EmployerCalendar__Body--Info--Event'>
							<div className='EmployerCalendar__Body--Info--Event--Title'>
								Today&apos;s Events
							</div>
							<div className='EmployerCalendar__Body--Info--Event--Body'>
								<div className='EmployerCalendar__Body--Info--Event--Body--EventBox'>
									<EventBox />
								</div>
								<div className='EmployerCalendar__Body--Info--Event--Body--EventBox'>
									<EventBox />
								</div>
							</div>
						</div>
					</div>
					<div className='EmployerCalendar__Body--Detail'>
						<FullCalendar
							plugins={[dayGridPlugin]}
							headerToolbar={{
								left: '',
								// center: 'title',
								right: '',
							}}
							initialView='dayGridMonth'
							dayMaxEvents={true}
							weekends={true}
							events={[
								{
									id: '1',
									image: ProfileDummyImage,
									name: 'Interview with Alice k.',
									date: '2021-05-26',
								},
								{
									id: '2',
									image: ProfileDummyImage,
									name: 'Interview with Alice k.',
									date: '2021-05-27',
								},
								{
									id: '3',
									image: ProfileDummyImage,
									name: 'Interview with Alice k.',
									date: '2021-05-24',
								},
								{
									id: '4',
									image: ProfileDummyImage,
									name: 'Interview with Alice k.',
									date: '2021-05-25',
								},
							]}
							eventContent={(eventInfo) => (
								<div className='EmployerCalendar__Body--Detail--EventBox'>
									<img src={eventInfo.event._def.extendedProps.image} />
									{eventInfo.event._def.extendedProps.name}
								</div>
							)}
							eventClick={(event) => setCurrentEvent(event.event._def.publicId)}
							ref={fullCalendarRef}
						/>
						{currentEvent !== '' ? (
							<div className='EmployerCalendar__Body--Detail--EventModal'>
								<EventModal onClose={() => setCurrentEvent('')} />
							</div>
						) : null}
					</div>
				</div>
			</div>
		</>
	)
}

export default CalendarPage
