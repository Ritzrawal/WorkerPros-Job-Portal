import React from 'react'
import { faMapMarkerAlt, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { Range, getTrackBackground } from 'react-range'

import InputBox from '../../../../component/employer/input/inputBox/inputBox'
import DropdownBox from '../../../../component/employer/input/dropdownBox/dropdownBox'
import RadioBox from '../../../../component/employer/input/radioBox/radioBox'
import SelectTickBox from '../../../../component/employer/input/selectTickBox/selectTickBox'

import './jobBasicForm.css'

interface Props {
	draftErrorState: boolean
	errorState: boolean
	title: string
	locationList: any
	location: any
	typeList: any
	type: string
	roleList: any
	role: any
	payType: string
	rate: any
	changeFormData: (event: any) => void
	changeFormArray: (event: any) => void
	updateRate: (rateRange: any) => void
	changePayType: (payType: any) => void
	changeLocation: (state: string, city: string) => void
	ref?: any
	style?: any
}

const JobBasicForm: React.FC<Props> = (props: Props) => {
	const {
		draftErrorState,
		errorState,
		title,
		locationList,
		location,
		typeList,
		type,
		roleList,
		role,
		payType,
		rate,
		changeFormData,
		changeFormArray,
		updateRate,
		changePayType,
		changeLocation,
	} = props

	const getLocations = (locationList) => {
		let locations: any = []

		if (
			locationList &&
			locationList.country_states_cities &&
			locationList.country_states_cities.states.length
		) {
			locationList.country_states_cities.states.forEach((state: any) => {
				if (state.cities.length) {
					state.cities.forEach((city: any) => {
						locations.push({ title: city, value: city })
					})
				}
			})
		}

		return locations
	}

	const updateLocation = (event) => {
		const { value } = event.target

		locationList.country_states_cities.states.forEach((state: any) => {
			if (state.cities.length) {
				state.cities.forEach((city: any) => {
					if (city === value) {
						changeLocation(state.state_name, city)
					}
				})
			}
		})
	}

	return (
		<div className='EmployerJobBasicForm'>
			<div className='EmployerJobBasicForm__Title'>
				<InputBox
					rightText={`${title.length}/180`}
					error={(errorState || draftErrorState) && !title.length}
					label={'Title'}
					type={'text'}
					name={'title'}
					value={title}
					placeholder={'Job Title'}
					onChange={changeFormData}
				/>
			</div>
			<div className='EmployerJobBasicForm__Location'>
				<DropdownBox
					leftIcon={faMapMarkerAlt}
					rightIcon={faAngleDown}
					error={errorState && !location.length}
					label={'Job Location'}
					option={getLocations(locationList)}
					name={'location'}
					value={location.city}
					placeholder={'Job Location'}
					onChange={updateLocation}
				/>
			</div>
			<div className='EmployerJobBasicForm__Type'>
				<div className='EmployerJobBasicForm__Type--Label'>Job Type</div>
				{errorState && !type.length ? (
					<div className='EmployerJobBasicForm__Type--Error'>Required</div>
				) : null}
				<div className='EmployerJobBasicForm__Type--Box'>
					{typeList &&
						typeList.default_job_type &&
						typeList.default_job_type.map((t: any, index) => (
							<div
								key={index}
								className='EmployerJobBasicForm__Type--Box--Container'
							>
								<RadioBox
									label={t}
									checked={type === t}
									name={'type'}
									value={t}
									placeholder={'type'}
									onChange={changeFormData}
								/>
							</div>
						))}
				</div>
			</div>
			<div className='EmployerJobBasicForm__Role'>
				<div className='EmployerJobBasicForm__Role--Label'>
					Job Role
					{/* Job Role <span>(Select 1 or more)</span> */}
				</div>
				{errorState && !role.length ? (
					<div className='EmployerJobBasicForm__Role--Error'>Required</div>
				) : null}
				<div className='EmployerJobBasicForm__Role--Box'>
					{roleList &&
						roleList.default_work_exp_roles.map((r: any, index) => (
							<div
								key={index}
								className='EmployerJobBasicForm__Role--Box--Container'
							>
								<SelectTickBox
									label={r}
									checked={role.includes(r)}
									name={'role'}
									value={r}
									placeholder={'role'}
									onChange={changeFormArray}
								/>
							</div>
						))}
				</div>
			</div>
			<div className='EmployerJobBasicForm__Rate'>
				<div className='EmployerJobBasicForm__Rate--Label'>Pay Rate</div>
				<div className='EmployerJobBasicForm__Rate--Type'>
					<div
						className={`EmployerJobBasicForm__Rate--Type--Hourly ${
							payType === 'hourly_pay' ? 'Active' : ''
						}`}
						onClick={() => changePayType('hourly_pay')}
					>
						Hourly Pay
					</div>
					<div
						className={`EmployerJobBasicForm__Rate--Type--Salary ${
							payType === 'salary_pay' ? 'Active' : ''
						}`}
						onClick={() => changePayType('salary_pay')}
					>
						Salary Pay
					</div>
				</div>
				<div className='EmployerJobBasicForm__Rate--Box'>
					<Range
						values={[rate.from, rate.to]}
						step={5000}
						min={0}
						max={250000}
						onChange={(values) =>
							updateRate({ from: values[0], to: values[1] })
						}
						renderTrack={({ props, children }) => (
							<div
								style={{
									height: '36px',
									display: 'flex',
									width: '667px',
								}}
							>
								<div
									ref={props.ref}
									style={{
										height: '5px',
										width: '100%',
										borderRadius: '4px',
										background: getTrackBackground({
											values: [rate.from, rate.to],
											colors: ['#E1E7EF', '#234476', '#E1E7EF'],
											min: 0,
											max: 250000,
										}),
										alignSelf: 'center',
									}}
								>
									{children}
								</div>
							</div>
						)}
						renderThumb={({ props }) => (
							<div
								{...props}
								style={{
									...props.style,
									height: '24px',
									width: '24px',
									borderRadius: '24px',
									backgroundColor: '#FFFFFF',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
								}}
							></div>
						)}
					/>
				</div>
				<div className='EmployerJobBasicForm__Rate--Number'>
					<div className='EmployerJobBasicForm__Rate--Number--Left'>
						$ {rate.from}
					</div>
					<div className='EmployerJobBasicForm__Rate--Number--Right'>
						$ {rate.to}
					</div>
				</div>
			</div>
		</div>
	)
}

export default JobBasicForm
