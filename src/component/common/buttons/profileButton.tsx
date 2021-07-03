import React, { useState } from 'react'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import './button.css'
interface Props {
	title: string
	onClick: any
	value: string
	className: any
}
interface PropsAdd {
	title: string
	icon?: any
	onClick: any
}

const CustomButton: React.FC<PropsAdd> = (
	props: PropsAdd
): React.ReactElement => {
	return (
		<Button className='ProfileButtonCustomize' onClick={props.onClick}>
			<FontAwesomeIcon
				icon={props.icon}
				size='lg'
				className='ProfileLogoCustomize'
			/>
			<text className='ProfileButtonText'>{props.title}</text>
		</Button>
	)
}
const CustomButtonTag: React.FC<PropsAdd> = (
	props: PropsAdd
): React.ReactElement => {
	return (
		<Button className='ProfileButtonCustomizeTag' onClick={props.onClick}>
			<text className='ProfileButtonTextTag'>{props.title}</text>
			<FontAwesomeIcon
				icon={faTimes}
				size='lg'
				className='ProfileLogoCustomizeTag'
			/>
		</Button>
	)
}
const CustomButtonTagnotClick: React.FC<Props> = (
	props: Props
): React.ReactElement => {
	const [classname, setClassname] = useState(true)
	if (props.className == 'ProfileButtonCustomizeTag') setClassname(false)
	console.log('hello clas', props.className)
	return (
		<Button
			className={props.className}
			onClick={props.onClick}
			value={props.value}
		>
			<text className='ProfileButtonTextTagnotCLick'>{props.title}</text>
			<FontAwesomeIcon icon={faTimes} className='TagSHowHideIconCustomize' />
			{/* <span>X</span> */}
		</Button>
	)
}
export { CustomButton, CustomButtonTag, CustomButtonTagnotClick }
