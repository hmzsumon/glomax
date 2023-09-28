import Layout from '@/Layout';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
	Card,
	CardBody,
	CardFooter,
	Typography,
	Input,
	Button,
} from '@material-tailwind/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRegisterUserMutation } from '@/features/auth/authApi';
import { fetchBaseQueryError } from '@/services/helpers';
import { ExplanationIcon } from '@/global/icons/CommonIcons';

// regex pattern
const pattern = `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`;
const SignupPage = () => {
	const router = useRouter();
	const referralId = router.query.referral_id;
	// console.log(referralId);
	const [registerUser, { isLoading, error, isSuccess, isError }] =
		useRegisterUserMutation();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [name, setName] = useState<string>('');
	const [nameError, setNameError] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [usernameError, setUsernameError] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [emailError, setEmailError] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [phoneError, setPhoneError] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordError, setPasswordError] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
	const [referralCode, setReferralCode] = useState<string>(
		referralId as string
	);
	const [isAgree, setIsAgree] = useState<boolean>(false);
	const [isAgreeError, setIsAgreeError] = useState<string>('');

	// set referral code
	useEffect(() => {
		if (referralId) {
			setReferralCode(referralId as string);
		}
	}, [referralId]);

	// handle change phone
	const handleChangePhone = (value: string) => {
		const phone = value.replace(/[^0-9]+/g, '');
		const phoneWithCountryCode = `+${phone}`;
		setPhone(phoneWithCountryCode);
		setPhoneError('');
	};

	// handle show password
	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	// handle change
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		switch (name) {
			case 'name':
				setName(value);
				setNameError('');
				break;
			case 'username':
				setUsername(value);
				setUsernameError('');
				break;
			case 'email':
				setEmail(value);
				setEmailError('');
				break;

			case 'password':
				setPassword(value);
				setPasswordError('');
				break;
			case 'confirmPassword':
				setConfirmPassword(value);
				setConfirmPasswordError('');
				break;
			case 'referralCode':
				setReferralCode(value);
				break;
			default:
				break;
		}
	};

	// handle change agree
	const handleCheckbox = () => {
		setIsAgree(!isAgree);
		setIsAgreeError('');
	};

	// handle submit
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!name) {
			setNameError('Name is required');
			return;
		}

		if (!username) {
			setUsernameError('Username is required');
			return;
		}

		if (!email) {
			setEmailError('Email is required');
			return;
		}

		if (!phone) {
			setPhoneError('Phone is required');
			return;
		}

		if (!password) {
			setPasswordError('Password is required');
			return;
		} else if (!password.match(pattern)) {
			setPasswordError(
				'Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character!'
			);

			return;
		}

		if (!confirmPassword) {
			setConfirmPasswordError('Confirm password is required');
			return;
		} else if (password !== confirmPassword) {
			setConfirmPasswordError('Confirm password not match');
			return;
		}

		if (!isAgree) {
			setIsAgreeError('Please agree to the terms and conditions');
			return;
		}

		registerUser({
			name,
			username,
			email,
			phone,
			password,
			confirmPassword,
			referral: referralCode ? referralCode : '169442109',
		});
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Account created successfully');
			router.push({
				pathname: '/email-verify',
				query: { email: email },
			});
		}
		if (isError && error !== undefined) {
			toast.error((error as fetchBaseQueryError).data.message);
		}
	}, [isSuccess, isError]);

	return (
		<Layout>
			<div className='py-20 mb-10 signup-wrapper'>
				<div className='px-2 mx-auto md:w-7/12'>
					<form onSubmit={handleSubmit}>
						<Card className='bg-black_2 opacity-[0.95]'>
							<Typography className='mt-4 text-2xl font-bold text-center text-blue-gray-200'>
								Sign Up
							</Typography>
							<CardBody className='flex flex-col gap-4'>
								<div>
									<Input
										label='Full Name'
										size='lg'
										className='text-white'
										name='name'
										type='text'
										value={name}
										onChange={handleChange}
										error={nameError === '' ? false : true}
									/>
									{nameError && (
										<small className='text-red-500'>{nameError}</small>
									)}
								</div>
								<div>
									<Input
										label='User Name'
										size='lg'
										className='text-white'
										name='username'
										type='text'
										value={username}
										onChange={handleChange}
										error={usernameError === '' ? false : true}
									/>
									{usernameError && (
										<small className='text-red-500'>{usernameError}</small>
									)}
								</div>
								<div>
									<Input
										label='Email'
										size='lg'
										className='text-white'
										name='email'
										type='email'
										value={email}
										onChange={handleChange}
										error={emailError === '' ? false : true}
									/>
									{emailError && (
										<small className='text-red-500'>{emailError}</small>
									)}
								</div>

								<div>
									<PhoneInput
										placeholder='Enter phone number'
										country={'us'}
										dropdownStyle={{
											backgroundColor: '#0C1119',
											color: 'gray',
										}}
										inputStyle={{
											backgroundColor: 'transparent',
											color: `${phoneError ? 'red' : '#fff'}`,
											width: '100%',
											height: '45px',
											border: `${phoneError ? '1px solid red' : ''}`,
										}}
										buttonStyle={{
											backgroundColor: 'transparent',
											border: `${phoneError ? '1px solid red' : ''}`,
										}}
										value={phone}
										onChange={(phone) => handleChangePhone(phone)}
										inputProps={{
											name: 'phone',
										}}
									/>
									{phoneError && (
										<div>
											<small className='text-red-500'>{phoneError}</small>
										</div>
									)}
								</div>
								<div className='relative '>
									<Input
										label='Password'
										size='lg'
										className='text-white '
										type={showPassword ? 'text' : 'password'}
										name='password'
										value={password}
										onChange={handleChange}
										error={passwordError === '' ? false : true}
									/>
									{passwordError && (
										<small className='text-red-500'>{passwordError}</small>
									)}
									<span
										className='absolute right-0 flex items-center px-4 text-gray-300 top-[12px]'
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
								</div>

								<div className='relative '>
									<Input
										label='Confirm Password'
										size='lg'
										className='text-white '
										type={showPassword ? 'text' : 'password'}
										name='confirmPassword'
										value={confirmPassword}
										onChange={handleChange}
										error={confirmPasswordError === '' ? false : true}
									/>
									{confirmPasswordError && (
										<small className='flex items-center gap-1 mt-1 text-red-500'>
											<ExplanationIcon h={5} w={5} color={'red'} />
											<small className='text-red-500'>{phoneError}</small>
											{confirmPasswordError}
										</small>
									)}
									<span
										className='absolute right-0 flex items-center px-4 text-gray-300 top-[12px]'
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
								</div>

								<Input
									label='Invite Code (Optional)'
									size='lg'
									className='text-white'
									type='text'
									name='referralCode'
									value={referralCode}
									onChange={handleChange}
									readOnly={referralId ? true : false}
								/>
								<div className='flex items-center'>
									<input
										id='checked-checkbox'
										type='checkbox'
										// checked={isChecked}
										onChange={handleCheckbox}
										className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
									/>

									<label
										htmlFor='checked-checkbox'
										className='ml-2 text-xs font-medium text-blue-gray-100 dark:text-gray-300'
									>
										I confirm that I am 18 years old and I have read the
										<Link
											href='/privacy'
											className='ml-1 text-yellow-700 underline'
										>
											Terms of Service.
										</Link>{' '}
									</label>
								</div>
								{isAgreeError && (
									<small className='flex items-center gap-1 -mt-2 text-red-500'>
										<ExplanationIcon h={4} w={4} color={'red'} />
										<small className='text-red-500'>{isAgreeError}</small>
										{confirmPasswordError}
									</small>
								)}
							</CardBody>
							<CardFooter className='pt-0'>
								<Button
									fullWidth
									className='font-bold capitalize bg-yellow-700 text-blue-gray-900'
									type='submit'
								>
									Sign Up
								</Button>
								<Typography
									variant='small'
									className='flex justify-center mt-6'
								>
									Do you have an account?
									<Link href='/login'>
										<span className='ml-1 font-bold text-blue-700 underline'>
											Login
										</span>
									</Link>
								</Typography>
							</CardFooter>
						</Card>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default SignupPage;

// {
//       id: 4,
//       name: "password",
//       type: "password",
//       placeholder: "Password",
//       errorMessage:
//         "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
//       label: "Password",
//       pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
//       required: true,
//     },
