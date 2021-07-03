import React from 'react'

import LocationIcon from '../../../../assets/images/icons/location-icon.png'
import { ProfileDummyImage } from '../../../../component/logosAndIcons'

import ThreeDot from '../../../../assets/images/threeDot.png'
import Cross from '../../../../assets/images/cross.png'
import './eventModal.css'

interface Props {
	onClose: () => void
}

const EventModal: React.FC<Props> = (props: Props) => {
	const { onClose } = props

	return (
		<div className='EmployerEventModal'>
			<div className='EmployerEventModal__Header'>
				<div className='EmployerEventModal__Header--Title'>
					Interview With Alice
				</div>
				<div className='EmployerEventModal__Header--Option'>
					<img src={ThreeDot} />
				</div>
				<div className='EmployerEventModal__Header--Close' onClick={onClose}>
					<img src={Cross} />
				</div>
			</div>
			<div className='EmployerEventModal__Title'>
				<div className='EmployerEventModal__Title--Text Active'>Details</div>
				<div className='EmployerEventModal__Title--Text'>Notes</div>
			</div>
			<div className='EmployerEventModal__Body'>
				<div className='EmployerEventModal__Body--Detail'>
					<div className='EmployerEventModal__Body--Detail--Title'>
						Scheduled Meeting
					</div>
					<div className='EmployerEventModal__Body--Detail--Meeting'>
						<div className='EmployerEventModal__Body--Detail--Meeting--Date'>
							18 sep
						</div>
						<div className='EmployerEventModal__Body--Detail--Meeting--Time'>
							10 AM
						</div>
					</div>
				</div>
				<div className='EmployerEventModal__Body--Detail'>
					<div className='EmployerEventModal__Body--Detail--Title'>
						Interview With
					</div>
					<div className='EmployerEventModal__Body--Detail--Interview'>
						<div className='EmployerEventModal__Body--Detail--Interview--Image'>
							<img src={ProfileDummyImage} />
						</div>
						<div className='EmployerEventModal__Body--Detail--Interview--Name'>
							Alice K.
						</div>
					</div>
				</div>
				<div className='EmployerEventModal__Body--Detail'>
					<div className='EmployerEventModal__Body--Detail--Title'>Where</div>
					<div className='EmployerEventModal__Body--Detail--Mobile'>
						<div className='EmployerEventModal__Body--Detail--Mobile--Text'>
							Mobile:
						</div>
						<div className='EmployerEventModal__Body--Detail--Mobile--Number'>
							(704) 689-4942
						</div>
					</div>
				</div>
				<div className='EmployerEventModal__Body--Detail'>
					<div className='EmployerEventModal__Body--Detail--Title'>
						Description
					</div>
					<div className='EmployerEventModal__Body--Detail--Description'>
						<div className='EmployerEventModal__Body--Detail--Description--Title'>
							Carpentry at Boston
						</div>
						<div className='EmployerEventModal__Body--Detail--Description--Location'>
							<img src={LocationIcon} />
							New Your City
						</div>
					</div>
				</div>
			</div>
			<div className='EmployerEventModal__Footer'>
				Assigned to <span>John Smith</span>
			</div>
		</div>
	)
}

export default EventModal
