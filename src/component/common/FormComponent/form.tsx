import React from 'react'
interface TextFiedProops {
	title: string
	Data: {
		option: string
	}
}
interface Props {
	name?: string
	title: string
	onChecked: any
	value: any
	checked?: boolean
	border?: string
	labelColor?: string
}
import './form.css'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

const Data = [
	{ option: 'Hello First ' },
	{ option: 'Hello Second ' },
	{ option: 'Hello Third ' },
	{ option: 'Hello Fourth ' },
]
const TextFieldDropDown: React.FC<TextFiedProops> = (
	props: TextFiedProops
): React.ReactElement => {
	return (
		<FormGroup className='FormContainerCustomize'>
			<Label for='exampleSelect' className='LabelDropDownCustomize'>
				{props.title} :
			</Label>
			<Input
				type='select'
				name='select'
				id='exampleSelect'
				className='InputTextCustomize'
			>
				{Data.map((it, i) => {
					return (
						<option key={i} className='OptionValueCustomize'>
							{it.option}
						</option>
					)
				})}
			</Input>
		</FormGroup>
	)
}
const InputCheckBox: React.FC<Props> = (props: Props): React.ReactElement => {
	console.log('Hello checked', props.checked)
	return (
		<FormGroup check className='GlobalChecBoxContainer col-md-3 col-sm-6'>
			<Label className='GlobalCustomCheckBox' check>
				<Input
					className='GlobalCheckBoxCustomize'
					type='checkbox'
					name={props.name}
					value={props.title}
					onChange={props.onChecked}
					checked={props.checked}
				/>
				<p
					className='GlobalCheckBoxText'
					style={{ color: props.labelColor ? props.labelColor : '#5E7291' }}
				>
					{props.title}
				</p>
				<span
					className='Globalcheckmark'
					style={{ border: props.border ? props.border : '2px solid #2ec2e2' }}
				></span>
			</Label>
		</FormGroup>
	)
}
const AdminInputCheckBox: React.FC<Props> = (
	props: Props
): React.ReactElement => {
	return (
		<FormGroup check className='AdminGlobalChecBoxContainer col-md-3 col-sm-6'>
			<Label className='GlobalCustomCheckBox' check>
				<Input
					className='GlobalCheckBoxCustomize'
					type='checkbox'
					name={props.name}
					value={props.title}
					onChange={props.onChecked}
				/>
				<p className='AdminGlobalCheckBoxText'>{props.title}</p>
				<span className='AdminGlobalcheckmark'></span>
			</Label>
		</FormGroup>
	)
}
export { TextFieldDropDown, InputCheckBox, AdminInputCheckBox }
