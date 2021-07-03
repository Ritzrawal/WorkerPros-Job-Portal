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
	FormFeedback,
	Col,
	Row,
} from 'reactstrap'

import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import { History } from 'history'
import {
	HashRouter as Router,
	Route,
	Redirect,
	Link,
	Switch,
	useHistory,
} from 'react-router-dom'
import {
	loginAction,
	googleLoginAction,
	switchInactive,
} from '../../store/action/loginAction'
import GoogleLogin from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonComponent, SwitchButtonComponent } from '../../component'
import './loginPage.css'
import '../../styles/responsive.css'

///defining the interfance for typescript
interface Props {
	title?: string
	history: History
	message: {
		email: string
		password: any
	}
	googlein: {
		access_token: string
		user: {
			role: string
			auth_provider: string
			new_user: string
		}
	}
	googleerror: string
	loggedin: boolean
	buttonTitle?: string
	logindata: {
		access_token: string
		user: {
			email: string
			role: string
		}
	}
	switchInactive: () => void
	loginAction: (email: string, password: any) => void
	googleLoginAction: (
		first_name: string,
		last_name: string,
		email: string,
		profile_id: string,
		profile_image: string,
		role: string
	) => void
	// googleSignInAction: (profile_id: string) => void
}

const LoginPage: React.FC<Props> = (props) => {
	const [error, serError] = useState(false)
	const [passerror, serPasError] = useState(false)
	const [clear, setClear] = useState(false)
	const [clearemail, setClearEmail] = useState(false)
	const [form, setState] = useState({
		email: '',
		password: '',
	})

	const history = useHistory()

	useEffect(() => {
		const role = localStorage.getItem('role')
		if (localStorage.getItem('token') && role) {
			if (role === 'employer') {
				props.history.push('/employer/dashboard')
			} else if (props?.googlein?.user?.new_user) {
				props.history.push('/profile/setting')
			} else {
				props.history.push('/worker-dashboard')
			}
		} else {
			props.history.push('/login')
		}
	}, [props.logindata.access_token, props.googlein.access_token])
	const onClickLogin = () => {
		onEmailError()
		{
			form.email.trim().length === 0
				? serError(true)
				: (serError(false),
				  setClearEmail(true),
				  props.loginAction(form.email, form.password))
		}
	}
	const onEmailError = () => {
		form.password.trim().length === 0
			? serPasError(true)
			: (serPasError(false),
			  setClear(true),
			  props.loginAction(form.email, form.password))
	}

	const responseGoogle = (response: any) => {
		const role = 'worker'
		const profileObj: any = response.profileObj
		// props.googleSignInAction(response.profileObj.googleId)
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
		e.preventDefault()
		setState({
			...form,
			[e.target.name]: e.target.value,
		})
	}
	const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
		if (event.key === 'Enter') {
			event.preventDefault()
			event.stopPropagation()
			onClickLogin()
		}
	}

	return (
		<div className='LoginMainContainer'>
			<div className='MainContainer'>
				<Form className='LoginInnerMainContainer'>
					<div className='LoginButtonContainer'>
						<div className='LoginTitleTextConatiner'>
							<Link style={{ textDecoration: 'none' }} to='/'>
								<text className='LoginTitleText'>WorkerPros</text>
							</Link>
						</div>
						<div className='LoginTextComponent'>
							<text className='LoginSignUpText'>Log In</text>
						</div>
						<div className='LoginGoogleButtonContainer'>
							<GoogleLogin
								className='LoginGoogleLoginButton'
								style={{ fontSize: 30, width: 70 }}
								clientId='737555203672-4n453vuqglt2lv26ce5fn2mgkpta51at.apps.googleusercontent.com'
								onSuccess={responseGoogle}
								// onFailure={responseGoogle}
							>
								<span className='LoginGoogleLoginButtonText'>
									{' '}
									Login with Google
								</span>
							</GoogleLogin>
						</div>
						{props.googleerror && (
							<span className='ErrorTextMessage'>{props.googleerror}</span>
						)}
					</div>
					<div className='LoginDivideLine'>
						<div className='LoginLeftHalfDivider'></div>
						<text className='LoginDividerText'>OR</text>
						<div className='LoginRightHalfDivider'></div>
					</div>

					<FormGroup>
						<Label className='LoginLabelCustomizer'>EMAIL*</Label>
						<Input
							className='LoginFormGroupCustomize'
							type='email'
							name='email'
							invalid={error}
							onChange={onSubmit}
							onKeyDown={onKeyDown}
							value={form.email}
							id='email'
							placeholder='Your Email'
						/>

						{error ||
						props?.message?.email === '"email" is not allowed to be empty' ? (
							<FormFeedback invalid className='ErrorTextMessage'>
								Email is required
							</FormFeedback>
						) : props?.message?.email && clearemail ? (
							<text className='ErrorTextMessage'>{props?.message?.email}</text>
						) : null}
					</FormGroup>
					<FormGroup>
						<Label className='LoginLabelCustomizer'>PASSWORD*</Label>
						<Input
							className='LoginFormGroupCustomize'
							type='password'
							name='password'
							onKeyDown={onKeyDown}
							invalid={passerror}
							value={form.password}
							onChange={onSubmit}
							id='password'
							placeholder='Your Password'
						/>
						{passerror ||
						props?.message?.password ===
							'"password" is not allowed to be empty' ? (
							<FormFeedback invalid className='ErrorTextMessage'>
								Password is required
							</FormFeedback>
						) : props?.message?.password && clear ? (
							<text className='ErrorTextMessage'>
								{props?.message?.password}
							</text>
						) : null}
						{/* {props.message.password && <text>{props.message.password}</text>} */}
					</FormGroup>
					<FormGroup check className='LoginChecBoxContainer'>
						<Label className='CustomCheckBox' check>
							<Input className='LoginCheckBoxCustomize' type='checkbox' />
							<text className='LoginCheckBoxText'>Keep me logged in</text>
							<span className='checkmark'></span>
						</Label>
					</FormGroup>
					<div className='LoginCreateProfileContainer'>
						<FormGroup className='logInBtn'>
							<ButtonComponent
								clickHandler={onClickLogin}
								buttonTitle='Log In'
								color='primary'
								height={50}
							/>
						</FormGroup>
						<div className='loginOptions'>
							<div className='signUp'>
								<text>Dont have an account? </text>
								<Link to='/signup'>
									<text onClick={() => props.switchInactive()}> Sign Up</text>
								</Link>
							</div>
							<div className='forgotPassword'>
								<Link to='/change-password'>
									<text> Forget password?</text>
								</Link>
							</div>
						</div>
					</div>
				</Form>
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
	logindata: state.loginReducer.data,
	loggedin: state.loginReducer.loggedin,
	googlein: state.loginReducer.googledata,
	message: state.loginReducer.error,
	googleerror: state.loginReducer.googleerror,
})
export default connect(mapStateToProps, {
	loginAction,
	switchInactive,
	googleLoginAction,
})(LoginPage)
