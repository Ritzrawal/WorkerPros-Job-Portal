import React from 'react'
import Fontawesome from 'react-fontawesome'

import './searchbox.css'

const SearchBox: React.FC<any> = (): React.ReactElement => {
	return (
		<div className='SearchBox'>
			<div className='SearchBox__Icon'>
				<Fontawesome name={'search'} />
			</div>
			<div className='SearchBox__Placeholder'>Search Applications</div>
		</div>
	)
}

export default SearchBox
