import Layout from '@/Layout';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@/services/helpers';
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
import { useState, useEffect } from 'react';
import { useLoginUserMutation } from '@/features/auth/authApi';
import { NextPage } from 'next';

const LoginPage: NextPage = () => {
	const router = useRouter();
	const [loginUser, { isLoading, isError, isSuccess, error }] =
		useLoginUserMutation();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	// handle change
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === 'email') {
			setEmail(value);
		} else {
			setPassword(value);
		}
	};
	// handle submit
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!email || !password) {
			toast.error('Please fill all the fields');
			return;
		}
		loginUser({ email, password });
	};

	const [showPassword, setShowPassword] = useState<boolean>(false);
	// handle show password
	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	useEffect(() => {
		if (isError && error) {
			toast.error((error as fetchBaseQueryError).data.message);
			if ((error as fetchBaseQueryError).status === 405) {
				router.push({
					pathname: '/email-verify',
					query: { email: email },
				});
			}
		}
		if (isSuccess) {
			toast.success('Login successful');
			router.push('/');
		}
	}, [isError, isSuccess, error]);
	return (
		<Layout>
			<div className='h-[100vh] py-20 signup-wrapper'>
				<div className='px-2 mx-auto my-24 md:my-10 md:w-7/12'>
					<form onSubmit={handleSubmit}>
						<Card className='bg-black_2  opacity-[0.95]'>
							<Typography className='mt-4 text-2xl font-bold text-center text-blue-gray-200'>
								Login to your account
							</Typography>
							<CardBody className='flex flex-col gap-4'>
								<Input
									label='Email'
									size='lg'
									className='text-white'
									type='email'
									name='email'
									value={email}
									onChange={handleChange}
									required
								/>
								<div className='relative '>
									<Input
										label='Password'
										size='lg'
										className='text-white '
										type={showPassword ? 'text' : 'password'}
										name='password'
										value={password}
										onChange={handleChange}
										required
									/>
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
								<div className=''>
									<Link href='/forgot-password'>
										<Typography
											variant='small'
											color='blue'
											className='ml-1 font-bold underline'
										>
											Forgot password?
										</Typography>
									</Link>
								</div>
							</CardBody>
							<CardFooter className='pt-0'>
								<Button
									fullWidth
									className='capitalize bg-yellow-700 text-blue-gray-900 '
									type='submit'
								>
									Login
								</Button>
								<Typography
									variant='small'
									className='flex justify-center mt-6'
								>
									Don't have an account?
									<Link href='/register'>
										<span className='ml-1 font-bold text-blue-700 underline'>
											Sign up
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

export default LoginPage;
