import React, { useEffect, useState } from 'react';
import { useSocket } from '@/context/SocketContext';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/context/ProtectedRoute';

const ChatPage: React.FC = () => {
	const { socket } = useSocket();
	const { user } = useAuth();
	const [users, setUsers] = useState<any[]>([]); // List of users with last message
	const [selectedUser, setSelectedUser] = useState<any>(null); // Selected user for chat
	const [messages, setMessages] = useState<any[]>([]); // Messages for the selected user
	const [newMessage, setNewMessage] = useState(''); // New message input

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
			socket.on('chat_history', (messagesList: any[]) => {
				setMessages(messagesList);
			});
		}
	}, [socket, selectedUser, user]);

	// Send a new message
	const sendMessage = () => {
		if (socket && selectedUser && newMessage.trim() && user) {
			socket.emit('send_message', {
				senderId: user.id,
				receiverId: selectedUser.id,
				content: newMessage,
			});
			setNewMessage('');
		}
	};

	// Listen for new messages in real-time
	useEffect(() => {
		if (socket && user) {
			socket.on(`receive_message_${user.id}`, (message: any) => {
				if (selectedUser && message.senderId === selectedUser.id) {
					setMessages((prevMessages) => [...prevMessages, message]);
				}
			});
		}

		return () => {
			if (socket) {
				socket.off(`receive_message_${user?.id}`);
			}
		};
	}, [socket, selectedUser, user]);

	return (
		<ProtectedRoute>
			<div style={{ display: 'flex', height: '100vh' }}>
				{/* Sidebar */}
				<div style={{ width: '30%', borderRight: '1px solid #ccc' }}>
					<h2>Contacts</h2>
					{users.map((user) => (
						<div
							key={user.id}
							onClick={() => setSelectedUser(user)}
							style={{
								padding: '10px',
								cursor: 'pointer',
								backgroundColor:
									selectedUser?.id === user.id ? '#f0f0f0' : 'white',
							}}
						>
							<strong>{user.name}</strong>
							<p>{user.lastMessage?.content || 'No messages yet'}</p>
							<small>
								{user.lastMessage?.status === 'read'
									? 'Read'
									: user.lastMessage?.status === 'delivered'
										? 'Delivered'
										: 'Sent'}
							</small>
						</div>
					))}
				</div>

				{/* Main Chat Area */}
				<div style={{ flex: 1, padding: '20px' }}>
					{selectedUser ? (
						<>
							<h2>Chat with {selectedUser.name}</h2>
							<div
								style={{
									height: '70%',
									overflowY: 'scroll',
									borderBottom: '1px solid #ccc',
								}}
							>
								{messages.map((msg) => (
									<div
										key={msg.id}
										style={{
											textAlign: msg.senderId === user?.id ? 'right' : 'left',
											margin: '10px',
										}}
									>
										<p
											style={{
												backgroundColor:
													msg.senderId === user?.id ? '#dcf8c6' : '#f0f0f0',
												padding: '10px',
												borderRadius: '10px',
												display: 'inline-block',
											}}
										>
											{msg.content}
										</p>
										<small>
											{msg.status === 'read'
												? 'Read'
												: msg.status === 'delivered'
													? 'Delivered'
													: 'Sent'}
										</small>
									</div>
								))}
							</div>
							<div style={{ marginTop: '20px' }}>
								<input
									type="text"
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
									placeholder="Type your message..."
									style={{ width: '80%', padding: '10px' }}
								/>
								<button onClick={sendMessage} style={{ padding: '10px' }}>
									Send
								</button>
							</div>
						</>
					) : (
						<p>Select a user to start chatting</p>
					)}
				</div>
			</div>
		</ProtectedRoute>
	);
};

export default ChatPage;
