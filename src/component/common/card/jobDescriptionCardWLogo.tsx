import React from 'react'
import './cardStyle.css'
import { BabyLogo, Shield, Umbrella, Insurance } from './JobCardLogos'
const LogoArr = {
	babylogo: BabyLogo,
	shield: Shield,
	umbrella: Umbrella,
	insurance: Insurance,
}

interface Props {
	text: string
	logo: string
}

const JobDescriptionCardComponentLogo: React.FC<Props> = (props: Props) => {
	return (
		<div className='LogoCard'>
			<img src={props.logo === 'babyboy' ? BabyLogo : Shield}></img>
			<span className='LogoCardText'>{props.text}</span>
		</div>
	)
}

export default JobDescriptionCardComponentLogo
