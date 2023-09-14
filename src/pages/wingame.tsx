import Layout from '@/Layout';
import Board from '@/components/Wingame/Board';
import WinGlobalHistory from '@/components/Wingame/WinGlobalHistory';
import { useOneMActiveGameQuery } from '@/features/winGame/winGameApi';
import ProtectedRoute from '@/global/ProtectedRoute';
import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import ioBaseUrl from '@/config/ioBaseUrl';
import { useSelector } from 'react-redux';
import WinDialogBox from '@/global/WinDialogBox';
import { useLoadUserQuery } from '@/features/auth/authApi';
const Wingame = () => {
	useLoadUserQuery();
	const { user } = useSelector((state: any) => state.auth);
	const { data, isLoading, isError, error, isSuccess, refetch } =
		useOneMActiveGameQuery();
	const { game } = data || { game: null };

	useEffect(() => {
		refetch();
	}, []);

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

export default Wingame;
