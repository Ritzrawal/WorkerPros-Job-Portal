import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup } from 'reactstrap'
import { connect } from 'react-redux'
import './button.css'
import { switchActive, switchInactive } from '../../../store/action/loginAction'
interface Props {
	buttonTitle?: string
	onDetailsChanged?: (num: number) => void
	test?: string
	switchActive: () => void
	switchInactive: () => void
}

const buttontitle = [
	{
		name: 'Messages',
		value: '1',
	},
	{
		name: 'Support',
		value: ' 2',
	},
]
const SwitchButtonComponentCustom: React.FC<Props> = (props: Props) => {
	const [selected, setSelected] = useState(false)
	const [selectedtwo, setSelectedtwo] = useState(false)
	const [activeButton, setActiveButton] = useState(buttontitle[0].name)

	props.onDetailsChanged

	const toggleSelected = () => {
		setSelected(!selected)
	}
	const toggleSelectedtwo = () => {
		setSelectedtwo(!selectedtwo)
	}
	const onSideBtnClick = (e: React.MouseEvent<HTMLElement>) => {
		// props.onClick()
		const name = (e.target as any).name
		if (name === 'Messages') {
			props.switchInactive()
		}
		if (name === 'Support') {
			props.switchActive()
		}
		setActiveButton(name)
		console.log('active button', name, activeButton)
		console.log('Hello props', props)

		// props.onClick(name)
	}
	useEffect(() => {
		console.log(activeButton)
	}, [activeButton])
	return (
		<ButtonGroup className='AdminButtonSwitchButtonGroup'>
			{buttontitle.map((it, i) => {
				const className =
					activeButton == it.name
						? ' AdminButtonDisabledButtons'
						: 'AdminButtonSelectedButton'
				return (
					<Button
						key={i}
						value={it.value}
						name={it.name}
						onClick={onSideBtnClick}
						className={` ${className}`}
					>
						{it.name}
					</Button>
				)
			})}
		</ButtonGroup>
	)
}

export default connect(null, { switchActive, switchInactive })(
	SwitchButtonComponentCustom
)
