import React, { useState } from 'react'

import InputBox from '../../../component/employer/input/inputBox/inputBox'
import { emailValidation } from '../../../utils/validator'
import { adminRegisterAction } from '../../../store/action/adminAction'
import { AdminSidebar, AdminNavbar } from '../../../component/admin'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
// import './addMemberForm.css'

interface Props {
	adminRegisterAction: (data: any) => void
}

const AddAdminMemberForm: React.FC<any> = (props: Props) => {
	const [error, setError] = useState(false)
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		password: '',
		email: '',
	})
	const { adminRegisterAction } = props
	const history = useHistory()
	const changeFormData = (event) => {
		setError(false)
		const { name, value } = event.target

		setFormData({ ...formData, [name]: value })
	}
	const addTeamMember = () => {
		if (
			formData.first_name !== '' &&
			formData.last_name !== '' &&
			formData.password !== '' &&
			formData.email !== '' &&
			emailValidation(formData.email)
		) {
			adminRegisterAction(formData)
			history.push('/admin/management')
		} else {
			setError(true)
		}
	}

	return (
		<>
			<AdminNavbar />
			<div className='AdminDashboardSidebarAndContent'>
				<div className='AdminDashboardSidebar'>
					<AdminSidebar />
				</div>
				<div className='AdminAddMemberForm'>
					<div className='EmployerAddMemberForm__Title'>Add New Admin </div>
					<div className='EmployerAddMemberForm__Form'>
						<div className='EmployerAddMemberForm__Form--Name'>
							<div className='EmployerAddMemberForm__Form--Name--First'>
								<InputBox
									labelSize={'14px'}
									labelColor={'#808FA6'}
									internalPadding={'10px'}
									label={'FIRST NAME'}
									type={'text'}
									name={'first_name'}
									error={error && !formData.first_name.length}
									value={formData.first_name}
									placeholder={'Type Here ....'}
									onChange={changeFormData}
								/>
							</div>
							<div className='EmployerAddMemberForm__Form--Name--Last'>
								<InputBox
									labelSize={'14px'}
									labelColor={'#808FA6'}
									internalPadding={'10px'}
									label={'LAST NAME'}
									type={'text'}
									name={'last_name'}
									error={error && !formData.last_name.length}
									value={formData.last_name}
									placeholder={'Type Here ....'}
									onChange={changeFormData}
								/>
							</div>
						</div>
						<div className='EmployerAddMemberForm__Form--Email'>
							<InputBox
								labelSize={'14px'}
								labelColor={'#808FA6'}
								internalPadding={'10px'}
								label={'EMAIL'}
								type={'email'}
								name={'email'}
								error={
									error &&
									(!formData.email.length || !emailValidation(formData.email))
								}
								value={formData.email}
								placeholder={'Type Here ....'}
								onChange={changeFormData}
							/>
						</div>
						<div className='EmployerAddMemberForm__Form--Email'>
							<InputBox
								labelSize={'14px'}
								labelColor={'#808FA6'}
								internalPadding={'10px'}
								error={error && !formData.password.length}
								label={'PASSWORD'}
								type={'password'}
								name={'password'}
								value={formData.password}
								placeholder={'Type Here ....'}
								onChange={changeFormData}
							/>
						</div>
						<div className='EmployerAddMemberForm__Form--Button'>
							<button onClick={addTeamMember}>Save</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default connect(null, { adminRegisterAction })(AddAdminMemberForm)
