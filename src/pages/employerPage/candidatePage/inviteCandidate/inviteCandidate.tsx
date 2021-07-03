import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'reactstrap'
import Select from 'react-select'

import { employerPublishedJobListAction } from '../../../../store/action/employerJobAction'
import { candidateSendMessage } from '../../../../store/action/socialFeatureAction'
import { locationListAction } from '../../../../store/action/locationListAction'
import { categoryListAction } from '../../../../store/action/categoryListAction'

import DropdownBox from '../../../../component/employer/input/dropdownBox/dropdownBox'
import CandidateDetailBox from '../../../../component/employer/detail/candidateDetailBox/candidateDetailBox'
import CandidateInviteDetailModal from '../../../../component/employer/modal/candidateInviteDetailModal/candidateInviteDetailModal'

import InviteCandidateBox from './inviteCandidateBox/inviteCandidateBox'

import './inviteCandidate.css'

const experienceOptions = [
	{ title: 'No Experience Needed', value: 0 },
	{ title: '1 Year', value: 1 },
	{ title: '2 Years', value: 2 },
	{ title: '3 Years', value: 3 },
	{ title: '4 Years', value: 4 },
	{ title: '5+ Years', value: 5 },
]

interface Props {
	employerInviteCandidateList: any
	candidateSendMessage: (params: any) => void
	candidateSendMessageData: any
	employerPublishedJobListAction: (params?: any) => void
	employerPublishedJobList: any
	locationListAction: () => void
	locationList: any
	categoryListAction: () => void
	categoryList: any
	detailId: any
}

