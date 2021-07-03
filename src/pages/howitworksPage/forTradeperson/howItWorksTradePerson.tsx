import React from 'react'
import FontAwesome from 'react-fontawesome'
import Image1 from '../../../assets/images/how-it-works/image-1.png'
import Image2 from '../../../assets/images/how-it-works/image-2.png'
import Image3 from '../../../assets/images/how-it-works/image-3.png'
import Image4 from '../../../assets/images/how-it-works/image-4.png'
import Image5 from '../../../assets/images/how-it-works/image-5.png'
import Image6 from '../../../assets/images/how-it-works/image-6.png'
import Iphone from '../../../assets/images/how-it-works/iphone12.png'

const HowItWorksTradePerson = () => {
	return (
		<div>
			{' '}
			<div>
				<div className='Step1Container'>
					<div className='SwitchButtonDiv'></div>
					<div className='Step1'>
						<div className='Step1InnerDiv'>
							<div className='Step1Left'>
								<span style={{ color: '#2EC2E2' }} className='StepNumber'>
									STEP 1
								</span>
								<h2 className='StepTitle'>
									Create A Free Account
									<br /> and Profile
								</h2>
								<p>
									WorkerPros is designed specifically for tradespeople to
									showcase their work experiences and skills to grow their
									network and career opportunities with no resume needed.
								</p>{' '}
								<p>
									The profile builder allows tradespeople to set work
									preferences that will be used to create tailored job
									opportunities that match their skillset.
								</p>
							</div>
							<div className='Step1Right'>
								<img src={Image1}></img>
							</div>
						</div>
					</div>
				</div>
				<div className='Step2Container'>
					<div className='Step2'>
						<div className='Step2InnerDiv'>
							<div className='Step2Left'>
								<img src={Image2}></img>
							</div>
							<div className='Step2Right'>
								<span style={{ color: '#2EC2E2' }} className='StepNumber'>
									STEP 2
								</span>
								<h2 className='StepTitle'>Build Your Network</h2>
								<p>
									WorkerPros allows tradespeople to connect with
									<br />
									their crewand to showcase their work among <br />
									their network.
								</p>{' '}
								<p>
									Tradespeople can add selected posts to their
									<br /> profiles for employers to see their completed <br />
									work. In addition to sharing posts with your
									<br /> network, tradesmen can ask as references for
									<br />
									their network.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='Step3Container'>
					<div className='Step3'>
						<div className='Step3InnerDiv'>
							<div className='Step3Left'>
								<span style={{ color: '#2EC2E2' }} className='StepNumber'>
									STEP 3
								</span>
								<h2 className='StepTitle'>
									Find Full-Time and Gig Opportunists
								</h2>
								<p>
									WorkerPros is the number one destination for tradespeople to
									find career opportunities tailored to their skillset.
								</p>{' '}
								<p>
									Our platform allows skilled tradesmen to stand out based upon
									their experience and skills when applying to jobs. The
									application process is designed to be quick and easy.
								</p>
							</div>
							<div className='Step3Right'>
								<img src={Image3}></img>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='Step4Container'>
				<div className='Step4'>
					<div className='Step4InnerDiv'>
						<div className='Step4Left'>
							<img src={Image4}></img>
						</div>
						<div className='Step4Right'>
							<span style={{ color: '#2EC2E2' }} className='StepNumber'>
								STEP 4
							</span>
							<h2 className='StepTitle'>Check Your Application Status</h2>
							<p>
								WorkerPros allows tradespeople to always be <br /> informed with
								their application status and to <br /> never question where they
								are in the hiring <br /> process.
							</p>{' '}
							<p>
								Applicants will be informed whether the employer <br /> wants to
								move forward with the interview <br /> process. The platform
								simplified the interview <br /> process making it simple and
								easy for both the <br />
								tradeperson and employer.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className='Step5Container'>
				<div className='Step5'>
					<div className='Step5InnerDiv'>
						<div className='Step5Left'>
							<span style={{ color: '#2EC2E2' }} className='StepNumber'>
								STEP 5
							</span>
							<h2 className='StepTitle'>Find Full-Time and Gig Opportunists</h2>
							<p>
								Building your future starts here. Once the interview process is
								complete and the employer has extended an offer to have you on
								their crew, applicants will evaluate the job offer and decide
								whether they want to accept or find otheropportunities.
							</p>{' '}
							<p>
								Our platform helps streamline the hiring processand will
								simplifies the paperwork needed to get your transitioned to your
								new careerquickly.
							</p>
						</div>
						<div className='Step5Right'>
							<img src={Image5}></img>
						</div>
					</div>
				</div>
			</div>
			<div className='Step6Container'>
				<div className='Step6'>
					<div className='Step6InnerDiv'>
						<div className='Step6Left'>
							<img src={Image6}></img>
						</div>
						<div className='Step6Right'>
							<span style={{ color: '#2EC2E2' }} className='StepNumber'>
								STEP 6
							</span>
							<h2 className='StepTitle'>Keep Your Connections Updated</h2>
							<p>
								WorkerPros is a networking platform and allows <br /> you to
								keep all your connections up to date on <br /> your career
								process–whether you are posting <br /> your daily to your
								connections or letting your <br /> network know you have
								accepted a new job.
							</p>{' '}
							<p>
								Your network is more important than ever and <br /> WorkerPros
								is tradesmen go-to destination for <br /> staying up to date
								with friends in the industry.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className='Step7Container'>
				<div className='Step7'>
					<div className='Step7InnerDiv'>
						<div className='Step7Left'>
							<span style={{ color: '#2EC2E2' }} className='StepNumber'>
								STEP 7
							</span>
							<h2 className='StepTitle'>Download The App</h2>
							<p>
								WorkerPros offers a great mobile app that allows tradesmen to
								always be connected to their network and new opportunities.
							</p>{' '}
							<span className='DownloadAppSpan'>
								The WorkerPro app is now available on both <br /> Apple and
								Android. Download now:
							</span>
							<div className='DownloadAppBtnDiv'>
								<button>
									{' '}
									<FontAwesome
										style={{ fontSize: '25px', marginRight: '8px' }}
										name='apple'
									/>
									Download
								</button>
								<button>
									{' '}
									<FontAwesome
										style={{ fontSize: '25px', marginRight: '8px' }}
										name='android'
									/>{' '}
									Download
								</button>
							</div>
						</div>
						<div className='Step7Right'>
							<div className='iphone'>
								<span style={{ color: '#2ec2e2' }}>WorkerPros</span>
								<img src={Iphone}></img>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HowItWorksTradePerson
