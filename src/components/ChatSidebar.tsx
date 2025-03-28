import React from 'react';
import { Badge, Box, ListItemText } from '@mui/material';
import {
	SidebarContainer,
	SidebarHeader,
	SidebarTitle,
	SearchField,
	UserList,
	UserListItem,
	UserAvatar,
	UserName,
	UserLastMessage,
	UserTimestamp,
	OnlineStatus,
} from '@/styles/ChatSidebar';

interface ChatSidebarProps {
	users: any[];
	selectedUser: any;
	onSelectUser: (_user: any) => void;
	handleSearchUser: (_event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
	users,
	selectedUser,
	onSelectUser,
	handleSearchUser,
}) => {
	return (
		<SidebarContainer>
			<SidebarHeader>
				<SidebarTitle variant="h6">Chats</SidebarTitle>
				<SearchField
					fullWidth
					placeholder="Search Messenger..."
					variant="outlined"
					onChange={handleSearchUser}
					size="small"
				/>
			</SidebarHeader>

			<UserList>
				{users.map((user) => (
					<UserListItem
						key={user.id}
						selected={selectedUser?.id === user.id}
						onClick={() => onSelectUser(user)}
					>
						<UserAvatar>{user.userName.charAt(0)}</UserAvatar>
						<ListItemText
							primary={
								<Box>
									<UserName>{user.userName}</UserName>
									{user.status === 'online' && <OnlineStatus />}
									{user.unreadCount > 0 && (
										<Badge
											color="primary"
											badgeContent={user.unreadCount}
											sx={{ marginLeft: '8px' }}
										/>
									)}
								</Box>
							}
							secondary={
								<UserLastMessage variant="body2">
									{user.lastMessage?.content}
								</UserLastMessage>
							}
						/>
						<UserTimestamp variant="caption">
							{user.lastMessage?.timestamp || ''}
						</UserTimestamp>
					</UserListItem>
				))}
				{users.length === 0 && (
					<UserListItem>
						<UserName>Users not found!</UserName>
					</UserListItem>
				)}
			</UserList>
		</SidebarContainer>
	);
};

export default ChatSidebar;
