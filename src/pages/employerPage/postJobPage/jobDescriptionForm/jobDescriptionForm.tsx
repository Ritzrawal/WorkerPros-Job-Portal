import React from 'react'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import TextBox from '../../../../component/employer/input/textBox/textBox'
import DropdownBox from '../../../../component/employer/input/dropdownBox/dropdownBox'

import { InputCheckBox } from '../../../../component/common/FormComponent/form'

import './jobDescriptionForm.css'

const TimeRange = [
	{ title: '12:00 AM', value: '12:00 AM' },
	{ title: '12:30 AM', value: '12:30 AM' },
	{ title: '01:00 AM', value: '01:00 AM' },
	{ title: '01:30 AM', value: '01:30 AM' },
	{ title: '02:00 AM', value: '02:00 AM' },
	{ title: '02:30 AM', value: '02:30 AM' },
	{ title: '03:00 AM', value: '03:00 AM' },
	{ title: '03:30 AM', value: '03:30 AM' },
	{ title: '04:00 AM', value: '04:00 AM' },
	{ title: '04:30 AM', value: '04:30 AM' },
	{ title: '05:00 AM', value: '05:00 AM' },
	{ title: '05:30 AM', value: '05:30 AM' },
	{ title: '06:00 AM', value: '06:00 AM' },
	{ title: '06:30 AM', value: '06:30 AM' },
	{ title: '07:00 AM', value: '07:00 AM' },
	{ title: '07:30 AM', value: '07:30 AM' },
	{ title: '08:00 AM', value: '08:00 AM' },
	{ title: '08:30 AM', value: '08:30 AM' },
	{ title: '09:00 AM', value: '09:00 AM' },
	{ title: '09:30 AM', value: '09:30 AM' },
	{ title: '10:00 AM', value: '10:00 AM' },
	{ title: '10:30 AM', value: '10:30 AM' },
	{ title: '11:00 AM', value: '11:00 AM' },
	{ title: '11:30 AM', value: '11:30 AM' },
	{ title: '12:00 PM', value: '12:00 PM' },
	{ title: '12:30 PM', value: '12:30 PM' },
	{ title: '01:00 PM', value: '01:00 PM' },
	{ title: '01:30 PM', value: '01:30 PM' },
	{ title: '02:00 PM', value: '02:00 PM' },
	{ title: '02:30 PM', value: '02:30 PM' },
	{ title: '03:00 PM', value: '03:00 PM' },
	{ title: '03:30 PM', value: '03:30 PM' },
	{ title: '04:00 PM', value: '04:00 PM' },
	{ title: '04:30 PM', value: '04:30 PM' },
	{ title: '05:00 PM', value: '05:00 PM' },
	{ title: '05:30 PM', value: '05:30 PM' },
	{ title: '06:00 PM', value: '06:00 PM' },
	{ title: '06:30 PM', value: '06:30 PM' },
	{ title: '07:00 PM', value: '07:00 PM' },
	{ title: '07:30 PM', value: '07:30 PM' },
	{ title: '08:00 PM', value: '08:00 PM' },
	{ title: '08:30 PM', value: '08:30 PM' },
	{ title: '09:00 PM', value: '09:00 PM' },
	{ title: '09:30 PM', value: '09:30 PM' },
	{ title: '10:00 PM', value: '10:00 PM' },
	{ title: '10:30 PM', value: '10:30 PM' },
	{ title: '11:00 PM', value: '11:00 PM' },
	{ title: '11:30 PM', value: '11:30 PM' },
]

interface Props {
	errorState: boolean
	summary: string
	responsibilities: string
	workingSchedule: any
	changeFormData: (event: any) => void
	changeWorkSchedule: (day: any, key: any, value: any) => void
	copyWorkSchedule: () => void
	changeFormContent: (name: string, value: string) => void
	workingScheduleValidation: (workingSchedule: any) => boolean
}

