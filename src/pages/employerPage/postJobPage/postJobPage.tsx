import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faMapMarkerAlt,
	faEdit,
	faArrowLeft,
	faAngleRight,
	faEye,
} from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'reactstrap'
import renderHTML from 'react-render-html'

import { locationListAction } from '../../../store/action/locationListAction'
import { certificateListAction } from '../../../store/action/certficateListAction'
import { benefitListAction } from '../../../store/action/benefitListAction'
import { categoryListAction } from '../../../store/action/categoryListAction'
import { jobTypeListAction } from '../../../store/action/jobTypeListAction'
import { jobRoleListAction } from '../../../store/action/jobRoleListAction'
import {
	jobPostAction,
	clearJobPostAction,
} from '../../../store/action/jobPostAction'

import JobBasicForm from './jobBasicForm/jobBasicForm'
import JobDescriptionForm from './jobDescriptionForm/jobDescriptionForm'
import JobSkillForm from './jobSkillForm/jobSkillForm'

import './postJobPage.css'

const workingSchedule = {
	monday: {
		start: '',
		end: '',
		off: true,
	},
	tuesday: {
		start: '',
		end: '',
		off: true,
	},
	wednesday: {
		start: '',
		end: '',
		off: true,
	},
	thursday: {
		start: '',
		end: '',
		off: true,
	},
	friday: {
		start: '',
		end: '',
		off: true,
	},
	saturday: {
		start: '',
		end: '',
		off: true,
	},
	sunday: {
		start: '',
		end: '',
		off: true,
	},
}

interface Props {
	locationList: any
	certificateList: any
	benefitList: any
	categoryList: any
	jobTypeList: any
	jobRoleList: any
	jobPost: any
	locationListAction: () => void
	certificateListAction: () => void
	benefitListAction: () => void
	categoryListAction: () => void
	jobTypeListAction: () => void
	jobRoleListAction: () => void
	jobPostAction: (params: any) => void
	clearJobPostAction: () => void
	history: any
}

