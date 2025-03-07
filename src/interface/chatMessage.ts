export interface ChatMessageAttributes {
	id: number;
	senderId: number;
	receiverId: number;
	content: string;
	status: 'sent' | 'delivered' | 'read';
	sentAt: Date;
	deliveredAt?: Date;
	readAt?: Date;
}

export interface SendMessageData {
	senderId: number;
	receiverId: number;
	content: string;
}

export interface ChatHistoryData {
	userId: number;
	otherUserId: number;
}

export interface UsersChatListData {
	userId: number;
}
