import React, { useState, useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faBell } from '@fortawesome/free-solid-svg-icons'
import { employerProfileDetailAction } from '../../../store/action/employerProfileAction'
import { connect } from 'react-redux'

import {
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Dropdown,
} from 'reactstrap'

import { employerSearchAction } from '../../../store/action/search'

import SearchBox from './searchBox/searchBox'

interface Props {
	employerProfileDetail: any
	employerProfileDetailAction: () => void
	employerSearchAction: (params: any) => void
	employerSearch: any
}

import './navbar.css'

const Navbar: React.FC<any> = (props: Props) => {
	const {
		employerProfileDetail,
		employerProfileDetailAction,
		employerSearchAction,
		employerSearch,
	} = props

	const [dropDownOpen, setDropDownOpen] = useState(false)
	const [search, setSearch] = useState('')

	useEffect(() => {
		employerProfileDetailAction()
	}, [])

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
		debounce(() => employerSearchAction(value))
	}

	console.log({ employerProfileDetail })

	return (
		<div className='EmployerNavbar'>
			<div className='EmployerNavbar__Logo'>
				<Link to={'/employer/dashboard'}>WorkerPros</Link>
			</div>
			<div className='EmployerNavbar__Search'>
				<div className='EmployerNavbar__Search--Container'>
					<FontAwesomeIcon icon={faSearch} />
					<input
						type='text'
						name='search'
						value={search}
						placeholder='Search...'
						onChange={updateSearch}
						autoComplete={'off'}
					/>
					{search !== '' ? (
						<div className='EmployerNavbar__Search--Container--SearchBox'>
							<SearchBox employerSearch={employerSearch} />
						</div>
					) : null}
				</div>
			</div>
			<div className='EmployerNavbar__RightMenu'>
				<div className='EmployerNavbar__RightMenu--PostJob'>
					<Link to={'/employer/post-job'}>
						<FontAwesomeIcon icon={faPlus} />
						Post New Job
					</Link>
				</div>
				<div className='EmployerNavbar__RightMenu--NotificationIcon'>
					<FontAwesomeIcon icon={faBell} />
				</div>
				<div className='EmployerNavbar__RightMenu--UserDetail'>
					<div className='EmployerNavbar__RightMenu--UserDetail--Image'>
						<img
							src={
								employerProfileDetail.data
									? employerProfileDetail.data.user.profile_image
										? `${process.env.REACT_APP_IMAGE_URL}${employerProfileDetail.data.user.profile_image}`
										: 'https://via.placeholder.com/15'
									: 'https://via.placeholder.com/15'
							}
						/>
					</div>

					<Dropdown
						isOpen={dropDownOpen}
						toggle={() => setDropDownOpen(!dropDownOpen)}
						style={{ paddingTop: '5px' }}
					>
						<DropdownToggle>
							{employerProfileDetail.data &&
								employerProfileDetail.data.user.first_name}
						</DropdownToggle>
						<DropdownMenu>
							<Link
								style={{ textDecoration: 'none', padding: '0px' }}
								to='/employer/update-company-profile'
							>
								<DropdownItem className='logoutDropDown'>
									Edit Profile
								</DropdownItem>
							</Link>
							<Link
								style={{ textDecoration: 'none', padding: '0px' }}
								to='/logout'
							>
								<DropdownItem className='logoutDropDown'>Log Out</DropdownItem>
							</Link>
						</DropdownMenu>
					</Dropdown>
				</div>
			</div>
		</div>
	)
}

const ShowTheLocationWithRouter = withRouter(Navbar)

const mapStateToProps = (state: any) => ({
	employerProfileDetail: state.employerProfileReducer.detail,
	employerSearch: state.searchReducer.employer,
})

const actions = {
	employerProfileDetailAction,
	employerSearchAction,
}

export default connect(mapStateToProps, actions)(ShowTheLocationWithRouter)
