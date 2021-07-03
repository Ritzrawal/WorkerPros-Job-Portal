import React, { useEffect, useState, useRef } from 'react'
import moment from 'moment'
import './profileDisplay.css'
import {
	ButtonComponent,
	ButtonWithCustyomeStyling,
	ButtonWithCusmWithLogo,
} from '../../component'
import { HeaderPage2 } from '../headerPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProfileWorkExperience from '../profilePage/profileWorkExperience'
import { getUsersSuggestion } from '../../store/action/socialFeatureAction'
import { connect } from 'react-redux'
import { profileAllInfoAction } from '../../store/action/profileAction'
import { ProfileDummyImage } from '../../component/logosAndIcons'
import {
	faShareAlt,
	faStar,
	faEdit,
	faPlus,
	faPencilRuler,
	faAngleRight,
	faChevronDown,
	faHandPointRight,
} from '@fortawesome/free-solid-svg-icons'
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
import { ConnectionCard } from '../workerDashboard/components'
import { useHistory } from 'react-router'
import { Modal } from 'reactstrap'
interface Props {
	title: string
	profileAllInfoAction: () => void
	singleProfileAction: () => void
	getUsersSuggestion: () => void
	profileinfo: any
	newprofileinfo: any
	singleprofileinfo: any
	userlist: any
}
const ProfileDisplayPage: React.FC<Props> = (
	props: Props
): React.ReactElement => {
	const history = useHistory()
	const [social, setSocial] = useState(false)
	const [show, setShow] = useState(false)
	const [profileFlag, setProfileFlag] = useState(false)
	const [editFlag, setEditFlag] = useState(false)
	const [single, setSingle] = useState(false)
	const [scroll, setScroll] = useState('')
	let shareUrl = window.location.href
	const myRef: any = useRef(null)
	const skillRef: any = useRef(null)
	const gigRef: any = useRef(null)
	const certficateRef: any = useRef(null)
	useEffect(() => {
		console.log('single', props.singleprofileinfo.length)
		props.profileAllInfoAction()

		props.getUsersSuggestion()
	}, [])
	const onShare = () => {
		setSocial(!social)
	}
	const onEditHandle = () => {
		history.push('/profile/setting')
	}
	const onUpdate = (params: any) => {
		setShow(!show)
		console.log('hello data')
	}
	const cancelCommentDelete = () => {
		setProfileFlag(true)
		setEditFlag(false)
		setShow(!show)
	}
	const onAddExperience = () => {
		setProfileFlag(true)
		setEditFlag(true)
		setShow(!show)
	}
	const onProfileClick = (flag: any) => {
		console.log('single', single, props.newprofileinfo.length)
		setSingle(flag)
	}
	const ScrollWorkExperience = () => {
		myRef.current.scrollIntoView(), setScroll('Work Experience')
	}
	const ScrollSkills = () => {
		skillRef.current.scrollIntoView(), setScroll('Skills')
	}
	const ScrollGigExperience = () => {
		gigRef.current.scrollIntoView(), setScroll('Gig Experience')
	}
	const ScrollCertificate = () => {
		certficateRef.current.scrollIntoView(), setScroll('Certifiations')
	}
	const profileinfo =
		props.singleprofileinfo.length === 0
			? props.newprofileinfo
			: props.singleprofileinfo
	return (
		<div className='ProfileDisplayMainContainer'>
			<div className='ProfileDisplayHeader'>
				<HeaderPage2 />
			</div>

			<div className='ProfileDisplayContents'>
				<div className='ProfileDisplayAvatarContainer'>
					<div className='ProfileDisplayAvatarContainImage'>
						<img
							className='ProfileAvatartContainerCustomize'
							src={
								profileinfo && profileinfo?.profile_image !== ''
									? `${process.env.REACT_APP_IMAGE_URL}${profileinfo?.profile_image}`
									: ProfileDummyImage
							}
						/>
					</div>
					<div className='ProfileDisplayAvatarContainNameDes'>
						<div className='ProfileDisplayAvatarContainConnect'>
							<div className='AvatartContainConnectnameYear'>
								<div className='AvatarContaineNameCustomize'>
									<div className='AvatarContainNameDisplayTitle'>
										{profileinfo?.first_name}
										<span className='AvatarContainNameDisplayTitleLastName'>
											{profileinfo && profileinfo.last_name}
										</span>
									</div>
									<div className='AvatarContainNameDisplayRating'>
										<FontAwesomeIcon icon={faStar} size='lg' />
										<span className='AvatarDisplayRating'>4.98</span>
									</div>
								</div>
								<div className='AvatarContainerJoinYear'>
									joined {moment(profileinfo?.created_at).fromNow()}
								</div>
							</div>
							<div className='AvatartContainConnectButtonsShare'>
								{props.singleprofileinfo.length === 0 ? (
									<div className='ActiveConnectButton'>
										<ButtonWithCustyomeStyling
											height={35}
											width={153}
											color='#FFFFFF'
											clickHandler={onEditHandle}
											marginRight={10}
											backgroundColor='#2EC2E2'
											borderColor='#2EC2E2'
											buttonTitle='Edit'
										/>

										<div className='ActiveShareIcon' onClick={onShare}>
											<FontAwesomeIcon icon={faShareAlt} />
										</div>
									</div>
								) : (
									<div className='ActiveConnectButton'>
										<ButtonWithCustyomeStyling
											height={35}
											width={153}
											color='#FFFFFF'
											marginRight={10}
											backgroundColor='#2EC2E2'
											borderColor='#2EC2E2'
											buttonTitle='Connect'
										/>
										{/* <ButtonWithCustyomeStyling
											height={35}
											width={153}
											color='#6B7A90'
											backgroundColor='#FFFFFF'
											borderColor='#C7D0DE'
											buttonTitle='Save Profile'
										/> */}

										<div className='ActiveShareIcon' onClick={onShare}>
											<FontAwesomeIcon icon={faShareAlt} />
										</div>
									</div>
								)}
							</div>
						</div>
						<div className='ProfileDisplayAvatarContainlabel'>
							<div className='ProfileDisplaySkillLevelCUstomizerContainer'>
								<div className='ProfileAvatarSkillLevelTitle'>skill level</div>
								{profileinfo?.categories &&
									profileinfo?.categories?.map((items, index) => {
										if (items.is_primary == true) {
											return (
												<div
													className='ProfileAvatarGanerallLevelTitle'
													key={index}
												>
													{items.title}
												</div>
											)
										}
									})}
							</div>
							{social && (
								<div className='ProfileSocailSharingIcon'>
									<FacebookShareButton
										url={shareUrl}
										className='SocialLoginIconCustomizeProfile'
									>
										<FacebookIcon size={32} round />
									</FacebookShareButton>
									<EmailShareButton
										url={shareUrl}
										className='SocialLoginIconCustomizeProfile'
									>
										<EmailIcon size={32} round />
									</EmailShareButton>
									<LinkedinShareButton
										url={shareUrl}
										className='SocialLoginIconCustomizeProfile'
									>
										<LinkedinIcon size={32} round />
									</LinkedinShareButton>
									<WhatsappShareButton
										url={shareUrl}
										className='SocialLoginIconCustomizeProfile'
									>
										<WhatsappIcon size={32} round />
									</WhatsappShareButton>
									<TwitterShareButton
										url={shareUrl}
										className='SocialLoginIconCustomizeProfile'
									>
										<TwitterIcon size={32} round />
									</TwitterShareButton>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className='ProfileDisplayLowerMainContainer'>
					<div className='ProfileDisplayCardConteiner'>
						<div className='ProfileDisplaySkillsCard'>
							<div className='ProfileDisplaySideCardTitleDisplay'>
								<div
									className={
										scroll === ''
											? 'ProfileDisplayonclickText'
											: 'ProfileDisplayTitleCustomizeSideCard'
									}
									onClick={() => setScroll('')}
								>
									Trades
									{scroll === '' ? (
										<span>
											<FontAwesomeIcon
												className='FontRightArrowIconCustomize'
												icon={faAngleRight}
											/>
										</span>
									) : null}
								</div>
								<div
									className={
										scroll === 'Skills'
											? 'ProfileDisplayonclickText'
											: 'ProfileDisplayTitleCustomizeSideCard'
									}
									onClick={ScrollSkills}
								>
									Skills
									{scroll === 'Skills' ? (
										<span>
											<FontAwesomeIcon
												className='FontRightArrowIconCustomize'
												icon={faAngleRight}
											/>
										</span>
									) : null}
								</div>
								<div
									className={
										scroll === 'Work Experience'
											? 'ProfileDisplayonclickText'
											: 'ProfileDisplayTitleCustomizeSideCard'
									}
									onClick={ScrollWorkExperience}
								>
									Work Experience
									{scroll === 'Work Experience' ? (
										<span>
											<FontAwesomeIcon
												className='FontRightArrowIconCustomize'
												icon={faAngleRight}
											/>
										</span>
									) : null}
								</div>
								<div
									className={
										scroll === 'Gig Experience'
											? 'ProfileDisplayonclickText'
											: 'ProfileDisplayTitleCustomizeSideCard'
									}
									onClick={ScrollGigExperience}
								>
									Gig Experience
									{scroll === 'Gig Experience' ? (
										<span>
											<FontAwesomeIcon
												className='FontRightArrowIconCustomize'
												icon={faAngleRight}
											/>
										</span>
									) : null}
								</div>
								<div
									className={
										scroll === 'Certifiations'
											? 'ProfileDisplayonclickText'
											: 'ProfileDisplayTitleCustomizeSideCard'
									}
									onClick={ScrollCertificate}
								>
									Certifiations
									{scroll === 'Certifiations' ? (
										<span>
											<FontAwesomeIcon
												className='FontRightArrowIconCustomize'
												icon={faAngleRight}
											/>
										</span>
									) : null}
								</div>
							</div>
						</div>
						<div className='profileDisplaySuggestionTitle'>
							Suggestions For You
						</div>
						<div className='profileDisplayPageSuggestionSection'>
							{props?.userlist?.slice(1, 4).map((item, index) => {
								return (
									<ConnectionCard
										key={index}
										firstName={item.first_name}
										lastName={item.last_name}
										userId={item.user_id}
										userImage={item.profile_image}
										onClickProfile={onProfileClick}
										buttonTitle='Connect'
									/>
								)
							})}
						</div>
					</div>
					<div className='ProfileDisplayDescription'>
						<div className='ProfielDisplayContentTag'>
							<div className='ProfileDisplayTageTitle'>Trades</div>
							<div className='ProfileDisplayTagTrades'>
								{profileinfo?.categories &&
									profileinfo?.categories?.map((items, index) => {
										return (
											<ButtonWithCusmWithLogo
												faIcon={faPencilRuler}
												key={index}
												height={35}
												marginRight={14}
												color='#FFFFFF'
												backgroundColor='#234476'
												borderColor='#234476'
												buttonYear={items.experience_time}
												buttonTitle={items.title}
											/>
										)
									})}
							</div>
						</div>
						<div className='ProfielDisplayContentSkills' ref={skillRef}>
							<div className='ProfileDisplaySkillsInnerContainer'>
								<div className='ProfileDisplayTitleCustomize'>Skills</div>
								{profileinfo?.categories &&
									profileinfo?.categories?.map((items, index) => {
										return (
											<div key={index}>
												<div className='ProfileDisplaySubTitleCustomize'>
													{items.title}
												</div>
												<div className='profileDisplayPageCategoryCardDiv'>
													{items.skills.map((item, i) => {
														return (
															<div
																className='ProfileDisplayTagSKillsCustomize'
																key={i}
															>
																<ButtonWithCustyomeStyling
																	height={35}
																	// width={153}
																	marginRight={8}
																	color='#234476'
																	backgroundColor='#CAD8ED'
																	borderColor='#CAD8ED'
																	buttonTitle={item}
																/>
															</div>
														)
													})}
												</div>
											</div>
										)
									})}
							</div>
						</div>
						<div className='ProfielDisplayContentWorkExperience' ref={myRef}>
							<div className='ProfileDisplayWorkExperiencTitleContainer'>
								<div className='WorkExperienceTitleContainer'>
									<div className='WorkExperienceTitleCustomize'>
										Work Experience
									</div>
									<div className='WorkExperienceTitleCustomizeLogo'>
										<div className='ActiveShareIconEdit'>
											<FontAwesomeIcon
												icon={faEdit}
												onClick={cancelCommentDelete}
											/>
										</div>
										<div className='ActiveShareIconEdit'>
											<FontAwesomeIcon
												icon={faPlus}
												onClick={onAddExperience}
											/>
										</div>
									</div>
									<Modal isOpen={show} centered toggle={cancelCommentDelete}>
										<ProfileWorkExperience
											onClickNext={onShare}
											onDisplayRouter={onShare}
											getSelectedProfileList={(profiles) => onUpdate(profiles)}
											profileFlag={profileFlag}
											addFlag={editFlag}
										/>
									</Modal>
								</div>
								{profileinfo?.work_experience &&
									profileinfo?.work_experience?.map((items, index) => {
										return (
											<div
												className='ProfileWorkCorporationContainer'
												key={index}
											>
												<div className='ProfileCorporationTitleCustomize'>
													{items.company_name}
												</div>
												<div className='ProfileCorporationSubTitleCustomize'>
													{items.from.month}
													<span className='ProfileYearTextCustomize'>
														{items.from.year}
													</span>{' '}
													-<span> {items.to.month}</span>
													<span className='ProfileYearTextCustomize'>
														{items.to.year}
													</span>
												</div>
												<div className='ProfileCorporationContainercutomization'>
													<div className='ProfileCorporationTypeNameCustomize'>
														<div className='ProfileDisplayNameCustomize'>
															building Type:
														</div>
														<div className='ProfileDisplayNameDisplayCustomize'>
															Commercial
														</div>
													</div>
													<div className='ProfileCorporationTypeNameCustomize'>
														<div className='ProfileDisplayNameCustomize'>
															Project Type::
														</div>
														<div className='ProfileDisplayNameDisplayCustomize'>
															{items.role}
														</div>
													</div>
													<div className='ProfileCorporationTypeNameCustomize'>
														<div className='ProfileDisplayNameCustomize'>
															Role::
														</div>
														<div className='ProfileDisplayNameDisplayCustomize'>
															{items.role}
														</div>
													</div>
													<div className='ProfileCorporationTypeNameCustomize'>
														<div className='ProfileDisplayNameCustomize'>
															Trade:
														</div>
														<div className='ProfileDisplayNameDisplayCustomize'>
															{items.role}
														</div>
													</div>
												</div>

												<div className='ProfileRefrenceButtonCustomize'>
													<ButtonWithCusmWithLogo
														faIcon={faChevronDown}
														height={35}
														width={180}
														marginRight={14}
														color='#000000'
														iconColor='#2EC2E2'
														backgroundColor='#FFFFFF'
														borderColor='rgba(0, 0, 0, 0.06)'
														buttonTitle='7 refrences'
													/>
												</div>
											</div>
										)
									})}
							</div>
						</div>
						<div
							className='ProfielDisplayContentGigExperience'
							ref={certficateRef}
						>
							<div className='CertificateProfileGigOuterContainer'>
								<div className='ProfileGigTitleCustomize'>Certificate</div>

								{profileinfo?.certificates?.map((items, index) => {
									return (
										<div className='ProfileGigCardComponent' key={index}>
											<div className='ProfileCertificateCardHeaderLine'>
												<FontAwesomeIcon
													icon={faHandPointRight}
													size='lg'
													color=' #2ec2e2'
													className='CertificateAwesomeLogoCustomize'
												/>
												<div className='CertificateTitleDarkCustomize '>
													{items}
												</div>
											</div>
										</div>
									)
								})}
							</div>
						</div>
						<div className='ProfielDisplayContentGigExperience' ref={gigRef}>
							<div className='ProfileGigOuterContainer'>
								<div className='ProfileGigTitleCustomize'>Gig Experience</div>
								<div className='ProfileGigCardComponent'>
									<div className='ProfileGigCardHeaderLine'>
										<div className='GigCardTitleDarkCustomize'>
											Completed 23 Gigs as General Labor
										</div>

										<div className='GigCardSubTitleDarkCustomize'>
											Completed 23 Gigs as General Labor
										</div>
									</div>
									<div className='ProfileGigCardHeaderLineLogo'>
										<div className='ProfileGigStarCountCustomizeLogo'>
											<FontAwesomeIcon icon={faStar} size='lg' />
										</div>
										<div className='ProfileGigStarCountCustomize'>
											5 Stars Avg.
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
const mapStateToProps = (state: any) => ({
	newprofileinfo: state.profileReducer.profileinfo,
	singleprofileinfo: state.profileReducer.singleprofileinfo,
	userlist: state.usersListReducer.usersList?.data,
})
export default connect(mapStateToProps, {
	profileAllInfoAction,
	getUsersSuggestion,
})(ProfileDisplayPage)
