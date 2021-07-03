import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Spinner } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faUser } from '@fortawesome/free-solid-svg-icons'

import './searchBox.css'

interface Props {
	employerSearch: any
}

const SearchBox: React.FC<Props> = (props: Props) => {
	const { employerSearch } = props

	console.log({ employerSearch })

	return (
		<>
			<div className='EmployerSearchBox'>
				<div className='EmployerSearchBox__Title'>Search For </div>
				{employerSearch.loading ? (
					<Spinner size={'sm'} />
				) : employerSearch.data ? (
					<div className='EmployerSearchBox__Body'>
						<div className='EmployerSearchBox__Body--List'>
							<div className='EmployerSearchBox__Body--List--Heading'>
								<FontAwesomeIcon icon={faBook} />
								Job
							</div>
							<div className='EmployerSearchBox__Body--List--Detail'>
								{employerSearch.data.searchJob.map((j, index) => (
									<Link key={index} to={`/employer/job-detail/${j._id}`}>
										<div className='EmployerSearchBox__Body--List--Detail--Container'>
											{j.title}
										</div>
									</Link>
								))}
							</div>
						</div>
						<div className='EmployerSearchBox__Body--List'>
							<div className='EmployerSearchBox__Body--List--Heading'>
								<FontAwesomeIcon icon={faUser} />
								Candidate
							</div>
							<div className='EmployerSearchBox__Body--List--Detail'>
								{employerSearch.data.searchUser.map((u, index) => (
									<div
										key={index}
										className='EmployerSearchBox__Body--List--Detail--Container'
									>
										{u.first_name} {u.last_name}
									</div>
								))}
							</div>
						</div>
					</div>
				) : null}
			</div>
		</>
	)
}

export default SearchBox
