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
			// Create a temporary message object
			const tempMessage = {
				id: Date.now(), // Use a temporary unique ID
				senderId: user.id,
				receiverId: selectedUser.id,
				content: newMessage,
				status: 'sent', // Initial status
				timestamp: new Date().toISOString(), // Add a timestamp
			};

			// Add the new message to the local state immediately
			setMessages((prevMessages) => [...prevMessages, tempMessage]);

			// Emit the `send_message` event to the server
			socket.emit('send_message', {
				senderId: user.id,
				receiverId: selectedUser.id,
				content: newMessage,
			});

			// Clear the input field
			setNewMessage('');
		}
	};

	// Handle Enter key press to send message
	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			sendMessage();
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
				<div
					style={{
						width: '30%',
						borderRight: '1px solid #ccc',
						padding: '10px',
					}}
				>
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
								borderRadius: '5px',
								marginBottom: '5px',
							}}
						>
							<strong>{user.userName}</strong>
							{user.lastMessage && (
								<p
									style={{ margin: '5px 0', fontSize: '0.9em', color: '#666' }}
								>
									{user.lastMessage?.content}
								</p>
							)}
						</div>
					))}
				</div>

				{/* Main Chat Area */}
				<div
					style={{
						flex: 1,
						padding: '20px',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{selectedUser ? (
						<>
							<h2>Chat with {selectedUser.userName}</h2>
							<div
								style={{
									flex: 1,
									overflowY: 'scroll',
									borderBottom: '1px solid #ccc',
									padding: '10px',
								}}
							>
								{messages.map((msg) => (
									<div
										key={msg.id}
										style={{
											textAlign: msg.senderId === user?.id ? 'right' : 'left',
										}}
									>
										<p
											style={{
												backgroundColor:
													msg.senderId === user?.id ? '#dcf8c6' : '#f0f0f0',
												padding: '10px',
												borderRadius: '10px',
												display: 'inline-block',
												maxWidth: '70%',
												margin: 0,
											}}
										>
											{msg.content} {msg.timestamp}
										</p>
									</div>
								))}
							</div>
							<div style={{ marginTop: '20px', display: 'flex' }}>
								<input
									type="text"
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
									onKeyPress={handleKeyPress}
									placeholder="Type your message..."
									style={{
										flex: 1,
										padding: '10px',
										border: '1px solid #ccc',
										borderRadius: '5px',
										marginRight: '10px',
									}}
								/>
								<button
									onClick={sendMessage}
									style={{
										padding: '10px 20px',
										backgroundColor: '#007bff',
										color: '#fff',
										border: 'none',
										borderRadius: '5px',
										cursor: 'pointer',
									}}
								>
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
