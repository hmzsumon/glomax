import UserLayout from '@/components/layout/UserLayout';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
	useAddPhoneNumberMutation,
	useChangePhoneNumberMutation,
} from '@/features/auth/authApi';
import { useRouter } from 'next/router';
import { CloseIcon, CloseIcon2, EditIcon } from '@/utils/icons/CommonIcons';
import { EmailIcon, PhoneIcon } from '@/utils/icons/SecurityIcons';
import { maskEmail, maskPhoneNumber } from '@/utils/functions';
import { ScaleLoader } from 'react-spinners';
import Layout from '@/Layout';
import ProtectedRoute from '@/global/ProtectedRoute';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from '@material-tailwind/react';
import { fetchBaseQueryError } from '@/services/helpers';

const SetPhoneNumber = () => {
	const router = useRouter();
	const { user } = useSelector((state: any) => state.auth);
	const [addPhoneNumber, { isLoading, isError, isSuccess, error }] =
		useAddPhoneNumberMutation();

	// change phone number
	const [
		changePhoneNumber,
		{
			isLoading: isChangeLoading,
			isError: isChangeError,
			isSuccess: isChangeSuccess,
			error: changeError,
		},
	] = useChangePhoneNumberMutation();
	const [phoneNumber, setPhoneNumber] = React.useState('');
	const [errorText, setErrorText] = useState<string>('');
	const [stateError, setStateError] = useState<boolean>(false);

	const [newPhone, setNewPhone] = useState<string>('');
	const [phoneError, setPhoneError] = useState<boolean>(false);

	const [open3, setOpen3] = useState(false);
	const handleOpen3 = () => setOpen3(!open3);

	const handlePhoneNumberChange = (value: string) => {
		setPhoneNumber(value);
	};

	// handle  change handleChangePhone
	const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === 'phone') {
			setNewPhone(value);
			setPhoneError(false);
		}
	};

	// submit phone number
	const handleSubmit = () => {
		if (!phoneNumber) {
			setStateError(true);
			setErrorText('Please enter your phone number');
			return;
		}
		addPhoneNumber({ phone: phoneNumber, id: user?._id });
	};

	const handleSubmitNewPhone = () => {
		if (!newPhone) {
			setPhoneError(true);
			setErrorText('Please enter your new phone number');
			return;
		}
		changePhoneNumber({ newPhone, id: user?._id });
	};

	React.useEffect(() => {
		if (changeError) {
			setPhoneError(true);
			setErrorText((error as fetchBaseQueryError).data.message);
			toast.error((error as fetchBaseQueryError).data.message);
		}

		if (isChangeSuccess) {
			toast.success('Phone number changed successfully');
			router.push('/security');
		}
	}, [changeError, isChangeSuccess]);

	React.useEffect(() => {
		if (isError) {
			setStateError(true);
			setErrorText('Phone number already exists');
		}

		if (isSuccess) {
			toast.success('Phone number added successfully');
			router.push('/security');
		}
	}, [isError, isSuccess]);

	return (
		<Layout>
			<ProtectedRoute>
				<div className='py-10'>
					{user?.phone ? (
						<div className='mx-auto my-20 space-y-4 md:w-6/12'>
							<h1 className='text-2xl font-semibold text-center '>
								Change your phone number
							</h1>
							<div className='flex items-center justify-center gap-10'>
								<div className='flex items-center gap-2 '>
									<PhoneIcon h={20} w={20} />
									<p>
										{user?.email
											? maskPhoneNumber(user?.phone)
											: 'No phone found'}
									</p>
								</div>
								<div onClick={handleOpen3}>
									<EditIcon />
								</div>
							</div>
						</div>
					) : (
						<div className='flex flex-col items-center justify-center h-screen'>
							<h1 className='text-2xl font-semibold'>
								Please Add Your Phone Number
							</h1>
							<div className='w-full px-4 my-8 md:w-[50vw]'>
								<div className='space-y-4 text-white '>
									<div className='relative flex flex-col gap-1 '>
										<label className='text-sm font-semibold text-gray-400 '>
											Please enter a valid phone number
										</label>
										<PhoneInput
											placeholder='Enter phone number'
											value={phoneNumber}
											onChange={(phoneNumber) =>
												handlePhoneNumberChange(phoneNumber)
											}
											country={'us'}
											dropdownStyle={{
												backgroundColor: '#1f1f1f',
												color: 'gray',
											}}
											inputStyle={{
												backgroundColor: '#1f1f1f',
												color: 'gray',
												width: '100%',
												height: '45px',
											}}
											buttonStyle={{
												backgroundColor: '#1f1f1f',
											}}
										/>
										<span
											className='absolute right-0 cursor-pointer flex items-center px-4 text-gray-600 top-[34px]'
											onClick={() => setPhoneNumber('')}
										>
											<CloseIcon h={6} w={6} color={'gray'} />
										</span>

										{stateError && (
											<small className='text-xs text-red-500'>
												{errorText}
											</small>
										)}
									</div>

									<div className='my-6 space-y-4'>
										<button
											className='w-full py-3 font-semibold text-gray-800 bg-yellow-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-700'
											disabled={isLoading || phoneNumber.length < 10}
											onClick={handleSubmit}
										>
											{isLoading ? (
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
						</div>
					)}
				</div>

				{/* Dialog New Phone */}
				<Dialog open={open3} handler={handleOpen3} size='xs'>
					<div className=' flex items-end justify-end my-2 mx-2'>
						<span onClick={handleOpen3}>
							<CloseIcon2 />
						</span>
					</div>
					<DialogHeader className=' text-center text-sm font-bold '>
						Change your phone number
					</DialogHeader>
					<DialogBody divider>
						<div className='my-8'>
							<div className='space-y-4 text-gray-700 '>
								<div className='space-y-4 text-gray-700 '>
									<div className='relative flex flex-col gap-1'>
										<label
											className={`
									text-sm font-semibold text-gray-400 ${phoneError && 'text-red-500'}
								`}
										>
											New Phone Number
										</label>
										<input
											className={`px-4 focus:outline-none focus:border-yellow-700 py-2 bg-transparent border rounded ${
												phoneError && 'border-red-500'
											}`}
											type='phone'
											name='phone'
											value={newPhone}
											onChange={handleChangePhone}
										/>
										{newPhone && (
											<span
												className='absolute right-0 cursor-pointer flex items-center px-4 text-gray-600 top-[34px]'
												onClick={() => setNewPhone('')}
											>
												<CloseIcon h={6} w={6} color={'gray'} />
											</span>
										)}
										{phoneError && (
											<small className='text-xs text-red-500'>
												{errorText}
											</small>
										)}
									</div>
								</div>
								{/* <div className=' relative flex flex-col gap-1'>
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
										<small className='text-xs text-red-500'>{errorText}</small>
									)}
									<small className=' text-gray-500'>
										Enter the 6-digit code sent to{' '}
										{newEmail && maskEmail(newEmail)}
									</small>
								</div> */}

								<div className='my-6 space-y-4'>
									<button
										className='w-full py-3 font-semibold text-gray-800 bg-yellow-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-700'
										onClick={handleSubmitNewPhone}
										// disabled={
										// 	newCodeLoading || isChangeEmailLoading
										// }
									>
										{isChangeLoading ? (
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
			</ProtectedRoute>
		</Layout>
	);
};

export default SetPhoneNumber;
