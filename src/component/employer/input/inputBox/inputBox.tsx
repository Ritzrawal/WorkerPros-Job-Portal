import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './inputBox.css'

interface Props {
	labelSize?: string
	labelColor?: string
	internalPadding?: string
	border?: string
	leftIcon?: any
	leftIconColor?: string
	rightIcon?: any
	rightText?: string
	rightImage?: any
	error: boolean
	label: string
	type: string
	name: string
	value: string
	placeholder: string
	onChange: (event: any) => void
}

const InputBox: React.FC<Props> = (props: Props) => {
	const {
		labelSize,
		labelColor,
		internalPadding,
		border,
		leftIcon,
		leftIconColor,
		rightIcon,
		rightText,
		rightImage,
		error,
		label,
		type,
		name,
		value,
		placeholder,
		onChange,
	} = props

	return (
		<div className='EmployerInputBox'>
			<div className='EmployerInputBox__Title'>
				{label && (
					<div
						className='EmployerInputBox__Title--Label'
						style={{
							fontSize: labelSize ? labelSize : '18px',
							color: labelColor ? labelColor : '#162a49',
						}}
					>
						{label}
					</div>
				)}
				{error && (
					<div className='EmployerInputBox__Title--Error'>
						{value ? 'Invalid' : 'Required'}
					</div>
				)}
			</div>
			<div
				className={`EmployerInputBox__Box ${error ? 'Error' : ''}`}
				style={{
					padding: internalPadding ? internalPadding : '15px',
					border: border ? border : '2px solid #c7d0de',
				}}
			>
				{leftIcon && (
					<div className='EmployerInputBox__Box--LeftIcon'>
						<FontAwesomeIcon
							icon={leftIcon}
							color={leftIconColor ? leftIconColor : ''}
						/>
					</div>
				)}
				<div className='EmployerInputBox__Box--Input'>
					<input
						type={type}
						name={name}
						value={value}
						placeholder={placeholder}
						onChange={onChange}
						autoComplete={'off'}
					/>
				</div>
				{rightIcon && (
					<div className='EmployerInputBox__Box--RightIcon'>
						<FontAwesomeIcon icon={rightIcon} />
					</div>
				)}
				{rightImage && (
					<div className='EmployerInputBox__Box--RightIcon'>
						<img src={rightImage} />
					</div>
				)}
				{rightText && (
					<div className='EmployerInputBox__Box--RightText'>{rightText}</div>
				)}
			</div>
		</div>
	)
}

export default InputBox
