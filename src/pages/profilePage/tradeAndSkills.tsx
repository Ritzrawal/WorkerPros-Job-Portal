import React, { useEffect, useState, SyntheticEvent } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { History } from 'history'
import {
	jobsCategoryListAction,
	jobsCategorySkillsAction,
} from '../../store/action/jobsListAction'
interface Props {
	title: string
	category: any
	skills: any
	profileinfo: any
	tick?: boolean
	tradeshow: any
	onClickNext?: any
	getSelectedProfileList: (onAddTrade: any) => void
	jobsCategoryListAction: any
	onDisplayRouter?: any
	jobsCategorySkillsAction: (id: any) => void
	profileTradeUpdateAction: (form: any) => void
	updateStatus: boolean
}
import './profileWelcome.css'
import {
	CustomButton,
	CustomButtonTag,
	CustomButtonTagnotClick,
} from '../../component/common/buttons/profileButton'
import { profileTradeUpdateAction } from '../../store/action/profileAction'
import { connect } from 'react-redux'
const ProfileTradeandSkills: React.FC<Props> = (
	props: Props
): React.ReactElement => {
	const [error, setError] = useState(false)
	const [updateForm, setUpdateForm] = useState([
		{
			title: '',
			experience_time: 1,
			roleerror: false,
			skills: [],
			is_primary: true,
		},
	])
	/*==================useEffect for updating the value =======================*/
	useEffect(() => {
		props.jobsCategoryListAction()
		console.log('cat data', props.profileinfo.categories.length)
		const newdata = props.profileinfo.categories.map((it, i) => {
			return {
				...updateForm,
				title: it.title,
				experience_time: it.experience_time,
				roleerror: false,
				skills: it.skills,
				is_primary: it.is_primary,
			}
		})
		if (props.profileinfo.categories.length == 0) {
			console.log('form error')
		} else {
			setUpdateForm(newdata)
		}

		// setUpdateForm(newdata)
	}, [props.profileinfo.categories])
	// const onAddTrade = () => {}
	const onAddTrade = () => {
		console.log('hello props', props)
		const newUpdateForm = updateForm.map((f: any, index) => {
			if (updateForm.length - 1 === index) {
				if (f.title.trim().length === 0) {
					return { ...f, roleerror: true }
					// setError(true)
				} else {
					const newdata = updateForm.map((f: any, index) => {
						return {
							title: f.title,
							experience_time: f.experience_time,
							skills: f.skills,
							categories: f.categories,
							is_primary: f.is_primary,
						}
					})
					props.getSelectedProfileList(2)
					props.onClickNext()
					// props.onDisplayRouter()
					props.profileTradeUpdateAction(newdata)
					return { ...f }
				}
			} else {
				return f
			}
		})
		setUpdateForm(newUpdateForm)
	}

	const onFormDataChange = (event: any, formIndex) => {
		const { name, value } = event.target
		let newUpdateForm = updateForm.map((f: any, index) => {
			if (formIndex === index) {
				return { ...f, [name]: value, roleerror: false }
			} else {
				return f
			}
		})

		setUpdateForm(newUpdateForm)
	}
	const onCatOnclick = (event: any, formIndex) => {
		const { name, innerText } = event.target

		let currentFormData: any = updateForm

		currentFormData = currentFormData.map((form: any, index) => {
			if (formIndex === index) {
				let currentSkills = form.skills

				if (currentSkills.includes(innerText)) {
					currentSkills = currentSkills.filter((skill) => skill !== innerText)
				} else {
					currentSkills.length < 5 && currentSkills.push(innerText)
				}
				return { ...form, skills: currentSkills }
			} else {
				return form
			}
		})

		setUpdateForm(currentFormData)
	}

	//for adding the form component
	const handleAddFields = () => {
		let currentForm = updateForm
		if (currentForm.length < 3) {
			currentForm = [
				...currentForm,
				{
					title: '',
					experience_time: 1,
					roleerror: false,
					skills: [],
					is_primary: false,
				},
			]
		}
		setUpdateForm(currentForm)
	}
	console.log('trade empty value', updateForm)
	return (
		<div className='TradeAndSkillsMainCustomizeContainer'>
			<div className='TradeAndSkillContainer'>
				<div className='TradeandSkilContentContainer'>
					<div className='TradeAndSkillsTitle'>
						<span className='TradeAndSkillsHeader'>Trades and Skills</span>
					</div>
					{updateForm.map((f, index) => (
						<div key={index}>
							<div className='TradeAndSkillPrimaryContainer'>
								{index === 0 ? (
									<span className='TradeAndSkillsPrimaryTrade'>
										Primary Trade
									</span>
								) : (
									<div className='TradeAdditionalContainer'>
										<text className='TradeAdditionalDispalText'>
											Additional Trades
										</text>
										<text className='TradeAdditionalCounterText'>
											{index + 1}/3
										</text>
									</div>
								)}
								{/* <span className='TradeAndSkillsPrimaryTrade'>Primary Trade</span> */}
							</div>

							<div className='TradeAndSkillsInputContainer'>
								<FormGroup className='TradeInputDropDownField'>
									{index == 0 ? (
										<Label for='exampleSelect' className='SelectTextCustomize'>
											Your primary Trade
										</Label>
									) : (
										<Label for='exampleSelect' className='SelectTextCustomize'>
											Additional Trade {index}
										</Label>
									)}
									<Input
										type='select'
										name='title'
										invalid={f.roleerror}
										value={f.title}
										onChange={(event) => onFormDataChange(event, index)}
										className='TradeInputDropTextField'
										id='exampleSelect'
									>
										<option disabled value=''>
											Select your Trade
										</option>
										{props.category.map((items, index) => {
											return (
												<option key={index} id={items._id}>
													{items.title}
												</option>
											)
										})}
									</Input>
								</FormGroup>
								<FormGroup className='TradeInputDropDownFieldRight'>
									<Label for='exampleSelect' className='SelectTextCustomize'>
										Years of Experience
									</Label>
									<Input
										type='select'
										name='experience_time'
										value={f.experience_time}
										onChange={(event) => onFormDataChange(event, index)}
										className='TradeInputDropTextFieldExperience'
										id='exampleSelect'
									>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>10</option>
									</Input>
								</FormGroup>
							</div>
							<div className='TopSkillsTextField'>
								<text className='TradeTopSKill'>Top Skills in</text>
								<text className='TradeIncarpentry'> {f.title} </text>
								<text className='TradeLImitText'> (up to 5)</text>
							</div>
							{props.category.map((cat: any) => {
								if (cat.title === f.title) {
									return (
										<div key={cat._id} className='TradeSkillsTag'>
											{cat.skills.map((s: any) => {
												let currentSkill: any = f.skills
												const className = currentSkill.includes(s)
													? ' ProfileButtonCustomizeTag'
													: ' ProfileButtonCustomizeTagNotCLick'
												return (
													<CustomButtonTagnotClick
														className={className}
														key={s._id}
														title={s}
														value={s}
														onClick={(event) => onCatOnclick(event, index)}
													/>
												)
											})}
										</div>
									)
								}
							})}
						</div>
					))}
					{updateForm.length < 3 && (
						<div className='TradeAddBUttonContainer'>
							<CustomButton
								title='Add a Trade'
								icon={faPlus}
								onClick={handleAddFields}
							/>
						</div>
					)}
				</div>
			</div>
			<div
				className='ProfilesaveAddButtonContainerNext'
				style={{ paddingBottom: 50 }}
			>
				<CustomButton title='Next Step' onClick={onAddTrade} />
			</div>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	uptrade: state.profileReducer.uptrade,
	category: state.jobsListReducer.data,
	skills: state.jobsListReducer.skills,
})
export default connect(mapStateToProps, {
	profileTradeUpdateAction,
	jobsCategoryListAction,
	jobsCategorySkillsAction,
})(ProfileTradeandSkills)
