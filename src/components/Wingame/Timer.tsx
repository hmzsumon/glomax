import React, { useEffect } from 'react';
import useTimer from '@/hooks/useTimer';

const Timer = ({ gameType }: any) => {
	const { remainingSeconds, gameId, setTimer } = useTimer({ gameType });
	// console.log('remainingSeconds', remainingSeconds);

	const formatTime = (timeInSeconds: number): string => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds
			.toString()
			.padStart(2, '0')}`;
	};

	useEffect(() => {
		setTimer(remainingSeconds);
	}, [remainingSeconds]);

	return (
		<div>
			{remainingSeconds > 0 ? (
				<div className='flex items-center justify-between px-4 py-2 list-none rounded-md timer'>
					<li className='flex flex-col items-center gap-1 md:flex-row'>
						<p className='text-blue-gray-200 '>Period ID </p>
						<p className='text-blue-gray-50 '>{gameId}</p>
					</li>
					<li className='flex flex-col items-center gap-1 md:flex-row'>
						<p>Count Down</p>
						<p>{formatTime(remainingSeconds)}</p>
					</li>
				</div>
			) : (
				<div className='flex items-center justify-center px-4 py-2 list-none rounded-md timer'>
					{remainingSeconds === 0 ? (
						<p className='text-blue-gray-50 '>Loading...</p>
					) : (
						<p className='text-blue-gray-50 '>Waiting for next game</p>
					)}
				</div>
			)}
		</div>
	);
};

export default Timer;
