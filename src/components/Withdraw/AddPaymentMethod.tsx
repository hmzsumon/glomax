import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@/services/helpers';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { CloseIcon2, ExplanationIcon } from '@/utils/icons/CommonIcons';
import {
	useAddPaymentMethodMutation,
	useLoadUserQuery,
	useResendVerificationEmailMutation,
	useSecurityVerifyMutation,
} from '@/features/auth/authApi';
import {
	Option,
	Input,
	Dialog,
	DialogHeader,
	DialogBody,
} from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { maskEmail } from '@/utils/functions';

interface RejectionReason {
	value: string;
	label: string;
}

const AddPaymentMethod = () => {
	useLoadUserQuery();
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
		securityVerify,
		{
			isLoading: v_isLoading,
			isSuccess: v_isSuccess,
			isError: v_isError,
			error: v_error,
		},
	] = useSecurityVerifyMutation();

	const { user } = useSelector((state: any) => state.auth);

	const [addPaymentMethod, { isLoading, isError, isSuccess, error }] =
		useAddPaymentMethodMutation();
	const [trc20Address, setTrc20Address] = React.useState('');
	const [code, setCode] = useState<string>('');
	const [codeError, setCodeError] = useState<boolean>(false);
	const [errorText, setErrorText] = React.useState<string>('');
	const [open2, setOpen2] = useState(false);
	const [isResend, setIsResend] = useState<boolean>(false);
	const handleOpen2 = () => setOpen2(!open2);

	// Explicitly define the type for options
	const rejectionReasonsOptions: RejectionReason[] = [
		{ value: 'document_issue', label: 'Document Not Clear' },
		{ value: 'information_mismatch', label: 'Information Mismatch' },
		// Add more rejection reasons as needed
	];

	// submit form
	const next = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		securityVerify({ email: user?.email, code: code });
	};

	// handle submit
	const handleSubmit = () => {
		console.log('trc20Address', trc20Address);
		const data = {
			trc20Address,
		};

		addPaymentMethod(data);
	};

	// handle change
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCodeError(false);
		setErrorText('');
		const { value } = e.target;
		setCode(value);
	};

	// handle resend email verification
	const handleResend = () => {
		resendVerificationEmail({ email: user?.email as string });
		setIsResend(true);
	};

	useEffect(() => {
		if (v_isError) {
			setCodeError(true);
			setErrorText('Invalid code');
		}
		if (v_isSuccess) {
			setOpen2(false);

			setCode('');
			setIsResend(false);
			handleSubmit();
		}
	}, [v_isError, v_error, v_isSuccess]);

	useEffect(() => {
		if (isError && error) {
			toast.error((error as fetchBaseQueryError).data?.message);
		}

		if (isSuccess) {
			toast.success('Payment method added successfully');
		}
	}, [isError, isSuccess, error]);
	return (
		<div>
			<h2 className='text-center '>Add Payment Method</h2>
			<div>
				<div className='flex flex-col'>
					<label
						htmlFor='trc20Address'
						className='my-1 mr-2 text-sm font-bold text-blue-gray-200'
					>
						TRC20 Address
					</label>
					<input
						type='text'
						name='trc20Address'
						id='trc20Address'
						value={trc20Address}
						onChange={(e) => setTrc20Address(e.target.value)}
						className='px-2 py-1 bg-transparent border border-gray-400 rounded-md'
					/>
				</div>
				<button
					type='submit'
					className='w-full px-3 py-1 mt-2 text-white bg-blue-500 rounded-md'
					onClick={handleOpen2}
				>
					{isLoading ? (
						<ScaleLoader color={'#fff'} height={15} width={2} margin={2} />
					) : (
						'Add Payment Method'
					)}
				</button>
			</div>
			{/* Dialog Security */}
			<Dialog
				open={open2}
				handler={handleOpen2}
				size='xs'
				className='bg-black_2'
			>
				<div className='flex items-center justify-between '>
					<DialogHeader className='font-bold text-center text-blue-gray-200'>
						Security Verification
					</DialogHeader>
					<div className='flex items-end justify-end mx-2 my-2 '>
						<span onClick={handleOpen2}>
							<CloseIcon2 />
						</span>
					</div>
				</div>
				<hr className='border-0.5 border-black_3' />
				<DialogBody>
					<div className='my-4'>
						<div className='space-y-4 text-white '>
							<div className='relative flex flex-col gap-1 '>
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
									className='absolute text-xs font-bold text-yellow-800 right-2 top-9'
									onClick={handleResend}
								>
									{isResend ? (
										<span className='flex text-gray-500 '>
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
									<small className='text-gray-500 '>
										Enter the 6-digit code sent to {maskEmail(user?.email)}
									</small>
								)}
							</div>

							<div className='my-6 space-y-4'>
								<button
									className='w-full py-3 font-semibold text-gray-800 bg-yellow-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-700'
									onClick={next}
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
		</div>
	);
};

export default AddPaymentMethod;
