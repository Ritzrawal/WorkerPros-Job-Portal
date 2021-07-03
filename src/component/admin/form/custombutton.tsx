import React, { useState } from 'react'

interface Props {
	title: string
}
const AdminButton = (props: Props) => {
	const [backcolor, setColor] = useState(false)
	// const [activeButton, setActiveButton] = useState()
	const { title } = props

	const onConnect = () => {
		setColor(!backcolor)
	}
	// const className =
	// 	activeButton == title ? ' DisabledButtons' : 'AdminButtonOnclcik'
	return (
		<div className='AdminButtonContainer' onClick={onConnect}>
			<button className={backcolor ? 'AdminButtonOnclcik' : ''}>{title}</button>
		</div>
	)
}
export default AdminButton
