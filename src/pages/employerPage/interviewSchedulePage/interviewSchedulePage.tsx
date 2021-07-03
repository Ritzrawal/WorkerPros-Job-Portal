import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import Calendar from 'react-calendar'

import Navbar from '../../../component/employer/navbar/navbar'
import Sidebar from '../../../component/employer/sidebar/sidebar'

import InputBox from '../../../component/employer/input/inputBox/inputBox'
import DropdownBox from '../../../component/employer/input/dropdownBox/dropdownBox'
import SelectColorBox from '../../../component/employer/input/selectColorBox/selectColorBox'
import { ButtonWithCustyomeStyling } from '../../../component'

import LocationIcon from '../../../assets/images/icons/location-icon.png'

import 'react-calendar/dist/Calendar.css'
import './interviewSchedulePage.css'

const MORNING_TIME = [
	'8:00 AM',
	'8:15 AM',
	'8:30 AM',
	'8:45 AM',
	'9:00 AM',
	'9:15 AM',
	'9:30 AM',
	'9:45 AM',
	'10:00 AM',
	'11:15 AM',
]
const EVENING_TIME = [
	'8:00 PM',
	'8:15 PM',
	'8:30 PM',
	'8:45 PM',
	'9:00 PM',
	'9:15 PM',
	'9:30 PM',
	'9:45 PM',
	'10:00 PM',
	'11:15 PM',
]

