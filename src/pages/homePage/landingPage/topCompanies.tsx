import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import { Container, Row, Col } from 'reactstrap'

import { getTopCompanies } from '../../../store/action/company'

import { TopCompaniesCard } from '../../../component'

import DownloadImage from '../../../assets/images/landing-page/DownloadImage.png'
import CheckAllBgVector from '../../../assets/images/landing-page/Vector.png'
import ArrowRight from '../../../assets/images/landing-page/arrow-right.png'
import './landingPage.css'

interface Props {
	showDownload?: boolean
	getTopCompanies: (params: any) => void
	topCompanies: any
}

const TopCompanies: React.FC<Props> = (props: Props) => {
	const { getTopCompanies, topCompanies } = props

	const currentPage = 1
	const listLimit = 3

	useEffect(() => {
		const pageParams = `&page=${currentPage}&limit=${listLimit}`
		getTopCompanies(pageParams)
	}, [currentPage])

	return (
		<div>
			<div
				style={{ backgroundColor: '#F2F4FA', paddingBottom: '40px' }}
				className='find-jobs-container'
			>
				<div className='find-jobs-startImage'>
					<div className='find-jobs-startImage-wrapper container'>
						<div className='find-jobs-left'>
							<h1>Top Companies To Work With</h1>
						</div>
						<div className='find-jobs-right'>
							<Link style={{ textDecoration: 'none' }} to='/howitwork'>
								<button className='learn-more-button'>Learn More</button>
							</Link>
						</div>
					</div>
				</div>
				<div className='companies-div'>
					<Container>
						<Row className='companies-div-row'>
							{topCompanies.data &&
								topCompanies.data.companies.map((company, index) => (
									<Col lg='3' md='6' key={index}>
										<TopCompaniesCard
											mainImg={
												company.images[0]
													? process.env.REACT_APP_IMAGE_URL + company.images[0]
													: 'https://picsum.photos/200/300'
											}
											companyLogo={company.profile_image}
											location='Charlotte'
											type={'Software'}
											// {company.company_name.length < 12 ? value : `${value.slice(0, 12)}...`}
											name={
												company.company_name.length < 10
													? company.company_name
													: `${company.company_name.slice(0, 10)}...`
											}
											totalJobs={company.total_jobs}
										/>
									</Col>
								))}

							<Col lg='3' md='6'>
								<div className='check-all-companies'>
									<img
										className='CheckAllBgVector'
										src={CheckAllBgVector}
									></img>
									<img className='checkCompaniesArrow' src={ArrowRight}></img>
									<div>
										<h3>Check All The Companies</h3>
									</div>
									<p className='check-p'>
										We are looking for someone with experience.
									</p>
									<Link
										to={`${
											localStorage.getItem('token')
												? '/findcompanies'
												: '/login'
										}`}
									>
										<button className='check-button-div'>
											{' '}
											See All the Companies
										</button>
									</Link>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
			</div>

			{props.showDownload && (
				<div className='download-app-outerdiv'>
					<div className='download-app-container container'>
						<div className='download-app-left'>
							<div className='download-app-left-innerdiv'>
								<h2>Download Our App</h2>
								<p style={{ height: '71px', color: '#8897AE' }}>
									Join the largest community of skilled <br />
									construction workers looking{' '}
								</p>
								<div className='download-app-button-div'>
									<button>
										<FontAwesome
											style={{ fontSize: '25px', marginRight: '12px' }}
											name='apple'
										/>{' '}
										Download
									</button>
									<button>
										<FontAwesome
											style={{ fontSize: '25px', marginRight: '12px' }}
											name='android'
										/>{' '}
										Download
									</button>
								</div>
							</div>
						</div>
						<div className='download-app-right'>
							<img src={DownloadImage}></img>
							{/* <img src={Group50}></img> */}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	topCompanies: state.company.top,
})

const actions = {
	getTopCompanies,
}

export default connect(mapStateToProps, actions)(TopCompanies)
