import React from 'react'
import FontAwesome from 'react-fontawesome'
import Image1 from '../../../assets/images/how-it-works/image-1.png'
import Image2 from '../../../assets/images/how-it-works/image-2.png'
import Image3 from '../../../assets/images/how-it-works/image-3.png'
import Image4 from '../../../assets/images/how-it-works/image-4.png'
import Image5 from '../../../assets/images/how-it-works/image-5.png'
import Image6 from '../../../assets/images/how-it-works/image-6.png'
import Iphone from '../../../assets/images/how-it-works/iphone12.png'

const HowItWorksEmployer = () => {
	return (
		<div className='EmployerHIWMainContainer'>
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
									Post Jobs to Skilled Tradesmen
									<br />
								</h2>
								<p>
									WorkerPros offerscompanies the ability to post jobs to a
									community of highly skilled tradespeople. Our job posting
									platformstreamlines the hiring process to create tailored
									postings to targetspecific tradesmen with specialized
									skillsets.
								</p>{' '}
								<p>
									The job posting process allows you to cut through the fluff
									and find quality and skilled workers. Whetheryour company
									needs temporary or permanent talent we have you covered.
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
								<h2 className='StepTitle'>
									Review Applied Talent to
									<br />
									Find Perfect Candidate
								</h2>
								<p>
									WorkerPros makes reviewing talent to find the perfect
									candidatea breeze. Companies can quickly review tradesmen work
									history and skillsetto make more informed decisions in the
									hiring process.
								</p>

								<p>
									Our employer pipeline streamlines the hiring process to make
									it both simplifiedand organized.Simply drag and drop within
									the pipeline funnel to hire more effectively.
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
									Message Skilled Trademen and Schedule Interview
								</h2>
								<p>
									WorkerProsmakes theinterview and initialcontact simplified
									with its easy-to-usemessage portal. Companiescan simply
									message tradesmen specific questions and keep track of
									correspondence.
								</p>{' '}
								<p>
									The interview creation and review process makes the interview
									process simpleand organized allowing for note taking
									oncandidates.
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
							<h2 className='StepTitle'>Hire Skilled Trademen</h2>
							<p>
								Once completing the review process and conducting any needed
								interviews. Our platform allows companies to notify candidateand
								get candidates hired immediately.
							</p>{' '}
							<p>
								Through our easy to use messaging portal, companies can easily
								store all needed documentation files for candidates.
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

export default HowItWorksEmployer
