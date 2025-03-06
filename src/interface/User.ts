export interface UserAttributes {
	readonly id: number;
	userName: string;
	email: string;
	readonly createdAt?: Date;
	readonly updatedAt?: Date;
}
