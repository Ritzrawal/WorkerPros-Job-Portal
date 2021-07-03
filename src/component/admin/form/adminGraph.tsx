import React from 'react'

import { Line, Chart } from 'react-chartjs-2'
import { GraphPoint } from '../../logosAndIcons'
interface Props {
	title?: string
	state?: boolean
}
const data = (canvas) => {
	const ctx = canvas.getContext('2d')
	const gradient = ctx.createLinearGradient(0, 0, 0, 600)
	let graphPointImage = new Image()
	graphPointImage.src = GraphPoint
	gradient.addColorStop(0, 'rgba(133, 215, 0, 0.4)')
	gradient.addColorStop(1, 'rgba(133, 215, 0, 0)')

	return {
		labels: [
			'12 am',
			'2 am',
			'4 am',
			'6 am',
			'8 am',
			'10 am',
			'12 pm',
			'2 pm',
			'4 am',
			'6 am',
			'8 am',
			'10 am',
		],
		datasets: [
			{
				backgroundColor: gradient, // Put the gradient here as a fill color
				fill: true,
				pointStyle: [graphPointImage],
				lineTension: 0.1,
				borderColor: '#85D700',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderWidth: 3,
				borderJoinStyle: 'miter',
				pointBorderColor: '#85D700',
				pointBackgroundColor: '#85D700',
				pointBorderWidth: 3,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: '#85D700',
				pointHoverBorderColor: '#ffffff',
				pointHoverBorderWidth: 10,
				pointRadius: -1,
				pointHitRadius: 100,

				data: [
					25.0,
					27.4,
					27.2,
					27.4,
					20.2,
					22.0,
					23.2,
					24.1,
					20.0,
					18.4,
					19.1,
					17.4,
				],
			},
		],
	}
}

const LineGraph: React.FC<Props> = () => {
	const chartOptions = {
		responsive: true,
		maintainAspectRatio: true,
		hover: { animationDuration: 0 },
		responsiveAnimationDuration: 0,
		scales: {
			xAxes: {
				grid: {
					display: false,
					color: 'red',
				},
				ticks: {
					beginAtZero: true,
					fontColor: '#323132',
					min: 0,
				},
			},

			yAxes: {
				grid: {
					display: false,
					drawBorder: false,
				},
				ticks: {
					beginAtZero: true,
					min: 0,
					padding: 0,
					display: false,
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: true,
				backgroundColor: '#fff',
				titleColor: '#C7D0DE',
				titleFont: {
					size: 14,
				},
				bodyColor: '#000',
				bodyFont: {
					size: 20,
				},
				padding: 12,
				caretSize: 10,
				cornerRadius: 3,
				borderColor: '#eaeaea',
				borderWidth: 1,
				displayColors: false,
				caretPadding: 20,
				yAlign: 'bottom',
			},
		},
	}

	return (
		<Line
			className='CanvasClassCustomize'
			data={data}
			type={Chart}
			options={chartOptions}
		/>
	)
}
export default LineGraph
