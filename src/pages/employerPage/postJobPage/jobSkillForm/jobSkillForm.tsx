import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import SelectTickBox from '../../../../component/employer/input/selectTickBox/selectTickBox'
import SelectCrossBox from '../../../../component/employer/input/selectCrossBox/selectCrossBox'
import DropdownBox from '../../../../component/employer/input/dropdownBox/dropdownBox'
import InputBox from '../../../../component/employer/input/inputBox/inputBox'

import { InputCheckBox } from '../../../../component/common/FormComponent/form'

import './jobSkillForm.css'

const experienceOptions = [
	{ title: 'No Experience Needed', value: 0 },
	{ title: '1 Year', value: 1 },
	{ title: '2 Years', value: 2 },
	{ title: '3 Years', value: 3 },
	{ title: '4 Years', value: 4 },
	{ title: '5+ Years', value: 5 },
]

interface Props {
	errorState: boolean
	specializationList: any
	specialization: any
	certificateList: any
	certificate: any
	otherCertificate: string
	benefitList: any
	benefit: any
	changeFormData: (event: any) => void
	changeFormArray: (event: any) => void
	updateSpecialization: (event: any) => void
	updateSkill: (specializationTitle: string, event: any) => void
	updateDesiredExperience: (specializationTitle: string, event: any) => void
	showOtherCertificate: boolean
	toggleShowOtherCertificate: () => void
}

const JobSkillForm: React.FC<Props> = (props: Props) => {
	const {
		errorState,
		specializationList,
		specialization,
		certificateList,
		certificate,
		otherCertificate,
		benefitList,
		benefit,
		changeFormData,
		changeFormArray,
		updateSpecialization,
		updateSkill,
		updateDesiredExperience,
		showOtherCertificate,
		toggleShowOtherCertificate,
	} = props

	const checkSpecializationIncludes = (specializationTitle) => {
		let list = specialization.filter((s) => s.title === specializationTitle)

		if (list && list.length > 0) return true

		return false
	}

	const checkSkillIncludes = (specializationTitle, skillTitle) => {
		let list = specialization.filter((s) => s.title === specializationTitle)

		if (list && list.length > 0) {
			let skill = list[0].skills.filter((l) => l === skillTitle)

			if (skill && skill.length > 0) return true

			return false
		}

		return false
	}

	const getSpecializationDesiredExperienc = (specializationTitle) => {
		let [list] = specialization.filter((s) => s.title === specializationTitle)

		if (list && list.desired_experience) return list.desired_experience

		return null
	}

	return (
		<div className='EmployerJobSkillForm'>
			<div className='EmployerJobSkillForm__Special'>
				<div className='EmployerJobSkillForm__Special--Label'>
					Select the trade specialization of your desired candidate{' '}
					<span>(select 1 or more)</span>
				</div>
				{errorState && !specialization.length ? (
					<div className='EmployerJobSkillForm__Special--Error'>Required</div>
				) : null}
				<div className='EmployerJobSkillForm__Special--Box'>
					{specializationList &&
						specializationList.map((s: any, index) => (
							<div
								key={index}
								className='EmployerJobSkillForm__Special--Box--Container'
							>
								<SelectTickBox
									label={s.title}
									checked={checkSpecializationIncludes(s.title)}
									name={'specialization'}
									value={s.title}
									placeholder={'specialization'}
									onChange={updateSpecialization}
								/>
							</div>
						))}
				</div>
			</div>
			{specializationList &&
				specializationList.map((s: any, index) => {
					if (checkSpecializationIncludes(s.title)) {
						return (
							<div key={index} className='EmployerJobSkillForm__Skill'>
								<div className='EmployerJobSkillForm__Skill--Label'>
									{s.title}
								</div>
								<div className='EmployerJobSkillForm__Skill--Title'>
									Desired Skills in <span>{s.title}</span>
								</div>
								<div className='EmployerJobSkillForm__Skill--Box'>
									{s.skills.map((c: any, index) => (
										<div
											key={index}
											className='EmployerJobSkillForm__Skill--Box--Container'
										>
											<SelectCrossBox
												label={c}
												checked={checkSkillIncludes(s.title, c)}
												name={'skill'}
												value={c}
												placeholder={'skill'}
												onChange={(event) => updateSkill(s.title, event)}
											/>
										</div>
									))}
								</div>
								<div className='EmployerJobSkillForm__Skill--Experience'>
									<div className='EmployerJobSkillForm__Skill--Experience--Title'>
										Desired Experience in <span>{s.title}</span>
									</div>
									<div className='EmployerJobSkillForm__Skill--Experience--Box'>
										<DropdownBox
											error={false}
											label={''}
											name={'experience'}
											option={experienceOptions}
											value={getSpecializationDesiredExperienc(s.title)}
											placeholder={'Select Experience'}
											onChange={(event) =>
												updateDesiredExperience(s.title, event)
											}
										/>
									</div>
								</div>
							</div>
						)
					}
				})}
			<div className='EmployerJobSkillForm__Certificate'>
				<div className='EmployerJobSkillForm__Certificate--Label'>
					Certificates <span>(optional)</span>
				</div>
				<div className='EmployerJobSkillForm__Certificate--Box'>
					{certificateList &&
						certificateList.default_certificates &&
						certificateList.default_certificates.map((c: any, index) => {
							if (c.toLowerCase() !== 'other') {
								return (
									<div
										key={index}
										className='EmployerJobSkillForm__Certificate--Box--Container'
									>
										<InputCheckBox
											name={'certificate'}
											title={c}
											value={c}
											onChecked={changeFormArray}
										/>
									</div>
								)
							}
						})}
					<div className='EmployerJobSkillForm__Certificate--Box--Other'>
						<div className='EmployerJobSkillForm__Certificate--Box--Other--Title'>
							<FontAwesomeIcon icon={faPlus} />
							<span onClick={toggleShowOtherCertificate}>
								Add Other Certificate
							</span>
						</div>
						<div
							className={`EmployerJobSkillForm__Certificate--Box--Other--InputBox ${
								showOtherCertificate ? '' : 'Hide'
							}`}
						>
							<InputBox
								internalPadding={'10px'}
								error={false}
								label={''}
								type={'text'}
								name={'otherCertificate'}
								value={otherCertificate}
								placeholder={'Other Certificate Name'}
								onChange={changeFormData}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='EmployerJobSkillForm__Benefit'>
				<div className='EmployerJobSkillForm__Benefit--Label'>
					Benefits <span>(optional)</span>
				</div>
				<div className='EmployerJobSkillForm__Benefit--Box'>
					{benefitList &&
						benefitList.default_work_perf_benefits &&
						benefitList.default_work_perf_benefits.map((b: any, index) => (
							<div
								key={index}
								className='EmployerJobSkillForm__Benefit--Box--Container'
							>
								<InputCheckBox
									name={'benefit'}
									title={b}
									value={b}
									onChecked={changeFormArray}
								/>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default JobSkillForm
