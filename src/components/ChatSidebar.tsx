import React from 'react';
import { Badge, Typography, Box, ListItemText } from '@mui/material';
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
	InstallMessengerBox,
} from '@/styles/ChatSidebar';

interface ChatSidebarProps {
	users: any[];
	selectedUser: any;
	onSelectUser: (_user: any) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
	users,
	selectedUser,
	onSelectUser,
}) => {
	return (
		<SidebarContainer>
			<SidebarHeader>
				<SidebarTitle variant="h6">Chats</SidebarTitle>
				<SearchField
					fullWidth
					placeholder="Search Messenger..."
					variant="outlined"
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
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
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
									{user.lastMessage?.content || 'No messages yet'}
								</UserLastMessage>
							}
						/>
						<UserTimestamp variant="caption">
							{user.lastMessage?.timestamp || ''}
						</UserTimestamp>
					</UserListItem>
				))}
			</UserList>

			<InstallMessengerBox>
				<Typography variant="body2" color="textSecondary">
					Install Messenger App
				</Typography>
			</InstallMessengerBox>
		</SidebarContainer>
	);
};

export default ChatSidebar;
