import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Spinner } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faUser } from '@fortawesome/free-solid-svg-icons'
import WorkerDetailModal from '../../../component/common/modal/candidateDetailModal/candidateDetailModal'
import { singleProfileAction } from '../../../store/action/profileAction'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import './searchBox.css'

interface Props {
	employerSearch: any
	showroute?: any
	onConnectClick?: () => void
	onClickProfile: (flag: any) => void
	singleProfileAction: (id: string) => void
}

const SearchBox: React.FC<Props> = (props: Props) => {
	const { employerSearch } = props
	const [show, setShow] = useState(false)
	const history = useHistory()

	console.log({ employerSearch })
	const onProfileClick = (id) => {
		if (props.showroute) {
			setShow(props.showroute)
		}

		console.log('single card', props.showroute, show)
		props.singleProfileAction(id)
		props.onClickProfile(true)
		if (props.showroute) {
			history.push('/display/profile')
		}
	}

	return (
		<>
			<div className='EmployerSearchBox'>
				<div className='EmployerSearchBox__Title'>Search For {} </div>
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
									<Link key={index} to={`/jobdescription/${j._id}`}>
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
										onClick={() => onProfileClick(u.user_id)}
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

export default connect(null, { singleProfileAction })(SearchBox)
