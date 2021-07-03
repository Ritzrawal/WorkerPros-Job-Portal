import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'reactstrap'

import { categoryListAction } from '../../../../store/action/categoryListAction'
import {
	employerUpdateProfileAction,
	clearUpdateProfileAction,
	employerProfileDetailAction,
} from '../../../../store/action/employerProfileAction'

import ProfileDetailForm from './profileDetailForm/profleDetailForm'
import ProfileBrandForm from './profileBrandForm/profileBrandForm'

import {
	mobileValidation,
	websiteValidation,
	fileExtensionValidation,
} from '../../../../utils/validator'

import UpdateProfileImage from '../../../../assets/images/employer-create-profile-sidebar.png'
import './updateProfilePage.css'

interface Props {
	categoryList: any
	employerUpdateProfile: any
	categoryListAction: () => void
	employerUpdateProfileAction: (params: any) => void
	clearUpdateProfileAction: () => void
	employerProfileDetailAction: () => void
	employerProfileDetail: any
	history: any
}

const UpdateProfilePage: React.FC<Props> = (props: Props) => {
	const {
		categoryList,
		employerUpdateProfile,
		categoryListAction,
		employerUpdateProfileAction,
		clearUpdateProfileAction,
		employerProfileDetailAction,
		employerProfileDetail,
		history,
	} = props

	const [formState, setFormState] = useState('detail')
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		position: '',
		website: '',
		phone: '',
		logo: '',
		specialization: [],
	})
	const [logoPreview, setLogoPreview] = useState('')

	const [errorState, setErrorState] = useState(false)
	const [logoError, setLogoError] = useState(false)

	useEffect(() => {
		categoryListAction()
		employerProfileDetailAction()
	}, [])

	useEffect(() => {
		if (!employerProfileDetail.loading && employerProfileDetail.data) {
			const { user } = employerProfileDetail.data

			const firstName = user && user.first_name ? user.first_name : ''
			const lastName = user && user.last_name ? user.last_name : ''

			if (firstName !== '' || lastName !== '') {
				setFormData({ ...formData, firstName, lastName })
			}
		}
	}, [employerProfileDetail])

	const updateFormData = (event: any) => {
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

	const changeFormState = (formState) => {
		if (formState === 'brand') {
			let error = false
			if (
				formData.firstName !== '' &&
				formData.lastName !== '' &&
				formData.position !== '' &&
				formData.phone !== '' &&
				mobileValidation(formData.phone) &&
				formData.phone.length === 10
			) {
				if (formData.website !== '') {
					if (!websiteValidation(formData.website)) {
						error = true
					}
				}
			} else {
				error = true
			}

			if (error) {
				setErrorState(true)
			} else {
				setFormState(formState)
			}
		}
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

	const updateSpecialization = (event: any) => {
		setErrorState(false)

		const { name, value, checked } = event.target

		let currentValues: any = formData[name]

		if (!checked) {
			currentValues = currentValues.filter((v) => v.title !== value)
		} else {
			currentValues.push({ title: value, skills: [] })
		}

		setFormData({ ...formData, [name]: currentValues })
	}

	const updateProfile = () => {
		const params = {
			first_name: formData.firstName,
			last_name: formData.lastName,
			position: formData.position,
			website: formData.website,
			phone_number: formData.phone,
			profile_image: formData.logo,
			categories: formData.specialization,
		}
		employerUpdateProfileAction(params)
	}

	useEffect(() => {
		if (!employerUpdateProfile.loading && employerUpdateProfile.success) {
			clearUpdateProfileAction()
			history.push('/employer/dashboard')
		}
	}, [employerUpdateProfile])

	return (
		<div className='EmployerUpdateProfile'>
			<div className='EmployerUpdateProfile__Sidebar'>
				<div className='EmployerUpdateProfile__Sidebar--Image'>
					<img src={UpdateProfileImage} />
				</div>
			</div>
			<div className='EmployerUpdateProfile__Body'>
				<div className='EmployerUpdateProfile__Body--Header'>WorkerPros</div>
				<div className='EmployerUpdateProfile__Body--Form'>
					{formState === 'detail' && (
						<ProfileDetailForm
							errorState={errorState}
							firstName={formData.firstName}
							lastName={formData.lastName}
							position={formData.position}
							website={formData.website}
							phone={formData.phone}
							updateFormData={updateFormData}
						/>
					)}

					{formState === 'brand' && (
						<ProfileBrandForm
							errorState={errorState}
							logoError={logoError}
							categoryList={categoryList}
							logoPreview={logoPreview}
							logo={formData.logo}
							specialization={formData.specialization}
							updateLogo={updateLogo}
							updateSpecialization={updateSpecialization}
						/>
					)}

					<div className='EmployerUpdateProfile__Body--Form--Button'>
						{formState === 'brand' ? (
							employerUpdateProfile.loading ? (
								<Spinner />
							) : (
								<button onClick={updateProfile}>Create Profile</button>
							)
						) : (
							<button onClick={() => changeFormState('brand')}>Next</button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	categoryList: state.categoryListReducer.data,
	employerUpdateProfile: state.employerProfileReducer.update,
	employerProfileDetail: state.employerProfileReducer.detail,
})

const action = {
	categoryListAction,
	employerUpdateProfileAction,
	clearUpdateProfileAction,
	employerProfileDetailAction,
}

export default connect(mapStateToProps, action)(UpdateProfilePage)
