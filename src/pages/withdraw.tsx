import Layout from '@/Layout';
import LeftContent from '@/components/Withdraw/LeftContent';
import ProtectedRoute from '@/global/ProtectedRoute';
import { HistoryIcon } from '@/global/icons/CommonIcons';

const Withdraw = () => {
	return (
		<Layout>
			<ProtectedRoute>
				<div className='  py-20 px-2 withdraw-wrapper'>
					<div className='relative px-4 py-6 mx-auto rounded-lg bg-black_2 md:w-7/12'>
						<div className='flex items-center justify-between mb-4'>
							<div className='ml-2 '>
								<h1 className='-mb-1 font-bold '>Withdraw USDT</h1>
								<small className=' text-[0.6rem] text-blue-gray-600'>
									Withdraw USDT to crypto & Binance Pay{' '}
								</small>
							</div>
							<div className='flex '>
								<HistoryIcon h={4} w={4} color={'gray'} />
								<small className='text-[.7rem] text-blue-gray-600 '>
									History
								</small>
							</div>
						</div>

						<div className=''>
							<LeftContent />
						</div>
					</div>
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default Withdraw;
