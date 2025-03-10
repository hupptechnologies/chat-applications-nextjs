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

	// Helper function to render the status tick based on message status
	const renderMessageStatus = (status: string) => {
		if (status === 'read') {
			return <span style={{ color: 'blue' }}>✔✔</span>; // Blue double tick
		} else if (status === 'delivered') {
			return <span>✔✔</span>; // Double tick
		} else if (status === 'sent') {
			return <span>✔</span>; // Single tick
		}
		return null;
	};

	return (
		<ChatContainer>
			{selectedUser && (
				<ChatHeader>
					<ChatAvatar>{selectedUser?.userName.charAt(0)}</ChatAvatar>
					<ChatUserName variant="h6">{selectedUser?.userName}</ChatUserName>
					<ChatStatus variant="body2">Online</ChatStatus>
				</ChatHeader>
			)}

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
									{user.id === msg.senderId && (
										<Box sx={{ position: 'absolute', bottom: 2, right: 2 }}>
											{renderMessageStatus(msg.status)}
										</Box>
									)}
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
