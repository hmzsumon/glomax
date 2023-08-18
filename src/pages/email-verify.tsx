import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	useResendVerificationEmailMutation,
	useVerifyEmailMutation,
} from '@/features/auth/authApi';
import { fetchBaseQueryError } from '@/services/helpers';
import Layout from '@/Layout';
import { Card } from '@material-tailwind/react';

const EmailVerify = () => {
	const [verifyEmail, { isLoading, isSuccess, isError, error }] =
		useVerifyEmailMutation();
	const router = useRouter();
	const { email } = router.query;

	// call resend email verification api
	const [
		resendVerificationEmail,
		{
			isLoading: isResendLoading,
			isSuccess: isResendSuccess,
			isError: isResendError,
			error: resendError,
		},
	] = useResendVerificationEmailMutation();

	const [code, setCode] = useState<string>('');
	const [isResend, setIsResend] = useState<boolean>(false);
	const [count, setCount] = useState<number>(30);

	// handle resend email verification
	const handleResend = () => {
		resendVerificationEmail({ email: email as string });
		setIsResend(true);
	};

	// timer
	useEffect(() => {
		let interval: any;
		if (isResend) {
			interval = setInterval(() => {
				setCount((prev) => prev - 1);
			}, 1000);
		}
		if (count === 0) {
			setIsResend(false);
			setCount(30);
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [count, isResend]);

	// submit form
	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		verifyEmail({ email: email as string, code: code });
	};

	useEffect(() => {
		if (isError) {
			toast.error((error as fetchBaseQueryError).data.message);
		}
		if (isSuccess) {
			toast.success('Email verified successfully');
			router.push('/login');
		}
		if (isResendError) {
			toast.error((resendError as fetchBaseQueryError).data.message);
		}
		if (isResendSuccess) {
			toast.success('Email verification code sent successfully');
		}
	}, [isSuccess, isError, isResendSuccess, isResendError]);

	return (
		<Layout>
			<div className='h-[100vh] py-20 signup-wrapper'>
				<div className='px-2 mx-auto my-24 md:my-10 md:w-7/12'>
					<Card className='bg-black_2  opacity-[0.95]'>
						<div className='px-6 mx-auto my-10'>
							<h1 className='text-2xl font-bold text-white '>
								Email Verification
							</h1>
							<p className='text-xs text-gray-500 '>
								Please enter the 6-digit verification code that was sent to
								<span className='mx-1 italic text-yellow-700 '>{email}</span>The
								code is valid for 30 minutes.
							</p>
							<div className='my-8'>
								<form onSubmit={handleSubmit}>
									<div className='space-y-4 text-white '>
										<div className='flex flex-col gap-1'>
											<label className='text-sm font-semibold text-gray-400 '>
												Email Verification Code
											</label>
											<input
												className='px-4 py-2 bg-transparent border rounded '
												type='text'
												value={code}
												onChange={(e) => setCode(e.target.value)}
											/>
										</div>

										<div className='my-6 space-y-4'>
											<button
												className='w-full py-3 font-semibold text-gray-800 bg-yellow-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-600'
												disabled={isLoading || isResendLoading}
											>
												Submit
											</button>
										</div>
									</div>
								</form>
								{/* Resend verify code */}
								{!isResend ? (
									<div className='flex justify-center'>
										<button
											className='text-sm text-gray-500 underline hover:text-blue-500 '
											onClick={handleResend}
										>
											Don't receive the code? Resend code
										</button>
									</div>
								) : (
									<div className='flex justify-center'>
										{/* Show set time out */}
										<p className='text-sm text-gray-500 '>
											Resend code in {count} seconds
										</p>
									</div>
								)}
							</div>
						</div>
					</Card>
				</div>
			</div>
		</Layout>
	);
};

export default EmailVerify;
