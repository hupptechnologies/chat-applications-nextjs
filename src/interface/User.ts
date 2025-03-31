import { ChatMessageAttributes } from './chatMessage';

export interface UserAttributes {
	id: number;
	userName: string;
	email: string;
	createdAt?: Date;
	updatedAt?: Date;
	unreadCount?: number;
	about?: string;
	phoneNumber?: string;
	lastMessage?: ChatMessageAttributes;
}