const PostJobPage: React.FC<Props> = (props: Props) => {
	const {
		locationList,
		certificateList,
		benefitList,
		categoryList,
		jobTypeList,
		jobRoleList,
		jobPost,
		locationListAction,
		certificateListAction,
		benefitListAction,
		categoryListAction,
		jobTypeListAction,
		jobRoleListAction,
		jobPostAction,
		clearJobPostAction,
		history,
	} = props

	const [formState, setFormState] = useState({
		current: 'basic',
		next: 'description',
	})

	const [showOtherCertificate, setShowOtherCertificate] = useState(false)

	const [formData, setFormData] = useState({
		title: '',
		location: { state: '', city: '' },
		type: '',
		role: [],
		payType: 'hourly_pay',
		rate: { from: 0, to: 250000 },
		summary: '',
		responsibilities: '',
		workingSchedule,
		specialization: [],
		certificate: [],
		otherCertificate: '',
		benefit: [],
	})

	const [errorState, setErrorState] = useState(false)
	const [draftErrorState, setDraftErrorState] = useState(false)

	useEffect(() => {
		locationListAction()
		certificateListAction()
		benefitListAction()
		categoryListAction()
		jobTypeListAction()
		jobRoleListAction()
	}, [])

	const changeFormData = (event: any) => {
		setErrorState(false)
		setDraftErrorState(false)

		const { name, value } = event.target

		if (name === 'title') {
			if (value.length <= 180) {
				setFormData({ ...formData, [name]: value })
			}
		} else {
			setFormData({ ...formData, [name]: value })
		}
	}

	const changeFormArray = (event: any) => {
		setErrorState(false)

		const { name, value, checked } = event.target

		let currentValues: any = formData[name]

		if (!checked) {
			const index = currentValues.indexOf(value)
			currentValues.splice(index, 1)
		} else {
			if (name === 'role') {
				currentValues = [value]
			} else {
				currentValues.push(value)
			}
		}

		setFormData({ ...formData, [name]: currentValues })
	}

	const changeFormContent = (name, value) => {
		setErrorState(false)

		setFormData({ ...formData, [name]: value })
	}

	const updateSpecialization = (event: any) => {
		setErrorState(false)

		const { name, value, checked } = event.target

		let currentValues: any = formData[name]

		if (!checked) {
			currentValues = currentValues.filter((v) => v.title !== value)
		} else {
			currentValues.push({ title: value, skills: [], desired_experience: 0 })
		}

		setFormData({ ...formData, [name]: currentValues })
	}

	const updateSkill = (specializationTitle, event: any) => {
		setErrorState(false)

		const { name, value, checked } = event.target

		let specialization: any = formData.specialization

		specialization = specialization.map((s: any) => {
			if (s.title === specializationTitle) {
				let currentSkills: any = s.skills

				if (!checked) {
					currentSkills = currentSkills.filter((v) => v !== value)
				} else {
					currentSkills.push(value)
				}

				return { ...s, skills: currentSkills }
			} else {
				return s
			}
		})

		setFormData({ ...formData, specialization })
	}

	const updateDesiredExperience = (specializationTitle, event: any) => {
		setErrorState(false)

		const { name, value, checked } = event.target

		let specialization: any = formData.specialization

		specialization = specialization.map((s: any) => {
			if (s.title === specializationTitle) {
				return { ...s, desired_experience: value }
			} else {
				return s
			}
		})

		setFormData({ ...formData, specialization })
	}

	const toggleShowOtherCertificate = () => {
		if (showOtherCertificate) {
			setFormData({ ...formData, otherCertificate: '' })
		}

		setShowOtherCertificate(!showOtherCertificate)
	}

	const updateRate = (rateRange: any) => {
		setErrorState(false)

		setFormData({
			...formData,
			rate: { from: rateRange.from, to: rateRange.to },
		})
	}

	const changeWorkSchedule = (day: any, key: any, value) => {
		setErrorState(false)

		let currentWorkSchedule = formData.workingSchedule

		currentWorkSchedule[day][key] = value

		setFormData({ ...formData, workingSchedule: currentWorkSchedule })
	}

	const copyWorkSchedule = () => {
		setErrorState(false)

		let currentWorkSchedule = formData.workingSchedule

		let start
		let end
		let off

		Object.keys(currentWorkSchedule).forEach((key: any, index) => {
			if (index === 0) {
				start = currentWorkSchedule[key].start
				end = currentWorkSchedule[key].end
				off = currentWorkSchedule[key].off
			}
			currentWorkSchedule[key].start = start
			currentWorkSchedule[key].end = end
			// currentWorkSchedule[key].off = off
		})

		setFormData({ ...formData, workingSchedule: currentWorkSchedule })
	}

	const changeLocation = (state, city) => {
		setErrorState(false)

		setFormData({ ...formData, location: { state, city } })
	}

	const workingScheduleValidation = (workingSchedule) => {
		let isValid = false

		const workingScheduleWithTime = Object.keys(workingSchedule).filter(
			(day: any) =>
				(workingSchedule[day].off === false ||
					workingSchedule[day].off === 'false') &&
				workingSchedule[day].start !== '' &&
				workingSchedule[day].end !== ''
		)

		if (workingScheduleWithTime && workingScheduleWithTime.length)
			isValid = true

		return isValid
	}

	const updateFormState = (formState) => {
		window.scrollTo(0, 0)
		if (formState === 'basic') {
			setFormState({ current: 'basic', next: 'description' })
		} else if (formState === 'description') {
			if (
				formData.title !== '' &&
				formData.location.city !== '' &&
				formData.type !== '' &&
				formData.role.length > 0
			) {
				setFormState({
					current: 'description',
					next: 'skill',
				})
			} else {
				setErrorState(true)
			}
		} else if (formState === 'skill') {
			if (
				formData.summary !== '' &&
				formData.responsibilities !== '' &&
				workingScheduleValidation(formData.workingSchedule)
			) {
				setFormState({
					current: 'skill',
					next: '',
				})
			} else {
				setErrorState(true)
			}
		}
	}

	const getJobParams = (jobType) => {
		let allCertificate: any = formData.certificate
		if (formData.otherCertificate) {
			allCertificate.push(formData.otherCertificate)
		}

		return {
			title: formData.title,
			summary: formData.summary,
			responsibilities: formData.responsibilities,
			working_schedule: formData.workingSchedule,
			job_type: formData.type,
			job_role: formData.role,
			pay_rate: {
				min: formData.rate.from,
				max: formData.rate.to,
				pay_type: formData.payType,
			},
			benefits: formData.benefit,
			certificates: allCertificate,
			address: formData.location,
			categories: formData.specialization,
			phase: jobType,
		}
	}

	const publishJob = () => {
		if (formData.specialization.length !== 0) {
			const jobParams = getJobParams('published')
			jobPostAction(jobParams)
		} else {
			setErrorState(true)
		}
	}

	const draftJob = () => {
		if (formData.title !== '') {
			const jobParams = getJobParams('draft')
			jobPostAction(jobParams)
		} else {
			setDraftErrorState(true)
		}
	}

	useEffect(() => {
		if (!jobPost.loading && jobPost.success) {
			clearJobPostAction()
			history.push('/employer/dashboard')
		}
	}, [jobPost])

	return (
		<div className='EmployerPostJob'>
			<div className='EmployerPostJob__Header'>
				<div className='EmployerPostJob__Header--LeftLink'>
					<Link to={'/employer/dashboard'}>
						<FontAwesomeIcon icon={faArrowLeft} /> Dashboard
					</Link>
				</div>
				<div className='EmployerPostJob__Header--Title'>WorkerPros</div>
			</div>
			<div className='EmployerPostJob__Title'>Post New Job</div>
			<div className='EmployerPostJob__Container'>
				<div className='EmployerPostJob__Container--Sidebar'>
					<ul>
						<li
							className={
								formState.current === 'basic'
									? 'EmployerPostJob__Container--Sidebar--Active'
									: ''
							}
						>
							1. Job Basic
							{formState.current === 'basic' && (
								<FontAwesomeIcon icon={faAngleRight} />
							)}
						</li>
						<li
							className={
								formState.current === 'description'
									? 'EmployerPostJob__Container--Sidebar--Active'
									: ''
							}
						>
							2. Job Description
							{formState.current === 'description' && (
								<FontAwesomeIcon icon={faAngleRight} />
							)}
						</li>
						<li
							className={
								formState.current === 'skill'
									? 'EmployerPostJob__Container--Sidebar--Active'
									: ''
							}
						>
							3. Candidate Skills
							{formState.current === 'skill' && (
								<FontAwesomeIcon icon={faAngleRight} />
							)}
						</li>
					</ul>
				</div>
				<div className='EmployerPostJob__Container--Body'>
					{(formState.current === 'description' ||
						formState.current === 'skill') && (
						<div className='EmployerPostJob__Container--Body--DetailWrapper'>
							<div className='EmployerPostJob__Container--Body--Detail'>
								<div className='EmployerPostJob__Container--Body--Detail--Container'>
									<div className='EmployerPostJob__Container--Body--Detail--Container--Title'>
										{formData.title}
									</div>
									<div className='EmployerPostJob__Container--Body--Detail--Container--Info'>
										<div className='EmployerPostJob__Container--Body--Detail--Container--Info--Location'>
											<FontAwesomeIcon icon={faMapMarkerAlt} />
											{formData.location.city}
										</div>
										<div className='EmployerPostJob__Container--Body--Detail--Container--Info--Type'>
											{formData.type}
										</div>
										<div className='EmployerPostJob__Container--Body--Detail--Container--Info--Rate'>
											$ {formData.rate.from} - {formData.rate.to} / HR
										</div>
									</div>
								</div>
								<div className='EmployerPostJob__Container--Body--Detail--Button'>
									<button onClick={() => updateFormState('basic')}>
										<FontAwesomeIcon icon={faEdit} />
									</button>
								</div>
							</div>
						</div>
					)}

					{formState.current === 'skill' && (
						<div className='EmployerPostJob__Container--Body--DescriptionWrapper'>
							<div className='EmployerPostJob__Container--Body--Description'>
								<div className='EmployerPostJob__Container--Body--Description--Container'>
									<div className='EmployerPostJob__Container--Body--Description--Container--Title'>
										Job Summary
									</div>
									<div className='EmployerPostJob__Container--Body--Description--Container--Info'>
										{renderHTML(formData.summary)}
									</div>
								</div>
								<div className='EmployerPostJob__Container--Body--Description--Button'>
									<button onClick={() => updateFormState('description')}>
										<FontAwesomeIcon icon={faEdit} />
									</button>
								</div>
							</div>
						</div>
					)}

					<div className='EmployerPostJob__Container--Body--Form'>
						<div
							className={`EmployerPostJob__Container--Body--Form--JobBasicForm ${
								formState.current === 'basic' ? '' : 'Hide'
							}`}
						>
							<JobBasicForm
								draftErrorState={draftErrorState}
								errorState={errorState}
								title={formData.title}
								locationList={locationList}
								location={formData.location}
								typeList={jobTypeList}
								type={formData.type}
								roleList={jobRoleList}
								role={formData.role}
								payType={formData.payType}
								rate={formData.rate}
								changeFormData={changeFormData}
								changeFormArray={changeFormArray}
								updateRate={updateRate}
								changePayType={(payType) =>
									setFormData({ ...formData, payType: payType })
								}
								changeLocation={changeLocation}
							/>
						</div>
						<div
							className={`EmployerPostJob__Container--Body--Form--JobDescriptionForm ${
								formState.current === 'description' ? '' : 'Hide'
							}`}
						>
							<JobDescriptionForm
								errorState={errorState}
								summary={formData.summary}
								responsibilities={formData.responsibilities}
								workingSchedule={formData.workingSchedule}
								changeFormData={changeFormData}
								changeWorkSchedule={changeWorkSchedule}
								copyWorkSchedule={copyWorkSchedule}
								changeFormContent={changeFormContent}
								workingScheduleValidation={workingScheduleValidation}
							/>
						</div>
						<div
							className={`EmployerPostJob__Container--Body--Form--JobSkillForm ${
								formState.current === 'skill' ? '' : 'Hide'
							}`}
						>
							<JobSkillForm
								errorState={errorState}
								specializationList={categoryList}
								specialization={formData.specialization}
								certificateList={certificateList}
								certificate={formData.certificate}
								otherCertificate={formData.otherCertificate}
								benefitList={benefitList}
								benefit={formData.benefit}
								changeFormData={changeFormData}
								changeFormArray={changeFormArray}
								updateSpecialization={updateSpecialization}
								updateSkill={updateSkill}
								updateDesiredExperience={updateDesiredExperience}
								showOtherCertificate={showOtherCertificate}
								toggleShowOtherCertificate={toggleShowOtherCertificate}
							/>
						</div>
					</div>
					<div className='EmployerPostJob__Container--NextButton'>
						<div className='EmployerPostJob__Container--NextButton--Preview'>
							<FontAwesomeIcon icon={faEye} />
							Show Preview
						</div>
						<div className='EmployerPostJob__Container--NextButton--Next'>
							{jobPost.loading ? (
								<Spinner />
							) : (
								<>
									<span onClick={draftJob}>Save Draft</span>
									{formState.current === 'skill' ? (
										<button onClick={publishJob}>Publish Job</button>
									) : (
										<button onClick={() => updateFormState(formState.next)}>
											Next
										</button>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	locationList: state.locationListReducer.data,
	certificateList: state.certificateListReducer.data,
	benefitList: state.benefitListReducer.data,
	categoryList: state.categoryListReducer.data,
	jobTypeList: state.jobTypeListReducer.data,
	jobRoleList: state.jobRoleListReducer.data,
	jobPost: state.jobPostReducer,
})

const action = {
	locationListAction,
	certificateListAction,
	benefitListAction,
	categoryListAction,
	jobTypeListAction,
	jobRoleListAction,
	jobPostAction,
	clearJobPostAction,
}

export default connect(mapStateToProps, action)(PostJobPage)
