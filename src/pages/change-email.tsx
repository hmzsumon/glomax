import UserLayout from '@/components/layout/UserLayout';
import React, { use, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	useChangeEmailMutation,
	useResendVerificationEmailMutation,
	useSecurityVerifyMutation,
	useVerifyCodeForChangeEmailMutation,
	useVerifyEmailMutation,
} from '@/features/auth/authApi';
import { fetchBaseQueryError } from '@/services/helpers';
import {
	CloseIcon,
	CloseIcon2,
	EditIcon,
	ExplanationIcon,
} from '@/utils/icons/CommonIcons';
import { useSelector } from 'react-redux';
import { EmailIcon } from '@/utils/icons/SecurityIcons';
import { maskEmail, maskEmail2 } from '@/utils/functions';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from '@material-tailwind/react';
import { ScaleLoader } from 'react-spinners';
import Layout from '@/Layout';
import ProtectedRoute from '@/global/ProtectedRoute';

const ChangeEmail = () => {
	const router = useRouter();
	const [
		verifyCodeForChangeEmail,
		{
			isSuccess: newCodeSuccess,
			isLoading: newCodeLoading,
			isError: newCodeIsError,
			error: newCodeError,
		},
	] = useVerifyCodeForChangeEmailMutation();
	const [securityVerify, { isLoading, isSuccess, isError, error }] =
		useSecurityVerifyMutation();

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

	const [
		changeEmail,
		{
			isLoading: isChangeEmailLoading,
			isSuccess: isChangeEmailSuccess,
			isError: isChangeEmailError,
			error: changeEmailError,
		},
	] = useChangeEmailMutation();

	const [code, setCode] = useState<string>('');
	const [isResend, setIsResend] = useState<boolean>(false);
	const [codeError, setCodeError] = useState<boolean>(false);

	const { user } = useSelector((state: any) => state.auth);
	const { email } = user || {};

	const [newEmail, setNewEmail] = useState<string>('');
	const [emailError, setEmailError] = useState<boolean>(false);
	const [errorText, setErrorText] = useState<string>('');

	const [open, setOpen] = useState(false);
	const [open2, setOpen2] = useState(false);
	const [open3, setOpen3] = useState(false);
	const handleOpen = () => setOpen(!open);
	const handleOpen2 = () => setOpen2(!open2);
	const handleOpen3 = () => setOpen3(!open3);

	// handle resend email verification
	const handleResend = () => {
		resendVerificationEmail({ email: email as string });
		setIsResend(true);
	};

	// handle resend email verification for new email
	const handleResend2 = () => {
		verifyCodeForChangeEmail({ email: email, newEmail });
		setIsResend(true);
	};

	// useEffect
	useEffect(() => {
		if (newCodeIsError) {
			setIsResend(false);
			setEmailError(true);
			setErrorText('This email is already in use');
		}
		if (newCodeSuccess) {
			setCode('');
			setIsResend(true);
		}
	}, [newCodeSuccess, newCodeIsError, newCodeError]);

	// submit form
	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		securityVerify({ email: email as string, code: code });
	};

	// handle change
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCodeError(false);
		setErrorText('');
		const { value } = e.target;
		setCode(value);
		if (value.length === 6) {
			securityVerify({ email: email as string, code: value });
		}
	};

	// handle change
	const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCodeError(false);
		setErrorText('');
		const { value } = e.target;
		setCode(value);
	};

	// submit new email
	const handleSubmitNewEmail = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		// validate password
		if (!newEmail) {
			setEmailError(true);
			setErrorText('Please enter a valid email address');
			return;
		} else {
			setEmailError(false);
		}

		changeEmail({ email: user?.email, newEmail, code });
	};

	useEffect(() => {
		if (isChangeEmailSuccess) {
			handleOpen3();
			setNewEmail('');
			setCode('');
			setCodeError(false);
			setErrorText('');
			router.push('/login');
		}
		if (isChangeEmailError) {
			toast.error((changeEmailError as fetchBaseQueryError).data.message);
			setCodeError(true);
			setErrorText('Invalid code');
		}
	}, [isChangeEmailSuccess, isChangeEmailError, changeEmailError]);

	// handle  change handleChangeNewEmail
	const handleChangeNewEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === 'email') {
			setNewEmail(value);
			setEmailError(false);
		}
	};

	useEffect(() => {
		if (isError) {
			toast.error((error as fetchBaseQueryError).data.message);
			setCodeError(true);
			setErrorText('Invalid code');
		}
		if (isSuccess) {
			setCode('');
			setIsResend(false);
			handleOpen3();
		}
	}, [isSuccess, isError, error]);

	return (
		<Layout>
			<ProtectedRoute>
				<div className='py-20'>
					<div className=' mx-auto mt-20  md:w-6/12 space-y-4'>
						<h1 className=' text-center text-2xl font-semibold'>
							Change your email
						</h1>
						<div className='flex gap-10  items-center justify-center'>
							<div className=' flex items-center gap-2'>
								<EmailIcon h={20} w={20} />
								<p>{user?.email ? maskEmail(user?.email) : 'No email found'}</p>
							</div>
							<div onClick={handleOpen}>
								<EditIcon />
							</div>
						</div>
					</div>
					{/* Dialog alert */}
					<Dialog
						open={open}
						handler={handleOpen}
						size='xs'
						className='bg-black_2'
					>
						<DialogHeader className=' text-center text-xs text-blue-gray-200 '>
							Are You Sure You Want to Change Your Email Address?
						</DialogHeader>
						<DialogBody divider>
							<ul className='text-left list-disc text-xs'>
								<li className="before:content-['•'] before:block before:mr-2 flex">
									You will need to log in to your account after changing your
									email.
								</li>

								<li className="before:content-['•'] before:block before:mr-2 flex">
									The old email address cannot be used to re-register for 30
									days after updating it.
								</li>
							</ul>
						</DialogBody>
						<DialogFooter>
							<Button
								variant='text'
								color='red'
								onClick={handleOpen}
								className='mr-1'
							>
								<span>Cancel</span>
							</Button>
							<Button variant='gradient' color='amber' onClick={handleOpen2}>
								<span className=' capitalize text-gray-700'>Continue</span>
							</Button>
						</DialogFooter>
					</Dialog>

					{/* Dialog Security */}
					<Dialog
						open={open2}
						handler={handleOpen2}
						size='xs'
						className='bg-black_2'
					>
						<div className=' flex items-center justify-between'>
							<DialogHeader className=' text-center text-blue-gray-200 font-bold '>
								Security Verification
							</DialogHeader>
							<div className=' flex items-end justify-end my-2 mx-2'>
								<span onClick={handleOpen2}>
									<CloseIcon2 />
								</span>
							</div>
						</div>
						<hr className='border-0.5 border-black_3' />
						<DialogBody>
							<div className='my-4'>
								<div className='space-y-4 text-white '>
									<div className=' relative flex flex-col gap-1'>
										<label className='text-sm font-semibold text-gray-400 '>
											Email Verification Code
										</label>
										<input
											className={`px-4 py-2 ${
												codeError && 'border-red-500'
											} text-gray-700 bg-transparent border rounded hover:border-yellow-500 focus:border-yellow-600  focus:outline-none`}
											type='text'
											value={code}
											onChange={(e) => handleChange(e)}
										/>
										<button
											className=' absolute right-2 top-9 text-xs font-bold text-yellow-800 '
											onClick={handleResend}
										>
											{isResend ? (
												<span className=' flex text-gray-500'>
													Verification code sent
													<ExplanationIcon h={4} w={4} color={''} />
												</span>
											) : (
												'Get code'
											)}
										</button>

										{codeError && (
											<p className='text-xs text-red-500'>{errorText}</p>
										)}

										{user?.email && (
											<small className=' text-gray-500'>
												Enter the 6-digit code sent to {maskEmail(user?.email)}
											</small>
										)}
									</div>

									<div className='my-6 space-y-4'>
										<button
											className='w-full py-3 font-semibold text-gray-800 bg-yellow-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-700'
											disabled={isLoading || isResendLoading || code.length < 6}
										>
											{isLoading ? (
												<div className='flex justify-center'>
													<ScaleLoader color={'#ffffff'} loading={true} />
												</div>
											) : (
												'Next'
											)}
										</button>
									</div>
								</div>
							</div>
						</DialogBody>
					</Dialog>

					{/* Dialog New Email */}
					<Dialog open={open3} handler={handleOpen3} size='xs'>
						<div className=' flex items-end justify-end my-2 mx-2'>
							<span onClick={handleOpen3}>
								<CloseIcon2 />
							</span>
						</div>
						<DialogHeader className=' text-center text-sm font-bold '>
							Edit Email
						</DialogHeader>
						<DialogBody divider>
							<div className='my-8'>
								<div className='space-y-4 text-gray-700 '>
									<div className='space-y-4 text-gray-700 '>
										<div className='relative flex flex-col gap-1'>
											<label
												className={`
									text-sm font-semibold text-gray-400 ${emailError && 'text-red-500'}
								`}
											>
												New email
											</label>
											<input
												className={`px-4 focus:outline-none focus:border-yellow-700 py-2 bg-transparent border rounded ${
													emailError && 'border-red-500'
												}`}
												type='email'
												name='email'
												value={newEmail}
												onChange={handleChangeNewEmail}
											/>
											{newEmail && (
												<span
													className='absolute right-0 cursor-pointer flex items-center px-4 text-gray-600 top-[34px]'
													onClick={() => setNewEmail('')}
												>
													<CloseIcon h={6} w={6} color={'gray'} />
												</span>
											)}
											{emailError && (
												<small className='text-xs text-red-500'>
													{errorText}
												</small>
											)}
										</div>
									</div>
									<div className=' relative flex flex-col gap-1'>
										<label className='text-sm font-semibold text-gray-400 '>
											Email Verification Code
										</label>
										<input
											className='px-4 py-2 bg-transparent border rounded hover:border-yellow-500 focus:border-yellow-600  focus:outline-none'
											type='text'
											value={code}
											onChange={(e) => handleChange2(e)}
										/>
										<button
											className=' absolute right-2 top-9 text-xs font-bold text-yellow-800 '
											onClick={handleResend2}
										>
											{isResend ? (
												<span className=' flex text-gray-500'>
													Verification code sent
													<ExplanationIcon h={4} w={4} color={''} />
												</span>
											) : (
												'Get code'
											)}
										</button>
										{codeError && (
											<small className='text-xs text-red-500'>
												{errorText}
											</small>
										)}
										<small className=' text-gray-500'>
											Enter the 6-digit code sent to{' '}
											{newEmail && maskEmail(newEmail)}
										</small>
									</div>

									<div className='my-6 space-y-4'>
										<button
											className='w-full py-3 font-semibold text-gray-800 bg-yellow-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-700'
											onClick={handleSubmitNewEmail}
											disabled={
												newCodeLoading ||
												isChangeEmailLoading ||
												code.length < 6
											}
										>
											{newCodeLoading || isChangeEmailLoading ? (
												<div className='flex justify-center'>
													<ScaleLoader color={'#ffffff'} loading={true} />
												</div>
											) : (
												'Submit'
											)}
										</button>
									</div>
								</div>
							</div>
						</DialogBody>
					</Dialog>

					{/*<div className='px-6 mx-auto my-10 md:w-6/12 '>
				<h1 className='text-2xl   font-bold text-white '>Change your email</h1>
				<div className='my-8'>
					<form onSubmit={handleSubmit}>
						<div className='space-y-4 text-white '>
							<div className='relative flex flex-col gap-1'>
								<label
									className={`
									text-sm font-semibold text-gray-400 ${emailError && 'text-red-500'}
								`}
								>
									New email
								</label>
								<input
									className={`px-4 focus:outline-none focus:border-yellow-700 py-2 bg-transparent border rounded ${
										emailError && 'border-red-500'
									}`}
									type='email'
									name='email'
									value={newEmail}
									onChange={handleChange}
								/>
								{newEmail && (
									<span
										className='absolute right-0 cursor-pointer flex items-center px-4 text-gray-600 top-[34px]'
										onClick={() => setNewEmail('')}
									>
										<CloseIcon h={6} w={6} color={'gray'} />
									</span>
								)}
								{emailError && (
									<small className='text-xs text-red-500'>{errorText}</small>
								)}
							</div>

							<div className='my-6 space-y-4'>
								<button className='w-full py-3 font-semibold text-gray-800 bg-yellow-700 rounded'>
									Next
								</button>
							</div>
						</div>
					</form>
				</div>
			</div> */}
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default ChangeEmail;