const InterviewSchedulePage: React.FC<any> = (props: Props) => {
	const [date, setDate] = useState(new Date())
	const [formData, setFormData] = useState({ type: '', address: '', time: '' })

	const changeFormData = (event: any) => {
		const { name, value } = event.target

		setFormData({ ...formData, [name]: value })
	}

	return (
		<>
			<Navbar />
			<div className='EmployerInterviewSchedule'>
				<Sidebar />
				<div className='EmployerInterviewSchedule__Body'>
					<div className='EmployerInterviewSchedule__Body--Left'>
						<div className='EmployerInterviewSchedule__Body--Left--Title'>
							<Link to={'/employer/dashboard'}>
								<FontAwesomeIcon icon={faAngleLeft} />
								Return Back
							</Link>
						</div>
						<div className='EmployerInterviewSchedule__Body--Left--Calendar'>
							<Calendar
								className={
									'EmployerInterviewSchedule__Body--Left--Calendar--Box'
								}
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
							/>
						</div>
					</div>
					<div className='EmployerInterviewSchedule__Body--Right'>
						<div className='EmployerInterviewSchedule__Body--Right--Title'>
							New Interview
						</div>
						<div className='EmployerInterviewSchedule__Body--Right--Form'>
							<div className='EmployerInterviewSchedule__Body--Right--Form--Info'>
								<div className='EmployerInterviewSchedule__Body--Right--Form--Info--Image'>
									<img src='https://via.placeholder.com/15' />
								</div>
								<div className='EmployerInterviewSchedule__Body--Right--Form--Info--Detail'>
									<div className='EmployerInterviewSchedule__Body--Right--Form--Info--Detail--Name'>
										Jessica Jemis
									</div>
									<div className='EmployerInterviewSchedule__Body--Right--Form--Info--Detail--Location'>
										<img src={LocationIcon} /> New York City
									</div>
									<div className='EmployerInterviewSchedule__Body--Right--Form--Info--Detail--Category'>
										<div className='EmployerInterviewSchedule__Body--Right--Form--Info--Detail--Category--Button'>
											<ButtonWithCustyomeStyling
												buttonTitle={'carpentry'}
												padding={'3px 13px'}
												color={'#808FA6'}
												borderColor={'#F2F4FA'}
												backgroundColor={'#F2F4FA'}
											/>
										</div>
										<div className='EmployerInterviewSchedule__Body--Right--Form--Info--Detail--Category--Button'>
											<ButtonWithCustyomeStyling
												buttonTitle={'concrete'}
												padding={'3px 13px'}
												color={'#808FA6'}
												borderColor={'#F2F4FA'}
												backgroundColor={'#F2F4FA'}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className='EmployerInterviewSchedule__Body--Right--Form--Type'>
								<div className='EmployerInterviewSchedule__Body--Right--Form--Type--Title'>
									Interview Type:
								</div>
								<div className='EmployerInterviewSchedule__Body--Right--Form--Type--Input'>
									<div className='EmployerInterviewSchedule__Body--Right--Form--Type--Input--Container'>
										<SelectColorBox
											showIcon={true}
											label={'Phone Interview'}
											checked={formData.type === 'phone'}
											name={'type'}
											value={'phone'}
											placeholder={'Phone Interview'}
											onChange={changeFormData}
										/>
									</div>
									<div className='EmployerInterviewSchedule__Body--Right--Form--Type--Input--Container'>
										<SelectColorBox
											showIcon={true}
											label={'In Person Interview'}
											checked={formData.type === 'person'}
											name={'type'}
											value={'person'}
											placeholder={'In Person Interview'}
											onChange={changeFormData}
										/>
									</div>
								</div>
							</div>
							<div className='EmployerInterviewSchedule__Body--Right--Form--Location'>
								<div className='EmployerInterviewSchedule__Body--Right--Form--Location--Title'>
									Detail
								</div>
								<div className='EmployerInterviewSchedule__Body--Right--Form--Location--Input'>
									<div className='EmployerInterviewSchedule__Body--Right--Form--Location--Input--Address'>
										<InputBox
											internalPadding={'10px'}
											error={false}
											label={'Address'}
											type={'text'}
											name={'address'}
											value={formData.address}
											placeholder={'Address'}
											onChange={changeFormData}
										/>
									</div>
									<div className='EmployerInterviewSchedule__Body--Right--Form--Location--Input--City'>
										<DropdownBox
											internalPadding={'10px'}
											error={false}
											label={'City'}
											option={[]}
											name={'city'}
											value={''}
											placeholder={'Select Your City'}
											onChange={() => console.log('test')}
										/>
									</div>
								</div>
							</div>
							<div className='EmployerInterviewSchedule__Body--Right--Form--Time'>
								<div className='EmployerInterviewSchedule__Body--Right--Form--Time--Title'>
									24th May Availability
								</div>
								<div className='EmployerInterviewSchedule__Body--Right--Form--Time--Morning'>
									<div className='EmployerInterviewSchedule__Body--Right--Form--Time--Morning--Title'>
										Morning
									</div>
									<div className='EmployerInterviewSchedule__Body--Right--Form--Time--Morning--Input'>
										{MORNING_TIME.map((t: any, index) => (
											<div
												key={index}
												className='EmployerInterviewSchedule__Body--Right--Form--Time--Morning--Input--Container'
											>
												<SelectColorBox
													showIcon={false}
													label={t}
													checked={formData.time === t}
													name={'time'}
													value={t}
													placeholder={t}
													onChange={changeFormData}
												/>
											</div>
										))}
									</div>
								</div>
								<div className='EmployerInterviewSchedule__Body--Right--Form--Time--Evening'>
									<div className='EmployerInterviewSchedule__Body--Right--Form--Time--Evening--Title'>
										Evening
									</div>
									<div className='EmployerInterviewSchedule__Body--Right--Form--Time--Evening--Input'>
										{EVENING_TIME.map((t: any, index) => (
											<div
												key={index}
												className='EmployerInterviewSchedule__Body--Right--Form--Time--Evening--Input--Container'
											>
												<SelectColorBox
													showIcon={false}
													label={t}
													checked={formData.time === t}
													name={'time'}
													value={t}
													placeholder={t}
													onChange={changeFormData}
												/>
											</div>
										))}
									</div>
								</div>
							</div>
							<div className='EmployerInterviewSchedule__Body--Right--Form--Button'>
								<button>Schedule Interview</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default InterviewSchedulePage
