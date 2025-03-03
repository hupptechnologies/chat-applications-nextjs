import React from 'react';
import { useSocket } from '../context/SocketContext';
import { Container, Typography, List } from '@mui/material';
import ProtectedRoute from '@/context/ProtectedRoute';

const Chat: React.FC = () => {
	const { isConnected } = useSocket();
	return (
		<ProtectedRoute>
			<Container maxWidth="sm">
				<Typography variant="h4" align="center" gutterBottom>
					Welcome to chat page
				</Typography>
				<h2>Socket.IO Connection Status</h2>
				<p>
					{isConnected ? (
						<span style={{ color: 'green' }}>Connected</span>
					) : (
						<span style={{ color: 'red' }}>Disconnected</span>
					)}
				</p>
				<List>{/* Render user list here */}</List>
			</Container>
		</ProtectedRoute>
	);
};

export default Chat;
