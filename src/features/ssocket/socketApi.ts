import ioBaseUrl from '@/config/ioBaseUrl';
import { apiSlice } from '../api/apiSlice';
import { useEffect, useState } from 'react'; // Import React hooks
import io, { Socket } from 'socket.io-client';

const useSocket = (): Socket => {
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const socket = io(ioBaseUrl); // Replace with your Socket.IO server URL
		setSocket(socket);

		// Clean up the socket connection on unmount
		return () => {
			if (socket) {
				socket.disconnect();
			}
		};
	}, []);

	return socket as Socket; // Explicitly cast socket to Socket type
};

export const socketApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		subscribeToData: builder.query<any, void>({
			async queryFn() {
				const socket = useSocket(); // Avoid using the useSocket hook here
				return new Promise((resolve) => {
					socket.on('data', (data) => {
						resolve(data);
					});
				});
			},
		}),
	}),
});

export const { useSubscribeToDataQuery } = socketApi;
