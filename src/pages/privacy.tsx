import { useRouter } from 'next/router';
import React from 'react';
import { HiArrowSmLeft } from 'react-icons/hi';

const Privacy = () => {
	const router = useRouter();
	return (
		<div className='px-4 py-6 text-blue-gray-200 bg-black_2'>
			<div className='flex gap-4'>
				<HiArrowSmLeft
					className='text-2xl cursor-pointer text-blue-gray-300 hover:text-blue-700'
					onClick={() => router.back()}
				/>
				<p>
					<span className='text-xl font-bold'>
						Privacy Policy for glomax.org
					</span>
				</p>
			</div>
			<p>
				<br /> <br />{' '}
				<span className='font-bold underline '>1. Introduction</span> <br />{' '}
				Welcome to glomax.org (the "Site"). At glomax.org, we value your privacy
				and are committed to protecting your personal information. This Privacy
				Policy outlines how we collect, use, disclose, and safeguard your
				information when you access or use our services on the Site. By using
				the Site, you consent to the practices described in this Privacy Policy.{' '}
				<br /> <br />{' '}
				<span className='font-bold underline '>2. Information We Collect</span>{' '}
				<br /> Personal Information: We may collect personal information such as
				your name, email address, contact information, and other details you
				provide when you register, log in, or use our services. <br /> Gaming
				Data: When you use gaming features on our site, we may collect
				information related to your gameplay, scores, preferences, and
				interactions. <br /> Trading Information: If you engage in trading
				activities on our site, we may collect information about your trading
				history, account activity, and related details. <br /> Log and Usage
				Data: We collect information about your interactions with the Site,
				including IP addresses, browser type, operating system, and pages
				visited. This data helps us improve the site's functionality and user
				experience. <br /> <br />{' '}
				<span className='font-bold underline '>
					3. How We Use Your Information
				</span>{' '}
				<br /> We use the information we collect for various purposes,
				including: <br /> Providing and improving our services Personalizing
				your experience on the Site Facilitating trading activities Sending you
				updates, offers, and promotional content (with your consent) Analyzing
				usage patterns and trends Enhancing site security and preventing fraud
				Complying with legal obligations <br /> <br />{' '}
				<span className='font-bold underline '>
					4. How We Share Your Information
				</span>{' '}
				<br /> We may share your information with third parties in the following
				situations: <br />
				With service providers who assist in site operations In response to
				legal requests and obligations To protect our rights, privacy, safety,
				or property, as well as yours In connection with a business transfer,
				such as a merger or acquisition <br /> <br />{' '}
				<span className='font-bold underline '>5. Your Choices</span>
				<br /> You can control your information in the following ways: <br />{' '}
				Account Settings: You can update your account information and
				preferences through your account settings. <br /> Marketing
				Communications: You can opt-out of receiving marketing communications by
				following the instructions in the communication or by contacting us
				directly. <br />
				<br />
				<span className='font-bold underline '>6. Data Security</span>
				<br /> We implement reasonable security measures to protect your
				information. However, please be aware that no method of transmission
				over the internet or electronic storage is entirely secure.
				<br /> <br />
				<span className='font-bold underline '>7. Children's Privacy</span>
				<br /> Our Site is not intended for children under the age of 13. We do
				not knowingly collect or solicit personal information from children.{' '}
				<br /> <br />{' '}
				<span className='font-bold underline '>
					8. Changes to this Privacy Policy
				</span>{' '}
				<br /> We may update this Privacy Policy from time to time. Changes will
				be effective upon posting on the Site. We encourage you to review this
				Policy periodically. <br /> <br />
				<span className='font-bold underline '>9. Contact Us</span>
				<br />
				If you have any questions or concerns about this Privacy Policy, please
				contact us at glomaxservice24@gamil.com
			</p>
		</div>
	);
};

export default Privacy;
