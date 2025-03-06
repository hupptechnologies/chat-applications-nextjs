// ChatArea/ChatArea.tsx
import React from 'react';
import { ListItem, ListItemAvatar } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import {
	ChatContainer,
	ChatHeader,
	ChatAvatar,
	ChatUserName,
	ChatStatus,
	ChatMessages,
	MessageBubble,
	MessageText,
	MessageInputContainer,
	MessageTextField,
	SendButton,
} from '@/styles/ChatArea';
import { UserAttributes } from '@/interface/User';
import { ChatMessageAttributes } from '@/interface/chatMessage';

interface ChatAreaProps {
	selectedUser: UserAttributes;
	messages: ChatMessageAttributes[];
	user: UserAttributes | null;
	onSendMessage: (_message: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
	selectedUser,
	messages,
	user,
	onSendMessage,
}) => {
	const [newMessage, setNewMessage] = React.useState('');

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
		<ChatContainer>
			<ChatHeader>
				<ChatAvatar>{selectedUser?.userName.charAt(0)}</ChatAvatar>
				<ChatUserName variant="h6">{selectedUser?.userName}</ChatUserName>
				<ChatStatus variant="body2">Online</ChatStatus>
			</ChatHeader>

			<ChatMessages>
				{messages.map((msg) => (
					<ListItem
						key={msg.id}
						sx={{
							justifyContent:
								msg.senderId === user?.id ? 'flex-end' : 'flex-start',
						}}
					>
						<ListItemAvatar>
							{msg.senderId !== user?.id && (
								<ChatAvatar>{selectedUser?.userName.charAt(0)}</ChatAvatar>
							)}
						</ListItemAvatar>
						<MessageBubble
							sx={{
								backgroundColor:
									msg.senderId === user?.id
										? 'primary.light'
										: 'background.default',
							}}
						>
							<MessageText>{msg.message}</MessageText>
						</MessageBubble>
					</ListItem>
				))}
			</ChatMessages>

			<MessageInputContainer>
				<MessageTextField
					fullWidth
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					onKeyPress={handleKeyPress}
					placeholder="Type a message..."
					variant="outlined"
				/>
				<SendButton onClick={handleSendMessage} disabled={!newMessage.trim()}>
					<SendIcon />
				</SendButton>
			</MessageInputContainer>
		</ChatContainer>
	);
};

export default ChatArea;
