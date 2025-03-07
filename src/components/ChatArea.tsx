// ChatArea/ChatArea.tsx
import React from 'react';
import { Send as SendIcon } from '@mui/icons-material';
import { Typography, Box, ListItem, ListItemAvatar } from '@mui/material';
import { UserAttributes } from '@/interface/User';
import {
	ChatContainer,
	ChatHeader,
	ChatAvatar,
	ChatUserName,
	ChatStatus,
	ChatMessages,
	MessageBubble,
	MessageText,
	MessageTimestamp,
	MessageInputContainer,
	MessageTextField,
	SendButton,
} from '@/styles/ChatArea';
import { ChatMessageAttributes } from '@/interface/chatMessage';

interface ChatAreaProps {
	selectedUser: UserAttributes | null;
	messages: ChatMessageAttributes[];
	user: UserAttributes;
	onSendMessage: (_message: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
	selectedUser,
	messages,
	user,
	onSendMessage,
}) => {
	const [newMessage, setNewMessage] = React.useState('');

	// Group messages by date
	const groupMessagesByDate = (messages: any[]) => {
		const groupedMessages: { [key: string]: any[] } = {};

		messages.forEach((message) => {
			const date = new Date(message.sentAt).toLocaleDateString();
			if (!groupedMessages[date]) {
				groupedMessages[date] = [];
			}
			groupedMessages[date].push(message);
		});

		return groupedMessages;
	};

	const groupedMessages = groupMessagesByDate(messages);

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
				{Object.entries(groupedMessages).map(([date, messages]) => (
					<Box key={date}>
						<Typography
							variant="body2"
							sx={{ textAlign: 'center', color: 'text.secondary', my: 2 }}
						>
							{date}
						</Typography>
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
									<MessageText>{msg.content}</MessageText>
									<MessageTimestamp>
										{new Date(msg.sentAt).toLocaleTimeString()}
									</MessageTimestamp>
								</MessageBubble>
							</ListItem>
						))}
					</Box>
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
