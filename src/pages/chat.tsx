import React, { useEffect, useState } from 'react';
import { useSocket } from '@/context/SocketContext';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/context/ProtectedRoute';
import ChatSidebar from '@/components/ChatSidebar';
import ChatArea from '@/components/ChatArea';
import MessageInput from '@/components/MessageInput';
import { ChatMessageAttributes } from '@/interface/chatMessage';
import { ChatPageContainer, ChatMainContent } from '@/styles/Chat'; // Import the styled components

const ChatPage: React.FC = () => {
	const { socket } = useSocket();
	const { user } = useAuth();
	const [users, setUsers] = useState<any[]>([]);
	const [selectedUser, setSelectedUser] = useState<any>(null);
	const [messages, setMessages] = useState<any[]>([]);

	// Fetch the list of users with their last message
	useEffect(() => {
		if (socket && user) {
			socket.emit('get_users_chat_list', { userId: user.id });
			socket.on('users_chat_list', (usersList: any[]) => {
				setUsers(usersList);
			});
		}
	}, [socket, user]);

	// Fetch chat history for the selected user
	useEffect(() => {
		if (socket && selectedUser && user) {
			socket.emit('get_chat_history', {
				userId: user.id,
				otherUserId: selectedUser.id,
			});
			socket.on('chat_history', (messagesList: ChatMessageAttributes[]) => {
				setMessages(messagesList);

				// Mark messages as read
				messagesList.forEach((message) => {
					if (
						message.receiverId === user.id &&
						message.senderId === selectedUser.id &&
						message.status !== 'read'
					) {
						socket.emit('message_read', {
							messageId: message.id,
							senderId: selectedUser.id,
							receiverId: user.id,
						});
					}
				});
			});
		}
	}, [socket, selectedUser, user]);

	// Send a new message
	const sendMessage = (message: string) => {
		if (socket && selectedUser && message.trim() && user) {
			const tempMessage = {
				id: Date.now(),
				senderId: user.id,
				receiverId: selectedUser.id,
				content: message,
				status: 'sent',
				timestamp: new Date().toISOString(),
			};

			setMessages((prevMessages) => [...prevMessages, tempMessage]);

			socket.emit('send_message', {
				senderId: user.id,
				receiverId: selectedUser.id,
				content: message,
			});
		}
	};

	// Listen for new messages and status updates
	useEffect(() => {
		if (socket && user) {
			// Listen for new messages
			socket.on(
				`receive_message_${user.id}`,
				(message: ChatMessageAttributes) => {
					socket.emit('message_delivered', {
						messageId: message.id,
						receiverId: user.id,
					});
					if (selectedUser && message.senderId === selectedUser.id) {
						setMessages((prevMessages) => [...prevMessages, message]);
					}
				}
			);

			// Listen for message delivered updates
			socket.on(`message_delivered_${user.id}`, (updatedMessage: any) => {
				setMessages((prevMessages) =>
					prevMessages.map((msg) =>
						msg.id === updatedMessage.id ? { ...msg, status: 'delivered' } : msg
					)
				);
			});

			// Listen for message read updates
			socket.on(`message_read_${user.id}`, (updatedMessage: any) => {
				setMessages((prevMessages) =>
					prevMessages.map((msg) =>
						msg.id === updatedMessage.id ? { ...msg, status: 'read' } : msg
					)
				);
			});
		}

		return () => {
			if (socket) {
				socket.off('message_delivered');
				socket.off(`receive_message_${user?.id}`);
				socket.off(`message_delivered_${user?.id}`);
				socket.off(`message_read_${user?.id}`);
			}
		};
	}, [socket, selectedUser, user]);

	return (
		<ProtectedRoute>
			<ChatPageContainer>
				<ChatSidebar
					users={users}
					selectedUser={selectedUser}
					onSelectUser={setSelectedUser}
				/>
				<ChatMainContent>
					<ChatArea
						selectedUser={selectedUser}
						messages={messages}
						user={user}
						onSendMessage={sendMessage}
					/>
					{selectedUser && <MessageInput onSendMessage={sendMessage} />}
				</ChatMainContent>
			</ChatPageContainer>
		</ProtectedRoute>
	);
};

export default ChatPage;
