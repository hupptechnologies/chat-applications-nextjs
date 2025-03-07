import React from 'react';
import { Box, Badge, Typography, ListItemText } from '@mui/material';
import {
	SidebarContainer,
	SidebarHeader,
	SidebarTitle,
	UserList,
	UserListItem,
	UserAvatar,
	UserName,
	UserLastMessage,
	UserTimestamp,
	InstallMessengerBox,
} from '@/styles/ChatSidebar';
import { UserAttributes } from '@/interface/User';

interface ChatSidebarProps {
	users: UserAttributes[];
	selectedUser: UserAttributes | null;
	onSelectUser: (_user: UserAttributes) => void;
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
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
									}}
								>
									<UserName>{user.userName}</UserName>
									{(user.unreadCount || 0) > 0 && (
										<Badge
											color="primary"
											badgeContent={user.unreadCount}
											sx={{ margin: '8px' }}
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
							{/* {user.lastMessage?.timestamp || ''} */}
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
