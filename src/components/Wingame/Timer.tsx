import React, { useEffect } from 'react';
import useTimer from '@/hooks/useTimer';

const Timer = ({ gameType }: any) => {
	const { remainingSeconds, gameId, setTimer } = useTimer({ gameType });
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
				<div className='flex list-none items-center rounded-md justify-between px-4 py-2 timer'>
					<li className=' flex flex-col md:flex-row items-center'>
						<p>Period Id </p>
						<p>{gameId}</p>
					</li>
					<li className=' flex flex-col gap-1 md:flex-row items-center'>
						<p>Count Down</p>
						<p>{formatTime(remainingSeconds)}</p>
					</li>
				</div>
			) : (
				<div className='flex list-none items-center rounded-md justify-center px-4 py-2 timer'>
					<p>Game Over! Wait for the next game.</p>
				</div>
			)}
		</div>
	);
};

export default Timer;
