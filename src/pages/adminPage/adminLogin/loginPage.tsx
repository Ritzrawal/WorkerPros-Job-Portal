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
} from '../../../store/action/loginAction'
import { adminLoginAction } from '../../../store/action/adminAction'
import { ButtonComponent } from '../../../component'
import './adminlogin.css'
interface Props {
	title?: string
	history: History
	message: {
		email: string
		password: any
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
	adminLoginAction: (email: any) => void

	// googleSignInAction: (profile_id: string) => void
}

const AdminLoginPage: React.FC<Props> = (props) => {
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
		console.log('logindata', props.logindata)
		const role = localStorage.getItem('role')
		if (localStorage.getItem('token') && role) {
			if (role === 'super-admin') {
				props.history.push('/admin/dashboard')
			}
		} else {
			props.history.push('/admin/login')
		}
	}, [props.logindata])

	const onClickLogin = () => {
		onEmailError()
		{
			form.email.trim().length === 0
				? serError(true)
				: (serError(false), setClearEmail(true), props.adminLoginAction(form))
		}
	}
	const onEmailError = () => {
		form.password.trim().length === 0
			? serPasError(true)
			: (serPasError(false), setClear(true))
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
		<div className='AdminLoginMainContainer'>
			<div className='AdminMainContainerLogin'>
				<Form className='AdminLoginInnerMainContainer'>
					<div className='AdminLoginTextCustomize'>Admin LogIn</div>
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

						{error ? (
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
						{passerror ? (
							<FormFeedback invalid className='ErrorTextMessage'>
								Password is required
							</FormFeedback>
						) : props.message?.password && clear ? (
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
			</div>
		</div>
	)
}
const mapStateToProps = (state: any) => ({
	logindata: state.adminReducer.login.data,
	message: state.adminReducer.login.error,
})
export default connect(mapStateToProps, {
	adminLoginAction,
	googleLoginAction,
})(AdminLoginPage)