const InviteCandidate: React.FC<Props> = (props: Props) => {
	const {
		employerInviteCandidateList,
		candidateSendMessage,
		candidateSendMessageData,
		employerPublishedJobListAction,
		employerPublishedJobList,
		locationListAction,
		locationList,
		categoryListAction,
		categoryList,
		detailId,
	} = props

	const [filter, setFilter] = useState({
		category: '',
		skill: '',
		experience: '',
		location: '',
	})
	const [showInviteDetailModal, setShowInviteDetailModal] = useState(false)

	useEffect(() => {
		employerPublishedJobListAction()
		locationListAction()
		categoryListAction()
	}, [])

	const getCurrentCandidateDetail = (list, id) => {
		if (!list) return null
		const [currentCandidateDetail] = list.filter((l) => l._id === id)

		return currentCandidateDetail
	}

	useEffect(() => {
		if (!candidateSendMessageData.loading && candidateSendMessageData.success) {
			setShowInviteDetailModal(false)
		}
	}, [candidateSendMessageData])

	const getCategories = (categoryList) => {
		let categories: any = []

		if (categoryList) {
			categories = categoryList.map((category: any) => ({
				title: category.title,
				value: category.title,
			}))
		}

		return categories
	}

	const getSkills = (categoryList, selectedCategoryName) => {
		console.log({ categoryList })
		let skills: any = []

		if (categoryList && selectedCategoryName) {
			const [selectedCategory] = categoryList.filter(
				(c: any) => c.title === selectedCategoryName
			)

			if (selectedCategory) {
				skills = selectedCategory.skills.map((s: any) => ({
					title: s,
					value: s,
				}))
			}
		}

		console.log({ skills })

		return skills
	}

	const getLocations = (locationList) => {
		let locations: any = []

		if (
			locationList &&
			locationList.country_states_cities &&
			locationList.country_states_cities.states.length
		) {
			locationList.country_states_cities.states.forEach((state: any) => {
				if (state.cities.length) {
					locations = state.cities.map((city: any) => ({
						title: city,
						value: city,
					}))
				}
			})
		}

		return locations
	}

	const changeFilterData = (event) => {
		const { name, value } = event.target

		setFilter({ ...filter, [name]: value })
	}

	return (
		<div className='EmployerInviteCandidate'>
			<div className='EmployerInviteCandidate__Filter'>
				<div className='EmployerInviteCandidate__Filter--Left'>
					<div className='EmployerInviteCandidate__Filter--Left--Container'>
						{/* <button>Trade Type</button> */}
						{/* <Select
							isMulti
							name='trade'
							placeholder={'Select Trade'}
							options={getCategories(categoryList)}
							onChange={(event) => console.log({ event })}
						/> */}
						<DropdownBox
							internalPadding={'5px'}
							error={false}
							label={''}
							option={getCategories(categoryList)}
							name={'category'}
							value={filter.category}
							placeholder={'Select Category'}
							onChange={changeFilterData}
						/>
					</div>
					<div className='EmployerInviteCandidate__Filter--Left--Container'>
						{/* <button>Skill Level</button> */}
						{/* <Select
							isMulti
							name='skill'
							placeholder={'Select Skill'}
							options={getSkills(filter.category)}
						/> */}
						<DropdownBox
							internalPadding={'5px'}
							error={false}
							label={''}
							option={getSkills(categoryList, filter.category)}
							name={'skill'}
							value={filter.skill}
							placeholder={'Select Skill'}
							onChange={changeFilterData}
						/>
					</div>
					<div className='EmployerInviteCandidate__Filter--Left--Container'>
						{/* <button>Experience</button> */}
						{/* <Select
							isMulti
							name='experience'
							placeholder={'Select Experience'}
							options={experienceOptions}
						/> */}
						<DropdownBox
							internalPadding={'5px'}
							error={false}
							label={''}
							option={experienceOptions}
							name={'experience'}
							value={filter.experience}
							placeholder={'Select Experience'}
							onChange={changeFilterData}
						/>
					</div>
					<div className='EmployerInviteCandidate__Filter--Left--Container'>
						{/* <button>Location</button> */}
						{/* <Select
							isMulti
							name='location'
							placeholder={'Select Location'}
							options={getLocations(locationList)}
						/> */}
						<DropdownBox
							internalPadding={'5px'}
							error={false}
							label={''}
							option={getLocations(locationList)}
							name={'location'}
							value={filter.location}
							placeholder={'Select Location'}
							onChange={changeFilterData}
						/>
					</div>
				</div>
				<div className='EmployerInviteCandidate__Filter--Right'>
					Top Rated First
					<FontAwesomeIcon icon={faAngleDown} />
				</div>
			</div>
			<div className='EmployerInviteCandidate__Container'>
				<div
					className={`EmployerInviteCandidate__Container--List ${
						detailId ? '' : 'FlexBox'
					}`}
				>
					{employerInviteCandidateList.loading ? (
						<Spinner />
					) : (
						employerInviteCandidateList.data &&
						employerInviteCandidateList.data.map((i: any, index: any) => (
							<div
								key={index}
								className='EmployerInviteCandidate__Container--List--InviteCandidateBox'
							>
								<InviteCandidateBox
									id={i._id}
									name={`${i.first_name} ${i.last_name}`}
									image={i.profile_image}
									category={i.categories}
									address={i.address}
								/>
							</div>
						))
					)}
				</div>
				{detailId &&
				getCurrentCandidateDetail(
					employerInviteCandidateList.data,
					detailId
				) ? (
					<div className='EmployerInviteCandidate__Container--Detail'>
						<div className='ÉmployerInviteCandidate__Detail--Container--InviteCandidateDetailBox'>
							<CandidateDetailBox
								candidateDetail={getCurrentCandidateDetail(
									employerInviteCandidateList.data,
									detailId
								)}
								openInviteDetailModal={() => setShowInviteDetailModal(true)}
							/>
						</div>
					</div>
				) : null}
				{detailId &&
				getCurrentCandidateDetail(employerInviteCandidateList.data, detailId) &&
				showInviteDetailModal ? (
					<CandidateInviteDetailModal
						candidateInviteDetail={getCurrentCandidateDetail(
							employerInviteCandidateList.data,
							detailId
						)}
						closeCandidateInviteDetail={() => setShowInviteDetailModal(false)}
						onCandidateInvite={candidateSendMessage}
						jobList={
							employerPublishedJobList &&
							employerPublishedJobList.data &&
							employerPublishedJobList.data.length
								? employerPublishedJobList.data
								: []
						}
					/>
				) : null}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	candidateSendMessageData: state.socialFeatureReducer.candidateSendMessage,
	employerPublishedJobList: state.employerJobReducer.published,
	locationList: state.locationListReducer.data,
	categoryList: state.categoryListReducer.data,
})

const actions = {
	candidateSendMessage,
	employerPublishedJobListAction,
	locationListAction,
	categoryListAction,
}

export default connect(mapStateToProps, actions)(InviteCandidate)
