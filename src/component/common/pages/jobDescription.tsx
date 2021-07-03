import React, { useState, useEffect } from 'react'
import FontAwesome from 'react-fontawesome'
import './jobDescription.css'
import '../../../styles/responsive.css'
import BlueTick from '../../../assets/images/job-description/bluetick.png'
import constructionSite from '../../../assets/images/job-description/construction-site 2.jpg'
import { WebsiteArrow } from '../../logosAndIcons'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import renderHTML from 'react-render-html'
import { Link } from 'react-router-dom'
import { HeaderPage, HeaderPage2 } from '../../../pages/headerPage'

import { Spinner } from 'reactstrap'
import Moment from 'moment'
import {
	getJobCategories,
	applyJob,
	addRemoveFavJob,
	saveJob,
	getJobDescription,
	getCompanyJobs,
} from '../../../store/action/job'

import {
	EmailIcon,
	FacebookIcon,
	LinkedinIcon,
	LinkedinShareButton,
	WhatsappShareButton,
	TwitterIcon,
	EmailShareButton,
	FacebookShareButton,
	WhatsappIcon,
	TwitterShareButton,
} from 'react-share'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
//map-marker-alt
import { connect } from 'react-redux'
import {
	ButtonComponent,
	WorkScheduleCardComponent,
	JobDescriptionBottomCardComponent,
	JobDescriptionRightCard,
} from '../../index'
import {
	JobDescriptionCardComponent,
	JobDescriptionCardComponentLogo,
} from '../../index'

interface Props {
	companyName?: string
	companyType?: string
	companyLocation?: string
	jobLocation?: string
	employeeLocalNumber?: number
	employeeGlobalNumber?: number
	jobOverView?: string
	jobDescription: any
	getJobCategories: () => void
	applyJob: (params: any) => void
	addRemoveFavJob: (params: any) => void
	saveJob: (params: any) => void
	getJobDescription: (params: any) => void
	getCompanyJobs: (companyId: string, params: any) => void
	jobCategory: any
	match: any
	companyJobsList: any
}

const ScrollOnClick = (e: React.MouseEvent<Element, MouseEvent>) => {
	const target: any = e.target as Element

	let PageNavsText: any = document.getElementsByClassName(
		'JobInfo'
	) as HTMLCollectionOf<HTMLElement>

	for (let i = 0; i < PageNavsText.length; i++) {
		PageNavsText[i].style.borderBottom = 'none'
	}

	target.style.borderBottom = '4px solid #2ec2e2'
	target.style.paddingBottom = '13px'

	let OverView: any = document.querySelector('.OverView')
	let Perks: any = document.querySelector('.PerksAndBenefits')
	let Jobs: any = document.querySelector('.jobsAt')

	switch (target.id) {
		case 'OverView':
			if (OverView) {
				OverView.scrollIntoView(true)
			}
			break
		case 'Perks':
			if (Perks) {
				Perks.scrollIntoView(true)
			}
			break
		case 'Jobs':
			if (Jobs) {
				Jobs.scrollIntoView(true)
			}
			break

		default:
			return 'NOthing'
	}
}

