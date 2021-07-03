import React from 'react'

import './toggleBox.css'

interface Props {
	label: string
	checked: any
	name: string
	value: any
	placeholder: string
	onChange: (event: any) => void
}

const ToggleBox: React.FC<Props> = (props: Props) => {
	const { label, checked, name, value, placeholder, onChange } = props

	let clickHandler: any = null

	return (
		<div className='EmployerToggleBox'>
			<div
				className='EmployerToggleBox__Input'
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
				<span
					className={`EmployerToggleBox__Input--Switch ${
						checked ? 'EmployerToggleBox__Input--Switch--Active' : ''
					}`}
				></span>
			</div>
		</div>
	)
}

export default ToggleBox
