import React from 'react'

import './eventCalendarBox.css'

const EventCalendarBox: React.FC = (props: any) => {
	return (
		<div className='EventCalendarBox'>
			<div className='EventCalendarBox__Schedule'>
				<div className='EventCalendarBox__Schedule--Time'>18</div>
				<div className='EventCalendarBox__Schedule--Hour'>Am</div>
			</div>
			<div className='EventCalendarBox__Info'>
				<div className='EventCalendarBox__Info--Title'>
					Interview with Carol Bastier
				</div>
				<div className='EventCalendarBox__Info--Description'>
					General Labor at Boston Building
				</div>
			</div>
		</div>
	)
}

export default EventCalendarBox
