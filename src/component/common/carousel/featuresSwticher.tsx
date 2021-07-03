import React, { useState } from 'react'

import './featuresSwitcher.css'
import JobFinder from '../../../assets/images/landing-page/jobfinder.png'
import Connect from '../../../assets/images/landing-page/connect.png'
import AppImg from '../../../assets/images/landing-page/downloadapp.png'
import SearchBox from '../../../assets/images/landing-page/searchbox.png'
import applogo from '../../../assets/images/landing-page/applogo.png'
import connectlogo from '../../../assets/images/landing-page/connectlogo.png'
import searchlogo from '../../../assets/images/landing-page/searchlogo.png'
import sendlogo from '../../../assets/images/landing-page/sendlogo.png'
import findjoblogo from '../../../assets/images/landing-page/findjoblogo.png'

import Post from '../../../assets/images/landing-page/post.png'

// type InputEvent = React.ChangeEvent<HTMLInputElement>
// type ButtonEvent = React.MouseEvent<HTMLButtonElement>

interface Props {
	featureNum?: number
}

interface SyntheticEvent<T> {
	currentTarget: EventTarget & T
}

const FeaturesSwitcher: React.FC<Props> = (props: Props, SyntheticEvent) => {
	let [featureNum, setFeatureNum] = useState(0)
	let [inProp, setInProp] = useState(false)

	const LiButtonChange = (
		e: React.MouseEvent<Element, MouseEvent>,
		dotNum: number
	) => {
		const target: any = e.target as EventTarget
		let blueDotList: any = document.getElementsByClassName(
			'dotItem'
		) as HTMLCollectionOf<HTMLElement>

		console.log(blueDotList.length)

		let lists: any = document.getElementsByClassName(
			'listItems'
		) as HTMLCollectionOf<HTMLElement>

		blueDotList[0].style.backgroundColor = ''

		for (let i = 0; i < blueDotList.length; i++) {
			blueDotList[i].style.backgroundColor = '#d5eaee'
			lists[i].style.border = 'none'
			lists[i].style.background = '#f2f4fa'
			lists[i].style.color = '#234476'
			lists[i].style.fontWeight = '600'
			lists[i].style.boxShadow = 'none'
		}
		blueDotList[dotNum].style.backgroundColor = '#2ec2e2'
		target.style.border = '2px solid #ffffff'
		target.style.borderRadius = '25px'
		target.style.background = '#ffffff'
		target.style.fontWeight = 'bold'
		target.style.boxShadow = '0px 1px 13px rgba(0, 0, 0, 0.09)'
	}

	const ChangeFeatureDiv = (num: number) => {
		switch (featureNum) {
			case 0:
				return (
					<div className='featuresOverviewDiv'>
						<h2>Search and apply in minutes</h2>
						<div className='FindJobsTexts'>
							<p className='findJobsTailored'>
								Find new jobs that are tailored to your skillset.
								<br />
								<a style={{ cursor: 'pointer' }}>
									<span
										style={{ color: ' #2ec2e2' }}
										className='findJobsTailoredSpan'
									>
										Learn more about new job oppurtunities.
									</span>
								</a>
							</p>
						</div>

						<img className='NavImage' src={JobFinder}></img>
					</div>
				)
				break
			case 1:
				return (
					<div className='featuresOverviewDiv'>
						<h2>Connect With Colleagues and Potential Employers</h2>
						<div className='FindJobsTexts'>
							<p className='findJobsTailored'>
								Expand your connections and explore oppurtunities.
								<br />
								<a style={{ cursor: 'pointer' }}>
									<span
										style={{ color: ' #2ec2e2' }}
										className='findJobsTailoredSpan'
									>
										Learn more about new job oppurtunities.
									</span>
								</a>
							</p>
						</div>

						<img className='NavImage' src={Connect}></img>
					</div>
				)
				break

			case 2:
				return (
					<div className='featuresOverviewDiv'>
						<h2>Post Makes People come together</h2>
						<div className='FindJobsTexts'>
							<p className='findJobsTailored'>
								Let People know Whats Going On
								<br />
								<a style={{ cursor: 'pointer' }}>
									<span
										style={{ color: ' #2ec2e2' }}
										className='findJobsTailoredSpan'
									>
										Learn more about new job oppurtunities.
									</span>
								</a>
							</p>
						</div>

						<img className='NavImage' src={Post}></img>
					</div>
				)
			case 3:
				return (
					<div className='featuresOverviewDiv'>
						<h2>Search Companies Suitable for your needs</h2>
						<div className='FindJobsTexts'>
							<p className='findJobsTailored'>
								Search how big or small you want your company to be.
								<br />
								<a style={{ cursor: 'pointer' }}>
									<span
										style={{ color: ' #2ec2e2' }}
										className='findJobsTailoredSpan'
									>
										Learn more about new job oppurtunities.
									</span>
								</a>
							</p>
						</div>

						<img className='NavImage' src={SearchBox}></img>
					</div>
				)
			case 4:
				return (
					<div className='featuresOverviewDiv'>
						<h2>WorkerPros in the palm of your hand</h2>
						<div className='FindJobsTexts'>
							<p className='findJobsTailored'>
								Use our app at your convenience
								<br />
								<a style={{ cursor: 'pointer' }}>
									<span
										style={{ color: ' #2ec2e2' }}
										className='findJobsTailoredSpan'
									>
										Learn more about new job oppurtunities.
									</span>
								</a>
							</p>
						</div>

						<img className='NavImage' src={AppImg}></img>
					</div>
				)
		}
	}

	return (
		<div className='ServicesComponent'>
			<div className='FeaturesNav'>
				<div className='FeaturesNavButtonDiv'>
					<ul className='NavButtonLi'>
						<li
							style={{
								backgroundColor: '#ffffff',
								borderRadius: '25px',
								boxShadow: '0px 1px 13px rgb(0 0 0 / 9%)',
							}}
							className='listItems'
							onClick={(event) => {
								setFeatureNum(0)
								LiButtonChange(event, 0)
							}}
						>
							<img src={findjoblogo}></img>
							Job Finder
						</li>
						<li
							className='listItems'
							onClick={(event) => {
								setFeatureNum(1)
								LiButtonChange(event, 1)
							}}
						>
							<img src={connectlogo}></img>
							Connect
						</li>
						<li
							className='listItems'
							onClick={(event) => {
								setFeatureNum(2)
								LiButtonChange(event, 2)
							}}
						>
							<img src={sendlogo}></img>
							Post
						</li>
						<li
							className='listItems'
							onClick={(event) => {
								setFeatureNum(3)
								LiButtonChange(event, 3)
							}}
						>
							<img style={{ borderRadius: '0px' }} src={searchlogo}></img>
							Search Companies
						</li>
						<li
							className='listItems'
							onClick={(event) => {
								setFeatureNum(4)
								LiButtonChange(event, 4)
							}}
						>
							<img src={applogo}></img>
							Mobile App
						</li>
					</ul>
				</div>
				<div className='FeaturesBlueDotsDiv'>
					<ul className='NavBlueDotsLi'>
						<li className='dotItem'></li>
						<li style={{ marginLeft: '30px' }} className='dotItem'></li>
						<li style={{ marginRight: '40px' }} className='dotItem'></li>
						<li style={{ marginRight: '50px' }} className='dotItem'></li>
						<li className='dotItem'></li>
						<hr className='horizontalLine' />
					</ul>
				</div>
			</div>
			<div className='navigation-components'> {ChangeFeatureDiv(3)}</div>
		</div>
	)
}

export default FeaturesSwitcher
