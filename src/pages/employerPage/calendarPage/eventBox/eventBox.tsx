import React from 'react'

import './eventBox.css'

const EventBox: React.FC<any> = (props: any) => {
	return (
		<div className='EmployerEventBox'>
			<div className='EmployerEventBox__Time'>
				<span>18:00</span>
			</div>
			<div className='EmployerEventBox__Title'>
				Interview with Carol Bastier
			</div>
			<div className='EmployerEventBox__Description'>
				General Labor at Boston Building
			</div>
		</div>
	)
}

export default EventBox
