import React from 'react'
import { Spinner } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'

import './listtable.css'

interface Props {
	list: any
}

const JobSearchTable: React.FC<any> = (props: Props): React.ReactElement => {
	const { list } = props

	return (
		<div className='ListTable'>
			{!list.loading ? (
				<Table borderless responsive>
					{list.data.jobs.length === 0 ? (
						<div className='NoJobsMessageDiv'>No Jobs!</div>
					) : (
						<>
							<thead className='tableMainThread'>
								<tr>
									<th>Company</th>
									<th style={{ width: '20%' }}>Position</th>
									<th style={{ width: '20%' }}>Skill Level</th>
									<th style={{ width: '20%' }}>Job Type</th>
									<th style={{ width: '20%' }}>Pay</th>
									<th style={{ width: '20%' }}>Location</th>
								</tr>
							</thead>
							<tbody className='tableTrContainer'>
								{list.data.jobs.map((value: any, index) => {
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
												<Link
													style={{ textDecoration: 'none' }}
													to={`/jobdescription/${value._id}`}
												>
													<div className='ListTable__Body--Container--Position'>
														{value.title}
													</div>
												</Link>
											</td>
											<td>
												<div className='ListTable__Body--Container--Skilllevel'>
													{value.categories[0].title}
												</div>
											</td>
											<td>
												<div className='ListTable__Body--Container--Jobtype'>
													{value.job_type}
												</div>
											</td>
											<td>
												<div className='ListTable__Body--Container--Pay'>{`$${value.pay_rate.min}-${value.pay_rate.max}`}</div>
											</td>
											<td className='ListTable__Body--Container--Pay_TD'>
												{' '}
												<div className='ListTable__Body--Container--Pay'>
													<span> {value.address.city}</span>
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
						<div className='NoJobsMessageDiv'>No Saved Jobs!</div>
					) : (
						list.data.map((value: any, index) => {
							return (
								<Link
									style={{ textDecoration: 'none' }}
									key={index}
									to={`/jobdescription/${value._id}`}
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
											{value.title}
										</div>
										<div className='ListTable__Body--Container--Skilllevel'>
											Skill Level
										</div>
										<div className='ListTable__Body--Container--Jobtype'>
											{value.job_type}
										</div>
										<div className='ListTable__Body--Container--Pay'>{`$${value.pay_rate.min}-${value.pay_rate.max}`}</div>
										<div className='ListTable__Body--Container--Status'>
											<span> {value.applied ? 'Applied' : 'Not applied'}</span>
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
			{list.data.length < 0 && <h3>NO data</h3>} */}
		</div>
	)
}

export default JobSearchTable
