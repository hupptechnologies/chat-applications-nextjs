import { Socket } from 'socket.io-client';
import { ChatMessageAttributes } from '@/interface/chatMessage';
import { UserAttributes } from '@/interface/User';

class SocketService {
	private socket: Socket | null = null;

	constructor(socket: Socket) {
		this.socket = socket;
	}

	// Emit user connected
	userConnected(userId: number) {
		if (this.socket) {
			this.socket.emit('user_connected', userId);
		}
	}

	// Get list of users
	getUsersChatList(
		userId: number,
		callback: (_usersList: UserAttributes[]) => void
	) {
		if (this.socket) {
			this.socket.emit('get_users_chat_list', { userId });
			this.socket.on('users_chat_list', callback);
		}
	}

	// Get chat history
	getChatHistory(
		userId: number,
		otherUserId: number,
		callback: (_messagesList: ChatMessageAttributes[]) => void
	) {
		if (this.socket) {
			this.socket.emit('get_chat_history', { userId, otherUserId });
			this.socket.on('chat_history', callback);
		}
	}

	// Listen for new messages
	listenForNewMessages(
		userId: number,
		callback: (_message: ChatMessageAttributes) => void
	) {
		if (this.socket) {
			this.socket.on(`receive_message_${userId}`, callback);
		}
	}

	// Listen for sent messages (to update their status)
	listenForSentMessages(
		userId: number,
		callback: (_message: ChatMessageAttributes) => void
	) {
		if (this.socket) {
			this.socket.on(`message_sent_${userId}`, callback);
		}
	}

	// Send message
	sendMessage(senderId: number, receiverId: number, message: string) {
		if (this.socket) {
			this.socket.emit('send_message', {
				senderId,
				receiverId,
				content: message,
			});
		}
	}

	// Mark message as delivered
	markMessageDelivered(messageId: number, receiverId: number) {
		if (this.socket) {
			this.socket.emit('message_delivered', {
				messageId,
				receiverId,
			});
		}
	}

	// Mark message as read
	markMessageRead(messageId: number, senderId: number, receiverId: number) {
		if (this.socket) {
			this.socket.emit('message_read', {
				messageId,
				senderId,
				receiverId,
			});
		}
	}

	// Listen for message status changes
	listenForStatusUpdates(
		userId: number,
		callback: (_updatedMessage: ChatMessageAttributes) => void
	) {
		if (this.socket) {
			this.socket.on(`message_sent_${userId}`, callback);
			this.socket.on(`message_delivered_${userId}`, callback);
			this.socket.on(`message_read_${userId}`, callback);
		}
	}

	// Update user status
	listenForUserStatusChange(
		callback: (_statusData: { userId: number; status: string }) => void
	) {
		if (this.socket) {
			this.socket.on('user_status_changed', callback);
		}
	}

	// Remove all event listeners
	removeAllListeners() {
		if (this.socket) {
			this.socket.off('user_status_changed');
			this.socket.off('users_chat_list');
			this.socket.off('chat_history');
			this.socket.off(`receive_message_${this.socket.id}`);
			this.socket.off(`message_sent_${this.socket.id}`);
			this.socket.off(`message_delivered_${this.socket.id}`);
			this.socket.off(`message_read_${this.socket.id}`);
		}
	}
}

export default SocketService;
