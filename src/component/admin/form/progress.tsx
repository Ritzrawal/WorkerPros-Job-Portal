import { Progress } from 'reactstrap'
import React from 'react'
interface Props {
	titlevalue?: string
	color?: string
	height?: string
}

const SingleProgress: React.FC<Props> = (props: Props) => {
	return (
		<>
			<div className='text-center'>75%</div>
			<Progress
				color='green'
				style={{
					color: props.color,
					width: '100%',
					height: props.height,
				}}
				value={75}
			/>
		</>
	)
}
const MultiProgress: React.FC<Props> = (): React.ReactElement => {
	return (
		<>
			<div className='text-center'>multiple data</div>
			<Progress multi>
				<Progress bar value='15' />
				<Progress bar color='success' value='30' />
				<Progress bar color='info' value='25' />
				<Progress bar color='warning' value='20' />
				<Progress bar color='danger' value='5' />
			</Progress>
		</>
	)
}
export { SingleProgress, MultiProgress }
