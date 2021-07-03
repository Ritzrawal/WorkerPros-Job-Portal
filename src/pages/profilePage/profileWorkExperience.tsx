//import Library and third party
import React, { useState, useEffect, SyntheticEvent } from 'react'
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { profileAllInfoAction } from '../../store/action/profileAction'
import SelectDatePicker from '@netojose/react-select-datepicker'
//import  Action and component
var fromdata
var todate

import {
	CustomButton,
	CustomButtonTag,
	CustomButtonTagnotClick,
} from '../../component/common/buttons/profileButton'
import { ProfileDummyImage } from '../../component/logosAndIcons'
import {
	jobsCategoryListAction,
	jobsCategorySkillsAction,
} from '../../store/action/jobsListAction'
import { jobRoleListAction } from '../../store/action/jobRoleListAction'
import { getCompanies } from '../../store/action/company'
import { connect } from 'react-redux'
import { profileWorkExpUpdateAction } from '../../store/action/profileAction'
import { InputCheckBox } from '../../component/common/FormComponent/form'
interface Props {
	title?: string
	category?: any
	skills?: any
	role?: any
	profileinfo?: any
	company?: any
	tick?: boolean
	onClickNext?: any
	getSelectedProfileList: (onAddTrade: any) => void
	jobsCategoryListAction: () => void
	jobsCategorySkillsAction?: (id: any) => void
	onDisplayRouter?: any
	getCompanies: (querry: any) => void
	jobRoleListAction: () => void
	profileWorkExpUpdateAction: (data: any) => void
	profileAllInfoAction: () => void
	updateStatus?: boolean
	profileFlag?: boolean
	addFlag?: boolean
}
const ProfileWorkExperience: React.FC<Props> = (
	props: Props
): React.ReactElement => {
	const [checkedrole, setCheckedRole] = useState(false)
	const [checked, setChecked] = useState(false)
	const [roledata, setRoledata] = useState<string>()
	const [catdata, setCatdata] = useState('')
	const [date, setDate] = useState(new Date())
	const [showdata, setShowSelect]: any = useState(false)
	const [error, setError] = useState(false)
	const [caterror, setErrorcat] = useState(false)
	const [updateForm, setUpdateForm] = useState([
		{
			company_name: '',
			description: '',
			role: '',
			companyerror: false,
			roleerror: false,
			categories: [],
			from: {
				year: '2000',
				month: 'january',
			},
			to: {
				year: '2000',
				month: 'january',
			},
			currently_work: false,
			other_worked_category: false,
		},
	])

	useEffect(() => {
		// props.jobsCategoryListAction()
		props.jobRoleListAction()
		props.profileAllInfoAction()
		// onTextData
	}, [props.jobRoleListAction])

	/* =============UseEffect for the showing the update value==================== */
	useEffect(() => {
		props.jobsCategoryListAction()
		const newdata = props.profileinfo.work_experience.map((it, i) => {
			console.log('profile', it.role)
			return {
				...updateForm,
				company_name: it.company_name,
				description: it.description,
				companyerror: false,
				roleerror: false,
				role: it.role || props.role.default_work_exp_roles[0],
				categories: [],
				from: {
					year: it.from.year,
					month: it.from.month,
				},
				to: {
					year: it.to.year,
					month: it.to.month,
				},
				currently_work: it.currently_work,
				other_worked_category: it.other_worked_category,
			}
		})
		if (props.profileinfo.work_experience.length == 0) {
			console.log('form error')
		} else {
			setUpdateForm(newdata)
		}
	}, [props.profileinfo.work_experience])

	const onAddTrade = () => {
		props.onClickNext()
		// props.onDisplayRouter()
		const newUpdateForm = updateForm.map((f: any, index) => {
			if (updateForm.length - 1 === index) {
				if (
					f.company_name.trim().length === 0 ||
					f.role.trim().length === 0 ||
					(f.company_name.trim().length === 0 && f.role.trim().length === 0)
				) {
					if (
						f.company_name.trim().length === 0 &&
						f.role.trim().length === 0
					) {
						return { ...f, companyerror: true, roleerror: true }
					}
					if (f.company_name.trim().length === 0) {
						return { ...f, companyerror: true }
					}
					if (f.role.trim().length === 0) {
						console.log('hello if condition', f.roleerror)
						return { ...f, roleerror: true }
						// setErrorcat(true)
					}
				} else {
					let newUpdateForm = updateForm
					const newdata = newUpdateForm.map((f: any, index) => {
						console.log('fuck lol', props.role.default_work_exp_roles[0])
						return {
							company_name: f.company_name,
							description: f.description,
							role: f.role,
							categories: f.categories,
							from: f.from,
							to: f.to,
							currently_work: f.currently_work,
							other_worked_category: f.other_worked_category,
						}
					})
					props.getSelectedProfileList(3)
					props.onClickNext()
					setError(false)
					setErrorcat(false)
					props.profileWorkExpUpdateAction(newdata)
					return { ...f }
				}
			} else {
				return f
			}
		})
		setUpdateForm(newUpdateForm)
	}

	/// ===============================event for input textfile===============================

	const onCatOnclick = (event: any, formIndex) => {
		console.log('update form', updateForm)
		const { name, innerText } = event.target

		let currentFormData: any = updateForm

		currentFormData = currentFormData.map((form: any, index) => {
			if (formIndex === index) {
				let currentSkills = form.categories

				if (currentSkills.includes(innerText)) {
					currentSkills = currentSkills.filter((skill) => skill !== innerText)
				} else {
					currentSkills.length < 5 && currentSkills.push(innerText)
				}
				return { ...form, categories: currentSkills }
			} else {
				return form
			}
		})

		setUpdateForm(currentFormData)
	}
	const handleAddFields = () => {
		let currentForm = updateForm

		if (currentForm.length < 10) {
			currentForm = [
				...currentForm,
				{
					company_name: '',
					description: '',
					companyerror: false,
					roleerror: false,
					role: '',
					categories: [],
					from: {
						year: '',
						month: '',
					},
					to: {
						year: '',
						month: '',
					},
					currently_work: false,
					other_worked_category: false,
				},
			]
		}
		setUpdateForm(currentForm)
	}

	//=============================== Calender Start date handle function===============================
	const onFormDataChangeDate = (value, formIndex) => {
		console.log('hello date from', value)
		fromdata = value
		const newmonth = value.toLocaleString('default', { month: 'long' })
		const newyear = value.getFullYear()
		let newUpdateForm = updateForm.map((f: any, index) => {
			if (formIndex === index) {
				return { ...f, from: { year: newyear, month: newmonth } }
			} else {
				return f
			}
		})

		setUpdateForm(newUpdateForm)
	}
	//===============================Calender value End date function===============================
	const onToDataChangeDate = (value, formIndex) => {
		todate = value
		console.log('hello date from ', value)
		const newmonth = value.toLocaleString('default', { month: 'long' })
		const newyear = value.getFullYear()
		let newUpdateForm = updateForm.map((f: any, index) => {
			if (formIndex === index) {
				return { ...f, to: { year: newyear, month: newmonth } }
			} else {
				return f
			}
		})

		setUpdateForm(newUpdateForm)
	}

	//Currently working in thid role function
	const onCheckedDataChange = (event: any, formIndex) => {
		// console.log('hello checked', event.target.checked)
		const newmonth = date.toLocaleString('default', { month: 'long' })
		const newyear = date.getFullYear()
		console.log('current month', newyear)
		const checked = event.target.checked
		let newUpdateForm = updateForm.map((f: any, index) => {
			if (formIndex === index) {
				setChecked(checked)
				return {
					...f,
					currently_work: checked,
					to: { year: newyear, month: newmonth },
				}
			} else {
				return f
			}
		})

		setUpdateForm(newUpdateForm)
	}
	//===================Other Worked  then above function===============================
	const onCheckedOtherDataChange = (event: any, formIndex) => {
		const checked = event.target.checked
		let newUpdateForm = updateForm.map((f: any, index) => {
			if (formIndex === index) {
				return { ...f, other_worked_category: checked }
			} else {
				return f
			}
		})

		setUpdateForm(newUpdateForm)
	}
	//===============================function chnege the company Name===============================
	const onFormDataChange = (event: any, formIndex) => {
		const { name, value } = event.target
		let newUpdateForm = updateForm.map((f: any, index) => {
			if (formIndex === index) {
				console.log('f data', formIndex)
				props.getCompanies(f.company_name)
				return { ...f, [name]: value }
			} else {
				return f
			}
		})

		setUpdateForm(newUpdateForm)
	}
	const onFormDataChangeRole = (event: any, formIndex) => {
		const { name, value } = event.target
		let newUpdateForm = updateForm.map((f: any, index) => {
			if (formIndex === index) {
				console.log('f data', formIndex)

				return { ...f, [name]: value, roleerror: false }
			} else {
				return f
			}
		})

		setUpdateForm(newUpdateForm)
	}
	const onFormDataChangeCompany = (event: any, formIndex) => {
		const { name, value } = event.target
		let newUpdateForm = updateForm.map((f: any, index) => {
			if (formIndex === index) {
				console.log('f data', formIndex)
				props.getCompanies(f.company_name)
				return { ...f, [name]: value, companyerror: false }
			} else {
				return f
			}
		})

		setUpdateForm(newUpdateForm)
	}
	//Hide after selecting the company Name
	const selectHide = (value, formIndex) => {
		const companyName = value.company_name ? value.company_name : value
		setCatdata(companyName)

		let newUpdateForm = updateForm.map((f: any, index) => {
			if (formIndex === index) {
				return { ...f, company_name: companyName, companyerror: false }
			} else {
				return f
			}
		})

		setUpdateForm(newUpdateForm)

		setShowSelect(!showdata)
	}

	const getFilteredCompanies = (companyName) => {
		let companies = []

		if (props.company && props.company.companies && props.company.companies) {
			companies = props.company.companies

			if (companyName && companyName !== '') {
				companies = companies.filter(
					(c: any) =>
						c.company_name.toLowerCase().search(companyName.toLowerCase()) !==
						-1
				)
			}
		}

		return companies
	}
	console.log('hello update empty', updateForm)
	return (
		<div>
			<div className='WorkExperienceContainer'>
				<div className='TradeandSkilContentContainer'>
					<div className='TradeAndSkillsTitle'>
						<text className='TradeAndSkillsHeader'>Work Experience</text>
					</div>
					{updateForm.map((f, index) => (
						<div key={index}>
							<div className='TradeAndSkillsInputContainer'>
								<div className='SelectClickHandler'>
									<FormGroup className='WorkInputDropDownField'>
										<Label for='exampleSelect' className='SelectTextCustomize'>
											Company name
										</Label>

										<Input
											type='text'
											name='company_name'
											invalid={f.companyerror}
											className='WorkInputDropTextField'
											value={f.company_name}
											placeholder='Ex: DPR Construction'
											onChange={(event) =>
												onFormDataChangeCompany(event, index)
											}
											onFocus={() => setShowSelect(true)}
											id='exampleSelect'
											autocomplete='off'
										/>
										{/* {error && (
										<FormFeedback invalid>This filed is required</FormFeedback>
									)} */}

										{showdata && (
											<div className='WorkDataToshowWhenSearch'>
												{getFilteredCompanies(f.company_name).map(
													(it: any, listIndex) => {
														return (
															<div
																onClick={() =>
																	selectHide(it.company_name, index)
																}
																key={listIndex}
																className='WorkSearchListDisplayWithImage'
															>
																<img
																	// src={it.profile_image}
																	src={
																		it.profile_image
																			? `${process.env.REACT_APP_IMAGE_URL}${it.profile_image}`
																			: ProfileDummyImage
																	}
																	style={{
																		width: 20,
																		height: 20,
																		borderRadius: 20,
																	}}
																	alt=''
																/>
																<p key={index} style={{ paddingLeft: 10 }}>
																	{it.company_name}
																</p>
															</div>
														)
													}
												)}
											</div>
										)}
									</FormGroup>
								</div>
								<FormGroup className='WorkInputDropDownFieldRight'>
									<Label for='exampleSelect' className='SelectTextCustomize'>
										Role
									</Label>
									<Input
										type='select'
										name='role'
										placeholder='Select'
										value={f.role}
										invalid={f.roleerror}
										onChange={(event) => onFormDataChangeRole(event, index)}
										className='WorkInputDropTextFieldExperience'
										id='exampleSelect'
									>
										<option disabled value=''>
											Select your Role
										</option>

										{props.role &&
											props.role.default_work_exp_roles.map((items, index) => {
												return (
													<option key={items._id} id={items._id}>
														{items}
													</option>
												)
											})}
									</Input>
								</FormGroup>
							</div>
							<div className='ProfileDateContainer'>
								<FormGroup className='ProfileDateDropDown'>
									<Label for='exampleSelect' className='SelectTextCustomize'>
										Start Date
									</Label>
									<SelectDatePicker
										className='DatePickerClass'
										value={date}
										showErrors={false}
										showLabels={false}
										onDateChange={(event) => onFormDataChangeDate(event, index)}
									/>
								</FormGroup>

								<FormGroup className='ProfileDateDropDownRight'>
									<Label for='exampleSelect' className='SelectTextCustomize'>
										End Date
									</Label>
									{f.currently_work ? (
										<p className='TradeTopSKill'>present </p>
									) : (
										<SelectDatePicker
											className='DatePickerClass'
											value={date}
											showErrors={false}
											selected={date}
											showLabels={false}
											onDateChange={(event) => onToDataChangeDate(event, index)}
											// onDateChange={() => handleChangeLeft}
										/>
									)}
								</FormGroup>
							</div>
							{Date.parse(todate) <= Date.parse(fromdata) && (
								<p className='ErrorTextMessage'>
									Start date should not be same or earlier than end date
								</p>
							)}

							<div className='CheckRoleCustomize'>
								<InputCheckBox
									checked={f.currently_work}
									title='I am currently working in this role'
									value='I am currently working in this role'
									// onChecked={onChecked}
									onChecked={(event) => onCheckedDataChange(event, index)}
								/>
							</div>
							<div className='TopSkillsTextField'>
								<text className='TradeTopSKill'>Trades Performed:</text>
							</div>

							<div className='TradeSkillsTag'>
								{props.profileinfo.categories.map((s: any) => {
									return (
										<CustomButtonTagnotClick
											className='ProfileButtonCustomizeTagNotCLick'
											key={s._id}
											title={s.title}
											value={s}
											onClick={(event) => onCatOnclick(event, index)}
										/>
									)
								})}
								{/* {props.category.map((cat: any) => {
									if (cat.title === f.role) {
										return (
											<div key={cat._id} className='TradeSkillsTag'>
												{cat.skills.map((s: any) => {
													let currentSkill: any = f.categories

													const className = currentSkill.includes(s)
														? ' ProfileButtonCustomizeTag'
														: ' ProfileButtonCustomizeTagNotCLick'
													return (
														<CustomButtonTagnotClick
															className={className}
															key={s._id}
															title={s}
															value={s}
															onClick={(event) => onCatOnclick(event, index)}
														/>
													)
												})}
											</div>
										)
									}
								})} */}
							</div>
							<div className='CheckRoleCustomize'>
								<InputCheckBox
									checked={f.other_worked_category}
									value='Performed trade other than above'
									title='Performed trade other than above'
									onChecked={(event) => onCheckedOtherDataChange(event, index)}
								/>
							</div>

							<FormGroup className='WorkDescriptionCustomize'>
								<Label for='exampleText' className='WorkLabelCustomize'>
									<p className='WorkDisplayCustomize'>Description</p>
									<p className='WorkDisplayOptional'> (Optional)</p>
								</Label>
								<Input
									type='textarea'
									onChange={(event) => onFormDataChange(event, index)}
									className='WorkTextAreaCustomize'
									name='description'
									value={f.description}
									id='exampleText'
									placeholder='Tell us a little more about the role'
								/>
							</FormGroup>
						</div>
					))}
					{props.profileFlag && props.addFlag ? (
						<div>
							<div className='WorkExperienceAddBUttonContainer'>
								<CustomButton
									title='Add Experience'
									icon={faPlus}
									onClick={handleAddFields}
								/>
							</div>
							<div
								className='ProfilesaveAddButtonContainerModal'
								style={{ paddingBottom: 50 }}
							>
								<CustomButton title='Submit' onClick={onAddTrade} />
							</div>
						</div>
					) : props.profileFlag ? (
						<div
							className='ProfilesaveAddButtonContainerModal'
							style={{ paddingBottom: 50 }}
						>
							<CustomButton title='Submit' onClick={onAddTrade} />
						</div>
					) : (
						<div className='WorkExperienceAddBUttonContainer'>
							<CustomButton
								title='Add Experience'
								icon={faPlus}
								onClick={handleAddFields}
							/>
						</div>
					)}
				</div>
			</div>
			{props.profileFlag && props.addFlag ? null : props.profileFlag ? null : (
				<div
					className='ProfilesaveAddButtonContainerNext'
					style={{ paddingBottom: 50 }}
				>
					<CustomButton title='Next Step' onClick={onAddTrade} />
				</div>
			)}
		</div>
	)
}
const mapStateToProps = (state: any) => ({
	category: state.jobsListReducer.data,
	skills: state.jobsListReducer.skills,
	profileinfo: state.profileReducer.profileinfo,
	role: state.jobRoleListReducer.data,
	company: state.company.list.data,
})
export default connect(mapStateToProps, {
	profileWorkExpUpdateAction,
	jobsCategoryListAction,
	jobsCategorySkillsAction,
	getCompanies,
	jobRoleListAction,
	profileAllInfoAction,
})(ProfileWorkExperience)
