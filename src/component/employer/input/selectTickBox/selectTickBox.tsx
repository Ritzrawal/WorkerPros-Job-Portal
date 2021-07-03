import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'

import './selectTickBox.css'

interface Props {
	label: string
	checked: any
	name: string
	value: any
	placeholder: string
	onChange: (event: any) => void
}

const SelectTickBox: React.FC<any> = (props: any) => {
	const { label, checked, name, value, placeholder, onChange } = props

	let clickHandler: any = null

	return (
		<div className='EmployerSelectTickBox'>
			<div
				className={`EmployerSelectTickBox__Input ${
					checked ? 'EmployerSelectTickBox__Input--Active' : ''
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
				{checked ? (
					<FontAwesomeIcon icon={faCheck} />
				) : (
					<FontAwesomeIcon icon={faPlus} />
				)}
				<label>{label}</label>
			</div>
		</div>
	)
}

export default SelectTickBox
