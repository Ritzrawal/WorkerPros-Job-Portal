import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons'

import './radioBox.css'

interface Props {
	label: string
	checked: any
	name: string
	value: string
	placeholder: string
	onChange: (event: any) => void
}

const RadioBox: React.FC<Props> = (props: Props) => {
	const { label, checked, name, value, placeholder, onChange } = props

	let clickHandler: any = null

	return (
		<div className='EmployerRadioBox'>
			<div
				className={`EmployerRadioBox__Input ${
					checked ? 'EmployerRadioBox__Input--Active' : ''
				}`}
				onClick={() => clickHandler.click()}
			>
				<input
					type='radio'
					name={name}
					value={value}
					checked={checked}
					onChange={onChange}
					ref={(input) => {
						clickHandler = input
					}}
				/>
				{checked ? (
					<FontAwesomeIcon icon={faDotCircle} />
				) : (
					<FontAwesomeIcon icon={faCircle} />
				)}
				<label>{label}</label>
			</div>
		</div>
	)
}

export default RadioBox
