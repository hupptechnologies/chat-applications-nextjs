import React, { useState, useEffect, useRef } from 'react';
import { Box, ListItem, Typography } from '@mui/material';
import { UserAttributes } from '@/interface/User';
import { ChatMessageAttributes } from '@/interface/chatMessage';
import MessageInput from './MessageInput';
import ContactInfoModal from './ContactInfoModal';
import MessageStatus from './MessageStatus';
import { formatTime } from '@/utils/Index';
import {
	ChatContainer,
	ChatHeader,
	ChatAvatar,
	ChatUserName,
	ChatMessages,
	MessageBubble,
	MessageText,
	MessageTimestamp,
	DateDivider,
	DateDividerText,
	InputContainer,
} from '@/styles/ChatArea';

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
	const [showContactInfo, setShowContactInfo] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Function to scroll to bottom
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	// Scroll to bottom when messages change or selected user changes
	useEffect(() => {
		scrollToBottom();
	}, [messages, selectedUser]);

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

	const handleSendMessage = (value: string) => {
		if (value.trim()) {
			onSendMessage(value);
		}
	};

	return (
		<ChatContainer>
			{selectedUser ? (
				<>
					<ChatHeader onClick={() => setShowContactInfo(true)}>
						<ChatAvatar>{selectedUser.userName.charAt(0)}</ChatAvatar>
						<ChatUserName variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>{selectedUser.userName}</ChatUserName>
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
											justifyContent: msg.senderId === user.id ? 'flex-end' : 'flex-start',
											px: 0,
										}}
									>
										<MessageBubble sent={msg.senderId === user.id} sx={{ borderRadius: msg.senderId === user.id ? '18px 18px 4px 18px' : '18px 18px 18px 4px', background: msg.senderId === user.id ? '#e3f2fd' : '#f5f5f5' }}>
											<MessageText>{msg.content}</MessageText>
											<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 0.5 }}>
												<MessageTimestamp>
													{formatTime(new Date(msg.sentAt))}
												</MessageTimestamp>
												{msg.senderId === user.id && (
													<MessageStatus status={msg.status} />
												)}
											</Box>
										</MessageBubble>
									</ListItem>
								))}
							</React.Fragment>
						))}
						<div ref={messagesEndRef} />
					</ChatMessages>

					<InputContainer>
						<MessageInput onSendMessage={handleSendMessage} />
					</InputContainer>
					{showContactInfo && (
						<ContactInfoModal
							user={{
								userName: selectedUser.userName,
								phoneNumber: '12345678899',
							}}
							onClose={() => setShowContactInfo(false)}
						/>
					)}
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
