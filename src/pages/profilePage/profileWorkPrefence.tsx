import React, { useState, useEffect } from 'react'
import { Badge } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { CustomButton } from '../../component/common/buttons/profileButton'
import { connect } from 'react-redux'
import { InputCheckBox } from '../../component/common/FormComponent/form'
import { History } from 'history'
import { profileWorkPrefenceUpdateAction } from '../../store/action/profileAction'
interface Props {
	title: string
	data: any
	jobdata: any
	devtypes: any
	company: any
	profileinfo: any
	onClickNextPref: any
	getSelectedProfileList: (onAddTrade: any) => void
	onDisplayRouter: any
	profileWorkPrefenceUpdateAction: (
		benefits: any,
		job_type: any,
		company_size: any,
		development_type: any
	) => void
	updateStatus: boolean
	upworkpref?: any

	// benifits: {
	// 	default_work_perf_benefits: Benefits[]
	// }
}

const ProfileWorkPrefence: React.FC<Props> = (
	props: Props
): React.ReactElement => {
	const [show, setShow] = useState(false)
	const [showjob, setJobType] = useState(false)
	const [showcompany, setCompany] = useState(false)
	const [showdev, setDevType] = useState(false)

	//defining the array for input array
	const [newvalue, setNewData] = useState<any>([])
	const [newvaluejob, setNewDatajob] = useState<any>([])
	const [newvaluesize, setNewDatasize] = useState<any>([])
	const [newvaluedev, setNewDatadev] = useState<any>([])

	const onDisplayMore = () => {
		setShow(!show)
	}
	const onDisplayJobMore = () => {
		setJobType(!showjob)
	}
	const onDisplayCompany = () => {
		setCompany(!showcompany)
	}
	const onDisplayDevType = () => {
		setDevType(!showdev)
	}
	const onChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
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
	const onCheckedjob = (event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target
		const { name, value } = event.target
		var data: any = [...newvaluejob]

		if (data.includes(value)) {
			data = data.filter((skill) => skill !== value)
		} else {
			data.push(value)
		}

		console.log('data', data)
		setNewDatajob(data)
	}
	const onCheckedsize = (event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target
		const { name, value } = event.target
		var data: any = [...newvaluesize]

		if (data.includes(value)) {
			data = data.filter((skill) => skill !== value)
		} else {
			data.push(value)
		}

		console.log('data', data)
		setNewDatasize(data)
	}

	// const onCheckeddev = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	const target = event.target
	// 	console.log('hello checked value', newvaluedev)
	// 	const data: any = [...newvaluedev]
	// 	if (target.checked == true) {
	// 		data.push(target.value)
	// 	} else {
	// 		data.pop(target.value)
	// 	}
	// 	setNewDatadev(data)
	// }

	const onCheckeddev = (event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target
		const { name, value } = event.target
		var data: any = [...newvaluedev]

		if (data.includes(value)) {
			data = data.filter((skill) => skill !== value)
		} else {
			data.push(value)
		}

		console.log('data', data)
		setNewDatadev(data)
	}
	/* =============UseEffect for the showing the update value==================== */
	useEffect(() => {
		if (
			props.profileinfo.work_preferences.benefits ||
			props.profileinfo.work_preferences.company_size ||
			props.profileinfo.work_preferences.development_type ||
			props.profileinfo.work_preferences.job_type
		) {
			setNewData(props.profileinfo.work_preferences.benefits)
			setNewDatajob(props.profileinfo.work_preferences.job_type)
			setNewDatasize(props.profileinfo.work_preferences.company_size)
			setNewDatadev(props.profileinfo.work_preferences.development_type)
		}
	}, [
		props.profileinfo.work_preferences.benefits,
		props.profileinfo.work_preferences.job_type,
		props.profileinfo.work_preferences.development_type,
		props.profileinfo.work_preferences.company_size,
	])

	//Save button Onclick event function
	const OnSendingData = () => {
		if (
			newvalue.length == 0 ||
			newvaluejob.length == 0 ||
			newvaluesize.length == 0 ||
			newvaluedev.length == 0
		) {
			console.log('Select all the field')
		} else {
			props.onClickNextPref()
			props.profileWorkPrefenceUpdateAction(
				newvalue,
				newvaluejob,
				newvaluesize,
				newvaluedev
			)
		}
		console.log(
			'Hello work pref',
			newvalue.length,
			newvaluejob.length,
			newvaluesize.length,
			newvaluedev.length
		)

		// props.history.push('/profile/setting')
	}
	return (
		<div>
			<div className='WorkPrefenceCertificateContainer'>
				<div className='CertificateInnerContainer'>
					<div className='CertificateTitleContainer'>
						<div className='CertificateText'>Work Preferences</div>
						{/* <Badge className='CertificateBadge'>Optional</Badge> */}
					</div>
					<div className='WorkPrefenceOuterContainer'>
						<div className='WorkPrefenceDisplayTypes' onClick={onDisplayMore}>
							<div className='WorkPrefenceDispalyTitle'>Benefits</div>
							<div className='WorkPrefenceDispalyIcon'>
								<FontAwesomeIcon
									className='WorkPrefenceIcon'
									onClick={onDisplayMore}
									icon={faChevronDown}
									size='1x'
								/>
							</div>
						</div>
						{show && (
							<div className='WorkPrefenceShowMoreDetails'>
								<div className='WorkPrefenceDisplayCheckbox'>
									{props.data.map((items: any, index: number) => {
										return (
											<InputCheckBox
												checked={newvalue.includes(items)}
												value={items}
												key={index}
												title={items}
												onChecked={onChecked}
											/>
										)
									})}
								</div>
							</div>
						)}
					</div>
					<div className='WorkPrefenceOuterContainer'>
						<div
							className='WorkPrefenceDisplayTypes'
							onClick={onDisplayJobMore}
						>
							<div className='WorkPrefenceDispalyTitle'>Job Type</div>
							<div className='WorkPrefenceDispalyIcon'>
								<FontAwesomeIcon
									className='WorkPrefenceIcon'
									onClick={onDisplayJobMore}
									icon={faChevronDown}
									size='1x'
								/>
							</div>
						</div>
						{showjob && (
							<div className='WorkPrefenceShowMoreDetails'>
								<div className='WorkPrefenceDisplayCheckbox'>
									{props.jobdata.map((items: any, index: number) => {
										return (
											<InputCheckBox
												checked={newvaluejob.includes(items)}
												key={index}
												title={items}
												value={items}
												onChecked={onCheckedjob}
											/>
										)
									})}
								</div>
							</div>
						)}
					</div>
					<div className='WorkPrefenceOuterContainer'>
						<div
							className='WorkPrefenceDisplayTypes'
							onClick={onDisplayCompany}
						>
							<div className='WorkPrefenceDispalyTitle'>Company Size</div>
							<div className='WorkPrefenceDispalyIcon'>
								<FontAwesomeIcon
									className='WorkPrefenceIcon'
									onClick={onDisplayCompany}
									icon={faChevronDown}
									size='1x'
								/>
							</div>
						</div>
						{showcompany && (
							<div className='WorkPrefenceShowMoreDetails'>
								<div className='WorkPrefenceDisplayCheckbox'>
									{props.company.map((items: any, index: number) => {
										return (
											<InputCheckBox
												checked={newvaluesize.includes(items)}
												key={index}
												title={items}
												value={items}
												onChecked={onCheckedsize}
											/>
										)
									})}
								</div>
							</div>
						)}
					</div>
					<div className='WorkPrefenceOuterContainer'>
						<div
							className='WorkPrefenceDisplayTypes'
							onClick={onDisplayDevType}
						>
							<div className='WorkPrefenceDispalyTitle'>Development Type</div>
							<div className='WorkPrefenceDispalyIcon'>
								<FontAwesomeIcon
									className='WorkPrefenceIcon'
									onClick={onDisplayDevType}
									icon={faChevronDown}
									size='1x'
								/>
							</div>
						</div>
						{showdev && (
							<div className='WorkPrefenceShowMoreDetails'>
								<div className='WorkPrefenceDisplayCheckbox'>
									{props.devtypes.map((items: any, index: number) => {
										return (
											<InputCheckBox
												checked={newvaluedev.includes(items)}
												key={index}
												title={items}
												value={items}
												onChecked={onCheckeddev}
											/>
										)
									})}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div
				className='ProfilesaveAddButtonContainerNext'
				style={{ paddingBottom: 50 }}
			>
				<CustomButton title='Save changes' onClick={OnSendingData} />
			</div>
		</div>
	)
}
const mapStateToProps = (state: any) => ({
	// company: state.profileReducer.company,
	upworkpref: state.profileReducer.upworkpref,
	token: state.loginReducer.token,
})
export default connect(mapStateToProps, { profileWorkPrefenceUpdateAction })(
	ProfileWorkPrefence
)
