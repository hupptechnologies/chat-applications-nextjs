import React, { useEffect, useState } from 'react';
import { useSocket } from '@/context/SocketContext';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/context/ProtectedRoute';
import ChatSidebar from '@/components/ChatSidebar';
import ChatArea from '@/components/ChatArea';
import { ChatMessageAttributes } from '@/interface/chatMessage';
import { ChatPageContainer, ChatMainContent } from '@/styles/Chat';
import { UserAttributes } from '@/interface/User';
import SocketService from '@/services/socketService'; // Import the socket service

const ChatPage: React.FC = () => {
	const { socket } = useSocket();
	const { user } = useAuth();
	const [users, setUsers] = useState<UserAttributes[]>([]);
	const [usersList, setUsersList] = useState<UserAttributes[]>([]);
	const [selectedUser, setSelectedUser] = useState<UserAttributes | null>(null);
	const [messages, setMessages] = useState<ChatMessageAttributes[]>([]);

	const socketService = new SocketService(socket!);

	// Notify the server when the user connects
	useEffect(() => {
		if (socket && user) {
			socketService.userConnected(user.id); // Notify server that the user is online
		}
	}, [socket, user]);

	// Fetch the list of users with their last message
	useEffect(() => {
		if (socket && user) {
			socketService.getUsersChatList(user.id, (res) => {
				setUsersList(res);
				setUsers(res);
			});
		}
	}, [socket, user]);

	// Fetch chat history for the selected user
	useEffect(() => {
		if (socket && selectedUser && user) {
			socketService.getChatHistory(user.id, selectedUser.id, (messagesList) => {
				setMessages(messagesList);

				// Mark messages as read and reset unread count
				messagesList.forEach((message) => {
					if (
						message.receiverId === user.id &&
						message.senderId === selectedUser.id &&
						message.status !== 'read'
					) {
						socketService.markMessageRead(message.id, selectedUser.id, user.id);
					}
				});

				// Reset unread count for the selected user
				setUsers((prevUsers) =>
					prevUsers.map((u) =>
						u.id === selectedUser.id ? { ...u, unreadCount: 0 } : u
					)
				);
			});
		}
	}, [socket, selectedUser, user]);

	// Listen for user status changes (online/offline)
	useEffect(() => {
		if (socket) {
			socketService.listenForUserStatusChange(({ userId, status }) => {
				setUsers((prevUsers) =>
					prevUsers.map((u) => (u.id === userId ? { ...u, status } : u))
				);
			});
		}

		return () => {
			socketService.removeAllListeners();
		};
	}, [socket]);

	// Send a new message
	const sendMessage = (message: string) => {
		if (socket && selectedUser && message.trim() && user) {
			const tempMessage: ChatMessageAttributes = {
				id: Date.now(), // Temporary ID
				senderId: user.id,
				receiverId: selectedUser.id,
				content: message,
				status: 'sent',
				sentAt: new Date(),
			};

			// Add temporary message to the chat
			setMessages((prevMessages) => [...prevMessages, tempMessage]);

			// Send the message
			socketService.sendMessage(user.id, selectedUser.id, message);
		}
	};

	// Listen for new messages and status updates
	useEffect(() => {
		if (socket && user) {
			// Listen for messages we sent (to update their status)
			socketService.listenForSentMessages(user.id, (message) => {
				// Update the temporary message with the server-assigned message
				setMessages((prevMessages) => {
					const tempMessageIndex = prevMessages.findIndex(
						(msg) =>
							msg.senderId === user.id &&
							msg.content === message.content &&
							msg.status === 'sent' &&
							Date.now() - new Date(msg.sentAt).getTime() < 5000
					);

					if (tempMessageIndex !== -1) {
						const updatedMessages = [...prevMessages];
						updatedMessages[tempMessageIndex] = message;
						return updatedMessages;
					}

					return prevMessages;
				});

				// Update the last message in the users list
				setUsers((prevUsers) =>
					prevUsers.map((u) => {
						if (u.id === message.receiverId) {
							return {
								...u,
								lastMessage: message,
							};
						}
						return u;
					})
				);
			});

			// Listen for messages we received
			socketService.listenForNewMessages(user.id, (message) => {
				// If the message is from the selected user, add it to the chat
				if (selectedUser && message.senderId === selectedUser.id) {
					setMessages((prevMessages) => [...prevMessages, message]);
					// If we're the receiver and the chat is open, mark as delivered and read
					if (message.receiverId === user.id) {
						socketService.markMessageDelivered(message.id, user.id);
						socketService.markMessageRead(message.id, selectedUser.id, user.id);
					}
				}

				// Update the user's last message and unread count
				setUsers((prevUsers) => {
					const updatedUsers = prevUsers.map((u) => {
						if (u.id === message.senderId) {
							const shouldIncrementUnread =
								!selectedUser || selectedUser.id !== message.senderId;
							return {
								...u,
								unreadCount: shouldIncrementUnread
									? (u.unreadCount || 0) + 1
									: 0,
								lastMessage: message,
							};
						}
						return u;
					});

					// Sort users by last message time
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
			});

			// Listen for message status updates
			socketService.listenForStatusUpdates(user.id, (updatedMessage) => {
				// Update message in chat area
				setMessages((prevMessages) =>
					prevMessages.map((msg) =>
						msg.id === updatedMessage.id
							? { ...msg, status: updatedMessage.status }
							: msg
					)
				);

				// Update last message in users list
				setUsers((prevUsers) =>
					prevUsers.map((u) => {
						if (u.lastMessage?.id === updatedMessage.id) {
							return {
								...u,
								lastMessage: {
									...u.lastMessage,
									status: updatedMessage.status,
								},
							};
						}
						return u;
					})
				);
			});
		}

		return () => {
			socketService.removeAllListeners();
		};
	}, [socket, selectedUser, user]);

	const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = event.target.value;
		if (socket && user) {
			const filteredUsers = usersList.filter((user) =>
				user.userName.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setUsers(filteredUsers);
		}
	};

	return (
		<ProtectedRoute>
			<ChatPageContainer>
				<ChatSidebar
					users={users}
					selectedUser={selectedUser}
					onSelectUser={setSelectedUser}
					handleSearchUser={handleSearchUser}
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
