import React from 'react';
import { Box, ListItem, Typography } from '@mui/material';
import { UserAttributes } from '@/interface/User';
import { ChatMessageAttributes } from '@/interface/chatMessage';
import {
	ChatContainer,
	ChatHeader,
	ChatAvatar,
	ChatUserName,
	ChatMessages,
	MessageBubble,
	MessageText,
	MessageTimestamp,
	MessageStatus,
	DateDivider,
	DateDividerText,
	InputContainer,
} from '@/styles/ChatArea';
import MessageInput from './MessageInput';
import CheckIcon from '@mui/icons-material/Check';

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

	// Group messages by date with custom labels
	const groupMessagesByDate = (messages: ChatMessageAttributes[]) => {
		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(yesterday.getDate() - 1);

		const groupedMessages: {
			label: string;
			messages: ChatMessageAttributes[];
		}[] = [];
		let currentGroup: ChatMessageAttributes[] = [];

		messages.forEach((message, index) => {
			const messageDate = new Date(message.sentAt);
			let label = '';

			if (messageDate.toDateString() === today.toDateString()) {
				label = 'TODAY';
			} else if (messageDate.toDateString() === yesterday.toDateString()) {
				label = 'YESTERDAY';
			} else {
				label = messageDate.toLocaleDateString('en-US', {
					month: 'long',
					day: 'numeric',
					year: 'numeric',
				});
			}

			// Check if we need to start a new group
			if (index === 0 || messages[index - 1].content.endsWith('...')) {
				if (currentGroup.length > 0) {
					groupedMessages.push({
						label: '',
						messages: [...currentGroup],
					});
					currentGroup = [];
				}
				currentGroup.push(message);
			} else {
				currentGroup.push(message);
			}

			// Check if we need to add a label for this message
			if (
				index === 0 ||
				label !== groupedMessages[groupedMessages.length - 1]?.label
			) {
				if (currentGroup.length > 0) {
					groupedMessages.push({
						label,
						messages: [...currentGroup],
					});
					currentGroup = [];
				} else {
					groupedMessages.push({
						label,
						messages: [message],
					});
				}
			}
		});

		// Add any remaining messages
		if (currentGroup.length > 0) {
			groupedMessages.push({
				label: '',
				messages: [...currentGroup],
			});
		}

		return groupedMessages;
	};

	const groupedMessages = groupMessagesByDate(messages);

	const handleSendMessage = () => {
		if (newMessage.trim()) {
			onSendMessage(newMessage);
			setNewMessage('');
		}
	};

	// Format time in WhatsApp style (e.g., 08:21)
	const formatTime = (date: Date) => {
		return date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		});
	};

	// Render message status ticks
	const renderMessageStatus = (status: string) => {
		switch (status) {
			case 'read':
				return (
					<MessageStatus>
						<CheckIcon sx={{ fontSize: 16, color: '#53bdeb' }} />
						<CheckIcon sx={{ fontSize: 16, color: '#53bdeb', ml: -1.1 }} />
					</MessageStatus>
				);
			case 'delivered':
				return (
					<MessageStatus>
						<CheckIcon sx={{ fontSize: 16, color: 'grey' }} />
						<CheckIcon sx={{ fontSize: 16, color: 'grey', ml: -1.1 }} />
					</MessageStatus>
				);
			case 'sent':
				return (
					<MessageStatus>
						<CheckIcon sx={{ fontSize: 16, color: 'grey' }} />
					</MessageStatus>
				);
			default:
				return null;
		}
	};

	return (
		<ChatContainer>
			{selectedUser ? (
				<>
					<ChatHeader>
						<ChatAvatar>{selectedUser.userName.charAt(0)}</ChatAvatar>
						<ChatUserName variant="h6">{selectedUser.userName}</ChatUserName>
					</ChatHeader>
					<ChatMessages>
						{groupedMessages.map((group, index) => (
							<React.Fragment key={index}>
								{group.label && (
									<DateDivider>
										<DateDividerText variant="caption">
											{group.label}
										</DateDividerText>
									</DateDivider>
								)}
								{group.messages.map((msg) => (
									<ListItem
										key={msg.id}
										sx={{
											justifyContent:
												msg.senderId === user.id ? 'flex-end' : 'flex-start',
											px: 0,
										}}
									>
										<MessageBubble sent={msg.senderId === user.id}>
											<MessageText>{msg.content}</MessageText>
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'flex-end',
												}}
											>
												<MessageTimestamp>
													{formatTime(new Date(msg.sentAt))}
												</MessageTimestamp>
												{msg.senderId === user.id &&
													renderMessageStatus(msg.status)}
											</Box>
										</MessageBubble>
									</ListItem>
								))}
							</React.Fragment>
						))}
					</ChatMessages>

					<InputContainer>
						<MessageInput onSendMessage={handleSendMessage} />
					</InputContainer>
				</>
			) : (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						height: '100%',
						textAlign: 'center',
						p: 4,
					}}
				>
					<Typography variant="h6" gutterBottom>
						No Contacts
					</Typography>
					<Typography variant="body2" color="text.secondary">
						You can import Contacts from Google Learn more.
					</Typography>
				</Box>
			)}
		</ChatContainer>
	);
};

export default ChatArea;
