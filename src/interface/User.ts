import { ChatMessageAttributes } from './chatMessage';

export interface UserAttributes {
	id: number;
	userName: string;
	email: string;
	createdAt?: Date;
	updatedAt?: Date;
	unreadCount?: number;
	lastMessage?: ChatMessageAttributes;
}
