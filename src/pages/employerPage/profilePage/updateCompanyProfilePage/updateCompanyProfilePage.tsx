import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faPlus,
	faAngleDown,
	faEye,
	faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'reactstrap'
import { Link } from 'react-router-dom'

import { categoryListAction } from '../../../../store/action/categoryListAction'
import {
	employerUpdateCompanyProfileAction,
	clearUpdateCompanyProfileAction,
	employerProfileDetailAction,
} from '../../../../store/action/employerProfileAction'
import { getCompanySize } from '../../../../store/action/companySizeAction'
import { locationListAction } from '../../../../store/action/locationListAction'

import Navbar from '../../../../component/employer/navbar/navbar'
import Sidebar from '../../../../component/employer/sidebar/sidebar'

import InputBox from '../../../../component/employer/input/inputBox/inputBox'
import DropdownBox from '../../../../component/employer/input/dropdownBox/dropdownBox'
import TextBox from '../../../../component/employer/input/textBox/textBox'
import SelectTickBox from '../../../../component/employer/input/selectTickBox/selectTickBox'
import { InputCheckBox } from '../../../../component/common/FormComponent/form'

import {
	mobileValidation,
	emailValidation,
	websiteValidation,
	fileExtensionValidation,
} from '../../../../utils/validator'

import UploadCloud from '../../../../assets/images/icons/uploadcloud.png'

import './updateCompanyProfilePage.css'

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

const Years = [
	{ title: '1994', value: '1994' },
	{ title: '1995', value: '1995' },
	{ title: '1996', value: '1996' },
	{ title: '1997', value: '1997' },
	{ title: '1998', value: '1998' },
	{ title: '1999', value: '1999' },
	{ title: '2000', value: '2000' },
	{ title: '2001', value: '2001' },
	{ title: '2002', value: '2002' },
	{ title: '2003', value: '2003' },
	{ title: '2004', value: '2004' },
	{ title: '2005', value: '2005' },
	{ title: '2006', value: '2006' },
	{ title: '2007', value: '2007' },
	{ title: '2008', value: '2008' },
	{ title: '2009', value: '2009' },
	{ title: '2010', value: '2010' },
	{ title: '2011', value: '2011' },
	{ title: '2012', value: '2012' },
	{ title: '2013', value: '2013' },
	{ title: '2014', value: '2014' },
	{ title: '2015', value: '2015' },
	{ title: '2016', value: '2016' },
	{ title: '2017', value: '2017' },
	{ title: '2018', value: '2018' },
	{ title: '2019', value: '2019' },
	{ title: '2020', value: '2020' },
	{ title: '2021', value: '2021' },
]

const workHour = {
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
	categoryList: any
	categoryListAction: () => void
	employerUpdateCompanyProfile: any
	employerUpdateCompanyProfileAction: (params: any) => void
	clearUpdateCompanyProfileAction: () => void
	employerProfileDetail: any
	employerProfileDetailAction: () => void
	getCompanySize: (params: any) => void
	companySizeList: any
	locationListAction: () => void
	locationList: any
	history: any
}

