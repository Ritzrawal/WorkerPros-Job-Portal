import React, { useState, useEffect } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { NavbarBrand } from 'reactstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

import {
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Dropdown,
} from 'reactstrap'

interface Props {
	profileinfo: {
		company_name: string
		profile_image: string
		first_name: string
		last_name: string
		user: {
			email: string
		}
	}
}

// import './navbar.css'

const Navbar: React.FC<any> = (props: Props) => {
	const history = useHistory()
	const [dropDownOpen, setDropDownOpen] = useState(false)

	const handleLogOut = () => {
		localStorage.clear()
		history.push('/admin/login')
	}

	// useEffect(() => {
	// 	props.profileAllInfoAction
	// }, [])

	return (
		<div className='EmployerNavbar'>
			<NavbarBrand href='/'>
				<text className='HomebarTextComponent'>WorkerPros</text>
			</NavbarBrand>
			<div className='EmployerNavbar__Search'>
				<div className='EmployerNavbar__Search--Container'>
					<FontAwesomeIcon icon={faSearch} />
					<input type='text' name='search' placeholder='Search...' />
				</div>
			</div>
			<div className='EmployerNavbar__RightMenu'>
				<div className='EmployerNavbar__RightMenu--UserDetail'>
					<Dropdown
						isOpen={dropDownOpen}
						toggle={() => setDropDownOpen(!dropDownOpen)}
						style={{ paddingTop: '5px' }}
					>
						<DropdownToggle> Markel J.</DropdownToggle>
						<DropdownMenu>
							<Link
								style={{ textDecoration: 'none', padding: '0px' }}
								to='/logout'
							>
								<DropdownItem onClick={handleLogOut} className='logoutDropDown'>
									Log Out
								</DropdownItem>
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
	profileinfo: state.profileReducer.profileinfo,
})

export default connect(mapStateToProps)(ShowTheLocationWithRouter)