const JobDescriptionPage: React.FC<Props> = (props: Props) => {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	const [modal, setModal] = useState(false)

	const toggle = () => setModal(!modal)

	const [shareModal, setShareModal] = useState(false)
	const toggleShareModal = () => setShareModal(!shareModal)

	const {
		getJobCategories,
		getJobDescription,
		applyJob,
		saveJob,
		addRemoveFavJob,
		getCompanyJobs,
		jobCategory,
		jobDescription,
		companyJobsList,
	} = props

	const [currentCategory, setCurrentCategory] = useState(null)

	let [companyJobPage, setCompanyJobPage] = useState('1')
	let [companyJobLimit, setCompanyJobLimit] = useState('10')

	let companyJobsParams = `?page=${companyJobPage}&limit=${companyJobLimit}`

	const filterCompanyJobs = (category: string) => {
		let companyJobsParamsCustom = `?page=${companyJobPage}&limit=${companyJobLimit}&category=${category}`
		props.getCompanyJobs(
			jobDescription.data.company_id,
			companyJobsParamsCustom
		)
	}

	const DisplayPerksBenefitsCard = (benefitType: any) => {
		switch (benefitType) {
			case 'Basic Life Insurance':
				return (
					<JobDescriptionCardComponentLogo
						text={'Basic Life Insurance'}
						logo=''
					/>
				)
				break

			case 'Sick Leave':
				return (
					<JobDescriptionCardComponentLogo text={'Sick Leave'} logo='babyboy' />
				)
				break
			case '401(k) Plan':
				return (
					<JobDescriptionCardComponentLogo
						text={'401(k) Plan'}
						logo='babyboy'
					/>
				)
				break
			case 'Medical Insurance':
				return (
					<JobDescriptionCardComponentLogo
						text={'Medical Insurance'}
						logo='babyboy'
					/>
				)
				break
			case 'Paid Vacation':
				return (
					<JobDescriptionCardComponentLogo text={'Paid Vacation'} logo='' />
				)
				break
			case 'Short Term Disability':
				return (
					<JobDescriptionCardComponentLogo
						text={'Short Term Disability'}
						logo='babyboy'
					/>
				)
				break
			case 'Dental Insurance':
				return (
					<JobDescriptionCardComponentLogo
						text={'Dental Insurance'}
						logo='babyboy'
					/>
				)
				break
		}
	}

	useEffect(() => {
		let a = props.match.params.jobid
		console.log('Job Id here ', a)
		getJobCategories()
		getJobDescription(props.match.params.jobid)
	}, [])

	useEffect(() => {
		if (
			jobDescription &&
			jobDescription.data &&
			jobDescription.data.company_id
		) {
			getCompanyJobs(jobDescription.data.company_id, companyJobsParams)
		}
	}, [jobDescription.data])

	const ChangeHeartLogo = () => {
		localStorage.getItem('token') ? saveJob(props.match.params.jobid) : toggle()
	}

	const ApplyJob = () => {
		localStorage.getItem('token')
			? applyJob(props.match.params.jobid)
			: toggle()
	}

	const SaveJob = () => {
		localStorage.getItem('token') ? saveJob(props.match.params.jobid) : toggle()
	}

	return (
		<div className='JobDescriptionMainContainer'>
			{jobDescription.loading ? (
				<div className='loaderDiv'>
					<Spinner color='grey' />
				</div>
			) : (
				<>
					<div>
						{localStorage.getItem('token') ? (
							<HeaderPage2 title='WorkerPros' />
						) : (
							<HeaderPage title='WorkerPros' />
						)}
					</div>
					{jobDescription.data ? (
						<>
							<div className='JobDescriptionBanner'>
								<div className='overlay' style={{ width: '100%' }}>
									<img
										className='jobDescriptionBannerImage'
										style={{ width: '100%' }}
										src={
											jobDescription &&
											jobDescription.data &&
											jobDescription.data.company &&
											jobDescription.data.company.images[0]
												? process.env.REACT_APP_IMAGE_URL +
												  jobDescription.data.company.images[0]
												: constructionSite
										}
									/>
								</div>
								<div className='JobDescriptionHead'>
									<div className='CompanyLogo'>
										<img
											src={
												jobDescription &&
												jobDescription.data &&
												jobDescription.data.company &&
												jobDescription.data.company.profile_image
													? process.env.REACT_APP_IMAGE_URL +
													  jobDescription.data.company.profile_image
													: 'https://dummyimage.com/600x400/000/fff'
											}
											className='LogoImg'
										></img>
									</div>
									<div className='JobDescriptionHeadRight'>
										<div className='HeadRightDiv1'>
											<h2>
												{jobDescription &&
													jobDescription.data &&
													jobDescription.data.company &&
													jobDescription.data.company.company_name}
											</h2>
											<span className='CompanyType'>
												{jobDescription &&
												jobDescription.data &&
												jobDescription.data.company &&
												jobDescription.data.company.company_type[0]
													? jobDescription.data.company.company_type[0]
													: 'Company Type'}
											</span>
										</div>
										<div className='HeadRightDiv2'>
											<div className='HeadRightInner1'>
												<span className='headinfoBlue'>Job Location </span>
												<span className='headinfoGrey'>
													<FontAwesomeIcon
														icon={faMapMarkerAlt}
														size='1x'
														color='#2EC2E2'
													/>
													{jobDescription &&
														jobDescription.data &&
														jobDescription.data.address &&
														jobDescription.data.address.city}
													,{' '}
													{jobDescription &&
														jobDescription.data &&
														jobDescription.data.address &&
														jobDescription.data.address.state}
												</span>
											</div>
											<div className='vl'></div>
											<div className='HeadRightInner2'>
												<p className='headinfoBlue'>
													COMPANY SIZE{' '}
													<span className='headinfoGrey'>
														{jobDescription &&
															jobDescription.data &&
															jobDescription.data.company &&
															jobDescription.data.company.company_size}{' '}
														employee
													</span>{' '}
												</p>

												{/* <p className='headinfoBlue'>
									Global Employees:{' '}
									<span className='headinfoGrey'>
										{Data[0].company.global_employee}
									</span>{' '}
								</p> */}
											</div>
											<div className='vl'></div>
											<div className='HeadRightInner3'>
												<p className='headinfoBlue'>
													Year Founded:{' '}
													<span className='headinfoGrey'>
														{jobDescription &&
														jobDescription.data &&
														jobDescription.data.company &&
														jobDescription.data.company.year_founded
															? jobDescription.data.company.year_founded
															: 1990}
													</span>{' '}
												</p>

												<span className='headinfoGrey'>
													Website{' '}
													<a
														href={
															jobDescription &&
															jobDescription.data &&
															jobDescription.data.company &&
															jobDescription.data.company.website
														}
														target='_blank'
														rel='noreferrer'
													>
														<img className='WebsiteArrow' src={WebsiteArrow} />
													</a>
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className='JobDescription2ndDiv'>
								{' '}
								<span
									style={{
										marginBottom: '4px solif #2ec2e2',
										paddingBottom: '13px',
									}}
									onClick={(event) => {
										ScrollOnClick(event)
									}}
									id='OverView'
									className='JobInfo key'
								>
									{' '}
									Overview
								</span>{' '}
								<span
									onClick={(event) => {
										ScrollOnClick(event)
									}}
									id='Perks'
									className='JobInfo'
								>
									Perks + Benefits
								</span>{' '}
								<span
									onClick={(event) => {
										ScrollOnClick(event)
									}}
									id='Jobs'
									className='JobInfo'
								>
									{' '}
									Jobs{' '}
									<span className='companyTotalJobs'>
										{jobDescription &&
											jobDescription.data &&
											jobDescription.data.total_company_job}
									</span>
								</span>
							</div>
							<div className='JobDescriptionMainDiv'>
								<div className='JobDescriptionMainDivLeft'>
									<div className='BusinessDevelopment'>
										<div className='BusinessDevelopment_div'>
											<div>
												<h3>{jobDescription.data.title}</h3>

												<span className='BusinessDevelopment_span'>
													Posted{' '}
													{Moment(jobDescription.data.created_at).fromNow()}
												</span>
											</div>

											<div className='btnDiv'>
												<div className='heart-cover' onClick={ChangeHeartLogo}>
													{jobDescription.data.saved ? (
														<FontAwesome
															className={'heart-logoRed'}
															name='heart'
														/>
													) : (
														<i
															style={{ color: '#808fa6' }}
															className={`far fa-heart`}
														></i>
													)}
												</div>
												<div className='test' onClick={ApplyJob}>
													{' '}
													<ButtonComponent
														width={183}
														height={50}
														backgroundColor={
															jobDescription.data.applied ? '#234476' : ''
														}
														buttonTitle={
															jobDescription.data.applied
																? 'Applied'
																: 'Apply Now'
														}
														borderColor={
															jobDescription.data.applied ? '#234476' : ''
														}
													/>{' '}
												</div>
											</div>
										</div>
										<div className='BusinessDevelopmentCardDiv'>
											{jobDescription.data && jobDescription.data.job_role && (
												<JobDescriptionCardComponent
													title='Skill Level'
													value={
														jobDescription.data &&
														jobDescription.data.job_role &&
														jobDescription.data.job_role[0]
													}
												/>
											)}

											{jobDescription.data &&
											jobDescription.data.categories &&
											jobDescription.data.categories[0].desired_experience ? (
												<JobDescriptionCardComponent
													title='Desired Experience'
													value={`${
														jobDescription.data &&
														jobDescription.data.categories &&
														jobDescription.data.categories[0].desired_experience
													} years`}
												/>
											) : null}
											<JobDescriptionCardComponent
												title='Job Type'
												value={jobDescription.data.job_type}
											/>
											<JobDescriptionCardComponent
												title='Hourly Pay'
												value={`$${jobDescription.data.pay_rate.min}-${jobDescription.data.pay_rate.max}`}
											/>
										</div>
									</div>{' '}
									<div className='OverView'>
										<h4>Overview</h4>
										<br />
										<p className='OverViewP'>
											{renderHTML(jobDescription.data.summary)}
										</p>
									</div>
									<div className='Responsibilities'>
										<h4>Responsibilities</h4>
										<br />
										<p className='ResponsibilitiesP'>
											{/* <img style={{ marginRight: '17px' }} src={BlueTick} /> */}
											{renderHTML(jobDescription.data.responsibilities)}
										</p>
									</div>
									<div className='PerksAndBenefits'>
										<h4>Perks and Benefits</h4>
										{/* <div className='ParentalLeave PerksTypeDiv'>
									<span className='PerksTitle'>
										Child care and parental Leave
									</span>
									<div className='ParentalLeaveCardDiv'>
										<JobDescriptionCardComponentLogo
											text='Generous Parental Leave'
											logo='babyboy'
										/>
										<JobDescriptionCardComponentLogo
											text='Generous Parental Leave'
											logo='babyboy'
										/>
									</div>
								</div> */}
										<div className='HealthInsurance PerksTypeDiv'>
											<div className='ParentalLeaveCardDiv'>
												{jobDescription.data.benefits.map((value) => {
													return DisplayPerksBenefitsCard(value)

													// return (
													// 	<JobDescriptionCardComponentLogo
													// 		key={index}
													// 		text={value}
													// 		logo='babyboy'
													// 	/>
													// )
												})}
											</div>
										</div>
										{/* <div className='PerksAndDiscount PerksTypeDiv'>
									<span className='PerksTitle'>Health Insurance</span>
									<div className='ParentalLeaveCardDiv'>
										<JobDescriptionCardComponentLogo
											text='Casual Dress'
											logo='babyboy'
										/>
										<JobDescriptionCardComponentLogo
											text='Happy Hours'
											logo='dfasfas'
										/>
										<JobDescriptionCardComponentLogo
											text='Stocked Kitchen'
											logo='babyboy'
										/>
									</div>
								</div> */}
										{/* <div className='ParentalLeave PerksTypeDiv'>
									<span className='PerksTitle'>
										Vacation And Time Off Benefits
									</span>
									<div className='ParentalLeaveCardDiv'>
										<JobDescriptionCardComponentLogo
											text='Generous Parental Leave'
											logo='babyboy'
										/>
									</div>
								</div> */}
										{/* <div className='PerksAndBenefitsButtonDiv'>
									<button> View All Perks And Benefits</button>
								</div> */}
									</div>
									<div className='WorkSchedule'>
										<h4>Work Schedule</h4>
										<div className='WorkScheduleCardDiv'>
											{' '}
											{!jobDescription.data.working_schedule
												? 'No Work Schedule Available!'
												: Object.keys(jobDescription.data.working_schedule).map(
														(value: any, index) => {
															if (
																jobDescription.data.working_schedule[value]
																	.off === 'false' &&
																jobDescription.data.working_schedule[value]
																	.start !== '' &&
																jobDescription.data.working_schedule[value]
																	.end !== ''
															) {
																return (
																	<WorkScheduleCardComponent
																		key={index}
																		day={value}
																		startTime={
																			jobDescription.data.working_schedule[
																				value
																			].start
																		}
																		endTime={
																			jobDescription.data.working_schedule[
																				value
																			].end
																		}
																	/>
																)
															}
														}
												  )}
										</div>
									</div>
									<div className='jobsAt'>
										<h4>
											Find Jobs At{' '}
											<span style={{ textTransform: 'capitalize' }}>
												{jobDescription &&
													jobDescription.data &&
													jobDescription.data.company.company_name}
											</span>
										</h4>
										<ul>
											<li
												onClick={() => {
													setCurrentCategory(null)
													getCompanyJobs(
														jobDescription.data.company_id,
														companyJobsParams
													)
												}}
												className={`landingPageJobstypeLi ${
													currentCategory === null ? 'active' : null
												}`}
											>
												All
											</li>
											{jobCategory.data &&
												jobCategory.data.map((category: any, index) => {
													return (
														<>
															<li
																onClick={() => {
																	setCurrentCategory(category._id)
																	filterCompanyJobs(category.title)
																}}
																className={`landingPageJobstypeLi ${
																	currentCategory === category._id
																		? 'active'
																		: null
																}`}
																key={index}
															>
																{category.title}
															</li>
														</>
													)
												})}
										</ul>
										<div className='BottomCardsDiv'>
											{companyJobsList.loading ? (
												<div className='loaderDiv'>
													<Spinner color='grey' />
												</div>
											) : companyJobsList.data.length !== 0 ? (
												companyJobsList.data.map((value, index) => {
													if (value.title === jobDescription.data.title) {
														return ''
													}
													return (
														<Link
															style={{ textDecoration: 'none' }}
															to={`/jobdescription/${value._id}`}
															key={index}
															target='_blank'
														>
															<JobDescriptionBottomCardComponent
																key={index}
																jobTitle={value.title}
																CompanyName={
																	jobDescription.data.company.company_name
																}
																image={
																	jobDescription.data.company.profile_image
																		? process.env.REACT_APP_IMAGE_URL +
																		  jobDescription.data.company.profile_image
																		: 'https://dummyimage.com/600x400/000/fff'
																}
																CompanyLocation={
																	jobDescription.data.address.city
																}
															/>
														</Link>
													)
												})
											) : (
												<div className='NoJobsDiv'>No Jobs Available!</div>
											)}
										</div>
									</div>
								</div>
								<div className='JobDescriptionMainDivRight'>
									<JobDescriptionRightCard
										currentUrl={window.location.href}
										saveJob={saveJob}
										saveJobStatus={jobDescription.data.saved}
										applyJob={ApplyJob}
										openAlertModal={toggle}
										openShareModal={toggleShareModal}
										ApplyStatus={jobDescription.data.applied}
										jobId={props.match.params.jobid}
										image={
											jobDescription.data.company.profile_image
												? process.env.REACT_APP_IMAGE_URL +
												  jobDescription.data.company.profile_image
												: 'https://picsum.photos/200/300'
										}
									/>
								</div>
							</div>
						</>
					) : (
						<div className='errorOccured'>
							Sorry an error occured. Please try again!
						</div>
					)}
				</>
			)}
			<>
				<Modal isOpen={modal} toggle={toggle} className='storyModal'>
					<ModalBody>
						<div className='JobDescription_LoginAlertDiv'>
							<h3>You Need to be Logged in to perform this action!</h3>
							<div className='JobDescription_LoginAlertDiv_Button'>
								<Link style={{ textDecoration: 'none' }} to='/login'>
									<ButtonComponent
										width={180}
										height={50}
										buttonTitle={'Log In'}
									/>{' '}
								</Link>
							</div>
							<div className='JobDescription_LoginAlertDiv_NoAccount'>
								Dont have an account? Sign Up from{' '}
								<Link to='/signup'>here</Link>
							</div>
						</div>
					</ModalBody>
				</Modal>
				<Modal
					isOpen={shareModal}
					toggle={toggleShareModal}
					className='shareModal'
				>
					<ModalBody>
						<div className='JobDescription_LoginAlertDiv'>
							<h3>Share this job to your favourite social sites!</h3>
						</div>
						<div className='ProfileSocailSharingIconJobDescription'>
							<FacebookShareButton
								url={window.location.href}
								className='SocialLoginIconCustomizeProfile'
							>
								<FacebookIcon size={32} round />
							</FacebookShareButton>
							<EmailShareButton
								url={window.location.href}
								className='SocialLoginIconCustomizeProfile'
							>
								<EmailIcon size={32} round />
							</EmailShareButton>
							<LinkedinShareButton
								url={window.location.href}
								className='SocialLoginIconCustomizeProfile'
							>
								<LinkedinIcon size={32} round />
							</LinkedinShareButton>
							<WhatsappShareButton
								url={window.location.href}
								className='SocialLoginIconCustomizeProfile'
							>
								<WhatsappIcon size={32} round />
							</WhatsappShareButton>
							<TwitterShareButton
								url={window.location.href}
								className='SocialLoginIconCustomizeProfile'
							>
								<TwitterIcon size={32} round />
							</TwitterShareButton>
						</div>
					</ModalBody>
				</Modal>
			</>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	jobCategory: state.job.category,
	jobDescription: state.job.description,
	companyJobsList: state.job.companyJobsList,
})

const actions = {
	getJobCategories,
	getJobDescription,
	applyJob,
	saveJob,
	addRemoveFavJob,
	getCompanyJobs,
}

export default connect(mapStateToProps, actions)(JobDescriptionPage)
