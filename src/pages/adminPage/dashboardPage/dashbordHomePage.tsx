import React, { useState, useEffect } from 'react'
import { Progress } from 'reactstrap'
import {
	AdminSidebar,
	AdminNavbar,
	LineGraph,
	AdminPiachart,
} from '../../../component/admin'
import { adminDataCountAction } from '../../../store/action/adminAction'
import BoxArrow from '../../../assets/images/adminArrow.png'
import { TopAdminbutton } from '../../../component/admin'
import { MenuIcon, DownArrow, UpArrow } from '../../../component/logosAndIcons'
import { connect } from 'react-redux'
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'
interface Props {
	title?: string
	datacount: any
	adminDataCountAction: () => void
}
import './admindashboard.css'
export const DashbordHomePage: React.FC<Props> = (props: Props) => {
	let [filterButtonClass, setFilterButtonClass] = useState('')
	const [cardclick, setCardClick] = useState(false)

	const { adminDataCountAction, datacount } = props

	const onCradCLick = () => {
		setCardClick(!cardclick)
	}
	useEffect(() => {
		console.log('hello data')
		adminDataCountAction()
	}, [])

	return (
		<>
			<AdminNavbar />
			<div className='AdminDashboardSidebarAndContent'>
				<div className='AdminDashboardSidebar'>
					<AdminSidebar />
				</div>
				<div className='AdminContentMainCustomize'>
					<div className='AdminContentInnerContainer'>
						<div className='AdminTopCustomizeDisplayButton'>
							<TopAdminbutton />
						</div>
						<div className='AdminTopCustomizeDisplayTopCard'>
							<div
								onClick={() => {
									setFilterButtonClass('')
									// props.getSavedJobs(pageParams)
								}}
								className={
									filterButtonClass === ''
										? 'AdminTopSmallCardonCLickDispaly '
										: 'AdminTopSmallCardDisplay'
								}
							>
								<span className='AdminTopSmallCardDisplayTitle'>
									Pending Employers
								</span>
								<div className='AdminTopSmallCardDisplayTitleBold'>
									<div className='AdminTopSmallCardBolTitle'>
										{datacount?.total_pending_employer}
									</div>
									<div className='AdminTopSmallCardBolTitlePlusminus'>+5%</div>
								</div>
								{filterButtonClass === '' ? (
									<div className='AdminArrowPositionCustomize'>
										<div className='AdminDisplayOnclickTriangle'>
											<img src={BoxArrow} className='AdminCommentArrowImage' />
										</div>
									</div>
								) : null}
							</div>
							<div
								onClick={() => {
									setFilterButtonClass(`Active Employers`)
									// props.getSavedJobsWithFilter(savedJobsParams7)
								}}
								className={
									filterButtonClass === `Active Employers`
										? 'AdminTopSmallCardonCLickDispaly '
										: 'AdminTopSmallCardDisplay'
								}
							>
								<span className='AdminTopSmallCardDisplayTitle'>
									Active Employers
								</span>
								<div className='AdminTopSmallCardDisplayTitleBold'>
									<div className='AdminTopSmallCardBolTitle'>
										{datacount?.total_active_employer}
									</div>
									<div className='AdminTopSmallCardBolTitlePlusminus'>+5%</div>
								</div>
								{filterButtonClass === 'Active Employers' ? (
									<div className='AdminArrowPositionCustomize'>
										<div className='AdminDisplayOnclickTriangle'>
											<img src={BoxArrow} className='AdminCommentArrowImage' />
										</div>
									</div>
								) : null}
							</div>
							<div
								onClick={() => {
									setFilterButtonClass(`Current MRR`)
									// props.getSavedJobsWithFilter(savedJobsParams7)
								}}
								className={
									filterButtonClass === `Current MRR`
										? 'AdminTopSmallCardonCLickDispaly '
										: 'AdminTopSmallCardDisplay'
								}
							>
								<span className='AdminTopSmallCardDisplayTitle'>
									Current MRR
								</span>
								<div className='AdminTopSmallCardDisplayTitleBold'>
									<div className='AdminTopSmallCardBolTitle'>
										{datacount?.MRR}
									</div>
									<div className='AdminTopSmallCardBolTitlePlusminus'>+5%</div>
								</div>
								{filterButtonClass === 'Current MRR' ? (
									<div className='AdminArrowPositionCustomize'>
										<div className='AdminDisplayOnclickTriangle'>
											<img src={BoxArrow} className='AdminCommentArrowImage' />
										</div>
									</div>
								) : null}
							</div>
							<div
								onClick={() => {
									setFilterButtonClass(`Active Tradesperson`)
									// props.getSavedJobsWithFilter(savedJobsParams7)
								}}
								className={
									filterButtonClass === `Active Tradesperson`
										? 'AdminTopSmallCardonCLickDispaly '
										: 'AdminTopSmallCardDisplay'
								}
							>
								<span className='AdminTopSmallCardDisplayTitle'>
									Active Tradesperson
								</span>
								<div className='AdminTopSmallCardDisplayTitleBold'>
									<div className='AdminTopSmallCardBolTitle'>
										{datacount?.total_active_worker}
									</div>
									<div className='AdminTopSmallCardBolTitlePlusminus'>+5%</div>
								</div>
								{filterButtonClass === 'Active Tradesperson' ? (
									<div className='AdminArrowPositionCustomize'>
										<div className='AdminDisplayOnclickTriangle'>
											<img src={BoxArrow} className='AdminCommentArrowImage' />
										</div>
									</div>
								) : null}
							</div>
						</div>
						<div className='AdminDashboardGraphContainer'>
							<div className='AdminDashboardGraphTitleDisplay'>
								<div className='AdminTopSmallCardDisplayTitle'>
									Pending Employers
								</div>
								<div className='AdminTopSmallCardDisplayTitleBold'>
									<div className='AdminTopSmallCardBolTitle'>52</div>
									<div className='AdminTopSmallCardBolTitlePlusminus'>+5%</div>
								</div>
							</div>
							<div className='AdminDashboardGraphGraphDisplay'>
								<LineGraph state={true} />
							</div>
						</div>
						<div className='AdminDashboardProgressAllContainer'>
							<div className='AdminDashboardProgrssDisplayContainer'>
								<div className='AdminDashboardProgressDisplayTitle'>Churn</div>
								<div className='adminPieCart'>
									<div className='AdminDougnhotContainer'>
										<div className='AdminDoughnotLeftValue'>48%</div>
										<AdminPiachart />
										<div className='AdminDoughnotRightvalue'>52%</div>
									</div>
									<div className='AdminDoughnotLOwerContainer'>
										<div className='AdminDashboardShowPercentaageDoughnut'>
											<div className='AdminDashboardDotCustomizeDoughnutLeft'></div>
											<div className='AdminDashboardDotValue'>
												Total active users 12%
											</div>
										</div>
										<div className='AdminDashboardShowPercentaageDoughnut'>
											<div className='AdminDashboardDotCustomizeDoughnut'></div>
											<div className='AdminDashboardDotValue'>
												Canceled users 12%
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='AdminDashboardProgrssDisplayContainerEmployeer'>
								<div className='AdminDashboardProgressDisplayTitle'>
									Subscription Type
								</div>
								<div className='AdminDashboardProgressCardDisplay'>
									<div className='AdminDashboardProgressTitleContainer'>
										<div className='AdminDashboardProgressTitle'>
											1 job subscription
										</div>
										<div className='AdminDashboardProgressTitleTime'>2:45</div>
									</div>
									<div className='AdminDashboardProgressContainer'>
										<Progress
											bar
											color='success'
											className='AdminDashboardSignleProgressbar'
											value='100'
										/>
									</div>
									<div className='AdminDashboardProgressTitleContainer'>
										<div className='AdminDashboardProgressTitle'>
											3 job subscription
										</div>
										<div className='AdminDashboardProgressTitleTime'>2:45</div>
									</div>
									<div className='AdminDashboardProgressContainer'>
										<Progress
											bar
											color='success'
											className='AdminDashboardSignleProgressbar'
											value='100'
										/>
									</div>
									<div className='AdminDashboardProgressTitleContainer'>
										<div className='AdminDashboardProgressTitle'>Unlimited</div>
										<div className='AdminDashboardProgressTitleTime'>2:45</div>
									</div>
									<div className='AdminDashboardProgressContainer'>
										<Progress
											bar
											color='success'
											className='AdminDashboardSignleProgressbar'
											value='100'
										/>
									</div>
								</div>
							</div>
						</div>
						<div className='AdminDashboardProgressAllContainer'>
							<div className='AdminDashboardProgrssDisplayContainer'>
								<div className='AdminDashboardProgressDisplayTitle'>
									Total of Jobs by Trade
								</div>
								<div className='AdminDashboardProgressCardDisplay'>
									<div className='AdminDashboardProgressTitleContainer'>
										<div className='AdminDashboardProgressTitle'>
											1 job subscription
										</div>
										<div className='AdminDashboardProgressTitleTime'>2:45</div>
									</div>
									<div className='AdminDashboardProgressContainer'>
										<Progress
											bar
											color='success'
											className='AdminDashboardSignleProgressbar'
											value='100'
										/>
									</div>
									<div className='AdminDashboardProgressTitleContainer'>
										<div className='AdminDashboardProgressTitle'>
											3 job subscription
										</div>
										<div className='AdminDashboardProgressTitleTime'>2:45</div>
									</div>
									<div className='AdminDashboardProgressContainer'>
										<Progress
											bar
											color='success'
											className='AdminDashboardSignleProgressbar'
											value='100'
										/>
									</div>
									<div className='AdminDashboardProgressTitleContainer'>
										<div className='AdminDashboardProgressTitle'>Unlimited</div>
										<div className='AdminDashboardProgressTitleTime'>2:45</div>
									</div>
									<div className='AdminDashboardProgressContainer'>
										<Progress
											bar
											color='success'
											className='AdminDashboardSignleProgressbar'
											value='100'
										/>
									</div>
								</div>
							</div>
							<div className='AdminDashboardProgrssDisplayContainerEmployeer'>
								<div className='AdminDashboardProgressDisplayTitle'>
									Total of Users by Trade
								</div>
								<div className='AdminDashboardProgressCardDisplay'>
									<div className='AdminDashboardProgressTitleContainer'>
										<div className='AdminDashboardProgressTitle'>
											1 job subscription
										</div>
										<div className='AdminDashboardProgressTitleTime'>2:45</div>
									</div>
									<div className='AdminDashboardProgressContainer'>
										<Progress
											bar
											color='success'
											className='AdminDashboardSignleProgressbar'
											value='100'
										/>
									</div>
									<div className='AdminDashboardProgressTitleContainer'>
										<div className='AdminDashboardProgressTitle'>
											3 job subscription
										</div>
										<div className='AdminDashboardProgressTitleTime'>2:45</div>
									</div>
									<div className='AdminDashboardProgressContainer'>
										<Progress
											bar
											color='success'
											className='AdminDashboardSignleProgressbar'
											value='100'
										/>
									</div>
									<div className='AdminDashboardProgressTitleContainer'>
										<div className='AdminDashboardProgressTitle'>Unlimited</div>
										<div className='AdminDashboardProgressTitleTime'>2:45</div>
									</div>
									<div className='AdminDashboardProgressContainer'>
										<Progress
											bar
											color='success'
											className='AdminDashboardSignleProgressbar'
											value='100'
										/>
									</div>
								</div>
							</div>
						</div>
						<div className='AdminDashboardProgressAllContainer'>
							<div className='AdminDashboardProgrssDisplayContainer'>
								<div className='AdminDashboardProgressDisplayTitle'>
									User Engagement
								</div>
								<div className='AdminDashboardProgressCardDisplay'>
									<div className='AdminProgressInnerCustomizer'>
										<div className='AdminDashboardSignedon'>Signed on</div>
										<div className='AdminDashboardSignedValue'>480</div>
										<Progress multi>
											<Progress bar color='ios' value='12' />
											<Progress bar color='android' value='12' />
											<Progress bar color='mobile' value='20' />
											<Progress bar color='pc' value='56' />
										</Progress>
										<div className='AdminDashboardShowPercentaage'>
											<div className='AdminDashboardDotCustomize'></div>
											<div className='AdminDashboardDotValue'>ios 12%</div>
										</div>
									</div>
								</div>
							</div>
							<div className='AdminDashboardProgrssDisplayContainerEmployeer'>
								<div className='AdminDashboardProgressDisplayTitle'>
									Employer engagement
								</div>
								<div className='AdminDashboardProgressCardDisplay'>
									<div className='AdminProgressInnerCustomizer'>
										<div className='AdminDashboardSignedon'>Signed on</div>
										<div className='AdminDashboardSignedValue'>480</div>
										<Progress multi>
											<Progress bar color='mobile' value='45' />
											<Progress bar color='pc' value='55' />
										</Progress>
										<div className='AdminDashboardShowPercentaage'>
											<div className='AdminDashboardDotCustomize'></div>
											<div className='AdminDashboardDotValue'>ios 12%</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='AdminDashboardLowerCardCustomize'>
							<div className='AdminDashboardLowerRightCard'>
								<div className='AdminDashboardShowDataArrorContainer'>
									<div className='AdminDashboardArrowInnerContent'>
										<div className='AdminDashboardArrowText'>
											Total jobs applied for
										</div>
										<div className='AdminDashboardArrowValue'>
											<div className='AdminDashboardArrowTextIcon'>
												<img src={UpArrow} />
											</div>
											<div className='AdminDashboardArrowTextValueDisplay'>
												34K
											</div>
										</div>
									</div>
								</div>
								<div className='AdminDashboardSingleProgress'>
									Website Sessions
								</div>
								<div className='AdminDashboardShowDataArrorContainer'>
									<div className='AdminDashboardArrowInnerContent'>
										<div className='AdminDashboardArrowText'>
											Total jobs applied for
										</div>
										<div className='AdminDashboardArrowValue'>
											<div className='AdminDashboardArrowTextIcon'>
												<img src={DownArrow} />
											</div>
											<div className='AdminDashboardArrowTextValueDisplay'>
												34K
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='AdminDashboardLowerLeftCard'>
								<div className='AdminDashboardShowDataArrorContainer'>
									<div className='AdminDashboardArrowInnerContent'>
										<div className='AdminDashboardArrowText'>Signed on</div>
										<div className='AdminDashboardArrowValue'>
											<div className='AdminDashboardArrowTextIcon'>
												<img src={UpArrow} />
											</div>
											<div className='AdminDashboardArrowTextValueDisplay'>
												34K
											</div>
										</div>
									</div>
								</div>
								<div className='AdminDashboardSingleProgress'>
									Time on platform
								</div>
								<div className='AdminDashboardProgressDisplayTradeEmploy'>
									<div className='AdminDashboardProgressTitleContainer'>
										<div className='AdminDashboardProgressTitle'>
											Tradesperson
										</div>
										<div className='AdminDashboardProgressTitleTime'>2:45</div>
									</div>
									<div className='AdminDashboardProgressContainer'>
										<Progress
											bar
											color='success'
											className='AdminDashboardSignleProgressbar'
											value='100'
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
const mapStateToProps = (state) => {
	return {
		datacount: state.adminReducer.datacount.data,
	}
}
export default connect(mapStateToProps, { adminDataCountAction })(
	DashbordHomePage
)
