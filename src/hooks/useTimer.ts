import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import ioBaseUrl from '@/config/ioBaseUrl';
import { type } from 'os';

interface TimerOptions {
	gameType: string;
}

interface TimerState {
	remainingSeconds: number;
	gameId: string;
	setTimer: (time: number) => void;
	id: string;
	timer: number;
	type: string;
}

const useTimer = ({ gameType }: TimerOptions): TimerState => {
	const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
	const [gameId, setGameId] = useState('');
	const [id, setId] = useState('');
	const [timer, setTimer] = useState<number>(0);
	const [type, setType] = useState<string>('');

	useEffect(() => {
		const socket: Socket = io(ioBaseUrl, {
			transports: ['websocket', 'polling'],
		});

		socket.on('connect', () => {
			// console.log('Connected to Socket.IO server', socket.id);
		});

		socket.on('connect_error', (error) => {
			console.error('Failed to connect to Socket.IO server', error);
		});

		const handleGameData = (data: any) => {
			setRemainingSeconds(data?.time);
			setGameId(data?.game_id); // period no
			setTimer(data?.time);
			setId(data?.id); // game._id
			setType(data?.game_type);
		};

		if (gameType === '1m') {
			socket.on('game-1m', handleGameData);
		} else if (gameType === '3m') {
			socket.on('game-3m', handleGameData);
		} else if (gameType === '5m') {
			socket.on('game-5m', handleGameData);
		}

		socket.on('disconnect', () => {
			// console.log('Disconnected from Socket.IO server');
			setRemainingSeconds(0);
		});

		// Cleanup function to disconnect the socket and remove event listeners when the component unmounts
		return () => {
			if (gameType === '1m') {
				socket.off('game-1m', handleGameData);
			} else if (gameType === '3m') {
				socket.off('game-3m', handleGameData);
			} else if (gameType === '5m') {
				socket.off('game-5m', handleGameData);
			}
			socket.disconnect();
		};
	}, [gameType]);

	return { remainingSeconds, gameId, setTimer, id, timer, type };
};

export default useTimer;
