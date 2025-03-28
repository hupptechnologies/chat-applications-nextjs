import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Define the type for the SocketContext
interface SocketContextType {
	socket: Socket | null;
	isConnected: boolean; // Add connection status
}

// Create the SocketContext
const SocketContext = createContext<SocketContextType>({
	socket: null,
	isConnected: false,
});

// SocketProvider component
export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [isConnected, setIsConnected] = useState(false); // Track connection status

	useEffect(() => {
		const socketIo = io(process.env.NEXT_PUBLIC_SOCKET_URL);

		// Listen for connection events
		socketIo.on('connect', () => {
			setIsConnected(true);
		});

		socketIo.on('disconnect', () => {
			setIsConnected(false);
		});

		socketIo.on('connect_error', () => {
			setIsConnected(false);
		});

		setSocket(socketIo);

		// Clean up the socket connection on unmount
		return () => {
			socketIo.disconnect();
		};
	}, []);

	return (
		<SocketContext.Provider value={{ socket, isConnected }}>
			{children}
		</SocketContext.Provider>
	);
};

// Custom hook to use the SocketContext
export const useSocket = () => {
	return useContext(SocketContext);
};
