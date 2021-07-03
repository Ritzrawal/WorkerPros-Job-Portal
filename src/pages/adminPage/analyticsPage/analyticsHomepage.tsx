import React from 'react'
import { Progress } from 'reactstrap'
import { AdminSidebar, AdminNavbar } from '../../../component/admin'
import { TopAdminbutton } from '../../../component/admin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'
interface Props {
	title?: string
}
// import './admindashboard.css'
export const AnalyticsHomePage: React.FC<Props> = () => {
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
							<div className='AdminTopSmallCardDisplay'>
								<div className='AdminTopSmallCardDisplayTitle'>
									Pending Employers
								</div>
								<div className='AdminTopSmallCardDisplayTitleBold'>
									<div className='AdminTopSmallCardBolTitle'>52</div>
									<div className='AdminTopSmallCardBolTitlePlusminus'>+5%</div>
								</div>
							</div>
							<div className='AdminTopSmallCardDisplay'></div>
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
							<div className='AdminDashboardGraphGraphDisplay'></div>
						</div>

						<div className='AdminDashboardProgrssDisplayContainer'>
							<div className='AdminDashboardProgressDisplayTitle'>
								User Engagement
							</div>
							<div className='AdminDashboardProgressCardDisplay'>
								<div className='AdminProgressInnerCustomizer'>
									<div className='AdminDashboardSignedon'>Signed on</div>
									<div className='AdminDashboardSignedValue'>480</div>
									<Progress multi>
										<Progress bar color='success' value='12' />
										<Progress bar color='danger' value='12' />
										<Progress bar color='info' value='20' />
										<Progress bar color='warning' value='56' />
									</Progress>
									<div className='AdminDashboardShowPercentaage'>
										<div className='AdminDashboardDotCustomize'></div>
										<div className='AdminDashboardDotValue'>ios 12%</div>
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
												<FontAwesomeIcon
													icon={faArrowCircleUp}
													className='AdminUpArrowIconCustomize'
												/>
											</div>
											<div className='AdminDashboardArrowTextValueDisplay'>
												34K
											</div>
										</div>
									</div>
								</div>
								<div className='AdminDashboardShowDataArrorContainer'>
									<div className='AdminDashboardArrowInnerContent'>
										<div className='AdminDashboardArrowText'>
											Total jobs applied for
										</div>
										<div className='AdminDashboardArrowValue'>
											<div className='AdminDashboardArrowTextIcon'>
												<FontAwesomeIcon
													icon={faArrowCircleUp}
													className='AdminUpArrowIconCustomize'
												/>
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
										<div className='AdminDashboardArrowText'>
											Total jobs applied for
										</div>
										<div className='AdminDashboardArrowValue'>
											<div className='AdminDashboardArrowTextIcon'>
												<FontAwesomeIcon
													icon={faArrowCircleUp}
													className='AdminUpArrowIconCustomize'
												/>
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
export default AnalyticsHomePage