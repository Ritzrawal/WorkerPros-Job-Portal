import React, { useState, useEffect } from 'react'

import { InputCheckBox } from '../../../../component/common/FormComponent/form'

import './memberPermissionForm.css'

const GENERAL_PERMISSION = [
	{ title: 'Home (Dashboard)', value: 'home', selected: false },
	{
		title: 'Manage Jobs',
		value: 'manage_jobs',
		selected: false,
		child: [
			{ title: 'View Edit Jobs', value: 'view_edit_jobs', selected: false },
			{
				title: 'Manage Candidates',
				value: 'manage_candidates',
				selected: false,
			},
			{ title: 'Post New Job', value: 'post_new_job', selected: false },
		],
	},
	{ title: 'Post Jobs', value: 'post_jobs', selected: false },
	{ title: 'Messages', value: 'messages', selected: false },
	{ title: 'Calendar', value: 'calander', selected: false },
	{ title: 'Subcontractor', value: 'sub_contractor', selected: false },
]

const ADMINISTRATION_PERMISSION = [
	{ title: 'Company Setting', value: 'company_settings', selected: false },
	{
		title: 'Edit Permissions',
		value: 'edit_permissions',
		selected: false,
		child: [
			{
				title: 'Add and Remove Staff',
				value: 'add_remove_staff',
				selected: false,
			},
		],
	},
	{
		title: 'Manage Subscription',
		value: 'manage_subscription',
		selected: false,
	},
	{
		title: 'View/Update Billing',
		value: 'view_update_billing',
		selected: false,
	},
]

interface Props {
	permissions?: any
	updatePermissions?: (permissions: any) => void
}

