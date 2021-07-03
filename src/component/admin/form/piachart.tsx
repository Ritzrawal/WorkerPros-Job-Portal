import React, { useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
interface Props {
	title?: string
}

const options = {
	plugins: {
		legend: {
			display: false,
		},
	},
	elements: {
		arc: {
			borderWidth: 0,
		},
	},
}

const data = {
	maintainAspectRatio: false,
	responsive: false,
	labels: ['a', 'b'],
	datasets: [
		{
			data: [50, 50],
			backgroundColor: ['#234476', '#37A0EC'],
		},
	],
}
const AdminPiachart = (props: Props) => {
	return <Doughnut data={data} options={options} type={Doughnut} />
}
export default AdminPiachart
