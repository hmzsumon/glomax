import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client'; // Import the Socket type from socket.io-client
import ioBaseUrl from '@/config/ioBaseUrl';
interface SocketEventData {
	[key: string]: any;
}

const useSocket = (): Socket => {
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const socket = io(ioBaseUrl, { transports: ['websocket', 'polling'] }); // Replace with your Socket.IO server URL
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

export default useSocket;
