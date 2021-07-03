import React, { useState } from 'react'
import Select from 'react-select'
import ReactAutocomplete from 'react-autocomplete'

interface Props {
	option?: any
}
const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
]

const SelectComponent: React.FC<Props> = (props: Props): React.ReactElement => {
	const [selectedOption, setselectedOption] = useState(null)

	const handleChange = (selectedOption) => {
		setselectedOption(selectedOption.value)
		console.log(`Option selected:`, selectedOption.value)
	}

	return (
		<Select value={selectedOption} onChange={handleChange} options={options} />
	)
}
const ReactAutoComplete = () => {
	const [value, setvalue] = useState('')
	return (
		<ReactAutocomplete
			items={[
				{ id: 'foo', label: 'Doo' },
				{ id: 'bar', label: 'bar' },
				{ id: 'baz', label: 'baz' },
			]}
			getItemValue={(item) => item.label}
			renderItem={(item, highlighted) => (
				<div
					key={item.id}
					style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
				>
					{item.label}
				</div>
			)}
			value={value}
			onChange={(e) => setvalue(e.target.value)}
			onSelect={(value) => setvalue(value)}
		/>
	)
}
export { ReactAutoComplete }

export default SelectComponent
