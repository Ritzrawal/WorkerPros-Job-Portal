import React, { useState } from 'react'
import BoxArrow from '../../../assets/images/adminArrow.png'
import './card.css'
interface IProps {
	title: string
	value: string
	onCardClick?: () => void
}

const PointedCard = (props: IProps) => {
	const { title, value } = props
	const [card, setShowCLick] = useState('')

	const onClickCard = (e: any) => {
		const name = e.target.name
		console.log(title)
		console.log('event', name, card)
		setShowCLick(name)
	}
	return (
		<>
			<div className='AdminArrowFUnctionAlity'>
				<button
					name={title}
					// onClick={() => {
					// 	setShowCLick(title)
					// }}
					onClick={onClickCard}
					className={
						card === title
							? 'AdminTopSmallCardonCLickDispaly'
							: 'AdminTopSmallCardDisplay'
					}
				>
					<div className='AdminTopSmallCardDisplayTitle'>{title}</div>
					<div className='AdminTopSmallCardDisplayTitleBold'>
						<div className='AdminTopSmallCardBolTitle'>{value}</div>
						<div className='AdminTopSmallCardBolTitlePlusminus'>+5%</div>
					</div>
				</button>
				{card === title && (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<div className='AdminDisplayOnclickTriangle'>
							<img src={BoxArrow} className='AdminCommentArrowImage' />
						</div>
					</div>
				)}
			</div>
		</>
	)
}
export default PointedCard
