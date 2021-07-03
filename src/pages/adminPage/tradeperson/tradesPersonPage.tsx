import React, { useState, useEffect } from 'react'
import { Input, Badge } from 'reactstrap'
import { AdminSidebar, AdminNavbar } from '../../../component/admin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DisplayImage from '../../../assets/images/companyimage.png'
import { ButtonWithCustyomeStyling } from '../../../component'
import LocationIcon from '../../../assets/images/icons/location-icon.png'
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { adminTradePersonAction } from '../../../store/action/adminAction'
import './adminTrade.css'
interface Props {
	title?: string
	adminTradePersonAction: () => void
	worker: any
}
export const TradePersonPage: React.FC<Props> = (props: Props) => {
	let [filterButtonClass, setFilterButtonClass] = useState('')
	const { adminTradePersonAction, worker } = props

	useEffect(() => {
		adminTradePersonAction()
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
						<div className='AdminFilterandInputOuterContainer'>
							<div className='AdminFilterInputCustomizeOuterContainer'>
								<Input
									className='AdminFilterInputCustomize'
									type='select'
									name='select'
									id='exampleSelect'
								>
									<option>All</option>
									<option>Active</option>
									<option>Inactive</option>
									<option>disabled</option>
								</Input>
							</div>
							<div className='AdminSearchandFilter'>
								<div className='AdminSearchBarOuter'>
									<div className='AdminSearchContainer'>
										<FontAwesomeIcon
											className='AdminSearchIconColorChange'
											icon={faSearch}
										/>
										<input
											type='text'
											className='AdminSearchTextInputField'
											name='search'
											placeholder='Search...'
										/>
									</div>
								</div>
							</div>
						</div>
						<div className='AdminCompanyBadgeCustomize'>
							<Badge className='AdminCompanyBadgeTrade'>Active</Badge>
						</div>
						<div className='AdminTradeCardComponent'>
							<div className='AdminTradeInnerCardContainerCustomize'>
								<div className='AdminTradeCardUpperContentContainer'>
									<div className='AdminTradeAvatarCustomize'>
										<img
											className='AdminTradeAvatarImage'
											src={DisplayImage}
											alt='avatar'
										/>
									</div>
									<div className='AdminTradeCardContentNameLocationContainer'>
										<div className='AdminTradeCardNameRatingContainer'>
											<div className='AdminTradeCardNameDisplay'>
												Marta Scorses
											</div>
											<div className='AdmiTradeCardIconContainer'>
												<FontAwesomeIcon
													className='AdminTradeCardStarIcon'
													icon={faStar}
												/>
											</div>

											<div className='AdminTradeCardNameDisplayRating'>4.9</div>
										</div>
										<div className='AdminTradeCardLocationContainer'>
											<div className='AdminTradeCardLocationImageDisplay'>
												<img src={LocationIcon} alt='location' />
											</div>
											<div className='AdminTradeCardLocationDisplay'>
												Charlote
											</div>
											<div className='AdminTradeCardJoinedYearDisplay'>
												joined 2 years ago
											</div>
										</div>
										<div className='AdminTradeCardLaborTypeContainer'>
											General Labor, Carpentry
										</div>
									</div>
									<div className='AdminTradeInputCustomizeOuterContainer'>
										<Input
											className='AdminFilterInputCustomize'
											type='select'
											name='select'
											id='exampleSelect'
										>
											<option>All</option>
											<option>Active</option>
											<option>Inactive</option>
											<option>disabled</option>
										</Input>
									</div>
								</div>

								<div className='AdminCompanyDisplayButton'>
									<div className='Savedjobs__Body--Filter'>
										<button
											onClick={() => {
												setFilterButtonClass('')
												// props.getSavedJobs(pageParams)
											}}
											className={filterButtonClass === '' ? 'active' : ''}
										>
											Applied jobs
										</button>
										<button
											onClick={() => {
												setFilterButtonClass('View Messages')
												// props.getSavedJobsWithFilter(savedJobsParams7)
											}}
											className={
												filterButtonClass === 'View Messages' ? 'active' : ''
											}
										>
											View Messages
										</button>
										<button
											onClick={() => {
												setFilterButtonClass('Profile')
												// props.getSavedJobsWithFilter(savedJobsParams30)
											}}
											className={
												filterButtonClass === 'Profile' ? 'active' : ''
											}
										>
											Profile
										</button>
										<button
											onClick={() => {
												setFilterButtonClass('Posts')
												// props.getSavedJobsWithFilter(savedJobsParams30)
											}}
											className={filterButtonClass === 'Posts' ? 'active' : ''}
										>
											Posts
										</button>
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
const mapStateToProps = (state: any) => ({
	worker: state.adminReducer.worker.data,
})
export default connect(mapStateToProps, {
	adminTradePersonAction,
})(TradePersonPage)