const MemberPermissionForm: React.FC<Props> = (props: Props) => {
	const { permissions, updatePermissions } = props

	const [generalPermission, setGeneralPermission] = useState(GENERAL_PERMISSION)
	const [administrationPermission, setAdministrationPermission] = useState(
		ADMINISTRATION_PERMISSION
	)

	const updateGeneralPermission = (event) => {
		const { checked, value } = event.target

		const updatedPermission = generalPermission.map((g) => {
			if (g.title === value) {
				return { ...g, selected: checked }
			} else {
				return g
			}
		})

		setGeneralPermission(updatedPermission)
	}

	const updateGeneralChildPermission = (parent, event) => {
		const { checked, value } = event.target

		const updatedPermission = generalPermission.map((g: any) => {
			if (g.title === parent) {
				const child = g.child.map((c) => {
					if (c.title === value) {
						return { ...c, selected: checked }
					} else {
						return c
					}
				})
				return { ...g, child }
			} else {
				return g
			}
		})

		setGeneralPermission(updatedPermission)
	}

	const updateAdministrationPermission = (event) => {
		const { checked, value } = event.target

		const updatedPermission = administrationPermission.map((g) => {
			if (g.title === value) {
				return { ...g, selected: checked }
			} else {
				return g
			}
		})

		setAdministrationPermission(updatedPermission)
	}

	const updateAdministrationChildPermission = (parent, event) => {
		const { checked, value } = event.target

		const updatedPermission = administrationPermission.map((g: any) => {
			if (g.title === parent) {
				const child = g.child.map((c) => {
					if (c.title === value) {
						return { ...c, selected: checked }
					} else {
						return c
					}
				})
				return { ...g, child }
			} else {
				return g
			}
		})

		setAdministrationPermission(updatedPermission)
	}

	const selectAllPermission = () => {
		const selectAllGeneralPermission = generalPermission.map((g: any) => {
			if (g.child) {
				const child = g.child.map((c) => ({ ...c, selected: true }))

				return { ...g, selected: true, child }
			} else {
				return { ...g, selected: true }
			}
		})

		const selectAllAdministrationPermission = administrationPermission.map(
			(g: any) => {
				if (g.child) {
					const child = g.child.map((c) => ({ ...c, selected: true }))

					return { ...g, selected: true, child }
				} else {
					return { ...g, selected: true }
				}
			}
		)

		setGeneralPermission(selectAllGeneralPermission)
		setAdministrationPermission(selectAllAdministrationPermission)
	}

	const getPermissionsObject = (permissionsList) => {
		let permissionsObject = {}

		permissionsList.forEach((p) => {
			if (p.child) {
				p.child.forEach((c) => {
					permissionsObject[c.value] = c.selected
				})
			} else {
				permissionsObject[p.value] = p.selected
			}
		})

		return permissionsObject
	}

	useEffect(() => {
		if (updatePermissions) {
			const generalPermissions = getPermissionsObject(generalPermission)
			const administrationPermissions = getPermissionsObject(
				administrationPermission
			)

			updatePermissions({ ...generalPermissions, ...administrationPermissions })
		}
	}, [generalPermission, administrationPermission])

	const getUpdatedPermissions = (permissionList, permissions) => {
		const updatedPermissions = permissionList.map((p: any) => {
			if (p.child) {
				const child = p.child.map((c) => ({
					...c,
					selected: permissions[c.value],
				}))

				return { ...p, child }
			} else {
				return { ...p, selected: permissions[p.value] }
			}
		})

		return updatedPermissions
	}

	useEffect(() => {
		if (permissions) {
			const updatedGeneralPermission = getUpdatedPermissions(
				generalPermission,
				permissions
			)
			const updatedAdministrationPermission = getUpdatedPermissions(
				administrationPermission,
				permissions
			)

			setGeneralPermission(updatedGeneralPermission)
			setAdministrationPermission(updatedAdministrationPermission)
		}
	}, [permissions])

	return (
		<div className='EmployerMemberPermissionForm'>
			<div className='EmployerMemberPermissionForm__Header'>
				Permissions
				<button onClick={selectAllPermission}>Select All</button>
			</div>
			<div className='EmployerMemberPermissionForm__Body'>
				<div className='EmployerMemberPermissionForm__Body--Left'>
					<div className='EmployerMemberPermissionForm__Body--Left--Title'>
						General
					</div>
					<div className='EmployerMemberPermissionForm__Body--Left--List'>
						{generalPermission.map((g: any, index) => (
							<div
								key={index}
								className='EmployerMemberPermissionForm__Body--Left--List--CheckBox'
							>
								<InputCheckBox
									checked={g.selected}
									name={'permission'}
									title={g.title}
									value={g.title}
									onChecked={updateGeneralPermission}
								/>

								{g.child
									? g.child.map((c: any, index) => (
											<div
												key={index}
												className='EmployerMemberPermissionForm__Body--Left--List--CheckBox--Child'
											>
												<InputCheckBox
													border={' 2px solid #C7D0DE'}
													labelColor={'#808FA6'}
													checked={c.selected}
													name={'permission'}
													title={c.title}
													value={c.title}
													onChecked={(event) =>
														updateGeneralChildPermission(g.title, event)
													}
												/>
											</div>
									  ))
									: null}
							</div>
						))}
					</div>
				</div>
				<div className='EmployerMemberPermissionForm__Body--Right'>
					<div className='EmployerMemberPermissionForm__Body--Right--Title'>
						Administration
					</div>
					<div className='EmployerMemberPermissionForm__Body--Right--List'>
						{administrationPermission.map((a: any, index) => (
							<div
								key={index}
								className='EmployerMemberPermissionForm__Body--Right--List--CheckBox'
							>
								<InputCheckBox
									checked={a.selected}
									name={'permission'}
									title={a.title}
									value={a.title}
									onChecked={updateAdministrationPermission}
								/>

								{a.child
									? a.child.map((c: any, index) => (
											<div
												key={index}
												className='EmployerMemberPermissionForm__Body--Right--List--CheckBox--Child'
											>
												<InputCheckBox
													border={' 2px solid #C7D0DE'}
													labelColor={'#808FA6'}
													checked={c.selected}
													name={'permission'}
													title={c.title}
													value={c.title}
													onChecked={(event) =>
														updateAdministrationChildPermission(a.title, event)
													}
												/>
											</div>
									  ))
									: null}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MemberPermissionForm