const UpdateCompanyProfilePage: React.FC<Props> = (props: Props) => {
	const {
		categoryList,
		categoryListAction,
		employerUpdateCompanyProfile,
		employerUpdateCompanyProfileAction,
		clearUpdateCompanyProfileAction,
		employerProfileDetail,
		employerProfileDetailAction,
		getCompanySize,
		companySizeList,
		locationListAction,
		locationList,
		history,
	} = props

	const [formData, setFormData] = useState({
		logo: '',
		name: '',
		email: '',
		website: '',
		phone: '',
		location: { state: '', city: '' },
		year: '',
		number: '',
		license: '',
		description: '',
		trade: [],
		workHour,
		images: [],
	})
	const [logoPreview, setLogoPreview] = useState('')
	const [imagesPreview, setImagesPreview] = useState([])

	const [errorState, setErrorState] = useState(false)
	const [logoError, setLogoError] = useState(false)
	const [imageError, setImageError] = useState(false)

	useEffect(() => {
		categoryListAction()
		employerProfileDetailAction()
		getCompanySize('')
		locationListAction()
	}, [])

	useEffect(() => {
		if (!employerProfileDetail.loading && employerProfileDetail.success) {
			const { data } = employerProfileDetail

			if (data) {
				const { company } = data

				setLogoPreview(
					`${process.env.REACT_APP_IMAGE_URL}${company.profile_image}`
				)

				if (company.images && company.images.length) {
					const imagesPreview = company.images.map(
						(i) => `${process.env.REACT_APP_IMAGE_URL}${i}`
					)
					setImagesPreview(imagesPreview)
				} else {
					setImagesPreview([])
				}

				setFormData({
					...formData,
					logo: company.profile_image ? company.profile_image : '',
					name: company.company_name ? company.company_name : '',
					email: company.email ? company.email : '',
					website: company.website ? company.website : '',
					phone: company.phone_number ? company.phone_number : '',
					location: company.address ? company.address : '',
					year: company.year_founded ? company.year_founded : '',
					number: company.company_size ? company.company_size : '',
					license: company.license_number ? company.license_number : '',
					description: company.overview ? company.overview : '',
					trade:
						company.categories && company.categories.length
							? company.categories.map((c) => ({ title: c.title }))
							: [],
					workHour: company.working_schedule
						? company.working_schedule
						: workHour,
					images: company.images && company.images.length ? company.images : [],
				})
			}
		}
	}, [employerProfileDetail])

	const changeFormData = (event: any) => {
		setErrorState(false)

		const { name, value } = event.target

		if (name === 'phone') {
			if (mobileValidation(value) || value === '') {
				setFormData({ ...formData, [name]: value })
			}
		} else {
			setFormData({ ...formData, [name]: value })
		}
	}

	const updateTrade = (event: any) => {
		setErrorState(false)

		const { name, value, checked } = event.target

		let currentValues: any = formData[name]

		if (!checked) {
			currentValues = currentValues.filter((v) => v.title !== value)
		} else {
			currentValues.push({ title: value })
		}

		setFormData({ ...formData, [name]: currentValues })
	}

	const checkTradeIncludes = (tradeTitle) => {
		let list = formData.trade.filter((t: any) => t.title === tradeTitle)

		if (list && list.length > 0) return true

		return false
	}

	const changeWorkHour = (day: any, key: any, value) => {
		setErrorState(false)

		let currentWorkSchedule = formData.workHour

		currentWorkSchedule[day][key] = value

		setFormData({ ...formData, workHour: currentWorkSchedule })
	}

	const copyWorkHour = () => {
		setErrorState(false)

		let currentWorkSchedule = formData.workHour
		let start
		let end
		let off

		Object.keys(currentWorkSchedule).map((key: any, index) => {
			if (index === 0) {
				start = currentWorkSchedule[key].start
				end = currentWorkSchedule[key].end
				off = currentWorkSchedule[key].off
			}
			currentWorkSchedule[key].start = start
			currentWorkSchedule[key].end = end
			// currentWorkSchedule[key].off = off
		})

		setFormData({ ...formData, workHour: currentWorkSchedule })
	}

	const updateLogo = (event: any) => {
		setLogoError(false)
		setErrorState(false)

		const { name, files } = event.target
		const file = files[0]

		if (file) {
			if (fileExtensionValidation(file.name)) {
				const logoPreview = window.URL.createObjectURL(file)

				setLogoPreview(logoPreview)
				setFormData({ ...formData, logo: file })
			} else {
				setLogoError(true)
				setErrorState(true)
			}
		}
	}

	const updateImage = (event: any) => {
		setImageError(false)
		setErrorState(false)

		const { name, files } = event.target
		const file = files[0]

		if (file) {
			if (fileExtensionValidation(file.name)) {
				const imagePreview = window.URL.createObjectURL(file)
				const newImagesPreview: any = [imagePreview, ...imagesPreview]
				const newImages: any = [file, ...formData.images]

				setImagesPreview(newImagesPreview)
				setFormData({ ...formData, images: newImages })
			} else {
				setImageError(true)
				setErrorState(true)
			}
		}
	}

	const getEmployerSizeList = (companySize) => {
		let employerList = []

		if (companySize && companySize.data && companySize.data.length) {
			employerList = companySize.data.map((e) => ({ title: e, value: e }))
		}

		return employerList
	}

	const getLocations = (locationList) => {
		let locations: any = []

		if (
			locationList &&
			locationList.country_states_cities &&
			locationList.country_states_cities.states.length
		) {
			locationList.country_states_cities.states.forEach((state: any) => {
				if (state.cities.length) {
					locations = state.cities.map((city: any) => ({
						title: city,
						value: city,
					}))
				}
			})
		}

		return locations
	}

	const updateLocation = (event) => {
		const { value } = event.target

		locationList.country_states_cities.states.forEach((state: any) => {
			if (state.cities.length) {
				const [selectedLocation] = state.cities.filter(
					(city: any) => city === value
				)

				if (selectedLocation) {
					setFormData({
						...formData,
						location: {
							state: state.state_name,
							city: selectedLocation,
						},
					})
				}
			}
		})
	}

	const workHourValidation = (workHour) => {
		let isValid = false

		const workHourWithTime = Object.keys(workHour).filter(
			(day: any) =>
				(workHour[day].off === false || workHour[day].off === 'false') &&
				workHour[day].start !== '' &&
				workHour[day].end !== ''
		)

		if (workHourWithTime && workHourWithTime.length) isValid = true

		return isValid
	}

	const updateCompanyProfile = () => {
		if (
			formData.name !== '' &&
			formData.email !== '' &&
			emailValidation(formData.email) &&
			formData.phone !== '' &&
			mobileValidation(formData.phone) &&
			formData.phone.length === 10 &&
			workHourValidation(formData.workHour)
		) {
			let error = false
			if (formData.website !== '' && !websiteValidation(formData.website)) {
				error = true
			}

			if (!error) {
				const params = {
					profile_image: formData.logo,
					company_name: formData.name,
					email: formData.email,
					website: formData.website,
					phone_number: formData.phone,
					address: formData.location,
					year_founded: formData.year,
					company_size: formData.number,
					license_number: formData.license,
					overview: formData.description,
					categories: formData.trade,
					working_schedule: formData.workHour,
					images: formData.images,
				}
				employerUpdateCompanyProfileAction(params)
			}
		} else {
			setErrorState(true)
		}
	}

	useEffect(() => {
		if (
			!employerUpdateCompanyProfile.loading &&
			employerUpdateCompanyProfile.success
		) {
			clearUpdateCompanyProfileAction()
			history.push('/employer/dashboard')
		}
	}, [employerUpdateCompanyProfile])

	let logoClickHandler: any = null
	let imageClickHandler: any = null

	return (
		<>
			<Navbar />
			<div className='EmployerUpdateCompanyProfile'>
				<Sidebar />
				<div className='EmployerUpdateCompanyProfile__Body'>
					<div className='EmployerUpdateCompanyProfile__Body--Title'>
						Company Profile
					</div>
					<div className='EmployerUpdateCompanyProfile__Body--Form'>
						<div className='EmployerUpdateCompanyProfile__Body--Form--Info'>
							<div className='EmployerUpdateCompanyProfile__Body--Form--Info--Left'>
								<div className='EmployerUpdateCompanyProfile__Body--Form--Info--Left--Upload'>
									<div className='EmployerUpdateCompanyProfile__Body--Form--Info--Left--Upload--Image'>
										{logoPreview ? <img src={logoPreview}></img> : null}
									</div>
									<input
										type='file'
										accept='.jpeg,.jpg,.png'
										name='logo'
										hidden={true}
										onChange={updateLogo}
										ref={(input) => {
											logoClickHandler = input
										}}
									/>
									<button onClick={() => logoClickHandler.click()}>
										<FontAwesomeIcon icon={faPlus} />
									</button>
								</div>
								<div className='EmployerUpdateCompanyProfile__Body--Form--Info--Left--Text'>
									Company Logo
								</div>
								{errorState && logoError ? (
									<div className='EmployerUpdateCompanyProfile__Body--Form--Info--Left--Error'>
										Invalid File Type. jpeg/jpg/png only allowed.
									</div>
								) : null}
							</div>
							<div className='EmployerUpdateCompanyProfile__Body--Form--Info--Middle'>
								<div className='EmployerUpdateCompanyProfile__Body--Form--Info--Middle--Name'>
									<InputBox
										internalPadding={'10px'}
										error={errorState && !formData.name.length}
										label={'Company Name*'}
										type={'text'}
										name={'name'}
										value={formData.name}
										placeholder={'Company Name'}
										onChange={changeFormData}
									/>
								</div>
								<div className='EmployerUpdateCompanyProfile__Body--Form--Info--Middle--Email'>
									<InputBox
										internalPadding={'10px'}
										error={
											errorState &&
											(!formData.email.length ||
												!emailValidation(formData.email))
										}
										label={'Company Email*'}
										type={'email'}
										name={'email'}
										value={formData.email}
										placeholder={'Company Email'}
										onChange={changeFormData}
									/>
								</div>
							</div>
							<div className='EmployerUpdateCompanyProfile__Body--Form--Info--Right'>
								<div className='EmployerUpdateCompanyProfile__Body--Form--Info--Right--Website'>
									<InputBox
										internalPadding={'10px'}
										error={
											errorState &&
											formData.website.length &&
											!websiteValidation(formData.website)
												? true
												: false
										}
										label={'Website'}
										type={'text'}
										name={'website'}
										value={formData.website}
										placeholder={'Website'}
										onChange={changeFormData}
									/>
								</div>
								<div className='EmployerUpdateCompanyProfile__Body--Form--Info--Right--Phone'>
									<InputBox
										internalPadding={'10px'}
										error={
											errorState &&
											(!formData.phone.length ||
												formData.phone.length !== 10 ||
												!mobileValidation(formData.phone))
										}
										label={'Phone*'}
										type={'text'}
										name={'phone'}
										value={formData.phone}
										placeholder={'Phone'}
										onChange={changeFormData}
									/>
								</div>
							</div>
						</div>
						<div className='EmployerUpdateCompanyProfile__Body--Form--Subscription'>
							<div className='EmployerUpdateCompanyProfile__Body--Form--Subscription--Title'>
								Subscription
							</div>
							<div className='EmployerUpdateCompanyProfile__Body--Form--Subscription--Detail'>
								<div className='EmployerUpdateCompanyProfile__Body--Form--Subscription--Detail--Text'>
									Enterprise Plan
								</div>
								<div className='EmployerUpdateCompanyProfile__Body--Form--Subscription--Detail--Button'>
									<Link to={'/employer/subscription'}>
										<button>Manage Plan</button>
									</Link>
								</div>
							</div>
						</div>
						<div className='EmployerUpdateCompanyProfile__Body--Form--Location'>
							<DropdownBox
								leftIcon={faMapMarkerAlt}
								rightIcon={faAngleDown}
								error={errorState && !formData.location.city}
								label={'Location'}
								option={getLocations(locationList)}
								name={'location'}
								value={formData.location.city}
								placeholder={'Location'}
								onChange={updateLocation}
							/>
						</div>
						<div className='EmployerUpdateCompanyProfile__Body--Form--Detail'>
							<div className='EmployerUpdateCompanyProfile__Body--Form--Detail--Year'>
								<DropdownBox
									internalPadding={'10px'}
									rightIcon={faAngleDown}
									error={false}
									label={'Year Established'}
									option={Years}
									name={'year'}
									value={formData.year}
									placeholder={'Year'}
									onChange={changeFormData}
								/>
							</div>
							<div className='EmployerUpdateCompanyProfile__Body--Form--Detail--Number'>
								<DropdownBox
									internalPadding={'10px'}
									rightIcon={faAngleDown}
									error={false}
									label={'Number Of Employers'}
									option={getEmployerSizeList(companySizeList)}
									name={'number'}
									value={formData.number}
									placeholder={'Number Of Employers'}
									onChange={changeFormData}
								/>
							</div>
							<div className='EmployerUpdateCompanyProfile__Body--Form--Detail--License'>
								<InputBox
									internalPadding={'10px'}
									error={false}
									label={'License Number'}
									type={'text'}
									name={'license'}
									value={formData.license}
									placeholder={'License Number'}
									onChange={changeFormData}
								/>
							</div>
						</div>
						<div className='EmployerUpdateCompanyProfile__Body--Form--Description'>
							<TextBox
								error={false}
								label={'Company Description'}
								name={'description'}
								value={formData.description}
								placeholder={'Company Description'}
								rows={'5'}
								onChange={changeFormData}
							/>
						</div>
						<div className='EmployerUpdateCompanyProfile__Body--Form--Trade'>
							<div className='EmployerUpdateCompanyProfile__Body--Form--Trade--Title'>
								Company trades:
							</div>
							<div className='EmployerUpdateCompanyProfile__Body--Form--Trade--List'>
								{categoryList &&
									categoryList.map((c: any, index) => (
										<div
											key={index}
											className='EmployerUpdateCompanyProfile__Body--Form--Trade--List--Container'
										>
											<SelectTickBox
												label={c.title}
												checked={checkTradeIncludes(c.title)}
												name={'trade'}
												value={c.title}
												placeholder={'trade'}
												onChange={updateTrade}
											/>
										</div>
									))}
							</div>
						</div>
						<div className='EmployerUpdateCompanyProfile__Body--Form--Hour'>
							<div className='EmployerUpdateCompanyProfile__Body--Form--Hour--Title'>
								Typical Hours of Work*
							</div>
							{errorState && !workHourValidation(formData.workHour) ? (
								<div className='EmployerUpdateCompanyProfile__Body--Form--Hour--Error'>
									Work Hour is Reqired
								</div>
							) : null}
							<div className='EmployerUpdateCompanyProfile__Body--Form--Hour--Body'>
								<div className='EmployerUpdateCompanyProfile__Body--Form--Hour--Body--Time'>
									{Object.keys(formData.workHour).map((key: any, index) => (
										<div
											key={index}
											className='EmployerUpdateCompanyProfile__Body--Form--Hour--Body--Time--Container'
										>
											<div className='EmployerUpdateCompanyProfile__Body--Form--Hour--Body--Time--Container--Day'>
												<InputCheckBox
													checked={
														formData.workHour[key].off === 'false' ||
														!formData.workHour[key].off
													}
													name={'schedule'}
													title={key}
													value={key}
													onChecked={(event) =>
														changeWorkHour(key, 'off', !event.target.checked)
													}
												/>
											</div>
											<div className='EmployerUpdateCompanyProfile__Body--Form--Hour--Body--Time--Container--TimeStart'>
												<DropdownBox
													internalPadding={'8px'}
													rightIcon={faAngleDown}
													error={false}
													label={''}
													name={'start'}
													option={TimeRange}
													value={formData.workHour[key].start}
													placeholder={'Start'}
													onChange={(event) =>
														changeWorkHour(key, 'start', event.target.value)
													}
												/>
											</div>
											<div className='EmployerUpdateCompanyProfile__Body--Form--Hour--Body--Time--Container--TimeEnd'>
												<DropdownBox
													internalPadding={'8px'}
													rightIcon={faAngleDown}
													error={false}
													label={''}
													name={'end'}
													option={TimeRange}
													value={formData.workHour[key].end}
													placeholder={'End'}
													onChange={(event) =>
														changeWorkHour(key, 'end', event.target.value)
													}
												/>
											</div>
										</div>
									))}
								</div>
								<div className='EmployerUpdateCompanyProfile__Body--Form--Hour--Body--Option'>
									<span onClick={copyWorkHour}>Copy to All</span>
								</div>
							</div>
						</div>
						<div className='EmployerUpdateCompanyProfile__Body--Form--Image'>
							<div className='EmployerUpdateCompanyProfile__Body--Form--Image--Title'>
								Company Pictures:
							</div>
							<div className='EmployerUpdateCompanyProfile__Body--Form--Image--Body'>
								<div className='EmployerUpdateCompanyProfile__Body--Form--Image--Body--Preview'>
									{imagesPreview.length
										? imagesPreview.map((i: any, index) => (
												<img key={index} src={i}></img>
										  ))
										: null}
								</div>
								<input
									type='file'
									accept='.jpeg,.jpg,.png'
									name='image'
									hidden={true}
									onChange={updateImage}
									ref={(input) => {
										imageClickHandler = input
									}}
								/>
								<div
									className={`EmployerUpdateCompanyProfile__Body--Form--Image--Body--Button ${
										imagesPreview.length ? 'Background' : null
									}`}
								>
									<div
										className='EmployerUpdateCompanyProfile__Body--Form--Image--Body--Button--Logo'
										onClick={() => imageClickHandler.click()}
									>
										<img src={UploadCloud} />
									</div>
									<div
										className='EmployerUpdateCompanyProfile__Body--Form--Image--Body--Button--Text'
										onClick={() => imageClickHandler.click()}
									>
										Upload Image
									</div>
								</div>
							</div>
						</div>
					</div>
					{errorState && (
						<div className='EmployerUpdateCompanyProfile__Body--Error'>
							Validation Error
						</div>
					)}
					<div className='EmployerUpdateCompanyProfile__Body--Action'>
						<div className='EmployerUpdateCompanyProfile__Body--Action--Preview'>
							<FontAwesomeIcon icon={faEye} />
							Show Preview
						</div>
						<div className='EmployerUpdateCompanyProfile__Body--Action--Save'>
							{employerUpdateCompanyProfile.loading ? (
								<Spinner />
							) : (
								<button onClick={updateCompanyProfile}>Save</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state) => ({
	categoryList: state.categoryListReducer.data,
	employerUpdateCompanyProfile: state.employerProfileReducer.updateCompany,
	employerProfileDetail: state.employerProfileReducer.detail,
	companySizeList: state.companySizeReducer.companySize,
	locationList: state.locationListReducer.data,
})

const action = {
	categoryListAction,
	employerUpdateCompanyProfileAction,
	clearUpdateCompanyProfileAction,
	employerProfileDetailAction,
	getCompanySize,
	locationListAction,
}

export default connect(mapStateToProps, action)(UpdateCompanyProfilePage)
