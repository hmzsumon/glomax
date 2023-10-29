import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCheckUserByEmailMutation } from '@/features/auth/authApi';
import Layout from '@/Layout';
import { Card } from '@material-tailwind/react';

const ForgotPassword = () => {
	const [email, setEmail] = useState<string>('');
	const [errorText, setErrorText] = useState<string>('');
	const [stateError, setStateError] = useState<boolean>(false);
	const [next, setNext] = useState<boolean>(false);

	const [checkUserByEmail, { data, isLoading, isError, error, isSuccess }] =
		useCheckUserByEmailMutation();
	const router = useRouter();

	// handle check user
	const handleCheckUser = () => {
		if (!email) {
			setStateError(true);
			setErrorText('Please enter your email');
			return;
		}
		checkUserByEmail({ email: email });
	};

	// handle change
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setStateError(false);
	};

	useEffect(() => {
		if (isError) {
			setStateError(true);
			setErrorText(
				'account does not exist. Please try again or create a new account.'
			);
		}

		if (isSuccess) {
			router.push({
				pathname: '/security-verification',
				query: { email: email, path: '/set-password' },
			} as any);
		}
	}, [isError, isSuccess]);

	return (
		<Layout>
			<div className='h-[100vh] py-20 signup-wrapper'>
				<div className='px-2 mx-auto my-24 md:my-10 md:w-7/12'>
					<Card className='bg-black_2  opacity-[0.95]'>
						<div className='px-6 my-10 '>
							<h1 className='text-2xl font-bold text-white '>
								Reset Your Password
							</h1>
							<div className='my-8'>
								<div className='space-y-4 text-white '>
									<div className='flex flex-col gap-1'>
										<label className='text-sm font-semibold text-gray-400 '>
											Enter Your Email
										</label>
										<input
											className={`px-4 py-2 bg-transparent border rounded hover:border-yellow-700 focus:border-yellow-700 ${
												stateError && 'border-red-500'
											} `}
											type='text'
											value={email}
											onChange={(e) => handleChange(e)}
										/>
										{stateError && (
											<small className='text-xs text-red-500'>
												{errorText}
											</small>
										)}
									</div>

									<div className='my-6 space-y-4'>
										<button
											className='w-full py-3 font-semibold text-gray-800 bg-yellow-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-600'
											onClick={handleCheckUser}
											disabled={isLoading || !email}
										>
											Next
										</button>
									</div>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</Layout>
	);
};

export default ForgotPassword;
