import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

import { ProfileDummyImage } from '../../../../component/logosAndIcons'
import { ButtonWithCustyomeStyling } from '../../../../component'

import './messageInfo.css'

interface Props {
	currentMessage: any
}
const MessageInfo: React.FC<Props> = (props: Props) => {
	const { currentMessage } = props

	return (
		<div className='EmployerMessageInfo'>
			<div className='EmployerMessageInfo__Header'>
				<div className='EmployerMessageInfo__Header--Image'>
					<img
						src={
							currentMessage && currentMessage.profile_image
								? `${process.env.REACT_APP_IMAGE_URL}${currentMessage.profile_image}`
								: ProfileDummyImage
						}
					/>
				</div>
				<div className='EmployerMessageInfo__Header--Detail'>
					<div className='EmployerMessageInfo__Header--Detail--Text'>
						Chat With
					</div>
					<div className='EmployerMessageInfo__Header--Detail--Name'>
						{currentMessage.name}
					</div>
				</div>
			</div>
			<div className='EmployerMessageInfo__Body'>
				<div className='EmployerMessageInfo__Body--Title'>
					<div className='EmployerMessageInfo__Body--Title--Description Active'>
						Description
					</div>
					<div className='EmployerMessageInfo__Body--Title--Note'>Notes</div>
					<div className='EmployerMessageInfo__Body--Title--Files'>Files</div>
				</div>
				<div className='EmployerMessageInfo__Body--Detail'>
					<div className='EmployerMessageInfo__Body--Detail--Skill'>
						<div className='EmployerMessageInfo__Body--Detail--Skill--Title'>
							Skill Level
						</div>
						<div className='EmployerMessageInfo__Body--Detail--Skill--Body'>
							Senior
						</div>
					</div>
					<div className='EmployerMessageInfo__Body--Detail--Primary'>
						<div className='EmployerMessageInfo__Body--Detail--Primary--Title'>
							Primary Trade
						</div>
						<div className='EmployerMessageInfo__Body--Detail--Primary--Body'>
							Carpentry
						</div>
					</div>
					<div className='EmployerMessageInfo__Body--Detail--Trade'>
						<div className='EmployerMessageInfo__Body--Detail--Trade--Title'>
							Trades
						</div>
						<div className='EmployerMessageInfo__Body--Detail--Trade--Body'>
							<div className='EmployerMessageInfo__Body--Detail--Trade--Body--Button'>
								<ButtonWithCustyomeStyling
									buttonTitle={'Carpentry'}
									padding={'3px'}
									color={'#234476'}
									borderColor={'#F2F4FA'}
									backgroundColor={'#F2F4FA'}
								/>
							</div>
							<div className='EmployerMessageInfo__Body--Detail--Trade--Body--Button'>
								<ButtonWithCustyomeStyling
									buttonTitle={'Concrete'}
									padding={'3px'}
									color={'#234476'}
									borderColor={'#F2F4FA'}
									backgroundColor={'#F2F4FA'}
								/>
							</div>
							<div className='EmployerMessageInfo__Body--Detail--Trade--Body--Button'>
								<ButtonWithCustyomeStyling
									buttonTitle={'Demo'}
									padding={'3px'}
									color={'#234476'}
									borderColor={'#F2F4FA'}
									backgroundColor={'#F2F4FA'}
								/>
							</div>
						</div>
					</div>
					<div className='EmployerMessageInfo__Body--Detail--Experience'>
						<div className='EmployerMessageInfo__Body--Detail--Experience--Title'>
							<div className='EmployerMessageInfo__Body--Detail--Experience--Title--Text'>
								Work Experience
							</div>
							<div className='EmployerMessageInfo__Body--Detail--Experience--Title--Dropdown'>
								<FontAwesomeIcon icon={faAngleDown} color={'#2EC2E2'} />
							</div>
						</div>
						<div className='EmployerMessageInfo__Body--Detail--Experience--Body'>
							<div className='EmployerMessageInfo__Body--Detail--Experience--Body--Title'>
								Boston Construction Corp
							</div>
							<div className='EmployerMessageInfo__Body--Detail--Experience--Body--Detail'>
								<div className='EmployerMessageInfo__Body--Detail--Experience--Body--Detail--List'>
									<div className='EmployerMessageInfo__Body--Detail--Experience--Body--Detail--List--Button'>
										<ButtonWithCustyomeStyling
											buttonTitle={'Demo'}
											padding={'3px'}
											color={'#fff'}
											borderColor={'#2EC2E2'}
											backgroundColor={'#2EC2E2'}
										/>
									</div>
								</div>
								<div className='EmployerMessageInfo__Body--Detail--Experience--Body--Detail--Year'>
									5+ years
								</div>
							</div>
						</div>
						<div className='EmployerMessageInfo__Body--Detail--Experience--Body'>
							<div className='EmployerMessageInfo__Body--Detail--Experience--Body--Title'>
								A Big Company
							</div>
							<div className='EmployerMessageInfo__Body--Detail--Experience--Body--Detail'>
								<div className='EmployerMessageInfo__Body--Detail--Experience--Body--Detail--List'>
									<div className='EmployerMessageInfo__Body--Detail--Experience--Body--Detail--List--Button'>
										<ButtonWithCustyomeStyling
											buttonTitle={'Demo'}
											padding={'3px'}
											color={'#fff'}
											borderColor={'#162A49'}
											backgroundColor={'#162A49'}
										/>
									</div>
								</div>
								<div className='EmployerMessageInfo__Body--Detail--Experience--Body--Detail--Year'>
									5+ years
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MessageInfo
