import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	useChangePasswordMutation,
	useCreatePasswordMutation,
} from '@/features/auth/authApi';
import { fetchBaseQueryError } from '@/services/helpers';
import UserLayout from '@/components/layout/UserLayout';
import Layout from '@/Layout';

const ChangePassword = () => {
	const router = useRouter();

	const [changePassword, { data, isSuccess, isLoading, isError, error }] =
		useChangePasswordMutation();

	const [oldPassword, setOldPassword] = useState<string>('');
	const [newPassword, setNewPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<boolean>(false);
	const [confirmPasswordError, setConfirmPasswordError] =
		useState<boolean>(false);
	const [errorText, setErrorText] = useState<string>('');

	// handle show password
	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	// submit form
	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		// validate password
		if (newPassword.length < 6) {
			setPasswordError(true);
			setErrorText('Password must be at least 6 characters ');
			return;
		} else {
			setPasswordError(false);
		}

		if (newPassword !== confirmPassword) {
			setConfirmPasswordError(true);
			setErrorText('Passwords do not match');
			return;
		}

		changePassword({
			oldPassword: oldPassword,
			newPassword: newPassword,
		});
	};

	// handle password change
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === 'oldPassword') {
			setOldPassword(value);
			setPasswordError(false);
		}
		if (name === 'newPassword') {
			setNewPassword(value);
			setPasswordError(false);
		}
		if (name === 'confirmPassword') {
			setConfirmPassword(value);
			setConfirmPasswordError(false);
		}
	};

	useEffect(() => {
		if (isError) {
			toast.error((error as fetchBaseQueryError).data.message);
		}
		if (isSuccess) {
			toast.success('Password Change successfully');
			router.push('/security');
		}
	}, [isSuccess, isError, error]);

	return (
		<Layout>
			<div className='px-6 mx-auto md:w-6/12 '>
				<h1 className='text-2xl font-bold gradient-text '>Change Password</h1>
				<div className='my-20'>
					<form onSubmit={handleSubmit}>
						<div className='space-y-4 text-white '>
							{/* Old Password */}
							<div className='relative flex flex-col gap-1'>
								<label
									className={`
									text-sm font-semibold text-gray-400 ${passwordError && 'text-red-500'}
								`}
								>
									Old Password
								</label>
								<input
									className={`px-4 py-2 bg-transparent border rounded ${
										passwordError && 'border-red-500'
									}`}
									type={showPassword ? 'text' : 'password'}
									name='oldPassword'
									value={oldPassword}
									onChange={handleChange}
								/>
								<span
									className='absolute right-0 flex items-center px-4 text-gray-600 top-[34px]'
									onClick={handleShowPassword}
								>
									{showPassword ? (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='currentColor'
											className='w-5 h-5'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
											/>
										</svg>
									) : (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='currentColor'
											className='w-5 h-5'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
											/>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
											/>
										</svg>
									)}
								</span>
								{passwordError && (
									<small className='text-xs text-red-500'>{errorText}</small>
								)}
							</div>
							{/* New Password */}
							<div className='relative flex flex-col gap-1'>
								<label
									className={`
									text-sm font-semibold text-gray-400 ${passwordError && 'text-red-500'}
								`}
								>
									New Password
								</label>
								<input
									className={`px-4 py-2 bg-transparent border rounded ${
										passwordError && 'border-red-500'
									}`}
									type={showPassword ? 'text' : 'password'}
									name='newPassword'
									value={newPassword}
									onChange={handleChange}
								/>
								<span
									className='absolute right-0 flex items-center px-4 text-gray-600 top-[34px]'
									onClick={handleShowPassword}
								>
									{showPassword ? (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='currentColor'
											className='w-5 h-5'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
											/>
										</svg>
									) : (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='currentColor'
											className='w-5 h-5'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
											/>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
											/>
										</svg>
									)}
								</span>
								{passwordError && (
									<small className='text-xs text-red-500'>{errorText}</small>
								)}
							</div>
							{/* Confirm password */}
							<div className='relative flex flex-col gap-1'>
								<label
									className={`
									text-sm font-semibold text-gray-400 ${confirmPasswordError && 'text-red-500'}
								`}
								>
									Confirm Password
								</label>
								<input
									className={`px-4 py-2 bg-transparent border rounded ${
										confirmPasswordError && 'border-red-500'
									}`}
									type={showPassword ? 'text' : 'password'}
									name='confirmPassword'
									value={confirmPassword}
									onChange={handleChange}
								/>
								<span
									className='absolute right-0 flex items-center px-4 text-gray-600 top-[34px]'
									onClick={handleShowPassword}
								>
									{showPassword ? (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='currentColor'
											className='w-5 h-5'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
											/>
										</svg>
									) : (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='currentColor'
											className='w-5 h-5'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
											/>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
											/>
										</svg>
									)}
								</span>
								{confirmPasswordError && (
									<small className='text-xs text-red-500'>{errorText}</small>
								)}
							</div>

							<div className='my-6 space-y-4'>
								<button className='w-full py-3 font-semibold bg-yellow-700 rounded text-blue-gray-900 bg-btn'>
									Submit
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default ChangePassword;
