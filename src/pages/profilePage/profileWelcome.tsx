var statedata

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Point, Area } from 'react-easy-crop/types'
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	CustomInput,
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select'
import { connect } from 'react-redux'
import ReactAutocomplete from 'react-autocomplete'
import { faUpload, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { History } from 'history'
import { Range, getTrackBackground } from 'react-range'
/*==============================================================*/
import {
	profileBenifitsAction,
	profileJobTypeAction,
	profileCompanySizeAction,
	profileDevTypesAction,
	profileCertificateAction,
	profileGeneralUpdateAction,
	profileAllInfoAction,
} from '../../store/action/profileAction'
import {
	jobsCategoryListAction,
	countryStateAction,
} from '../../store/action/jobsListAction'
import { locationListAction } from '../../store/action/locationListAction'
import ProfileWorkPrefence from './profileWorkPrefence'
import { HeaderPage, HeaderPage2 } from '../headerPage'
import ProfileCertificate from './profileCertificate'
import { CustomButton } from '../../component/common/buttons/profileButton'
import getCroppedImg from '../../component/common/FormComponent/upload'
import ProfileTradeandSkills from './tradeAndSkills'
import ProfileWorkExperience from './profileWorkExperience'
import { getJobCategories } from '../../store/action/job'
import './profileWelcome.css'
import '../../styles/responsive.css'
import { ProfileDummyImage } from '../../component/logosAndIcons'
/*=================================================================*/

interface Props {
	title: string
	token: string
	benifits: string
	jobdata: string
	uperror: any
	devtypes: string
	history: History
	company: string
	cerificate: string
	first_name: any
	country_name: string

	data: {
		default_work_perf_benefits: string
	}
	profileinfo: {
		profile_image: string
		first_name: string
		last_name: string
		travel_will: {
			distance: any
			high_demand_city: boolean
		}
		address: {
			city: string
			state: string
		}
		user: {
			email: string
		}
	}
	countrylist: any
	upworkpref: any
	jobsCategoryListAction: any
	profileBenifitsAction: (token: string) => void
	profileJobTypeAction: (token: string) => void
	profileCompanySizeAction: (token: string) => void
	profileDevTypesAction: (token: string) => void
	profileCertificateAction: () => void
	locationListAction: (token: string) => void
	getJobCategories: () => void
	profileGeneralUpdateAction: (
		image: any,
		form: any,
		data: any,
		checked: boolean
	) => void
	profileAllInfoAction: () => void
	//range css
	ref: React.RefObject<any>
	style: React.CSSProperties
	jobCategory: any
	upwork?: any
}

const WelcomePage: React.FC<Props> = (props: Props): React.ReactElement => {
	const [checked, setChecked] = useState(false)
	const [tick, setTick] = useState(false)
	const [tradeshow, setTradeShow] = useState(0)
	const [localimage, setLocalImage] = useState<any>('')
	const [selectedProfiles, setSelectedProfiles] = useState(0)
	const [values, setValues] = useState([18])
	const [activeButton, setActiveButton] = useState(true)
	const [activeButton1, setActiveButton1] = useState(false)
	const [activeButton2, setActiveButton2] = useState(false)
	const [activeButton3, setActiveButton3] = useState(false)
	const [activeButton4, setActiveButton4] = useState(false)
	const [imageerror, setImageError] = useState(false)

	const [form, setState] = useState({
		state: '',
		city: '',
	})
	const [traveldata, setTravel] = useState({
		distance: values,
		high_demand_city: false,
	})
	const [image, setImage] = useState({
		fileupload: '',
	})
	const [updateStatus, setUpdateStatus] = useState(false)
	/*==============================================*/
	const [rotation, setRotation] = useState(0)
	const [crop, setCrop] = useState<Point>({
		x: 0,
		y: 0,
	})
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
	const [croppedImage, setCroppedImage] = useState(null)
	const [showcrop, setCropshow] = useState(false)
	const [zoom, setZoom] = useState(1)
	/*============================*/
	useEffect(() => {
		props.locationListAction(props.token)
		props.profileBenifitsAction(props.token)
		props.profileJobTypeAction(props.token)
		props.profileCompanySizeAction(props.token)
		props.profileDevTypesAction(props.token)
		props.profileCertificateAction()
		props.getJobCategories()
		// props.profileAllInfoAction()

		props.jobsCategoryListAction()
	}, [])
	const onDisplayRouter = () => {
		setTradeShow(selectedProfiles)
	}
	const onDisplayRouterWelcome = () => {
		setTradeShow(1)
		if (tradeshow == 1) {
			setTick(true)
		}
	}

	const onAddTrade = () => {
		onDisplayRouterWelcome()
		setActiveButton1(true)
		// onDisplayRouter()
		props.profileGeneralUpdateAction(
			image.fileupload,
			{
				state: form.state,
				city: form.city,
			},
			values,
			checked
		)
	}
	/* ============================For Select State value ========================= */
	const statedata =
		props.countrylist.country_states_cities &&
		props.countrylist.country_states_cities.states &&
		props.countrylist.country_states_cities.states.map((items, index) => {
			const cityList = items.cities.map((item, index) => ({ title: item }))
			// cityList.push({ title: 'other' })

			return cityList
		})
	/* ======================UseEffects for the allprofile for the get request======================= */
	useEffect(() => {
		onDisplayRouter()
		props.locationListAction(props.token)
	}, [props.locationListAction])
	/* ====================For Update Form Value ==============================*/

	useEffect(() => {
		if (props.profileinfo && props.profileinfo.travel_will) {
			setTravel({
				...traveldata,
				// distance: props.profileinfo.travel_will.distance,
				high_demand_city: props.profileinfo.travel_will.high_demand_city,
			})
			setValues([
				props.profileinfo.travel_will.distance
					? props.profileinfo.travel_will.distance
					: 18,
			])
		}
	}, [
		props.locationListAction,
		props.profileinfo && props.profileinfo.travel_will,
	])
	useEffect(() => {
		props.profileAllInfoAction()
	}, [tradeshow])

	/*==================useEffect for updating the value =======================*/
	useEffect(() => {
		if (props.profileinfo && props.profileinfo.address) {
			setState({
				...form,
				city: props.profileinfo.address.city,
				state: props.profileinfo.address.state,
			})
		} else {
			null
		}
	}, [props.profileinfo && props.profileinfo.address])

	const onSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log('hello profile', e.target.value, form)
		e.preventDefault()
		setState({
			...form,
			[e.target.name]: e.target.value,
		})
	}
	const onSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTravel({
			...traveldata,
			[e.target.name]: e.target.checked,
		})
	}
	const onImageUpload = (e: any) => {
		setCropshow(true)
		var maxSize = 2097152
		e.preventDefault()
		const file: any = e.target.files[0]
		if (file) {
			var fsize = file.size
			if (fsize > maxSize) {
				setImageError(true)
				// alert('Maximum file size exceed, This file size is: ' + fsize + 'KB')
				return false
			} else {
				setImageError(false)
				setLocalImage(URL.createObjectURL(file))
				setImage({
					...image,
					[e.target.name]: e.target.files,
				})
			}
		}
	}

	const getSelectedProfile = (profiles) => {
		setSelectedProfiles(profiles)
	}
	useEffect(() => {
		onDisplayRouter()
	}, [selectedProfiles])
	const onClickNext = () => {
		setTradeShow(selectedProfiles)
		setActiveButton2(true)
	}
	const onClickNextCert = () => {
		setActiveButton3(true)
	}
	const onClickNextWork = () => {
		setActiveButton3(true)
	}
	const onClickNextPref = () => {
		props.history.push('/worker-dashboard')

		setActiveButton4(true)
	}
	const onClickNextCertPref = () => {
		setActiveButton4(true)
	}

	const myRef = useRef(null)
	const myRefTradeSkills = useRef(null)
	const myRefPref = useRef(null)
	const myRefWork = useRef(null)
	const myRefCertificate = useRef(null)
	const executeScroll = (e) => {
		if (activeButton3 == true) {
			if (e.target.id == 1) {
				setTradeShow(1)
			} else if (e.target.id == 2) {
				setTradeShow(2)
			} else if (e.target.id == 3) {
				setTradeShow(3)
			} else if (e.target.id == 0) {
				setTradeShow(0)
			}
		}
		if (activeButton1 == true) {
			if (e.target.id == 0) {
				setTradeShow(0)
			} else if (e.target.id == 1) {
				setTradeShow(1)
			}
		}
		if (activeButton2 == true) {
			if (e.target.id == 0) {
				setTradeShow(0)
			} else if (e.target.id == 1) {
				setTradeShow(1)
			} else if (e.target.id == 2) {
				setTradeShow(2)
			}
		}
		if (activeButton3 == true) {
			if (e.target.id == 0) {
				setTradeShow(0)
			} else if (e.target.id == 1) {
				setTradeShow(1)
			} else if (e.target.id == 2) {
				setTradeShow(2)
			} else if (e.target.id == 3) {
				setTradeShow(3)
			}
		}
		if (activeButton4 == true) {
			if (e.target.id == 0) {
				setTradeShow(0)
			} else if (e.target.id == 1) {
				setTradeShow(1)
			} else if (e.target.id == 2) {
				setTradeShow(2)
			} else if (e.target.id == 3) {
				setTradeShow(3)
			} else if (e.target.id == 4) {
				setTradeShow(4)
			}
		}

		// const name = e.target.innerText
		setActiveButton(true)
	}

	/*===========Crop Image ==============================*/
	const showCroppedImage = useCallback(async () => {
		try {
			const croppedImage: any = await getCroppedImg(
				localimage,
				croppedAreaPixels,
				rotation
			)
			setLocalImage(URL.createObjectURL(croppedImage))
			setImage({
				...image,
				fileupload: croppedImage,
			})
			setCroppedImage(croppedImage)
			setCropshow(false)
		} catch (e) {
			console.error(e)
		}
	}, [croppedAreaPixels, rotation])
	/// crop image function
	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels)
	}, [])
	const onClose = useCallback(() => {
		setCropshow(false)
	}, [])
	return (
		<div className='ProfileMainConatiner'>
			<div>
				{localStorage.getItem('token') ? (
					<HeaderPage2 hidenavigation={true} title='WorkerPros' />
				) : (
					<HeaderPage title='WorkerPros' />
				)}
			</div>
			<div
				className='ProfileOuterContainer'
				// style={{
				// 	paddingBottom:
				// 		tradeshow == 1 || tradeshow == 3 || tradeshow == 4 ? '15%' : 0,
				// }}
			>
				<div className='SkillList' id='0'>
					{tradeshow == 0 ? (
						<div
							id='0'
							className={'ProfileSideTextCustomizeActiveOne'}
							onClick={(e) => {
								executeScroll(e)
							}}
						>
							General
						</div>
					) : (
						<div
							id='0'
							className={
								activeButton
									? 'ProfileSideTextCustomizeChange'
									: 'ProfileSideTextCustomize'
							}
							onClick={(e) => {
								executeScroll(e)
							}}
						>
							General
							<FontAwesomeIcon
								className='IconForTheOnCLickGeneral'
								icon={faCheck}
								size='1x'
								color='#2ec2e2'
							/>
						</div>
					)}
					{tradeshow == 1 ? (
						<div
							id='1'
							className={'ProfileSideTextCustomizeActiveOne'}
							onClick={(e) => {
								executeScroll(e)
							}}
						>
							Trades and Skills
						</div>
					) : (
						<div
							id='1'
							className={
								activeButton1
									? 'ProfileSideTextCustomizeChange'
									: 'ProfileSideTextCustomize'
							}
							onClick={(e) => {
								executeScroll(e)
							}}
						>
							Trades and Skills
							<FontAwesomeIcon
								className='IconForTheOnCLick'
								icon={faCheck}
								size='1x'
								color='#2ec2e2'
							/>
						</div>
					)}
					{tradeshow == 2 ? (
						<div
							id='2'
							className={'ProfileSideTextCustomizeActiveOne'}
							onClick={(e) => {
								executeScroll(e)
							}}
						>
							Work Experience
						</div>
					) : (
						<div
							id='2'
							className={
								activeButton2
									? 'ProfileSideTextCustomizeChange'
									: 'ProfileSideTextCustomize'
							}
							onClick={(e) => {
								executeScroll(e)
							}}
						>
							Work Experience
							<FontAwesomeIcon
								className='IconForTheOnCLick'
								icon={faCheck}
								size='1x'
								color='#2ec2e2'
							/>
						</div>
					)}
					{tradeshow == 3 ? (
						<div
							id='3'
							className={'ProfileSideTextCustomizeActiveOne'}
							onClick={(e) => {
								executeScroll(e)
							}}
						>
							Certificates
						</div>
					) : (
						<div
							id='3'
							className={
								activeButton3
									? 'ProfileSideTextCustomizeChange'
									: 'ProfileSideTextCustomize'
							}
							onClick={(e) => {
								executeScroll(e)
							}}
						>
							Certificates
							<FontAwesomeIcon
								className='IconForTheOnCLickCert'
								icon={faCheck}
								size='1x'
								color='#2ec2e2'
							/>
						</div>
					)}
					{tradeshow == 4 ? (
						<div
							id='4'
							className={'ProfileSideTextCustomizeActiveOne'}
							onClick={(e) => {
								executeScroll(e)
							}}
						>
							Work Preference
						</div>
					) : (
						<div
							id='4'
							className={
								activeButton4
									? 'ProfileSideTextCustomizeChange'
									: 'ProfileSideTextCustomize'
							}
							onClick={(e) => {
								executeScroll(e)
							}}
						>
							Work Preference
							<FontAwesomeIcon
								className='IconForTheOnCLick'
								icon={faCheck}
								size='1x'
								color='#2ec2e2'
							/>
						</div>
					)}
				</div>
				{tradeshow == 0 && (
					<div className='ProfileDisplay' ref={myRef}>
						<div className='ProfileContent'>
							<div className='WelcomeTitle'>
								Welcome, {props.profileinfo?.first_name}
							</div>
							<div className='ImageUploadContainer'>
								<div className='ImageCustomize'>
									<img
										className='ImageStyling'
										src={
											image.fileupload
												? localimage
												: props?.profileinfo?.profile_image
												? `${process.env.REACT_APP_IMAGE_URL}${props.profileinfo.profile_image}`
												: ProfileDummyImage
										}
									/>
								</div>
								<div className='NameAndButton'>
									<div className='DisplayName'>
										<span>{props?.profileinfo?.first_name}</span>{' '}
										<span className='LastNameCustomize'>
											{props?.profileinfo?.last_name}
										</span>
									</div>
									<div className='DisplayEmail'>
										{props?.profileinfo?.user?.email}
									</div>
									<div className='UploadProfileButton'>
										<div className='ProfileInputUploadCustomiz'>
											<div className='ProfileInupuLogoCustomize'>
												<FontAwesomeIcon
													icon={faUpload}
													size='1x'
													color='#FFFFFF'
												/>
											</div>
											<div className='ProfileInupuTextCustomize'>
												Upload an Image
											</div>
										</div>
										<Input
											type='file'
											accept='image/png, image/jpeg'
											className='UploadButton'
											name='fileupload'
											onChange={onImageUpload}
										/>
									</div>
									{imageerror && (
										<p className='ErrorTextMessage'>
											Image size should not be more then 2 MB
										</p>
									)}
								</div>
							</div>
							<Form className='FormContainerProfile'>
								<div className='InputDropDownContainer'>
									<FormGroup className='InputDropDownField'>
										<Label for='exampleSelect' className='SelectTextCustomize'>
											Select Your State:
										</Label>
										<Input
											type='select'
											name='state'
											onChange={onSubmit}
											value={form.state}
											className='InputDropTextField'
											id='leSelect'
										>
											<option disabled value=''>
												Select your State
											</option>
											{props.countrylist &&
												props.countrylist.country_states_cities &&
												props.countrylist.country_states_cities.states &&
												props.countrylist.country_states_cities.states.map(
													(items, index) => {
														return (
															<option key={index}>{items.state_name}</option>
														)
													}
												)}
										</Input>
									</FormGroup>
									<FormGroup className='InputDropDownFieldRight'>
										<Label for='exampleSelect' className='SelectTextCustomize'>
											Your City :
										</Label>
										<Input
											type='select'
											name='city'
											onChange={onSubmit}
											value={form.city}
											className='InputDropTextField'
											id='stateSelect'
										>
											<option disabled value=''>
												Select your City
											</option>

											{props.countrylist &&
												props.countrylist.country_states_cities &&
												props.countrylist.country_states_cities.states &&
												props.countrylist.country_states_cities.states.map(
													(items, index) => {
														return items.cities.map((item, index) => {
															return <option key={index}>{item}</option>
														})
													}
												)}
										</Input>
										{/* <Select
											className='InputDropTextField'
											onChange={(value) =>
												setState({ ...form, city: value.title })
											}
											options={statedata ? statedata[0] : []}
											isOptionSelected={(option) => form.city == option.title}
											placeholder={'Select City'}
											// value={form.city}
											getOptionValue={(option) => `${option}`}
											noOptionsMessage={() => null}
											getOptionLabel={(option) => `${option.title} `}
										/> */}
										{/* {form.city === 'other' && (
											<Input
												style={{ marginTop: '5px' }}
												type='text'
												name='other_city'
												value={form.other_city}
												placeholder={'Other City'}
												onChange={onSubmit}
												className='InputTextField'
											></Input>
										)} */}
									</FormGroup>
								</div>
								<div className='HowfartextConatiner'>
									<text className='NoramTextofHowFar'>
										How far are you willing to travel for gigs:
									</text>
									<text className='CustomizeTextofHowFar'>{values} MI</text>{' '}
								</div>

								<FormGroup className='SliderCustomizer'>
									<Range
										values={values}
										step={1}
										min={0}
										max={50}
										onChange={(values) => setValues(values)}
										renderTrack={({ props, children }) => (
											<div
												style={{
													height: '36px',
													display: 'flex',
													width: '667px',
												}}
											>
												<div
													ref={props.ref}
													style={{
														height: '5px',
														width: '100%',
														borderRadius: '4px',
														background: getTrackBackground({
															values: values,
															colors: ['#234476', '#E1E7EF'],
															min: 0,
															max: 50,
														}),
														alignSelf: 'center',
													}}
												>
													{children}
												</div>
											</div>
										)}
										renderThumb={({ props }) => (
											<div
												{...props}
												style={{
													...props.style,
													height: '24px',
													width: '24px',
													borderRadius: '24px',
													backgroundColor: '#FFFFFF',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
												}}
											></div>
										)}
									/>
								</FormGroup>
								<div className='ProfileSliderValueContainer'>
									<div className='InitialValueSlider'>1 mi</div>
									<div className='InitialValueSlider'>50+ mi</div>
								</div>
								<FormGroup check className='LoginChecBoxContainer'>
									<Label className='CustomCheckBox' check>
										<Input
											checked={traveldata.high_demand_city}
											className='LoginCheckBoxCustomize'
											type='checkbox'
											name='high_demand_city'
											onChange={onSlide}
										/>
										<text className='LoginCheckBoxText'>
											I am willing to move to high-demand cities for work
										</text>
										<span className='checkmark'></span>
									</Label>
								</FormGroup>
							</Form>
						</div>

						{showcrop && (
							<div>
								<div className='ProfileCropButtonCustomizerUpperCancelButton'>
									<div>Edit Photo</div>
									<div onClick={onClose} className='CropButtonCancelButtonh'>
										<FontAwesomeIcon
											icon={faTimes}
											className='ProfileCropCancelButtonCustomize'
										/>
									</div>
								</div>
								<div className='ProfileUploadPhotoDisplayCrop'>
									<Cropper
										image={localimage}
										crop={crop}
										zoom={zoom}
										cropShape='round'
										aspect={1 / 1}
										onCropChange={setCrop}
										onCropComplete={onCropComplete}
										onZoomChange={setZoom}
									/>
									<div className='ProfileCropButtonCustomizer'>
										<div
											onClick={showCroppedImage}
											className='CropbuttonSaveCustomizer'
										>
											Save
										</div>
									</div>
								</div>
							</div>
						)}
						<div className='ProfilesaveAddButtonContainer'>
							<CustomButton title='Next Step' onClick={onAddTrade} />
						</div>
					</div>
				)}
				{tradeshow == 1 && (
					<div
						className='ProfileDisplay'
						style={{ height: '100%' }}
						ref={myRefTradeSkills}
					>
						<div className='DisplayTradeandSkills'>
							<ProfileTradeandSkills
								onDisplayRouter={onDisplayRouter}
								onClickNext={onClickNext}
								profileinfo={props.profileinfo}
								tradeshow={tradeshow}
								title='Hello'
								getSelectedProfileList={(profiles) =>
									getSelectedProfile(profiles)
								}
								updateStatus={updateStatus}
								tick={tick}
							/>
						</div>
					</div>
				)}
				{tradeshow == 2 && (
					<div className='ProfileDisplay' ref={myRefWork}>
						<div className='DisplayTradeandSkills'>
							<ProfileWorkExperience
								onClickNext={onClickNextCert}
								onDisplayRouter={onDisplayRouter}
								title='Hello'
								getSelectedProfileList={(profiles) =>
									getSelectedProfile(profiles)
								}
								updateStatus={updateStatus}
								tick={tick}
							/>
						</div>
					</div>
				)}
				{tradeshow == 3 && (
					<div className='ProfileDisplay'>
						<div className='DisplayTradeandSkills' ref={myRefCertificate}>
							<ProfileCertificate
								profileinfo={props.profileinfo}
								onClickNextCert={onClickNextCertPref}
								onDisplayRouter={onDisplayRouter}
								title='Hello'
								cerificate={props.cerificate}
								getSelectedProfileList={(profiles) =>
									getSelectedProfile(profiles)
								}
								updateStatus={updateStatus}
							/>
						</div>
					</div>
				)}
				{tradeshow == 4 && (
					<div className='ProfileDisplay'>
						<div className='DisplayTradeandSkills' ref={myRefPref}>
							<ProfileWorkPrefence
								profileinfo={props.profileinfo}
								onClickNextPref={onClickNextPref}
								onDisplayRouter={onDisplayRouter}
								title='Hello'
								getSelectedProfileList={(profiles) =>
									getSelectedProfile(profiles)
								}
								data={props.benifits}
								jobdata={props.jobdata}
								devtypes={props.devtypes}
								company={props.company}
								updateStatus={updateStatus}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	profileinfo: state.profileReducer.profileinfo,
	benifits: state.profileReducer.benifits.default_work_perf_benefits || [],
	jobdata: state.profileReducer.jobtype.default_job_type || [],
	company: state.profileReducer.company.default_company_size || [],
	devtypes: state.profileReducer.devtype.default_work_perf_dev_type || [],
	token: state.loginReducer.token,
	category: state.job.category,
	countrylist: state.locationListReducer.data,
	upwork: state.profileReducer.upwork,
	uperror: state.profileReducer.uperror,
	cerificate: state.profileReducer.cerificate.default_certificates || [],
	upworkpref: state.profileReducer.upworkpref,
})
export default connect(mapStateToProps, {
	profileBenifitsAction,
	profileJobTypeAction,
	profileCompanySizeAction,
	profileDevTypesAction,
	profileCertificateAction,
	profileGeneralUpdateAction,
	profileAllInfoAction,
	jobsCategoryListAction,
	locationListAction,
	getJobCategories,
})(WelcomePage)
