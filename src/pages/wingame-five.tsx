import Layout from '@/Layout';
import Board from '@/components/Wingame/Board';
import WinGlobalHistory from '@/components/Wingame/WinGlobalHistory';
import { useFiveMActiveGameQuery } from '@/features/winGame/winGameApi';
import React, { useEffect, useState } from 'react';

import ProtectedRoute from '@/global/ProtectedRoute';
import socketIOClient from 'socket.io-client';
import ioBaseUrl from '@/config/ioBaseUrl';
import { useSelector } from 'react-redux';
import WinDialogBox from '@/global/WinDialogBox';

const WingameFive = () => {
	const { user } = useSelector((state: any) => state.auth);
	const { data, isLoading, isError, error, isSuccess } =
		useFiveMActiveGameQuery();
	const { game } = data || { game: null };
	// console.log('game5', game);

	const [response, setResponse] = useState<any>({});
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(!open);

	useEffect(() => {
		const socket = socketIOClient(ioBaseUrl, { transports: ['websocket'] });

		socket.on('result-pop', (data) => {
			// find this user particular data and set it to response
			const userResponse = data.find((item: any) => item.user_id === user?._id);
			setResponse(userResponse);

			// check if user is in the game
			// Check if data is an array and if user_id is present in any of the objects
			if (
				Array.isArray(data) &&
				data.some((item) => item.user_id === user?._id)
			) {
				setOpen(true);
				// Close the dialog after 3 seconds
				setTimeout(() => {
					setOpen(false);
					setResponse({});
				}, 3000);
			}
		});

		// Cleanup function to disconnect the socket and remove event listener when the component unmounts
		return () => {
			socket.disconnect();
			socket.off('result-pop'); // Remove the 'result-pop' event listener
		};
	}, [user?._id]);

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
					<WinDialogBox open={open} handler={handleOpen} response={response} />
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default WingameFive;
