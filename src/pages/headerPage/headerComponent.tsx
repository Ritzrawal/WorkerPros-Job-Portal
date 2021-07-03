//import library and component
import React, { useState } from 'react'
//import ui library comaponent
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText,
} from 'reactstrap'
//importing the css file
import ButtonComponent from '../../component/common/buttons/buttonComponent'
import './headerComponent.css'
interface Props {
	title: string
}
const HeaderPage: React.FC<Props> = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggle = () => setIsOpen(!isOpen)

	const scrollToClass = () => {
		let FindJobs: any = document.querySelector('.find-jobs-container')
		if (FindJobs) {
			FindJobs.scrollIntoView(true)
		}
	}

	return (
		<div className='NavbarIcon'>
			<Navbar className='' dark expand='md'>
				<NavbarBrand href='/'>
					<text className='HomebarTextComponent'>WorkerPros</text>
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className='HeaderComponent mr-auto' navbar>
						<NavItem className='NavTextCustomize'>
							<NavLink href='/login'>
								<text
									// style={{ cursor: 'pointer' }}
									// onClick={scrollToClass}
									className='HeaderTextCustomize'
								>
									Find Jobs
								</text>
							</NavLink>
						</NavItem>
						<NavItem className='NavTextCustomize'>
							<NavLink href='/howitwork'>
								<text className='HeaderTextCustomize'>How It Works</text>
							</NavLink>
						</NavItem>
						<NavItem className='NavTextCustomize'>
							<NavLink href='/manageSubscription'>
								<text className='HeaderTextCustomize'>For Employers</text>
							</NavLink>
						</NavItem>
					</Nav>
					<div className='NavLoginBtn'>
						<NavLink href='/login'>
							<div className='HeaderLoginDiv'>
								<text className='LoginHeaderText'>Log in</text>
							</div>
						</NavLink>
						<NavLink href='/signup'>
							<ButtonComponent
								buttonTitle='Sign Up'
								width={135}
								height={38}
								font={15}
							/>
						</NavLink>
					</div>
				</Collapse>
			</Navbar>
		</div>
	)
}
export default HeaderPage
