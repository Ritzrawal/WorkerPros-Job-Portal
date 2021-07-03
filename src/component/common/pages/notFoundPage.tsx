import React from 'react'
import { Link } from 'react-router-dom'
import { HeaderPage2 } from '../../../pages/headerPage'
const NotFoundPage = () => (
	<>
		<HeaderPage2 title='not Found' />
		<div
			style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
		>
			<div
				style={{ display: 'flex', justifyContent: 'center', paddingTop: '10%' }}
			>
				<h1>404 - Not Found!</h1>
			</div>
		</div>
	</>
)

export default NotFoundPage
