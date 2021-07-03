//import library and component
import React, { useState, useEffect, useRef } from 'react'
import FontAwesome from 'react-fontawesome'

import HomeLogo from '../../assets/images/header-component/home.png'
import JobsLogo from '../../assets/images/header-component/jobs.png'
import MessagesLogo from '../../assets/images/header-component/messages.png'
import NotificationLogo from '../../assets/images/header-component/notifications.png'
import { ProfileDummyImage } from '../../component/logosAndIcons'
import { Link, withRouter, useHistory } from 'react-router-dom'
import { profileAllInfoAction } from '../../store/action/profileAction'
import { BlueSearchIcon } from '../../component/logosAndIcons'

import { connect } from 'react-redux'

import { getCandidateMessages } from '../../store/action/socialFeatureAction'

//import ui library comaponent
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	InputGroup,
	Form,
	FormGroup,
	Input,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Dropdown,
	NavbarText,
} from 'reactstrap'
//importing the css file
import ButtonComponent from '../../component/common/buttons/buttonComponent'
import './headerComponent.css'
import { profile } from 'console'
import { candidateSearchAction } from '../../store/action/search'
import SearchBox from './searchBox/searchBox'
interface Props {
	title: string
	profileinfo: {
		profile_image: string
		first_name: string
		last_name: string
		user: {
			email: string
		}
	}
	profileAllInfoAction: () => void
	getCandidateMessages: () => void
	candidateSearchAction: (params: any) => void
	candidateMessagesList: any
	match?: any
	hidenavigation?: boolean
	employerSearch: any
}

