import React, { useState } from 'react'
import { Input, Badge, Label } from 'reactstrap'
import { AdminSidebar, AdminNavbar } from '../../../component/admin'
import { TopAdminbutton } from '../../../component/admin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DisplayImage from '../../../assets/images/companyimage.png'
import {
	AdminInputCheckBox,
	InputCheckBox,
} from '../../../component/common/FormComponent/form'
import { ButtonWithCustyomeStyling } from '../../../component'
import LocationIcon from '../../../assets/images/icons/location-icon.png'
import './adminSubscribe.css'
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
interface Props {
	title?: string
}
export const SubscriptionManagementPage: React.FC<Props> = (props: Props) => {
	const [permession, setPermession] = useState(false)
	let [filterButtonClass, setFilterButtonClass] = useState('')

	const onGrantPremission = () => {
		setPermession(!permession)
	}
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
						<div className='AdminSubscribeDataDIsplayButtonContainer'>
							<div className='Savedjobs__Body--Filter'>
								<button
									onClick={() => {
										setFilterButtonClass('')
										// props.getSavedJobs(pageParams)
									}}
									className={filterButtonClass === '' ? 'active' : ''}
								>
									All
								</button>
								<button
									onClick={() => {
										setFilterButtonClass('7Days')
										// props.getSavedJobsWithFilter(savedJobsParams7)
									}}
									className={filterButtonClass === '7Days' ? 'active' : ''}
								>
									Last 7 Days
								</button>
								<button
									onClick={() => {
										setFilterButtonClass('30Days')
										// props.getSavedJobsWithFilter(savedJobsParams30)
									}}
									className={filterButtonClass === '30Days' ? 'active' : ''}
								>
									Last 30 Days
								</button>
							</div>
						</div>
						<div className='AdminSubscribeNameRowDisplay'>
							<div className='AdminSubscribeRowTitleCompany'>Company</div>
							<div className='AdminSubscribeRowTitleJobPosted'>jobs posted</div>
							<div className='AdminSubscribeRowTitleJoinDate'>join date</div>
							<div className='AdminSubscribeRowTitleBillAmount'>
								monthly billed amount
							</div>
							<div className='AdminSubscribeRowTitle'>subscription status</div>
						</div>
						<div className='AdminSubscribeCardComponent'>
							<div className='AdminSubscribeCardComponentCustomizer'>
								<div className='AdminSubscribeAvatarCompanyContainer'>
									<div className='AdminManageAvatarContainer'>
										<img
											className='AdminManageImgeDisplay'
											src={DisplayImage}
											alt='avatar'
										/>
									</div>
									<div className='AdminSubscribeCompanyName'>Microsoft</div>
								</div>
								<div className='AdminSubscribeJobPostedTotalCount'>28</div>
								<div className='AdminSubscribeJobPostedDate'>12 Feb 2020</div>
								<div className='AdminSubscribeJobPostedMonthly'>$200</div>
								<div className='AdminSubscribeJobPostedBadeContainer'>
									<Badge className='AdminSubscribeStatusBadge'>Status</Badge>
								</div>
								<div
									className='AdminSubscribeJobPostedMenuIcon'
									onClick={onGrantPremission}
								>
									<FontAwesomeIcon
										className='AdminSubscribeMenubarCustomize'
										icon={faBars}
									/>
								</div>
							</div>
						</div>
						{permession && (
							<div className='AdminSubscribePopupOuterContainer'>
								<div className='AdminSubscribePopUpContainer'>
									<div className='AdminSubscribePopupInnerContainer'>
										Refund
									</div>
									<div className='AdminSubscribePopupInnerContainer'>
										Upgrade
									</div>
									<div className='AdminSubscribePopupInnerContainer'>
										downgrade
									</div>
									<div className='AdminSubscribePopupInnerContainer'>
										Update billing info
									</div>
									<div className='AdminSubscribePopupInnerContainerCancel'>
										Cancel
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
export default SubscriptionManagementPage
