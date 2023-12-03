import { useGetWhatsappCodeMutation } from '@/features/withdraw/withdrawApi';
import React from 'react';

function TestTwilio() {
	const [getWhatsappCode, { isLoading }] = useGetWhatsappCodeMutation();
	const [phon, setPhone] = React.useState('');
	const [customer, setCustomer] = React.useState('');

	// handleGetCode
	const handleGetCode = async () => {
		const data = {
			phone: phon,
			customer_id: customer,
		};

		getWhatsappCode(data);
	};

	return (
		<div>
			<div className='flex items-center w-1/2 mx-auto my-16'>
				<div>
					<div className='w-1/2'>
						<label htmlFor='phone'>Phone</label>
						<input
							type='text'
							name='phone'
							id='phone'
							value={phon}
							onChange={(e) => setPhone(e.target.value)}
							className='text-black'
						/>
					</div>
					<div className='w-1/2'>
						<label htmlFor='customer'>Customer</label>
						<input
							type='text'
							name='customer'
							id='customer'
							value={customer}
							onChange={(e) => setCustomer(e.target.value)}
							className='text-black'
						/>
					</div>
				</div>
				<div>
					<button
						className='px-4 py-2 mt-4 text-white bg-blue-500 rounded-md'
						onClick={handleGetCode}
					>
						{isLoading ? 'Loading...' : 'Get Code'}
					</button>
				</div>
			</div>
		</div>
	);
}

export default TestTwilio;
