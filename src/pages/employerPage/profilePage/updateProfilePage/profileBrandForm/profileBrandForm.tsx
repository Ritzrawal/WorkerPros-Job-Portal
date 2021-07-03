import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import SelectTickBox from '../../../../../component/employer/input/selectTickBox/selectTickBox'

import './profileBrandForm.css'

interface Props {
	errorState: boolean
	logoError: boolean
	categoryList: any
	logoPreview: string
	logo: string
	specialization: any
	updateLogo: (event: any) => void
	updateSpecialization: (event: any) => void
}

const ProfileBrandForm: React.FC<Props> = (props: Props) => {
	const {
		errorState,
		logoError,
		categoryList,
		logoPreview,
		logo,
		specialization,
		updateLogo,
		updateSpecialization,
	} = props

	const checkSpecializationIncludes = (specializationTitle) => {
		let list = specialization.filter((s) => s.title === specializationTitle)

		if (list && list.length > 0) return true

		return false
	}

	let clickHandler: any = null

	return (
		<div className='EmployerProfileBrandForm'>
			<div className='EmployerProfileBrandForm__Title'>
				Set up your employer brand
			</div>
			<div className='EmployerProfileBrandForm__SubTitle'>
				Add your logo and point your trades
			</div>
			<div className='EmployerProfileBrandForm__Form'>
				<div className='EmployerProfileBrandForm__Form--Logo'>
					<div className='EmployerProfileBrandForm__Form--Logo--Upload'>
						<div className='EmployerProfileBrandForm__Form--Logo--Upload--Image'>
							{logoPreview ? <img src={logoPreview}></img> : null}
						</div>
						<input
							type='file'
							accept='.jpeg,.jpg,.png'
							name='logo'
							hidden={true}
							onChange={updateLogo}
							ref={(input) => {
								clickHandler = input
							}}
						/>
						<button onClick={() => clickHandler.click()}>
							<FontAwesomeIcon icon={faPlus} />
						</button>
					</div>
					<div className='EmployerProfileBrandForm__Form--Logo--Text'>
						Company Logo
					</div>
					{errorState && logoError ? (
						<div className='EmployerProfileBrandForm__Form--Logo--Error'>
							Invalid File Type. jpeg/jpg/png only allowed.
						</div>
					) : null}
				</div>
				<div className='EmployerProfileBrandForm__Form--Special'>
					<div className='EmployerProfileBrandForm__Form--Special--Title'>
						Select the trade specialization of your company:
					</div>
					<div className='EmployerProfileBrandForm__Form--Special--Body'>
						{categoryList &&
							categoryList.map((c: any, index) => (
								<div
									key={index}
									className='EmployerProfileBrandForm__Form--Special--Body--Container'
								>
									<SelectTickBox
										label={c.title}
										checked={checkSpecializationIncludes(c.title)}
										name={'specialization'}
										value={c.title}
										placeholder={c.title}
										onChange={updateSpecialization}
									/>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfileBrandForm
