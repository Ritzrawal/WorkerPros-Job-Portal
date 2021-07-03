import React, { useState } from 'react'
import { Input } from 'reactstrap'
import { AdminSidebar, AdminNavbar } from '../../../component/admin'
import { useHistory } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DisplayImage from '../../../assets/images/companyimage.png'
import { AdminInputCheckBox } from '../../../component/common/FormComponent/form'
import { ButtonWithCustyomeStyling } from '../../../component'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import AddAdminMemberForm from './addAdminform'
import './adminManage.css'
interface Props {
	title?: string
}
export const AdminPanagementPage: React.FC<Props> = () => {
	const history = useHistory()
	const [showpermession, setShowPermession] = useState(false)
	const [edit, setEdit] = useState(false)
	const [addadmin, setAdmin] = useState(false)
	const [checkpermission, setPermession] = useState<any>([])
	const onGrantPremission = () => {
		setShowPermession(!showpermession)
	}
	const onEdit = () => {
		setEdit(!edit)
	}
	const onCheckPermession = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target
		var data: any = [...checkpermission]

		if (data.includes(value)) {
			data = data.filter((skill) => skill !== value)
		} else {
			data.push(value)
		}

		console.log('admin Permession', data)
		setPermession(data)
	}
	const onAddAdmin = () => {
		history.push('/admin/management/addnew-form')
		setAdmin(true)
	}

	return (
		<>
			<AdminNavbar />
			<div className='AdminDashboardSidebarAndContent'>
				<div className='AdminDashboardSidebar'>
					<AdminSidebar />
				</div>
				<div className='AdminContentMainCustomize'>
					<div className='AdminContentInnerContainer'>
						<div className='AdminFilterandInputOuterContainer'>
							<div className='AdminFilterInputCustomizeOuterContainer'>
								<Input
									className='AdminFilterInputCustomize'
									type='select'
									name='select'
									id='exampleSelect'
								>
									<option>All</option>
									<option>Active</option>
									<option>Inactive</option>
									<option>disabled</option>
								</Input>
							</div>

							<div className='AdminSearchandFilter'>
								<div className='AdminManageAddnewContainer'>
									<ButtonWithCustyomeStyling
										buttonTitle='Add new'
										paddingLeft={30}
										paddingRight={30}
										height={40}
										clickHandler={onAddAdmin}
										color='#2EC2E2'
										backgroundColor='#FFFFFF'
										borderColor='#2EC2E2'
										marginRight={19}
									/>
								</div>
								<div className='AdminSearchBarOuter'>
									<div className='AdminSearchContainer'>
										<FontAwesomeIcon
											className='AdminSearchIconColorChange'
											icon={faSearch}
										/>
										<input
											type='text'
											className='AdminSearchTextInputField'
											name='search'
											placeholder='Search...'
										/>
									</div>
								</div>
							</div>
						</div>
						<div className='AdminManagementCardComponent'>
							<div className='AdminManageCardComponentInnerCustomizer'>
								<div className='AdminManageAvatarContainer'>
									<img
										className='AdminManageImgeDisplay'
										src={DisplayImage}
										alt='avatar'
									/>
								</div>
								<div className='AdminManageDetailsContainer'>
									<div className='AdminManageDetailNameTitle'>
										Marta Scorces
									</div>
									<div className='AdminManageDetailNameCreateDate'>
										Added 21 days ago
									</div>
								</div>
								<div className='AdminManageButtonContainer'>
									<ButtonWithCustyomeStyling
										buttonTitle='Permissions'
										paddingLeft={30}
										paddingRight={30}
										height={40}
										clickHandler={onGrantPremission}
										color='#2EC2E2'
										backgroundColor='#FFFFFF'
										borderColor='#2EC2E2'
										marginRight={19}
									/>
									<ButtonWithCustyomeStyling
										buttonTitle='Edit'
										paddingLeft={30}
										paddingRight={30}
										height={40}
										color='#2EC2E2'
										clickHandler={onEdit}
										backgroundColor='#FFFFFF'
										borderColor='#2EC2E2'
										marginRight={19}
									/>
									<ButtonWithCustyomeStyling
										buttonTitle='Delete'
										paddingLeft={30}
										paddingRight={30}
										height={40}
										color='#CB1E1E'
										backgroundColor='#FFFFFF'
										borderColor='#CB1E1E'
									/>
								</div>
							</div>
						</div>
						<div className='AdminManageEditPermissionContainerCustomizer'>
							{showpermession && (
								<div className='AdminManagePermissionCardContainer'>
									<div className='AdminManagePermissionWithCheckbox'>
										<AdminInputCheckBox
											value='Read messages'
											title='Read messages'
											onChecked={onCheckPermession}
										/>
									</div>
									<div className='AdminManagePermissionWithCheckbox'>
										<AdminInputCheckBox
											value='Edit Companies'
											title='Edit Companies'
											onChecked={onCheckPermession}
										/>
									</div>
									<div className='AdminManagePermissionWithCheckbox'>
										<AdminInputCheckBox
											value='Edit profiles'
											title='Edit profiles'
											onChecked={onCheckPermession}
										/>
									</div>
									<div className='AdminManagePermissionWithCheckbox'>
										<AdminInputCheckBox
											value='Approve'
											title='Approve'
											onChecked={onCheckPermession}
										/>
									</div>
								</div>
							)}
							{edit && (
								<div className='AdminManageEditCardContainer'>
									<div className='AdminManageEditInnerSignleCard'>
										Change email
									</div>
									<div className='AdminManageEditInnerSignleCard'>
										reset password
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default AdminPanagementPage