const JobDescriptionForm: React.FC<Props> = (props: Props) => {
	const {
		errorState,
		summary,
		responsibilities,
		workingSchedule,
		changeFormData,
		changeWorkSchedule,
		copyWorkSchedule,
		changeFormContent,
		workingScheduleValidation,
	} = props

	return (
		<div className='EmployerJobDescriptionForm'>
			<div className='EmployerJobDescriptionForm__Summary'>
				<div className='EmployerJobDescriptionForm__Summary--Title'>
					Job Summary*
				</div>
				{errorState && !summary.length ? (
					<div className='EmployerJobDescriptionForm__Summary--Error'>
						Required
					</div>
				) : null}
				<div className='EmployerJobDescriptionForm__Summary--Editor'>
					<CKEditor
						editor={ClassicEditor}
						data={summary}
						onReady={(editor) => {
							// You can store the "editor" and use when it is needed.
							console.log('Editor is ready to use!', editor)
						}}
						onChange={(event, editor) => {
							const data = editor.getData()
							changeFormContent('summary', data)
						}}
					/>
				</div>
			</div>
			<div className='EmployerJobDescriptionForm__Responsibility'>
				<div className='EmployerJobDescriptionForm__Responsibility--Title'>
					Responsibilities*
				</div>
				{errorState && !responsibilities.length ? (
					<div className='EmployerJobDescriptionForm__Responsibility--Error'>
						Required
					</div>
				) : null}
				<div className='EmployerJobDescriptionForm__Responsibility--Editor'>
					<CKEditor
						editor={ClassicEditor}
						data={responsibilities}
						onReady={(editor) => {
							// You can store the "editor" and use when it is needed.
							console.log('Editor is ready to use!', editor)
						}}
						onChange={(event, editor) => {
							const data = editor.getData()
							changeFormContent('responsibilities', data)
						}}
					/>
				</div>
			</div>
			<div className='EmployerJobDescriptionForm__Schedule'>
				<div className='EmployerJobDescriptionForm__Schedule--Title'>
					Typical Hours of Work*
				</div>
				{errorState && !workingScheduleValidation(workingSchedule) ? (
					<div className='EmployerJobDescriptionForm__Schedule--Error'>
						Required
					</div>
				) : null}
				<div className='EmployerJobDescriptionForm__Schedule--Body'>
					<div className='EmployerJobDescriptionForm__Schedule--Body--Time'>
						{Object.keys(workingSchedule).map((key: any, index) => (
							<div
								key={index}
								className='EmployerJobDescriptionForm__Schedule--Body--Time--Container'
							>
								<div className='EmployerJobDescriptionForm__Schedule--Body--Time--Container--Day'>
									<InputCheckBox
										checked={!workingSchedule[key].off}
										name={'schedule'}
										title={key}
										value={key}
										onChecked={(event) =>
											changeWorkSchedule(key, 'off', !event.target.checked)
										}
									/>
								</div>
								<div className='EmployerJobDescriptionForm__Schedule--Body--Time--Container--TimeStart'>
									<DropdownBox
										internalPadding={'8px'}
										rightIcon={faAngleDown}
										error={false}
										label={''}
										name={'start'}
										option={TimeRange}
										value={workingSchedule[key].start}
										placeholder={'Start'}
										onChange={(event) =>
											changeWorkSchedule(key, 'start', event.target.value)
										}
									/>
								</div>
								<div className='EmployerJobDescriptionForm__Schedule--Body--Time--Container--TimeEnd'>
									<DropdownBox
										internalPadding={'8px'}
										rightIcon={faAngleDown}
										error={false}
										label={''}
										name={'end'}
										option={TimeRange}
										value={workingSchedule[key].end}
										placeholder={'End'}
										onChange={(event) =>
											changeWorkSchedule(key, 'end', event.target.value)
										}
									/>
								</div>
							</div>
						))}
					</div>
					<div className='EmployerJobDescriptionForm__Schedule--Body--Option'>
						<span onClick={copyWorkSchedule}>Copy to All</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default JobDescriptionForm
