import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRegistrationDoneMutation } from '@/features/auth/authApi';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/services/helpers';

const RegisterDone = () => {
	const router = useRouter();
	const { email } = router.query;
	const [registrationDone, { isLoading, isError, isSuccess, error }] =
		useRegistrationDoneMutation();

	// handle got to mining
	const handleSubmit = () => {
		registrationDone({ email });
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Account created successfully');
			router.push('/login');
		}

		if (isError) {
			toast.error((error as fetchBaseQueryError).data.message);
		}
	}, [isSuccess, isError]);

	return (
		<>
			<div className='px-2 py-2 '>
				<Link href='/'>
					<Image src='/logo_white_2.png' alt='WFC' width={60} height={10} />
				</Link>
			</div>
			<div className='px-6 mx-auto my-10 md:w-6/12 '>
				<div>
					<Image
						src='/images/register_success.gif'
						alt='Success'
						width={200}
						height={100}
						className='mx-auto'
					/>
				</div>
				<h1 className='text-2xl font-bold text-center text-white '>
					Account Successfully Created
				</h1>
				<div className='my-6'>
					<div className='space-y-4 text-white '>
						<div className='my-6 space-y-4'>
							<button
								className='w-full py-3 font-semibold text-gray-800 bg-yellow-700 rounded'
								onClick={handleSubmit}
							>
								Done
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RegisterDone;
