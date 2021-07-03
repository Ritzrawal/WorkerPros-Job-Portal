/* eslint-disable react/prop-types */
//import Library
import signupImage from '../../assets/images/landing-page/signup.png'
import React, { useState, useEffect } from 'react'
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Col,
	Row,
	FormFeedback,
} from 'reactstrap'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import { History, LocationState } from 'history'
import { connect } from 'react-redux'
//import action for APi request
import { signupAction, googleLoginAction } from '../../store/action/loginAction'

//Component import
import { isLoggedIn, getValue } from '../../service/storage'
import { InputCheckBox } from '../../component/common/FormComponent/form'
import { ButtonComponent, SwitchButtonComponent } from '../../component'

import './signupPage.css'
import '../../styles/responsive.css'
// import { title } from 'process'
// import colors from '../../utils/color'
interface Props {
	title?: string
	signin: boolean
	visible: boolean
	buttonTitle?: string
	signupAction: (
		first_name: string,
		last_name: string,
		company_name: string,
		email: string,
		password: any,
		role: string
	) => void
	googleLoginAction: (
		first_name: string,
		last_name: string,
		email: string,
		profile_id: string,
		profile_image: string,
		role: string
	) => void
	googlein: {
		access_token: string
		user: {
			new_user: string
		}
	}
	googleerror: string
	history: History
	message: {
		email: string
		password: any
		error: any
		company: string
	}
	signupdata: {
		access_token: string
		user: {
			email: string
		}
	}
}
const SignupPage: React.FC<Props> = (props) => {
	const role = props.visible ? 'employer' : 'worker'
	const [show, setShow] = useState(false)
	const [error, serError] = useState(false)
	// const [role, setRole] = useState('worker')
	const [passerror, serPasError] = useState(false)
	const [firsterror, setFirstError] = useState(false)
	const [comerror, setComError] = useState(false)
	const [laserror, setLastError] = useState(false)
	const [switcherror, setSwitchError] = useState(false)

	const [form, setState] = useState({
		first_name: '',
		last_name: '',
		company_name: '',
		email: '',
		password: '',
	})

	useEffect(() => {
		const role = localStorage.getItem('role')
		if (localStorage.getItem('token') && role) {
			if (role === 'employer') {
				props.history.push('/employer/dashboard')
			} else if (props?.googlein?.user?.new_user === 'false') {
				props.history.push('/worker-dashboard')
			} else {
				props.history.push('/profile/setting')
			}
		} else {
			props.history.push('/signup')
		}
		// if (isLoggedIn()) {
		// 	if (form.company_name === '' && !props?.googlein?.user?.new_user) {
		// 		props.history.push('/worker-dashboard')
		// 	} else if (form.company_name === '') {
		// 		props.history.push('/profile/setting')
		// 	} else props.history.push('/employer/update-profile')
		// } else {
		// 	props.history.push('/signup')
		// }
	}, [props.signupdata.access_token, props.googlein.access_token])
	const onClickSignup = () => {
		setSwitchError(true)
		onLastNameError()
		onNameError()
		onCompanyError()
		onEmailErrorEmail()
		onEmailError()
		form.email.trim().length === 0
			? serError(true)
			: props.signupAction(
					form.first_name,
					form.last_name,
					form.company_name,
					form.email,
					form.password,
					role
			  )
	}
	const onEmailErrorEmail = () => {
		form.email.trim().length === 0 ? serError(true) : serError(false)
	}
	const onCompanyError = () => {
		form.company_name.trim().length === 0
			? setComError(true)
			: setComError(false)
	}
	const onEmailError = () => {
		form.password.trim().length === 0 ? serPasError(true) : serPasError(false)
	}
	const onNameError = () => {
		form.first_name.trim().length === 0 && form.last_name.trim().length === 0
			? setFirstError(true)
			: setFirstError(false)
	}
	const onLastNameError = () => {
		form.last_name.trim().length === 0
			? setLastError(true)
			: setLastError(false)
	}

	const responseGoogle = (response: any) => {
		const profileObj: any = response.profileObj
		props.googleLoginAction(
			profileObj.givenName,
			profileObj.familyName,
			profileObj.email,
			profileObj.googleId,
			profileObj.imageUrl,
			role
		)
	}
	const onSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log('name', e.target.value)
		e.preventDefault()
		setState({
			...form,
			[e.target.name]: e.target.value,
		})
	}
	// props function for switch componnet
	const onDisplay = () => {
		setState({
			...form,
			first_name: '',
			last_name: '',
			company_name: '',
			email: '',
			password: '',
		})
		setSwitchError(false)
		serPasError(false)
		serError(false)
		setComError(false)
		setLastError(false)
		setFirstError(false)
		setShow(true)
	}
	const onChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShow(event.target.checked)
		console.log(event.target.checked)
	}

	return (
		<div className='SignupMainContainer'>
			<div className='LoginRightHalfContainer'>
				<div className='TitleTextConatiner'>
					<Link style={{ textDecoration: 'none' }} to='/'>
						<text className='TitleText'>WorkerPros</text>
					</Link>
				</div>
				<div className='signup-para'>
					<p>IT&apos;S EASY WITH US</p>
					<h1>
						Build Your Future <br />
						with WorkerPros
					</h1>
					<p>
						Join the largest community of skilled <br />
						construction workers looking for new <br />
						career opportunities
					</p>
				</div>
			</div>
			<div className='MainContainer'>
				<Form className='InnerMainContainer'>
					<div className='ButtonContainer'>
						<div className='LoginTextComponent'>
							<text className='SignUpText'>Sign Up</text>
						</div>
						<div className='RightHalfButton'>
							<SwitchButtonComponent
								buttonTitle='Hello data'
								onClick={onDisplay}
							/>
						</div>
					</div>
					{props.visible ? (
						<FormGroup className='CustomizeCompanyNameWidth'>
							{/* <div className='SignUpPageButtonContainers'>
								<div className='GoogleButtonContainer'>
									<GoogleLogin
										className='LoginGoogleLoginButton'
										style={{ fontSize: 30, width: 70 }}
										// icon={false}
										clientId='737555203672-4n453vuqglt2lv26ce5fn2mgkpta51at.apps.googleusercontent.com'
										// buttonText='Sign up with Google'
										onSuccess={responseGoogle}
										onFailure={responseGoogle}
									>
										<span className='LoginGoogleLoginButtonText'>
											{' '}
											Sign up with Google
										</span>
									</GoogleLogin>
								</div>
							</div> */}

							<Label className='LabelCustomizer'>COMPANY NAME*</Label>
							<Input
								className='LoginFormGroupCustomize'
								type='text'
								invalid={comerror}
								name='company_name'
								id='company_name'
								onChange={onSubmit}
								placeholder='Your Company Name'
							/>
							{comerror ||
							props.message.error ===
								'"company_name" is not allowed to be empty' ? (
								<FormFeedback invalid className='ErrorTextMessage'>
									Company name is required
								</FormFeedback>
							) : props.message.error && switcherror ? (
								<text className='ErrorTextMessage'>
									{props.message.company}
								</text>
							) : null}
							{/* {firsterror && (
								<FormFeedback invalid className='ErrorTextMessage'>
									Company name is required
								</FormFeedback>
							)} */}
							<Row form>
								<Col md={6}>
									<FormGroup>
										<Label className='LabelCustomizer'>FIRST NAME*</Label>
										<Input
											className='LoginFormGroupCustomize'
											type='text'
											invalid={firsterror}
											name='first_name'
											id='exampleEmail'
											onChange={onSubmit}
											placeholder='Your First Name'
										/>
										{firsterror && (
											<FormFeedback invalid className='ErrorTextMessage'>
												First name is required
											</FormFeedback>
										)}
									</FormGroup>
								</Col>
								<Col md={6}>
									<FormGroup>
										<Label className='LabelCustomizer'>LAST NAME*</Label>
										<Input
											className='LoginFormGroupCustomize'
											type='text'
											invalid={laserror}
											name='last_name'
											onChange={onSubmit}
											id='examplePassword'
											placeholder='Your Last Name'
										/>
										{laserror && (
											<FormFeedback invalid className='ErrorTextMessage'>
												Last name required
											</FormFeedback>
										)}
									</FormGroup>
								</Col>
							</Row>
							<FormGroup>
								<Label className='LabelCustomizer'>EMAIL*</Label>
								<Input
									className='LoginFormGroupCustomize'
									type='email'
									name='email'
									invalid={error}
									onChange={onSubmit}
									id='companyemail'
									placeholder='Your Email'
								/>
								{error ||
								props.message.email === '"email" is not allowed to be empty' ? (
									<FormFeedback invalid className='ErrorTextMessage'>
										Email is required
									</FormFeedback>
								) : props.message.email && switcherror ? (
									<text className='ErrorTextMessage'>
										{props.message.email}
									</text>
								) : null}
							</FormGroup>
							<FormGroup>
								<Label className='LabelCustomizer'>PASSWORD*</Label>
								<Input
									className='LoginFormGroupCustomize'
									type='password'
									name='password'
									invalid={passerror}
									onChange={onSubmit}
									id='examplepassword'
									placeholder='Your Password'
								/>
								{passerror ||
								props.message.password ===
									'"password" is not allowed to be empty' ? (
									<FormFeedback invalid className='ErrorTextMessage'>
										Password is required
									</FormFeedback>
								) : props.message.password && switcherror ? (
									<text className='ErrorTextMessage'>
										{props.message.password}
									</text>
								) : null}
							</FormGroup>
						</FormGroup>
					) : (
						<FormGroup className='CustomizeCompanyNameWidth'>
							<div className='SignUpPageButtonContainers'>
								<div className='GoogleButtonContainer'>
									<GoogleLogin
										className='LoginGoogleLoginButton'
										style={{ fontSize: 30, width: 70 }}
										clientId='737555203672-4n453vuqglt2lv26ce5fn2mgkpta51at.apps.googleusercontent.com'
										onSuccess={responseGoogle}
										onFailure={responseGoogle}
									>
										<span className='LoginGoogleLoginButtonText'>
											{' '}
											Sign up with Google
										</span>
									</GoogleLogin>
									{props.googleerror && (
										<span className='ErrorTextMessage'>
											{props.googleerror}
										</span>
									)}
								</div>
							</div>
							<div className='LoginDivideLine'>
								<div className='LoginLeftHalfDivider'></div>
								<text className='LoginDividerText'>OR</text>
								<div className='LoginRightHalfDivider'></div>
							</div>
							<Row form>
								<Col md={6}>
									<FormGroup>
										<Label className='LabelCustomizer'>FIRST NAME*</Label>
										<Input
											className='LoginFormGroupCustomize'
											type='text'
											invalid={firsterror}
											name='first_name'
											id='exampleFirstName'
											onChange={onSubmit}
											placeholder='Your First Name'
										/>
										{firsterror && (
											<FormFeedback invalid className='ErrorTextMessage'>
												First name is required
											</FormFeedback>
										)}
									</FormGroup>
								</Col>
								<Col md={6}>
									<FormGroup>
										<Label className='LabelCustomizer'>LAST NAME*</Label>
										<Input
											className='LoginFormGroupCustomize'
											type='text'
											invalid={laserror}
											name='last_name'
											onChange={onSubmit}
											id='exampleLastName'
											placeholder='Your Last Name'
										/>
										{laserror && (
											<FormFeedback invalid className='ErrorTextMessage'>
												Last name required
											</FormFeedback>
										)}
									</FormGroup>
								</Col>
							</Row>

							<FormGroup>
								<Label className='LabelCustomizer'>EMAIL*</Label>
								<Input
									className='LoginFormGroupCustomize'
									type='email'
									name='email'
									invalid={error}
									onChange={onSubmit}
									id='exampleCompanyEmail'
									placeholder='Your Email'
								/>
								{error ||
								props.message.email === '"email" is not allowed to be empty' ? (
									<FormFeedback invalid className='ErrorTextMessage'>
										Email is required
									</FormFeedback>
								) : props.message.email && switcherror ? (
									<text className='ErrorTextMessage'>
										{props.message.email}
									</text>
								) : null}
							</FormGroup>
							<FormGroup className='ForErrrorPasswordForm'>
								<Label className='LabelCustomizer'>PASSWORD*</Label>
								<Input
									className='LoginFormGroupCustomize'
									type='password'
									name='password'
									id='exampleCompanyPassword'
									invalid={passerror}
									onChange={onSubmit}
									placeholder='Your Password'
								/>
								{(passerror && passerror) ||
								props.message.password ===
									'"password" is not allowed to be empty' ? (
									<FormFeedback invalid className='ErrorTextMessage'>
										Password is required
									</FormFeedback>
								) : props.message.password && switcherror ? (
									<text className='ErrorTextMessage'>
										{props.message.password}
									</text>
								) : null}
							</FormGroup>
						</FormGroup>
					)}

					<FormGroup check className='LoginChecBoxContainer'>
						<Label className='CustomCheckBox' check>
							<Input
								className='LoginCheckBoxCustomize'
								type='checkbox'
								onChange={onChecked}
							/>
							<span className='checkmark'></span>
							<p className='CheckBoxText'>
								By creating a new account you agree
								<br />
								to the <span className='CheckBoxText_blue'> terms of use</span>
							</p>
						</Label>
					</FormGroup>
					<div className='CreateProfileContainer'>
						<FormGroup className='logInBtn'>
							<ButtonComponent
								disabled={!show}
								clickHandler={onClickSignup}
								buttonTitle='Create Profile'
								color='primary'
								height={50}
							/>
						</FormGroup>
						<FormGroup className='loginOptions'>
							<div>
								<text>Already have an account ?</text>

								<Link to='/login'>
									<text> Log In</text>
								</Link>
							</div>
						</FormGroup>
					</div>
				</Form>
			</div>
		</div>
	)
}
const mapStateToProps = (state: any) => ({
	signupdata: state.loginReducer.signup,
	message: state.loginReducer.signerror,
	signin: state.loginReducer.signin,
	googlein: state.loginReducer.googledata,
	visible: state.loginReducer.visible,
	googleerror: state.loginReducer.googleerror,
})
export default connect(mapStateToProps, { signupAction, googleLoginAction })(
	SignupPage
)
