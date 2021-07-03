import React, { useState } from 'react'
import SelectDatePicker from '@netojose/react-select-datepicker'
import './form.css'
const Calender = () => {
	const [date, setDate] = useState(new Date(2000, 10, 10))
	const handleChange = (value) => setDate(value)
	return (
		<div>
			<SelectDatePicker
				classname='DatePickerClass'
				value={date}
				showLabels={false}
				onDateChange={handleChange}
			/>
		</div>
	)
}
export default Calender
