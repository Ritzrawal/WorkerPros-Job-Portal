import React, { useState, useEffect } from 'react'
import { Spinner } from 'reactstrap'

import { emailValidation } from '../../../../utils/validator'

import InputBox from '../../../../component/employer/input/inputBox/inputBox'
import MemberPermissionForm from '../memberPermissionForm/memberPermissionForm'

import './addMemberForm.css'

interface Props {
	employerAddTeamMember: (params: any) => void
	employerAddTeamMemberState: any
	employerAddTeamMemberClear: () => void
}

const AddMemberForm: React.FC<Props> = (props: Props) => {
	const {
		employerAddTeamMember,
		employerAddTeamMemberState,
		employerAddTeamMemberClear,
	} = props

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
	})
	const [permissions, setPermissions] = useState({})
	const [error, setError] = useState(false)

	const changeFormData = (event) => {
		setError(false)

		const { name, value } = event.target

		setFormData({ ...formData, [name]: value })
	}

	const addTeamMember = () => {
		if (
			formData.firstName !== '' &&
			formData.lastName !== '' &&
			formData.email !== '' &&
			emailValidation(formData.email)
		) {
			employerAddTeamMember({
				first_name: formData.firstName,
				last_name: formData.lastName,
				email: formData.email,
				...permissions,
			})
		} else {
			setError(true)
		}
	}

	useEffect(() => {
		if (
			!employerAddTeamMemberState.loading &&
			employerAddTeamMemberState.success
		) {
			setFormData({
				firstName: '',
				lastName: '',
				email: '',
			})
			setPermissions({})
			employerAddTeamMemberClear()
		}
	}, [employerAddTeamMemberState])

	return (
		<div className='EmployerAddMemberForm'>
			<div className='EmployerAddMemberForm__Title'>Add New Team Member</div>
			<div className='EmployerAddMemberForm__Form'>
				<div className='EmployerAddMemberForm__Form--Name'>
					<div className='EmployerAddMemberForm__Form--Name--First'>
						<InputBox
							labelSize={'14px'}
							labelColor={'#808FA6'}
							internalPadding={'10px'}
							error={error && !formData.firstName.length}
							label={'FIRST NAME'}
							type={'text'}
							name={'firstName'}
							value={formData.firstName}
							placeholder={'Type here....'}
							onChange={changeFormData}
						/>
					</div>
					<div className='EmployerAddMemberForm__Form--Name--Last'>
						<InputBox
							labelSize={'14px'}
							labelColor={'#808FA6'}
							internalPadding={'10px'}
							error={error && !formData.lastName.length}
							label={'LAST NAME'}
							type={'text'}
							name={'lastName'}
							value={formData.lastName}
							placeholder={'Type here....'}
							onChange={changeFormData}
						/>
					</div>
				</div>
				<div className='EmployerAddMemberForm__Form--Email'>
					<InputBox
						labelSize={'14px'}
						labelColor={'#808FA6'}
						internalPadding={'10px'}
						error={
							error &&
							(!formData.email.length || !emailValidation(formData.email))
						}
						label={'EMAIL'}
						type={'email'}
						name={'email'}
						value={formData.email}
						placeholder={'Type here....'}
						onChange={changeFormData}
					/>
				</div>
				{!employerAddTeamMemberState.loading &&
				!employerAddTeamMemberState.success &&
				employerAddTeamMemberState.error ? (
					<div className='EmployerAddMemberForm__Form--Error'>
						{employerAddTeamMemberState.error.error.replace('_', ' ')}
					</div>
				) : null}
				<div className='EmployerAddMemberForm__Form--Button'>
					<button
						onClick={addTeamMember}
						disabled={employerAddTeamMemberState.loading}
					>
						{employerAddTeamMemberState.loading ? (
							<Spinner size='sm' />
						) : (
							<>Send Invite</>
						)}
					</button>
				</div>
			</div>
			<div className='EmployerAddMemberForm__Permission'>
				<MemberPermissionForm updatePermissions={setPermissions} />
			</div>
		</div>
	)
}

export default AddMemberForm
