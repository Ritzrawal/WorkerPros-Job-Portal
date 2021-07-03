import React from 'react'

import './textBox.css'

interface Props {
	bottomText?: string
	error: boolean
	label: string
	name: string
	value: string
	placeholder: string
	rows: string
	onChange: (event: any) => void
}

const TextBox: React.FC<any> = (props: any) => {
	const {
		bottomText,
		error,
		label,
		name,
		value,
		placeholder,
		rows,
		onChange,
	} = props

	return (
		<div className='EmployerTextBox'>
			<div className='EmployerTextBox__Label'>{label}</div>
			<div className={`EmployerTextBox__Box ${error ? 'Error' : ''}`}>
				<div className='EmployerTextBox__Box--Input'>
					<textarea
						name={name}
						value={value}
						placeholder={placeholder}
						rows={rows}
						onChange={onChange}
					></textarea>
				</div>
				{bottomText && (
					<div className='EmployerTextBox__Box--BottomText'>{bottomText}</div>
				)}
			</div>
		</div>
	)
}

export default TextBox
