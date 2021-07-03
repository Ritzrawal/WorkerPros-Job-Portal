import React, { useState, useEffect } from 'react'
import { Badge, FormGroup, Label, Input } from 'reactstrap'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { CustomButton } from '../../component/common/buttons/profileButton'
import { InputCheckBox } from '../../component/common/FormComponent/form'
import { connect } from 'react-redux'
import { profileCertUpdateAction } from '../../store/action/profileAction'
interface Props {
	title: string
	cerificate: any
	getSelectedProfileList: (onAddTrade: any) => void
	profileCertUpdateAction: (value: any) => void
	onDisplayRouter: any
	onClickNextCert: any
	profileinfo: any
	updateStatus: boolean
}
const ProfileCertificate: React.FC<Props> = (
	props: Props
): React.ReactElement => {
	const [newchecked, setChecked] = useState(false)
	const [newvalue, setNewData] = useState<any>([])
	const [newdata, setData] = useState<any>([{ certificate: '' }])

	///define the function
	const onAddTrade = () => {
		props.getSelectedProfileList(4)
		props.onClickNextCert()
		props.onDisplayRouter()
		props.profileCertUpdateAction(newvalue)
	}
	const onOtherChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target
		if (target.value === 'Others' && target.checked == true) {
			setChecked(true)
		} else if (target.value === 'Others' && target.checked == false) {
			setChecked(false)
		}
	}

	const onChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log('checked', newvalue)
		const target = event.target
		const { name, value } = event.target
		var data: any = [...newvalue]

		if (data.includes(value)) {
			data = data.filter((skill) => skill !== value)
		} else {
			data.push(value)
		}

		console.log('data', data)
		setNewData(data)
	}
	const onFormDataChange = (event: any, formIndex) => {
		const { name, value } = event.target
		let newUpdateForm = newdata.map((f: any, index) => {
			if (formIndex === index) {
				return { ...f, [name]: value }
			} else {
				return f
			}
		})

		setData(newUpdateForm)
	}
	const onAddCertificate = () => {
		let currentForm = newdata
		let formstring = JSON.stringify(currentForm)
		console.log('formstring', currentForm)
		console.log('hello form data', newdata)
		if (currentForm.length < 5) {
			currentForm = [
				...newdata,
				{
					certificate: '',
				},
			]
		}
		setData(currentForm)
	}
	const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
		if (event.key === 'Enter') {
			event.preventDefault()
			event.stopPropagation()
			const datavcert = newdata.map((items) => {
				return items.certificate
			})

			console.log('cert', datavcert)
			setNewData([...newvalue, ...datavcert])
		}
	}
	/* =============UseEffect for the showing the update value==================== */
	useEffect(() => {
		console.log('tab checked', props.profileinfo.certificates, props.cerificate)
		if (props.profileinfo.certificates) {
			console.log('tab new')
			setNewData(props.profileinfo.certificates)
		}
	}, [props.profileinfo.certificates])

	return (
		<div>
			<div className='CertificateContainer'>
				<div className='CertificateInnerContainer'>
					<div className='CertificateTitleContainer'>
						<div className='CertificateText'>Certificate</div>
						<Badge className='CertificateBadge'>Optional</Badge>
					</div>
					<div className='CertificateDisplayCheckBox'>
						{props.cerificate &&
							props.cerificate.map((item: any, index: number) => {
								return (
									<InputCheckBox
										checked={newvalue.includes(item)}
										value={item}
										key={index}
										title={item}
										onChecked={onChecked}
									/>
								)
							})}
						<InputCheckBox
							value='Others'
							title='Others'
							onChecked={onOtherChecked}
						/>
					</div>
					<div className='CertificateAddButtonContainer'>
						{newchecked && (
							<div className='OtherTypeOfCertificates'>
								{newdata.map((inputfield, index) => {
									return (
										<FormGroup key={index}>
											<Label for='text'>TYPE YOUR CERTIFICATE BELOW</Label>
											<Input
												type='text'
												className='InputTextForTypeCertificate'
												name='certificate'
												placeholder='Ex. OSHA 30'
												onChange={(event) => onFormDataChange(event, index)}
												onKeyDown={onKeyDown}
											/>
										</FormGroup>
									)
								})}

								<CustomButton
									title='Add Certificate'
									icon={faPlus}
									onClick={onAddCertificate}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
			<div
				className='ProfilesaveAddButtonContainerNext'
				style={{ paddingBottom: 50 }}
			>
				<CustomButton title='Next Step' onClick={onAddTrade} />
			</div>
		</div>
	)
}
const mapStateToProps = (state: any) => ({
	data: state.profileReducer.data,
})

export default connect(null, { profileCertUpdateAction })(ProfileCertificate)
