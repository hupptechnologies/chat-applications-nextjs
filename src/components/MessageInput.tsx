// MessageInput/MessageInput.tsx
import React, { useState } from 'react';
import {
	MessageInputContainer,
	MessageTextField,
	SendButton,
} from '@/styles/ChatSidebar'; // Import the styled components

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
			<SendButton
				variant="contained"
				color="primary"
				onClick={handleSendMessage}
			>
				Send
			</SendButton>
		</MessageInputContainer>
	);
};

export default MessageInput;
