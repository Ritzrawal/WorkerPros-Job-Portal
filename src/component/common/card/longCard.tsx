import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCoffee,
	faAngleRight,
	faMapMarker,
	faDollarSign,
} from '@fortawesome/free-solid-svg-icons'
import {
	Card,
	Button,
	CardHeader,
	CardFooter,
	CardBody,
	CardTitle,
	CardText,
	CardImg,
} from 'reactstrap'
import buttonStories from '../../../stories/button.stories'
import './cardStyle.css'
const buttontitle = [
	{
		title: 'first',
		value: 'I’m a Tradesperson',
	},
	{
		title: 'second',
		value: ' I’m an Employer',
	},
]
interface Props {
	heading?: string
	description?: string
	image?: string
}
const LogonCardComponent: React.FC<Props> = (props: Props) => {
	return (
		<div className='OuterComponent'>
			<Card body className='CardmainComponent'>
				<div className='AvatarCustomize'>
					<div className='AvatarImage'>
						<img src={props.image} style={{ width: '100%', height: '100%' }} />
					</div>
				</div>
				<div className='DescriptionContainer'>
					<div className='HeadingCustomize'>
						<div className='TitleCustomize'>{props.heading}</div>
						<div className='FeaturesButton'>
							<text className='FetureText'>Featured</text>
						</div>
					</div>

					<div className='HeadingCustomizeLower'>
						<div>Microsoft</div>
						<div>
							<FontAwesomeIcon icon={faMapMarker} size='1x' color='#2EC2E2' />
							<text style={{ marginLeft: 20 }}>Nework</text>
						</div>
						<div>
							<FontAwesomeIcon icon={faDollarSign} size='1x' color='#2EC2E2' />
							<text style={{ marginLeft: 20 }}>13-18</text>
						</div>
					</div>
					<div className='DescriptionDetails'>{props.description}</div>
					<div className='ButtonComponent'>
						{buttontitle.map((item, i) => {
							return (
								<Button key={i} className='CardButtonContainer'>
									{item.title}
								</Button>
							)
						})}
					</div>
				</div>
				<div className='LogoContainer'>
					<FontAwesomeIcon icon={faAngleRight} size='2x' />
				</div>
			</Card>
		</div>
	)
}
export default LogonCardComponent
