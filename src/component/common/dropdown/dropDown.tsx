import React, { useState } from 'react'
import IconImage from '../../../assets/images/icons/search.png'
import './dropDown.css'

interface Props {
	options?: string
}

const DropDown: React.FC<Props> = (props: Props) => {
	const [dropdownOpen, setDropdownOpen] = useState(false)

	const toggle = () => setDropdownOpen((prevState) => !prevState)

	return (
		<div className='custom-select' style={{ width: '200px' }}>
			<select title='Select your spell' className='selectpicker'>
				<option>Select...</option>
				<option data-icon='../../../assets/images/icons'>Eye of Medusa</option>
				<option data-icon='glyphicon glyphicon-fire'>Rain of Fire</option>
				<option data-thumbnail='../../../assets/images/icons/searchBlue.png'>
					Chrome
				</option>
			</select>
		</div>
	)
}

export default DropDown
