/* eslint-disable react/prop-types */
import React from 'react'
import { Button } from 'reactstrap'

interface Props {
	buttonTitle?: string
	width?: number
	hight?: number
	color?: string
}
const ButtonComponent: React.FC<Props> = ({
	buttonTitle,
	width,
	hight,
	color,
}) => {
	return (
		<div>
			<Button width={width} hight={hight} color={color}>
				{buttonTitle}
			</Button>
		</div>
	)
}
export default ButtonComponent
