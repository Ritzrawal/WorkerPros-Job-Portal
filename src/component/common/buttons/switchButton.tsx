import React, { useState } from 'react'
import { Button, ButtonGroup } from 'reactstrap'
import { connect } from 'react-redux'
import './button.css'
import { switchActive, switchInactive } from '../../../store/action/loginAction'
interface Props {
	buttonTitle: string
	onDetailsChanged?: (num: number) => void
	onClick: (name: any) => void
	test?: string
	switchActive: () => void
	switchInactive: () => void
}

const buttontitle = [
	{
		name: 'I’m a Tradesperson',
		value: '1',
	},
	{
		name: ' I’m an Employer',
		value: ' 2',
	},
]
const SwitchButtonComponent: React.FC<Props> = (props: Props) => {
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
		setActiveButton(name)
		if (name === 'I’m a Tradesperson') {
			props.switchInactive()
		} else {
			props.switchActive()
		}

		console.log('active button', name)
		console.log('Hello props', props)

		props.onClick(name)
	}
	return (
		<ButtonGroup className='SwitchButtonGroup'>
			{buttontitle.map((it, i) => {
				const className =
					activeButton == it.name ? ' DisabledButtons' : 'SelectedButton'
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
	SwitchButtonComponent
)
