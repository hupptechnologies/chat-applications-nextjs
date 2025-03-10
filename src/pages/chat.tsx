// ChatPage.tsx
import React, { useEffect, useState } from 'react';
import { useSocket } from '@/context/SocketContext';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/context/ProtectedRoute';
import ChatSidebar from '@/components/ChatSidebar';
import ChatArea from '@/components/ChatArea';
import { ChatMessageAttributes } from '@/interface/chatMessage';
import { ChatPageContainer, ChatMainContent } from '@/styles/Chat';
import { UserAttributes } from '@/interface/User';

const ChatPage: React.FC = () => {
	const { socket } = useSocket();
	const { user } = useAuth();
	const [users, setUsers] = useState<UserAttributes[]>([]);
	const [selectedUser, setSelectedUser] = useState<UserAttributes | null>(null);
	const [messages, setMessages] = useState<ChatMessageAttributes[]>([]);

	// Notify the server when the user connects
	useEffect(() => {
		if (socket && user) {
			socket.emit('user_connected', user.id); // Notify server that the user is online
		}
	}, [socket, user]);

	// Fetch the list of users with their last message
	useEffect(() => {
		if (socket && user) {
			socket.emit('get_users_chat_list', { userId: user.id });
			socket.on('users_chat_list', (usersList: UserAttributes[]) => {
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

	// Listen for user status changes (online/offline)
	useEffect(() => {
		if (socket) {
			socket.on(
				'user_status_changed',
				({ userId, status }: { userId: number; status: string }) => {
					console.log('user_status_changed', { userId, status });
					setUsers((prevUsers) =>
						prevUsers.map((u) => (u.id === userId ? { ...u, status } : u))
					);
				}
			);
		}

		return () => {
			if (socket) {
				socket.off('user_status_changed');
			}
		};
	}, [socket]);

	// Send a new message
	const sendMessage = (message: string) => {
		if (socket && selectedUser && message.trim() && user) {
			const tempMessage: ChatMessageAttributes = {
				id: Date.now(),
				senderId: user.id,
				receiverId: selectedUser.id,
				content: message,
				status: 'sent',
				sentAt: new Date(),
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
					setUsers((prevUsers) => {
						const updatedUsers = prevUsers.map((u) => {
							if (u.id === message.senderId) {
								return {
									...u,
									unreadCount: (u.unreadCount || 0) + 1,
									lastMessage: message,
								};
							}
							return u;
						});

						// Sort users by the timestamp of the last message (most recent first)
						updatedUsers.sort((a, b) => {
							const aTime = a.lastMessage
								? new Date(a.lastMessage.sentAt).getTime()
								: 0;
							const bTime = b.lastMessage
								? new Date(b.lastMessage.sentAt).getTime()
								: 0;
							return bTime - aTime;
						});

						return updatedUsers;
					});

					// Notify the sender that the message has been delivered
					socket.emit('message_delivered', {
						messageId: message.id,
						receiverId: user.id,
					});

					// If the message is from the selected user, add it to the messages list
					if (selectedUser && message.senderId === selectedUser.id) {
						setMessages((prevMessages) => [...prevMessages, message]);
					}
				}
			);

			// Listen for message sent updates
			socket.on(`message_sent_${user.id}`, (message: ChatMessageAttributes) => {
				setMessages((prevMessages) =>
					prevMessages.map((msg) =>
						msg.id === message.id ? { ...msg, status: 'sent' } : msg
					)
				);
			});

			// Listen for message delivered updates
			socket.on(
				`message_delivered_${user.id}`,
				(updatedMessage: ChatMessageAttributes) => {
					setMessages((prevMessages) =>
						prevMessages.map((msg) =>
							msg.id === updatedMessage.id
								? { ...msg, status: 'delivered' }
								: msg
						)
					);
				}
			);

			// Listen for message read updates
			socket.on(
				`message_read_${user.id}`,
				(updatedMessage: ChatMessageAttributes) => {
					setMessages((prevMessages) =>
						prevMessages.map((msg) =>
							msg.id === updatedMessage.id ? { ...msg, status: 'read' } : msg
						)
					);
				}
			);
		}

		return () => {
			if (socket) {
				socket.off(`receive_message_${user?.id}`);
				socket.off(`message_sent_${user?.id}`);
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
					{user && (
						<ChatArea
							selectedUser={selectedUser}
							messages={messages}
							user={user}
							onSendMessage={sendMessage}
						/>
					)}
				</ChatMainContent>
			</ChatPageContainer>
		</ProtectedRoute>
	);
};

export default ChatPage;
