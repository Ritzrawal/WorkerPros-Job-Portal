import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import './selectCrossBox.css'

interface Props {
	label: string
	checked: any
	name: string
	value: any
	placeholder: string
	onChange: (event: any) => void
}

const SelectCrossBox: React.FC<any> = (props: any) => {
	const { label, checked, name, value, placeholder, onChange } = props

	let clickHandler: any = null

	return (
		<div className='EmployerSelectCrossBox'>
			<div
				className={`EmployerSelectCrossBox__Input ${
					checked ? 'EmployerSelectCrossBox__Input--Active' : ''
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
				{checked ? <FontAwesomeIcon icon={faTimes} /> : null}
			</div>
		</div>
	)
}

export default SelectCrossBox
