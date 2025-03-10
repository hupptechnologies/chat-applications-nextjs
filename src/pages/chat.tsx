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
			socketService.getUsersChatList(user.id, (usersList) => {
				setUsers(usersList);
			});
		}
	}, [socket, user]);

	// Fetch chat history for the selected user
	useEffect(() => {
		if (socket && selectedUser && user) {
			socketService.getChatHistory(user.id, selectedUser.id, (messagesList) => {
				setMessages(messagesList);

				// Mark messages as read
				messagesList.forEach((message) => {
					if (
						message.receiverId === user.id &&
						message.senderId === selectedUser.id &&
						message.status !== 'read'
					) {
						socketService.markMessageRead(message.id, selectedUser.id, user.id);
					}
				});
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
				id: Date.now(),
				senderId: user.id,
				receiverId: selectedUser.id,
				content: message,
				status: 'sent',
				sentAt: new Date(),
			};

			setMessages((prevMessages) => [...prevMessages, tempMessage]);

			socketService.sendMessage(user.id, selectedUser.id, message);
		}
	};

	// Listen for new messages and status updates
	useEffect(() => {
		if (socket && user) {
			socketService.listenForNewMessages(user.id, (message) => {
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

				// If the message is from the selected user, add it to the messages list
				if (selectedUser && message.senderId === selectedUser.id) {
					setMessages((prevMessages) => [...prevMessages, message]);
				}
			});

			socketService.listenForStatusUpdates(user.id, (updatedMessage) => {
				setMessages((prevMessages) =>
					prevMessages.map((msg) =>
						msg.id === updatedMessage.id
							? { ...msg, status: updatedMessage.status }
							: msg
					)
				);
			});
		}

		return () => {
			socketService.removeAllListeners();
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
