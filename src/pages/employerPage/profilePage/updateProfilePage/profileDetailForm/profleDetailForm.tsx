import React from 'react'

import InputBox from '../../../../../component/employer/input/inputBox/inputBox'

import {
	mobileValidation,
	websiteValidation,
} from '../../../../../utils/validator'

import './profileDetailForm.css'

interface Props {
	errorState: boolean
	firstName: string
	lastName: string
	position: string
	website: string
	phone: string
	updateFormData: (event: any) => void
}

const ProfileDetailForm: React.FC<Props> = (props: Props) => {
	const {
		errorState,
		firstName,
		lastName,
		position,
		website,
		phone,
		updateFormData,
	} = props

	return (
		<div className='EmployerProfileDetailForm'>
			<div className='EmployerProfileDetailForm__Title'>
				Let’s set up your company profile
			</div>
			<div className='EmployerProfileDetailForm__SubTitle'>
				Tell us about your organization
			</div>
			<div className='EmployerProfileDetailForm__Form'>
				<div className='EmployerProfileDetailForm__Form--Name'>
					<div className='EmployerProfileDetailForm__Form--Name--First'>
						{/* <InputBox
							error={errorState && !firstName.length}
							label={'First Name*'}
							type={'text'}
							name={'firstName'}
							value={firstName}
							placeholder={'First Name'}
							onChange={updateFormData}
						/> */}
						<div className='EmployerProfileDetailForm__Form--Name--First--Label'>
							First Name*
						</div>
						<div className='EmployerProfileDetailForm__Form--Name--First--Box'>
							{firstName}
						</div>
					</div>
					<div className='EmployerProfileDetailForm__Form--Name--First'>
						{/* <InputBox
							error={errorState && !lastName.length}
							label={'Last Name*'}
							type={'text'}
							name={'lastName'}
							value={lastName}
							placeholder={'Last Name'}
							onChange={updateFormData}
						/> */}
						<div className='EmployerProfileDetailForm__Form--Name--Last--Label'>
							Last Name*
						</div>
						<div className='EmployerProfileDetailForm__Form--Name--Last--Box'>
							{lastName}
						</div>
					</div>
				</div>
				<div className='EmployerProfileDetailForm__Form--Position'>
					<InputBox
						labelColor={'#808FA6'}
						error={errorState && !position.length}
						label={'Your Position*'}
						type={'text'}
						name={'position'}
						value={position}
						placeholder={'Your Position'}
						onChange={updateFormData}
					/>
				</div>
				<div className='EmployerProfileDetailForm__Form--Phone'>
					<InputBox
						labelColor={'#808FA6'}
						error={
							errorState &&
							(!phone.length || phone.length !== 10 || !mobileValidation(phone))
						}
						label={'Your Phone*'}
						type={'text'}
						name={'phone'}
						value={phone}
						placeholder={'Your Phone'}
						onChange={updateFormData}
					/>
				</div>
				<div className='EmployerProfileDetailForm__Form--Website'>
					<InputBox
						labelColor={'#808FA6'}
						error={
							errorState && website.length && !websiteValidation(website)
								? true
								: false
						}
						label={'Website'}
						type={'text'}
						name={'website'}
						value={website}
						placeholder={'Your Website'}
						onChange={updateFormData}
					/>
				</div>
			</div>
		</div>
	)
}

export default ProfileDetailForm
