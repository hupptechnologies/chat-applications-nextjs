// MessageInput/MessageInput.tsx
import React, { useState } from 'react';
import { Send as SendIcon } from '@mui/icons-material';
import {
	MessageInputContainer,
	MessageTextField,
	SendButton,
} from '@/styles/ChatArea'; // Import the styled components

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
		<MessageInputContainer>
			<MessageTextField
				fullWidth
				value={newMessage}
				onChange={(e) => setNewMessage(e.target.value)}
				onKeyPress={handleKeyPress}
				placeholder="Type your message..."
			/>
			<SendButton onClick={handleSendMessage} disabled={!newMessage.trim()}>
				<SendIcon />
			</SendButton>
		</MessageInputContainer>
	);
};

export default MessageInput;
