/* eslint-disable react/prop-types */
import colors from '../../../utils/color'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap'
import './button.css'
interface Props {
	buttonTitle?: string
	width?: number
	padding?: string
	height?: number
	font?: number
	disabled?: boolean
	iconColor?: string
	faIcon?: any
	buttonYear?: string
	color?: string
	marginRight?: number
	paddingLeft?: number
	paddingRight?: number
	backgroundColor?: string
	fontColor?: string
	borderColor?: string
	clickHandler?: (e: any) => void
}
const ButtonComponent: React.FC<Props> = ({
	buttonTitle,
	width,
	height,
	clickHandler,
	backgroundColor,
	borderColor,
	disabled,
	font,
}) => {
	return (
		<div>
			<Button
				disabled={disabled}
				onClick={clickHandler}
				block
				style={{
					width: width,
					height: height,
					borderRadius: 50,
					backgroundColor: backgroundColor ? backgroundColor : '#2EC2E2',
					border: `1px solid ${borderColor ? borderColor : '#2EC2E2'}`,
					fontWeight: 700,
				}}
			>
				{buttonTitle}
			</Button>
		</div>
	)
}
const ButtonWhite: React.FC<Props> = ({
	buttonTitle,
	width,
	height,
	clickHandler,
}) => {
	return (
		<div>
			<Button
				onClick={clickHandler}
				block
				style={{
					width: width,
					height: height,
					color: '#234476',

					borderRadius: 50,
					backgroundColor: '#FFFFFF',
					fontWeight: 700,
				}}
			>
				{buttonTitle}
			</Button>
		</div>
	)
}
const ButtonWithCustyomeStyling: React.FC<Props> = ({
	buttonTitle,
	width,
	height,
	color,
	clickHandler,
	backgroundColor,
	borderColor,
	paddingLeft,
	paddingRight,
	marginRight,
	padding,
}) => {
	return (
		<div className='ButtonCUstomizeonFocus'>
			<button
				style={{
					color: color,
					border: '2px solid',
					paddingLeft: paddingLeft,
					height: height,
					paddingRight: paddingRight,
					borderColor: borderColor,
					marginRight: marginRight,
					textTransform: 'capitalize',
					borderRadius: 50,
					backgroundColor: backgroundColor,
					fontWeight: 700,
				}}
				onClick={clickHandler}
			>
				<span className='ButtonTextCUstomeStyling'>{buttonTitle}</span>
			</button>
		</div>
	)
}
const ButtonWithCusmWithLogo: React.FC<Props> = ({
	buttonTitle,
	width,
	height,
	color,
	backgroundColor,
	borderColor,
	marginRight,
	padding,
	iconColor,
	buttonYear,
	faIcon,
}) => {
	return (
		<div>
			<Button
				block
				style={{
					width: width,
					height: height,
					color: color,
					border: '2px solid',
					borderColor: borderColor,
					marginRight: marginRight,
					textTransform: 'capitalize',
					borderRadius: 50,

					backgroundColor: backgroundColor,
					fontWeight: 700,
				}}
			>
				{faIcon && <FontAwesomeIcon icon={faIcon} color={iconColor} />}

				<span className='ButtonTextCUstomeStyling'> {buttonTitle} </span>
				{buttonYear && (
					<span className='ButtonTextCustomeStylingYear'>
						- {buttonYear} years
					</span>
				)}
			</Button>
		</div>
	)
}
const ButtonCustom: React.FC<Props> = ({
	buttonTitle,
	width,
	height,
	color,
	fontColor,
}) => {
	return (
		<div>
			<Button
				style={{ width: width, borderColor: color }}
				className='CustomizeButton'
			>
				<span className='customButtontext' style={{ color: fontColor }}>
					{' '}
					{buttonTitle}
				</span>
			</Button>
		</div>
	)
}
export {
	ButtonComponent,
	ButtonWhite,
	ButtonCustom,
	ButtonWithCustyomeStyling,
	ButtonWithCusmWithLogo,
}
export default ButtonComponent
