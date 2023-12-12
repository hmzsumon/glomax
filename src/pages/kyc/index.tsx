import Layout from '@/Layout';
import ProtectedRoute from '@/global/ProtectedRoute';
import React, { useEffect } from 'react';
import {
	Card,
	Input,
	Checkbox,
	Button,
	Typography,
} from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import NidOne from '@/components/Kyc/NidOne';
import NidTwo from '@/components/Kyc/NidTwo';
import Photo from '@/components/Kyc/Photo';
import { useKycVerificationMutation } from '@/features/auth/authApi';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@/services/helpers';
import { PulseLoader } from 'react-spinners';

const Kyc = () => {
	const { user } = useSelector((state: any) => state.auth);

	const [kycVerification, { isLoading, isError, isSuccess, error }] =
		useKycVerificationMutation();

	const [name, setName] = React.useState(user?.name);
	const [address, setAddress] = React.useState(user?.address);
	const [city, setCity] = React.useState(user?.city);
	const [zip, setZip] = React.useState(user?.zip);
	const [country, setCountry] = React.useState(user?.country);
	const [nidNo, setNidNo] = React.useState(user?.nidNo);
	const [nidOne, setNidOne] = React.useState(user?.nidOne);
	const [nidTwo, setNidTwo] = React.useState(user?.nidTwo);
	const [photo, setPhoto] = React.useState(user?.photo);
	const [date_of_birth, setDate_of_birth] = React.useState(user?.date_of_birth);

	// submit form
	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (
			!name ||
			!address ||
			!city ||
			!zip ||
			!country ||
			!nidNo ||
			!nidOne ||
			!nidTwo ||
			!photo
		) {
			toast.error('Please fill all fields');
			return;
		}

		const formData = {
			name,
			address,
			city,
			zip,
			country,
			nidNo,
			nidOne,
			nidTwo,
			photo,
			date_of_birth,
		};
		console.log(formData);
		kycVerification(formData);
	};

	useEffect(() => {
		if (isError) {
			if (isError && error) {
				toast.error((error as fetchBaseQueryError).data?.message);
			}
		}

		if (isSuccess) {
			toast.success('KYC verification submitted successfully');
		}
	}, [isError, error, isSuccess]);
	return (
		<Layout>
			<ProtectedRoute>
				<div className='py-20'>
					{user?.kyc_verified ? (
						<div>
							<div className='flex flex-col items-center justify-center'>
								<h1 className='text-2xl font-bold text-blue-gray-200'>
									Your KYC verification is approved
								</h1>
								<p className='text-blue-gray-200'>
									You can now deposit and withdraw funds
								</p>
							</div>
						</div>
					) : (
						<div className=' w-full md:w-7/12 mx-auto flex items-center justify-center'>
							{!user?.is_verify_request ? (
								<div>
									<Card color='transparent' shadow={false}>
										<div className='px-4'>
											<Typography variant='h4' className=' text-blue-gray-100'>
												KYC Form
											</Typography>
											<Typography
												color='gray'
												className='mt-1 font-normal text-blue-gray-200'
											>
												Please fill in the form below to complete your KYC
												registration.
											</Typography>
										</div>
										<form className='mt-8 mb-2 w-full max-w-screen-lg px-4'>
											<div className='mb-1 flex flex-col gap-6'>
												<Typography
													variant='h6'
													className='-mb-3 text-blue-gray-200'
												>
													Your Full Name
												</Typography>
												<Input
													size='lg'
													placeholder='name@mail.com'
													className='  text-blue-gray-100 !border-t-blue-gray-200 focus:!border-t-gray-900'
													value={name}
													readOnly
												/>
												{/*Start Address */}
												<Typography
													variant='h6'
													color='blue-gray'
													className='-mb-3 text-blue-gray-200'
												>
													Address
												</Typography>
												<Input
													size='lg'
													className=' text-blue-gray-100 !border-t-blue-gray-200 focus:!border-t-gray-900'
													labelProps={{
														className: 'before:content-none after:content-none',
													}}
													value={address}
													onChange={(e) => setAddress(e.target.value)}
												/>
												{/*End Address */}

												{/*Start City */}
												<Typography
													variant='h6'
													color='blue-gray'
													className='-mb-3 text-blue-gray-200'
												>
													City
												</Typography>
												<Input
													size='lg'
													className=' text-blue-gray-100 !border-t-blue-gray-200 focus:!border-t-gray-900'
													labelProps={{
														className: 'before:content-none after:content-none',
													}}
													value={city}
													onChange={(e) => setCity(e.target.value)}
												/>
												{/*End City */}

												{/*Start Zip */}
												<Typography
													variant='h6'
													color='blue-gray'
													className='-mb-3 text-blue-gray-200'
												>
													Zip Code
												</Typography>
												<Input
													size='lg'
													className=' text-blue-gray-100 !border-t-blue-gray-200 focus:!border-t-gray-900'
													labelProps={{
														className: 'before:content-none after:content-none',
													}}
													value={zip}
													onChange={(e) => setZip(e.target.value)}
												/>
												{/*End Zip */}

												{/*Start Country */}
												<Typography
													variant='h6'
													color='blue-gray'
													className='-mb-3 text-blue-gray-200'
												>
													Country
												</Typography>
												<Input
													size='lg'
													className=' text-blue-gray-100 !border-t-blue-gray-200 focus:!border-t-gray-900'
													labelProps={{
														className: 'before:content-none after:content-none',
													}}
													value={country}
													onChange={(e) => setCountry(e.target.value)}
												/>
												{/*End Country */}
												{/* Start Date of Birth */}
												<Typography
													variant='h6'
													color='blue-gray'
													className='-mb-3 text-blue-gray-200'
												>
													Date of Birth
												</Typography>
												<Input
													type='date'
													size='lg'
													className=' text-blue-500 !border-t-blue-gray-100 focus:!border-t-gray-900'
													labelProps={{
														className:
															'before:content-none after:content-none ',
													}}
													value={date_of_birth}
													onChange={(e) => setDate_of_birth(e.target.value)}
												/>
												{/* End Date of Birth */}

												{/*Start Nid No */}
												<Typography
													variant='h6'
													color='blue-gray'
													className='-mb-3 text-blue-gray-200'
												>
													Nid/Passport/Driving License No
												</Typography>
												<Input
													size='lg'
													className=' text-blue-gray-100 !border-t-blue-gray-200 focus:!border-t-gray-900'
													labelProps={{
														className: 'before:content-none after:content-none',
													}}
													value={nidNo}
													onChange={(e) => setNidNo(e.target.value)}
												/>
												{/*End Nid No */}
											</div>
										</form>
										<div className='grid md:grid-cols-3 gap-2 px-4'>
											<NidOne setNidOne={setNidOne} />
											<NidTwo setNidTwo={setNidTwo} />
											<Photo setPhoto={setPhoto} />
										</div>

										<div className='px-4'>
											<Button className='mt-6' fullWidth onClick={handleSubmit}>
												{isLoading ? (
													<PulseLoader color='white' size={10} />
												) : (
													'Submit'
												)}
											</Button>
										</div>
									</Card>
								</div>
							) : (
								<div className='flex flex-col items-center justify-center px-4'>
									<h1 className='text-xl font-bold text-center my-2 text-blue-gray-200'>
										Your KYC verification <br /> Is under review
									</h1>
									<p className=' text-orange-800'>
										Please wait for admin approval, it may take up to 24 - 72
										hours.
									</p>
								</div>
							)}
						</div>
					)}
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default Kyc;
