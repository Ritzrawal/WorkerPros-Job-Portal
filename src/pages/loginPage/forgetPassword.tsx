/* eslint-disable react/prop-types */
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
import FontAwesome from 'react-fontawesome'
import { History } from 'history'
import { connect } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { ButtonComponent, SwitchButtonComponent } from '../../component'
import {
	forgetPasswordAction,
	changePasswordAction,
} from '../../store/action/loginAction'

import './loginPage.css'
import '../../styles/responsive.css'
// import { title } from 'process'
// import colors from '../../utils/color'
interface Props {
	title?: string
	buttonTitle?: string
	passrror: any
	query: string
	newpassrror: string
	sucessmessage: string
	newmessage: string
	history: History
	// location: {
	// 	search: string
	// }

	forgetPasswordAction: (email: string) => void
	changePasswordAction: (token: string, resetpassword: string) => void
}

const ForgetPassword: React.FC<Props> = (props) => {
	const [error, serError] = useState(false)
	const [emailerror, setEmailError] = useState(false)
	const [form, setState] = useState({
		email: '',
	})
	const [passwordreset, setPassword] = useState({
		newpassword: '',
		resetpassword: '',
	})
	useEffect(() => {
		{
			props.newmessage && props.history.push('/login')
		}
	}, [props.newmessage])
	//get the token from Url browser url
	let location = useLocation()

	let query = new URLSearchParams(location.search) || ''
	let token: string = query.get('Authorization') || ''
	const onClickLogin = () => {
		form.email.trim().length === 0
			? setEmailError(true)
			: (setEmailError(false), props.forgetPasswordAction(form.email))
	}

	const onClickLoginReset = () => {
		console.log('error', error)
		if (
			passwordreset.newpassword === passwordreset.resetpassword &&
			passwordreset.resetpassword.trim().length !== 0
		) {
			props.changePasswordAction(token, passwordreset.resetpassword)
			serError(false)
		} else {
			setEmailError(true)
			serError(true)
		}
	}
	const onSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log('hekllo data ', e.target.value)
		e.preventDefault()
		setState({
			...form,
			[e.target.name]: e.target.value,
		})
	}
	const onSubmitPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log('hekllo data ', e.target.value)
		e.preventDefault()
		setPassword({
			...passwordreset,
			[e.target.name]: e.target.value,
		})
	}
	const className = props.passrror.email
		? 'ErrorTextMessage'
		: 'SucessTextMessage'
	return (
		<div className='LoginMainContainer'>
			<div className='MainContainer'>
				{!token ? (
					<Form className='LoginInnerMainContainer'>
						<div className='ButtonContainer'>
							<div className='TitleTextConatiner'>
								<Link style={{ textDecoration: 'none' }} to='/'>
									<text className='LoginTitleText'>WorkerPros</text>
								</Link>
							</div>
							{/* <div className='SignupLoginText'> */}
							<div className='LoginPasswordTextComponent'>
								<text className='LoginSignUpText'>Password Reset</text>
							</div>
						</div>
						<FormGroup>
							<Label className='LabelCustomizer'>EMAIL ADDRESS*</Label>
							<Input
								className='LoginFormGroupCustomize'
								type='email'
								name='email'
								onChange={onSubmit}
								invalid={emailerror}
								value={form.email}
								id='email'
								placeholder='Email address'
							/>
							{emailerror ? (
								<FormFeedback invalid className='ErrorTextMessage'>
									Email is required
								</FormFeedback>
							) : props.passrror ? (
								<text className={className}>
									{props.passrror.email || props.passrror}
								</text>
							) : (
								<text className={className}>
									{props.passrror.email || props.passrror}
								</text>
							)}
							{/* {emailerror && (
								<FormFeedback invalid className='ErrorTextMessage'>
									Email is required
								</FormFeedback>
							)}
							{props.passrror && (
								<text className='SucessTextMessage'>{props.passrror}</text>
							)} */}
						</FormGroup>
						<div className='CreateProfileContainer'>
							<FormGroup className='logInBtn'>
								<ButtonComponent
									clickHandler={onClickLogin}
									buttonTitle='Confirm'
									color='primary'
									height={50}
								/>
							</FormGroup>
						</div>
					</Form>
				) : (
					<Form className='LoginInnerMainContainer'>
						<div className='ButtonContainer'>
							<div className='TitleTextConatiner'>
								<text className='LoginTitleText'>WorkerPros</text>
							</div>
							{/* <div className='SignupLoginText'> */}
							<div className='LoginPasswordTextComponent'>
								<text className='LoginSignUpText'>Password Reset</text>
							</div>
						</div>

						<FormGroup>
							<Label className='LabelCustomizer'>NEW PASSWORD*</Label>
							<Input
								className='LoginFormGroupCustomize'
								type='password'
								name='newpassword'
								invalid={error}
								onChange={onSubmitPassword}
								value={passwordreset.newpassword}
								placeholder='New Password'
								id='newpassword'
							/>
						</FormGroup>
						<FormGroup>
							<Label className='LabelCustomizer'>CONFIRM PASSWORD*</Label>
							<Input
								className='LoginFormGroupCustomize'
								type='password'
								name='resetpassword'
								invalid={error}
								onChange={onSubmitPassword}
								value={passwordreset.resetpassword}
								id='resetpassword'
								placeholder='Confirm Password'
							/>
							{(error && passwordreset.resetpassword.trim().length === 0) ||
							passwordreset.newpassword.trim().length === 0 ? (
								<FormFeedback invalid className='ErrorTextMessage'>
									Please fill out all the field
								</FormFeedback>
							) : error ? (
								<FormFeedback invalid className='ErrorTextMessage'>
									New password and confirm password does not match!
								</FormFeedback>
							) : props.sucessmessage ? (
								<text className='ErrorTextMessage'>{props.sucessmessage}</text>
							) : (
								<text className='ErrorTextMessage'>{props.sucessmessage}</text>
							)}
							{props.newmessage && (
								<text className='SucessTextMessage'>{props.newmessage}</text>
							)}
						</FormGroup>
						<div className='CreateProfileContainer'>
							<FormGroup className='logInBtn'>
								<ButtonComponent
									clickHandler={onClickLoginReset}
									buttonTitle='Confirm'
									color='primary'
									height={50}
								/>
							</FormGroup>
						</div>
					</Form>
				)}

				{/* </div> */}
			</div>
			<div className='LoginRightHalfContainer'>
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
				{/* <img src={signupImage}></img> */}
			</div>
		</div>
	)
}
const mapStateToProps = (state: any) => ({
	passrror: state.loginReducer.passrror,
	newpassrror: state.loginReducer.newmessage,
	sucessmessage: state.loginReducer.sucessmessage.password,
	newmessage: state.loginReducer.newmessage,
})
export default connect(mapStateToProps, {
	forgetPasswordAction,
	changePasswordAction,
})(ForgetPassword)
