import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import './selectColorBox.css'

interface Props {
	showIcon: boolean
	label: string
	checked: any
	name: string
	value: any
	placeholder: string
	onChange: (event: any) => void
}

const SelectColorBox: React.FC<any> = (props: any) => {
	const { showIcon, label, checked, name, value, placeholder, onChange } = props

	let clickHandler: any = null

	return (
		<div className='EmployerSelectColorBox'>
			<div
				className={`EmployerSelectColorBox__Input ${
					checked ? 'EmployerSelectColorBox__Input--Active' : ''
				}`}
				onClick={() => clickHandler.click()}
			>
				<input
					type='checkbox'
					name={name}
					value={value}
					checked={checked}
					onChange={onChange}
					ref={(input) => {
						clickHandler = input
					}}
				/>
				<label>{label}</label>
				{showIcon && checked ? <FontAwesomeIcon icon={faCheck} /> : null}
			</div>
		</div>
	)
}

export default SelectColorBox
