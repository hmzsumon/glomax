import Layout from '@/Layout';
import Board from '@/components/Wingame/Board';
import WinGlobalHistory from '@/components/Wingame/WinGlobalHistory';
import { useThreeMActiveGameQuery } from '@/features/winGame/winGameApi';
import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../global/ProtectedRoute';
import socketIOClient from 'socket.io-client';
import ioBaseUrl from '@/config/ioBaseUrl';
import { useSelector } from 'react-redux';
import WinDialogBox from '@/global/WinDialogBox';

const WingameThree = () => {
	const { user } = useSelector((state: any) => state.auth);
	const { data, isLoading, isError, error, isSuccess } =
		useThreeMActiveGameQuery();
	const { game } = data || { game: null };
	const [response, setResponse] = useState<any>({});
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(!open);

	return (
		<Layout>
			<ProtectedRoute>
				<div className='py-20 referral-wrapper'>
					<div className='overlay'></div>
					<div className='space-y-4 content '>
						<div className='px-4'>
							<Board game={game} />
						</div>
						<div className='px-4'>
							<WinGlobalHistory game={game} />
						</div>
					</div>
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default WingameThree;