const HeaderPage2: React.FC<any> = (props: Props) => {
	const { profileinfo, candidateSearchAction, employerSearch } = props
	const [isOpen, setIsOpen] = useState(false)
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [showJobMenu, setShowJobMenu] = useState(false)
	const [jobsButtonHover, setJobsButtonChange] = useState('')
	const [search, setSearch] = useState('')
	const [single, setSingle] = useState(false)
	const [showroute] = useState(true)

	const toggle = () => setIsOpen(!isOpen)

	const toggleDropDown = () => setDropdownOpen((prevState) => !prevState)

	const handleLogOut = () => {
		// window.location.reload()
		localStorage.clear()
	}

	useEffect(() => {
		props.profileAllInfoAction()
		props.getCandidateMessages()
	}, [])

	const scrollToClass = () => {
		let FindJobs: any = document.querySelector('.find-jobs-container')
		if (FindJobs) {
			FindJobs.scrollIntoView(true)
		}
	}

	const compareMessageParams = (path: string) => {
		const currentPath = props.match.url
		let a = currentPath.includes(path)
		return a
	}

	const compareCurrentPath = (path: string) => {
		const currentPath = props.match.path
		if (currentPath === path) return true
		return false
	}

	const debounceTimer = useRef<NodeJS.Timeout>()
	const debounce = (func, timeout = 500) => {
		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current)
		}
		debounceTimer.current = setTimeout(func, timeout)
	}

	const updateSearch = (event) => {
		const { name, value } = event.target

		setSearch(value)
		debounce(() => candidateSearchAction(value))
	}

	const onProfileClick = () => {
		setSingle(true)
	}

	const getUnreadMessageCount = () => {
		let unreadMessage = 0

		if (props.candidateMessagesList && props.candidateMessagesList.length) {
			props.candidateMessagesList.forEach((m: any) => {
				if (m.total_unread) {
					unreadMessage = unreadMessage + m.total_unread
				}
			})
		}

		return unreadMessage
	}

	return (
		<div className='NavbarIcon'>
			<Navbar className='headerComponent2' dark expand='md'>
				<NavbarBrand href='/worker-dashboard'>
					<text className='HomebarTextComponent'>WorkerPros</text>
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className='HeaderComponent mr-auto' navbar>
						{props.hidenavigation ? (
							''
						) : (
							<NavItem className='NavTextCustomize'>
								<div className='headerPageSearchContainer'>
									<Input
										className='searchInputHeader'
										placeholder='Search...'
										value={search}
										onChange={updateSearch}
									></Input>
									<img className='headerPageBlueSearch' src={BlueSearchIcon} />{' '}
									{search !== '' ? (
										<div className='CandidateNavbar__Search--Container--SearchBox'>
											<SearchBox
												onClickProfile={onProfileClick}
												showroute={showroute}
												employerSearch={employerSearch}
											/>
										</div>
									) : null}
								</div>

								{/* <InputGroup className='SearchMainContainer'>
									<Input className='searchInput' placeholder='Search...' />
								</InputGroup> */}
							</NavItem>
						)}
					</Nav>
					<div className='NavLoginBtn'>
						<ul className='Header2UL'>
							{props.hidenavigation ? (
								' '
							) : (
								<>
									<Link
										className={`${
											compareCurrentPath('/worker-dashboard') ? 'active' : ''
										}`}
										style={{ textDecoration: 'none' }}
										to='/worker-dashboard'
									>
										{' '}
										<li className='header2li'>
											<img src={HomeLogo}></img>
											Home
										</li>
									</Link>

									<Link
										className={`${
											compareCurrentPath('/findjobs')
												? 'active'
												: jobsButtonHover
										}`}
										onMouseEnter={() => {
											setShowJobMenu(true)
											setJobsButtonChange('headerJobsHover')
										}}
										// onMouseLeave={() => setShowJobMenu(false)}
										style={{ textDecoration: 'none' }}
										to='/findJobs'
									>
										<li className='header2li'>
											<img src={JobsLogo}></img>
											Jobs
										</li>
									</Link>

									<Link
										className={`${
											compareMessageParams('/messages') ? 'active' : ''
										}`}
										style={{ textDecoration: 'none' }}
										to='/messages'
									>
										<li className='header2li message-container'>
											<img src={MessagesLogo}></img>
											Messages<span>{getUnreadMessageCount()}</span>
										</li>
									</Link>

									<Link
										className={`${
											compareCurrentPath('/invitation-page') ? 'active' : ''
										}`}
										style={{ textDecoration: 'none' }}
										to='/invitation-page'
									>
										<li className='header2li'>
											<img src={NotificationLogo}></img>
											Notifications
										</li>
									</Link>
								</>
							)}

							<Dropdown isOpen={dropdownOpen} toggle={toggleDropDown}>
								<DropdownToggle>
									{' '}
									<li className='header2li'>
										<img
											style={{
												width: '28px',
												height: '28px',
												borderRadius: '50px',
											}}
											src={
												profileinfo && profileinfo.profile_image
													? `${process.env.REACT_APP_IMAGE_URL}${profileinfo.profile_image}`
													: ProfileDummyImage
											}
										></img>
										{profileinfo && profileinfo.first_name
											? profileinfo.first_name.length < 7
												? profileinfo.first_name
												: profileinfo.first_name.slice(0, 7)
											: 'Profile'}
									</li>
								</DropdownToggle>
								<DropdownMenu>
									{/* <DropdownItem header>Header</DropdownItem> */}
									{/* <DropdownItem>Some Action</DropdownItem> */}
									<Link
										style={{ textDecoration: 'none', padding: '0px' }}
										to='/display/profile'
									>
										<DropdownItem>View My Profile</DropdownItem>
									</Link>
									<Link
										style={{ textDecoration: 'none', padding: '0px' }}
										to='/profile/setting'
									>
										<DropdownItem>Edit My Profile</DropdownItem>
									</Link>
									<Link
										style={{ textDecoration: 'none', padding: '0px' }}
										to='/logout'
									>
										<DropdownItem
											onClick={handleLogOut}
											className='logoutDropDown'
										>
											Log Out
										</DropdownItem>
									</Link>
								</DropdownMenu>
							</Dropdown>
						</ul>
					</div>
				</Collapse>
			</Navbar>
			{showJobMenu && (
				<div
					onMouseEnter={() => setShowJobMenu(true)}
					onMouseLeave={() => {
						setJobsButtonChange('')
						setShowJobMenu(false)
					}}
					className='subHeader'
				>
					<ul className='subHeaderUL'>
						<Link to='/findJobs'>
							<li>Search Jobs</li>
						</Link>

						<Link style={{ textDecoration: 'none' }} to='/saved-jobs'>
							<li>Saved Jobs</li>
						</Link>
						<Link style={{ textDecoration: 'none' }} to='/findcompanies'>
							<li>Search Companies</li>
						</Link>

						<li>Saved Companies</li>
						<Link style={{ textDecoration: 'none' }} to='/application-status'>
							<li>Applications</li>
						</Link>

						<li>Interviews</li>
					</ul>
				</div>
			)}
		</div>
	)
}

const ShowTheLocationWithRouter = withRouter(HeaderPage2)

const mapStateToProps = (state: any) => ({
	profileinfo: state.profileReducer.profileinfo,
	candidateMessagesList: state.socialFeatureReducer.candidateMessagesList.data,
	employerSearch: state.searchReducer.employer,
})

const actions = {
	profileAllInfoAction,
	getCandidateMessages,
	candidateSearchAction,
}

export default connect(mapStateToProps, actions)(ShowTheLocationWithRouter)
