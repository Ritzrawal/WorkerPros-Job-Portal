import React from 'react'
import { Spinner } from 'reactstrap'
import { Link } from 'react-router-dom'

import { Table } from 'reactstrap'

import './listtable.css'

interface Props {
	list: any
}

const ApplicationsListTable: React.FC<any> = (
	props: Props
): React.ReactElement => {
	const { list } = props

	const switchJobStatus = (value: any) => {
		switch (value) {
			case 'applied':
				return (
					<span className='applicationListStatus_interviewPending'>
						{' '}
						Pending
					</span>
				)
				break
			case 'screening':
				return (
					<span className='applicationListStatus_interviewRequested'>
						{' '}
						Interview Requested
					</span>
				)
				break
			case 'interview':
				return (
					<span className='applicationListStatus_interviewScheduled'>
						{' '}
						Interview Scheduled
					</span>
				)
				break
			case 'offered':
				return <span className='applicationListStatus_offered'> Offered</span>
				break
			default:
				return ''
		}
	}

	return (
		<div className='ListTable'>
			{!list.loading ? (
				<Table borderless responsive>
					{list.data.length === 0 ? (
						<div className='NoJobsMessageDiv'>No Applications!</div>
					) : (
						<>
							<thead className='tableMainThread'>
								<tr>
									<th style={{ width: '20%' }}>Company</th>
									<th style={{ width: '20%' }}>Position</th>
									<th style={{ width: '20%' }}>Skill Level</th>
									<th style={{ width: '20%' }}>Job Type</th>
									<th style={{ width: '20%' }}>Pay</th>
									<th style={{ width: '20%' }}>Status</th>
								</tr>
							</thead>
							<tbody className='tableTrContainer'>
								{list.data.map((value: any, index) => {
									return (
										<tr key={index}>
											<td className='ListTable__Body--Container--Company_TD'>
												{' '}
												<div className='ListTable__Body--Container--Company'>
													<div className='ListTable__Body--Container--Company--Logo'>
														<img
															src={
																value.company.profile_image
																	? process.env.REACT_APP_IMAGE_URL +
																	  value.company.profile_image
																	: 'https://dummyimage.com/600x400/000/fff'
															}
															alt='#'
														/>
													</div>
													<div className='ListTable__Body--Container--Company--Name'>
														{value.company.company_name}
													</div>
												</div>
											</td>
											<td>
												{' '}
												<Link
													style={{ textDecoration: 'none' }}
													to={`/jobdescription/${value._id}`}
												>
													<div className='ListTable__Body--Container--Position'>
														{value.job.title}
													</div>
												</Link>
											</td>
											<td>
												<div className='ListTable__Body--Container--Skilllevel'>
													{value.job.categories[0].title}
												</div>
											</td>
											<td>
												<div className='ListTable__Body--Container--Jobtype'>
													{value.job.job_type}
												</div>
											</td>
											<td>
												<div className='ListTable__Body--Container--Pay'>{`$${value.job.pay_rate.min}-${value.job.pay_rate.max}`}</div>
											</td>
											<td className='ApplicationListTable__Body--Container--Status_TD'>
												{' '}
												<div className='ApplicationListTable__Body--Container--Status'>
													{switchJobStatus(value.phase)}
												</div>
											</td>
										</tr>
									)
								})}
							</tbody>
						</>
					)}
				</Table>
			) : (
				<div className='loaderDiv'>
					<Spinner color='grey' />
				</div>
			)}
			{/* <div className='ListTable__Header'>
				<div className='ListTable__Header--Container'>
					<div className='ListTable__Header--Container--Company'>Company</div>
					<div className='ListTable__Header--Container--Position'>Position</div>
					<div className='ListTable__Header--Container--Skilllevel'>
						Skill Level
					</div>
					<div className='ListTable__Header--Container--Jobtype'>Job Type</div>
					<div className='ListTable__Header--Container--Pay'>Pay</div>
					<div className='ListTable__Header--Container--Status'>Status</div>
				</div>
			</div>
			{!list.loading ? (
				<div className='ListTable__Body'>
					{list.data.length === 0 ? (
						<div className='NoJobsMessageDiv'>No Applications!</div>
					) : (
						list.data.map((value: any, index) => {
							return (
								<Link
									style={{ textDecoration: 'none' }}
									key={index}
									to={`/jobdescription/${value.job._id}`}
								>
									<div key={index} className='ListTable__Body--Container'>
										<div className='ListTable__Body--Container--Company'>
											<div className='ListTable__Body--Container--Company--Logo'>
												<img
													src={
														value.company.profile_image
															? process.env.REACT_APP_IMAGE_URL +
															  value.company.profile_image
															: 'https://dummyimage.com/600x400/000/fff'
													}
													alt='#'
												/>
											</div>
											<div className='ListTable__Body--Container--Company--Name'>
												{value.company.company_name}
											</div>
										</div>
										<div className='ListTable__Body--Container--Position'>
											{value.job.title}
										</div>
										<div className='ListTable__Body--Container--Skilllevel'>
											Skill Level
										</div>
										<div className='ListTable__Body--Container--Jobtype'>
											{value.job.job_type}
										</div>
										<div className='ListTable__Body--Container--Pay'>{`$${value.job.pay_rate.min}-${value.job.pay_rate.max}`}</div>
										<div className='ApplicationListTable__Body--Container--Status'>
											{switchJobStatus(value.phase)}
										</div>
									</div>
								</Link>
							)
						})
					)}
				</div>
			) : (
				<div className='loaderDiv'>
					<Spinner color='grey' />
				</div>
			)}
			{list.data.length < 0 && <h3>No data</h3>} */}
		</div>
	)
}

export default ApplicationsListTable
