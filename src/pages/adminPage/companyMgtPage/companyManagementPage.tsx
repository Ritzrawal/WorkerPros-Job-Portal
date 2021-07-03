import React, { useState, useEffect } from 'react'
import { Input, Badge } from 'reactstrap'
import {
	AdminSidebar,
	AdminNavbar,
	AdminButton,
} from '../../../component/admin'
import { ProfileDummyImage } from '../../../component/logosAndIcons'
import { connect } from 'react-redux'
import { adminCompanyAction } from '../../../store/action/adminAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DisplayImage from '../../../assets/images/companyimage.png'
import { ButtonWithCustyomeStyling } from '../../../component'
import LocationIcon from '../../../assets/images/icons/location-icon.png'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './admincomany.css'
interface Props {
	title?: string
	adminCompanyAction: () => void
	company?: any
}

export const CompanyManagementPage: React.FC<Props> = (props: Props) => {
	let [filterButtonClass, setFilterButtonClass] = useState('')

	const { adminCompanyAction, company } = props

	useEffect(() => {
		adminCompanyAction()
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
						{company?.map((items, index) => {
							return (
								<div key={index}>
									<div className='AdminCompanyBadgeCustomize'>
										<Badge className='AdminCompanyBadge'>Active</Badge>
									</div>
									<div className='AdminCompanyCardComponent'>
										<div className='AdminCompanyImageContainer'>
											<img
												className='AdminDisplayImageComanyLogo'
												src={
													items.images || items.images.length !== 0
														? `${process.env.REACT_APP_IMAGE_URL}${items.images[0]}`
														: ProfileDummyImage
												}
												alt='alt'
											/>
										</div>
										<div className='AdminCompanyCardContentContainer'>
											<div className='AdminCompanyWithLocationAndInputContainer'>
												<div className='AdminCompanyAvatarCustomize'>
													<img
														className='AdminCompanyAvatarImage'
														src={
															items.profile_image
																? `${process.env.REACT_APP_IMAGE_URL}${items.profile_image}`
																: ProfileDummyImage
														}
													/>
												</div>
												<div className='AdminCompanyTitleCustomizeContainer'>
													<div className='AdminCompanyTitleTextStyling'>
														{items.company_name}
													</div>
													{items?.address?.city && (
														<div className='AdminCompanyLocationIconContainer'>
															<div className='AdminCompanyLocationIcon'>
																<img src={LocationIcon} alt='location' />
															</div>
															<div className='AdminCompanyLocationCity'>
																{items?.address?.city}
															</div>
														</div>
													)}
												</div>
												<div className='AdminFilterInputInsideCardCustomize'>
													<Input
														className='AdminFilterInputCustomize'
														type='select'
														name='select'
														id='exampleSelect'
													>
														<option>Active</option>
														<option>Inactive</option>
														<option>In-Process</option>
													</Input>
												</div>
											</div>
											<div className='AdminCompanyDisplayTextData'>
												{items?.overview}
											</div>
											<div className='AdminCompanyDisplayButtonContainer'>
												<div className='Savedjobs__Body--Filter'>
													<button
														onClick={() => {
															setFilterButtonClass(`${index}`)
															// props.getSavedJobs(pageParams)
														}}
														className={
															filterButtonClass === `${index}` ? 'active' : ''
														}
													>
														View 21 Jobs
													</button>
													<button
														onClick={() => {
															setFilterButtonClass(`View Messages ${index}`)
															// props.getSavedJobsWithFilter(savedJobsParams7)
														}}
														className={
															filterButtonClass === `View Messages ${index}`
																? 'active'
																: ''
														}
													>
														View Messages
													</button>
													<button
														onClick={() => {
															setFilterButtonClass(`Profile ${index}`)
															// props.getSavedJobsWithFilter(savedJobsParams30)
														}}
														className={
															filterButtonClass === `Profile ${index}`
																? 'active'
																: ''
														}
													>
														Profile
													</button>
													<button
														onClick={() => {
															setFilterButtonClass(`Subscriptions ${index}`)
															// props.getSavedJobsWithFilter(savedJobsParams30)
														}}
														className={
															filterButtonClass === `Subscriptions ${index}`
																? 'active'
																: ''
														}
													>
														Subscriptions
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</>
	)
}
const mapStateToProps = (state: any) => ({
	company: state.adminReducer.company.data,
})
export default connect(mapStateToProps, {
	adminCompanyAction,
})(CompanyManagementPage)
