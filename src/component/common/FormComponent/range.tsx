import React, { useState } from 'react'
import { Range, getTrackBackground } from 'react-range'

const STEP = 1
const MIN = 0
const MAX = 100

const RangeComponent: React.FC<any> = (props: any): React.ReactElement => {
	const [values, setValues] = useState([50])
	return (
		<Range
			values={values}
			step={STEP}
			min={MIN}
			max={MAX}
			onChange={(values) => setValues(values)}
			renderTrack={({ props, children }) => (
				<div
					style={{
						height: '36px',
						display: 'flex',
						width: '100%',
					}}
				>
					<div
						ref={props.ref}
						style={{
							height: '5px',
							width: '100%',
							borderRadius: '4px',
							background: getTrackBackground({
								values: values,
								colors: ['red', '#ccc'],
								min: MIN,
								max: MAX,
							}),
							alignSelf: 'center',
						}}
					>
						{children}
					</div>
				</div>
			)}
			renderThumb={({ props }) => (
				<div
					{...props}
					style={{
						...props.style,
						height: '42px',
						width: '42px',
						borderRadius: '42px',
						backgroundColor: '#FFF',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						boxShadow: '0px 2px 6px #AAA',
					}}
				></div>
			)}
		/>
	)
}
export default RangeComponent
