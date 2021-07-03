import React, { useState } from 'react'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MenuIcon, DownArrow, UpArrow } from '../../logosAndIcons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
const buttontitle = [
	{
		name: 'Today',
		value: 1,
	},
	{
		name: 'last 7 days',
		value: 2,
	},
	{
		name: 'last 30 days',
		value: 3,
	},
	{
		name: 'Custom',
		value: 4,
	},
]
import './form.css'
const TopAdminbutton = () => {
	const [activeButton, setActiveButton] = useState(buttontitle[0].name)

	const onSideBtnClick = (e: React.MouseEvent<HTMLElement>) => {
		const name = (e.target as any).name
		setActiveButton(name)
	}

	return (
		<>
			{buttontitle.map((it, i) => {
				const className =
					activeButton == it.name
						? ' AdminDisabledButtons'
						: 'AdminSelectedButton'
				return (
					<Button
						key={i}
						value={it.value}
						name={it.name}
						onClick={onSideBtnClick}
						className={` ${className}`}
					>
						{it.value === 4 && (
							// <FontAwesomeIcon icon={faBars} style={{ marginRight: 10 }} />
							<img src={MenuIcon} style={{ marginRight: 10 }} />
						)}

						{it.name}
					</Button>
				)
			})}
		</>
	)
}
export default TopAdminbutton
