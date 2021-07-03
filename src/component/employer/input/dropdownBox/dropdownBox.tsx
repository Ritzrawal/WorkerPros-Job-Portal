import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import renderHTML from 'react-render-html'

import './dropdownBox.css'

interface Props {
	custom?: boolean
	internalPadding?: string
	leftIcon?: any
	rightIcon?: any
	error: boolean
	label: string
	option: any
	name: string
	value: string
	placeholder: string
	onChange: (event: any) => void
}

const DropdownBox: React.FC<Props> = (props: Props) => {
	const {
		custom,
		internalPadding,
		leftIcon,
		rightIcon,
		error,
		label,
		option,
		name,
		value,
		placeholder,
		onChange,
	} = props

	const [showDropdown, setShowDropdown] = useState(false)

	const getDropdownValueTitle = (value) => {
		if (!value) return placeholder

		const [selectedValue] = option.filter((o) => o.value === value)

		return selectedValue.title
	}

	let clickHandler: any = null

	return (
		<div className='EmployerDropdownBox'>
			{label && <div className='EmployerDropdownBox__Label'>{label}</div>}
			<div
				className={`EmployerDropdownBox__Box ${error ? 'Error' : ''}`}
				onClick={() => {
					custom ? setShowDropdown(!showDropdown) : clickHandler.focus()
				}}
			>
				{leftIcon && (
					<div
						className='EmployerDropdownBox__Box--LeftIcon'
						style={{
							top: internalPadding ? internalPadding : '12px',
						}}
					>
						<FontAwesomeIcon icon={leftIcon} />
					</div>
				)}

				{custom ? (
					<>
						<div
							className='EmployerDropdownBox__Box--CustomInput'
							style={{
								paddingTop: internalPadding ? internalPadding : '15px',
								paddingBottom: internalPadding ? internalPadding : '15px',
								paddingLeft: leftIcon
									? internalPadding
										? `${parseInt(internalPadding) + 15}px`
										: '30px'
									: internalPadding
									? internalPadding
									: '15px',
								paddingRight: internalPadding
									? `${parseInt(internalPadding) + 15}px`
									: '30px',
							}}
						>
							{renderHTML(getDropdownValueTitle(value))}
						</div>
						{showDropdown ? (
							<div
								className='EmployerDropdownBox__Box--CustomList'
								style={{
									top: `${
										internalPadding ? parseInt(internalPadding) / 2 + 40 : '58'
									}px`,
								}}
							>
								{option.map((o: any, index) => (
									<div
										key={index}
										className='EmployerDropdownBox__Box--CustomList--Option'
										onClick={() => {
											onChange({ target: { name, value: o.value } })
											setShowDropdown(!showDropdown)
										}}
									>
										{renderHTML(o.title)}
									</div>
								))}
							</div>
						) : null}
					</>
				) : (
					<div className='EmployerDropdownBox__Box--Input'>
						<select
							name={name}
							value={value ? value : ''}
							onChange={onChange}
							ref={(input) => {
								clickHandler = input
							}}
							style={{
								paddingTop: internalPadding ? internalPadding : '15px',
								paddingBottom: internalPadding ? internalPadding : '15px',
								paddingLeft: leftIcon
									? internalPadding
										? `${parseInt(internalPadding) + 15}px`
										: '30px'
									: internalPadding
									? internalPadding
									: '15px',
								paddingRight: internalPadding
									? `${parseInt(internalPadding) + 15}px`
									: '30px',
							}}
						>
							<option value={''} disabled>
								{placeholder}
							</option>
							{option.map((o: any, index) => (
								<option key={index} value={o.value}>
									{o.title}
								</option>
							))}
						</select>
					</div>
				)}
				{custom ? (
					<div
						className='EmployerDropdownBox__Box--RightIcon'
						style={{ top: internalPadding ? internalPadding : '15px' }}
					>
						<FontAwesomeIcon icon={rightIcon ? rightIcon : faAngleDown} />
					</div>
				) : null}
			</div>
		</div>
	)
}

export default DropdownBox
