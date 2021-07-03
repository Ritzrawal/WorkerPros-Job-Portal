import React from 'react'
import FontAwesome from 'react-fontawesome'
import { FeaturesSwitcher } from '../../../component'
import './landingPage.css'

interface Props {
	num: number
}

const Navigation: React.FC<Props> = () => {
	return (
		<div>
			<FeaturesSwitcher />
		</div>
	)
}

export default Navigation
