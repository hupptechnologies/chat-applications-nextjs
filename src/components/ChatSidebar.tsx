import React from 'react';
import { ListItemText, Typography } from '@mui/material';
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
							primary={<UserName>{user.userName}</UserName>}
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
