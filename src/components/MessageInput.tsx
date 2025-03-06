import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface MessageInputProps {
	onSendMessage: (_message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
	const [newMessage, setNewMessage] = useState('');

	const handleSendMessage = () => {
		if (newMessage.trim()) {
			onSendMessage(newMessage);
			setNewMessage('');
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSendMessage();
		}
	};

	return (
		<Box sx={{ marginTop: '20px', display: 'flex' }}>
			<TextField
				fullWidth
				value={newMessage}
				onChange={(e) => setNewMessage(e.target.value)}
				onKeyPress={handleKeyPress}
				placeholder="Type your message..."
				sx={{ marginRight: '10px' }}
			/>
			<Button
				variant="contained"
				color="primary"
				onClick={handleSendMessage}
				sx={{ padding: '10px 20px' }}
			>
				Send
			</Button>
		</Box>
	);
};

export default MessageInput;
