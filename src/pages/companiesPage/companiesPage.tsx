import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { HeaderPage2, HeaderPage } from '../headerPage'
import {
	getCompanies,
	filterCompanies,
	saveUnsaveCompany,
} from '../../store/action/company'
import { getCompanySize } from '../../store/action/companySizeAction'

import './companiesPage.css'
import {
	CompanyCardComponent,
	CompanyMidCardComponent,
	ButtonComponent,
} from '../../component'
import { FormGroup, Input, Spinner } from 'reactstrap'
import ReactPaginate from 'react-paginate'

import { Link } from 'react-router-dom'
import { locationListAction } from '../../store/action/locationListAction'

import { WithContext as ReactTags } from 'react-tag-input'

const KeyCodes = {
	comma: 188,
	enter: 13,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

interface Props {
	value?: string
	getCompanies: (params: any) => void
	companyList: any
	companySize: any
	onClickItem?: (event: { index?: number }) => void
	filterCompanies: (params: any) => void
	getCompanySize: (params: any) => void
	saveUnsaveCompany: (id: string) => void
	locationListAction: () => void
	locationList: any
}

const CompaniesPage: React.FC<Props> = (props: Props): React.ReactElement => {
	const {
		getCompanies,
		getCompanySize,
		companyList,
		companySize,
		filterCompanies,
		locationListAction,
		saveUnsaveCompany,
		locationList,
	} = props

	const getLocations = (locationList) => {
		let locations: any = []

		if (
			locationList &&
			locationList.country_states_cities &&
			locationList.country_states_cities.states.length
		) {
			locationList.country_states_cities.states.forEach((state: any) => {
				if (state.cities.length) {
					state.cities.forEach((city: any) => {
						locations.push({ title: city, value: city })
					})
				}
			})
		}

		return locations
	}

	const [currentPage, setCurrentPage] = useState(1)

	const listLimit = 10

	const [tradeTags, setTradeTags] = useState({
		tags: [],
		suggestions: [
			{ id: 'USA', text: 'USA' },
			{ id: 'Germany', text: 'Germany' },
			{ id: 'Austria', text: 'Austria' },
			{ id: 'Costa Rica', text: 'Costa Rica' },
			{ id: 'Sri Lanka', text: 'Sri Lanka' },
			{ id: 'Thailand', text: 'Thailand' },
		],
	})

	const [filterParams, setFilterParams] = useState({
		location: null,
		trade: null,
		contraction_type: null,
		company_size: null,
		categories: [],
	})

	const changeFilterParams = (event: any) => {
		setFilterParams({ ...filterParams, contraction_type: event.target.value })
	}

	const getCompaniesFilterParams = () => {
		let newFilterParams: any = {}

		if (filterParams.contraction_type !== null) {
			newFilterParams.contraction_type = filterParams.contraction_type
		}
		if (filterParams.company_size !== null) {
			newFilterParams.company_size = filterParams.company_size
		}

		if (filterParams.location !== null) {
			newFilterParams.location = filterParams.location
		}

		if (tradeTags.tags.length > 0) {
			newFilterParams.categories = tradeTags.tags.map((value: any) => value.id)
		}

		return JSON.stringify(newFilterParams)
	}

	useEffect(() => {
		const filterParamsJson = getCompaniesFilterParams()

		filterCompanies(
			`?page=${currentPage}&limit=${listLimit}&filters=${filterParamsJson}`
		)
	}, [currentPage, filterParams, tradeTags.tags])

	const handleDelete = (i) => {
		const { tags } = tradeTags
		setTradeTags({
			tags: tags.filter((tag, index) => index !== i),
			suggestions: tradeTags.suggestions,
		})
	}

	const handleAddition = (tag) => {
		let newTradeTags: any = [...tradeTags.tags, tag]
		setTradeTags({
			tags: newTradeTags,
			suggestions: tradeTags.suggestions,
		})
	}

	useEffect(() => {
		const pageParams = `&page=${currentPage}&limit=${listLimit}`
		getCompanies(pageParams)
		getCompanySize('test')
		locationListAction()
	}, [currentPage])

	const getTotalPage = () => {
		const pageNumbers: any = []

		if (companyList.data && companyList.data.total_companies) {
			for (
				let i = 1;
				i <= Math.ceil(companyList.data.total_companies / listLimit);
				i++
			) {
				pageNumbers.push(i)
			}
		}

		return pageNumbers.length
	}

	console.log(filterParams)

	const handleClick = (event: any) => {
		const data = event
		setCurrentPage(data.selected + 1)
	}

	const { tags, suggestions } = tradeTags

	return (
		<div className='CompaniesMainContainer'>
			<div>
				{localStorage.getItem('token') ? (
					<HeaderPage2 title='WorkerPros' />
				) : (
					<HeaderPage title='WorkerPros' />
				)}
			</div>

			<div className='bannerSection'>
				<div className='bannerTitle'>
					<h1>
						Find Best Companies <br /> in your City
					</h1>
				</div>
				<div className='companiesFilterSection'>
					<p className='findJobsInSection'>
						Find Companies In{' '}
						<span>
							{' '}
							<select
								onChange={(e: any) => {
									setFilterParams({
										...filterParams,
										location: e.target.value,
									})
								}}
								className='CharlotteDropDown'
							>
								{getLocations(locationList).map((value: any, index) => {
									return <option key={index}>{value.title}</option>
								})}
							</select>
						</span>
					</p>
					<div className='companiesFilterContents'>
						<div className='companiesFilterTrade'>
							<span className='jobFinderPageFilterTitle'>Trade </span>
							<ReactTags
								className='jobFindertagInput'
								inputFieldPosition='inline'
								tags={tags}
								suggestions={suggestions}
								handleDelete={handleDelete}
								handleAddition={handleAddition}
								delimiters={delimiters}
								placeholder='Add a trade'
							/>
						</div>
						<div className='companiesFilterContraction'>
							<span className='jobFinderPageFilterTitle'>
								Contraction Type{' '}
							</span>
							<FormGroup className='InputDropDownField'>
								<Input
									type='select'
									name='state'
									className='InputDropTextField'
									id='exampleSelect'
									onChange={(e: any) => {
										changeFilterParams(e)
									}}
								>
									{/* {props.countrylist &&
											props.countrylist.states &&
											props.countrylist.states.map((items, index) => {
												return <option key={items}></option>
											})} */}
									<option>Office Constructions</option>
									<option>Skill 1</option>
									<option>Skill 2</option>
									<option>Skill 3</option>
									<option>Skill 4</option>
								</Input>
							</FormGroup>
						</div>
						<div className='companiesFilterSize'>
							<span className='jobFinderPageFilterTitle'>Company Size</span>
							<FormGroup className='InputDropDownField'>
								<Input
									type='select'
									name='state'
									className='InputDropTextField'
									id='exampleSelect'
									onChange={(e: any) => {
										setFilterParams({
											...filterParams,
											company_size: e.target.value,
										})
									}}
								>
									{companySize.data &&
										companySize.data.map((value: any, index) => {
											return <option key={index}> {value} </option>
										})}
								</Input>
							</FormGroup>
						</div>
						<div className='companiesFinderButtonDiv'>
							<ButtonComponent
								width={170}
								clickHandler={() =>
									setFilterParams({
										...filterParams,
										location: null,
										company_size: null,
									})
								}
								buttonTitle='Clear Filters'
							/>
						</div>
					</div>
				</div>
			</div>
			<div className='companiesListSection container'>
				<div className='listHeader'>
					<div>
						<h5 style={{ textTransform: 'capitalize' }}>
							{filterParams.location} Companies Hiring Right Now
						</h5>
					</div>

					<span className='Totalof'>
						Total Of{' '}
						<span style={{ color: '#000000' }}>
							{companyList.data && companyList.data.companies.length} Companies
						</span>
					</span>
				</div>
				<div className='companiesList'>
					<ul className='CompanyUL'>
						{!companyList.loading ? (
							companyList.data && companyList.data.companies.length > 0 ? (
								companyList.data.companies.map((value, index) => (
									<>
										{index === 4 && <CompanyMidCardComponent />}
										<CompanyCardComponent
											companyId={value._id}
											saveCompany={saveUnsaveCompany}
											companyImage={value.profile_image}
											companyBannerImage={value.images[0]}
											description={value.overview}
											categories={value.categories}
											companyName={value.company_name}
											totalJobs={value.total_jobs}
											jobLocation='Naxal'
											foundedIn={value.year_founded ? value.year_founded : 1990}
											key={index}
											localEmployee={value.local_employee}
										/>
									</>
								))
							) : (
								<div className='NoCompanieFoundDiv'>No Companies Found!</div>
							)
						) : (
							<div className='loaderDiv'>
								<Spinner color='grey' />
							</div>
						)}
					</ul>
				</div>
				<div className='PaginationSection'>
					<ReactPaginate
						previousLabel={` < Previous`}
						nextLabel={'Next >'}
						breakLabel={'...'}
						breakClassName={'PaginationLi'}
						pageCount={getTotalPage()}
						marginPagesDisplayed={2}
						pageRangeDisplayed={5}
						onPageChange={(e: any) => handleClick(e)}
						containerClassName={'pagination'}
						subContainerClassName={'pages pagination'}
						activeClassName={'activePaginate'}
					/>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	companyList: state.company.list,
	companySize: state.companySizeReducer.companySize,
	locationList: state.locationListReducer.data,
	companySaveUnsave: state.company.saveUnsave,
})

const actions = {
	getCompanies,
	filterCompanies,
	getCompanySize,
	locationListAction,
	saveUnsaveCompany,
}

export default connect(mapStateToProps, actions)(CompaniesPage)
