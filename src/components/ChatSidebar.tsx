import React from 'react';
import { Badge, Divider, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import MessageStatus from './MessageStatus';
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
	NoContactsContainer,
	NoContactsText,
	NoContactsTitle,
	UserInfoContainer,
	UserNameRow,
	MessageRow,
	SearchContainer,
	SearchInput,
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
				<SidebarTitle>Chats</SidebarTitle>
			</SidebarHeader>
			<SearchContainer>
				<IconButton size="small" sx={{ padding: 0.5 }}>
					<Search fontSize="small" />
				</IconButton>
				<SearchInput
					placeholder="Search or start new chat"
					onChange={handleSearchUser}
				/>
			</SearchContainer>
			{users.length === 0 && (
				<NoContactsContainer>
					<NoContactsTitle>No Contacts</NoContactsTitle>
					<NoContactsText>You can import Contacts</NoContactsText>
				</NoContactsContainer>
			)}
			<UserList>
				{users.map((user) => (
					<React.Fragment key={user.id}>
						<UserListItem
							selected={selectedUser?.id === user.id}
							onClick={() => onSelectUser(user)}
						>
							<UserAvatar src={user.avatar} alt={user.userName}>
								{user.userName.charAt(0)}
							</UserAvatar>
							<UserInfoContainer>
								<UserNameRow>
									<UserName>{user.userName}</UserName>
									<UserTimestamp>
										{user.lastMessage?.timestamp || ''}
									</UserTimestamp>
								</UserNameRow>
								<MessageRow>
									<UserLastMessage>{user.lastMessage?.content}</UserLastMessage>
									{user.lastMessage?.status && (
										<MessageStatus status={user.lastMessage?.status} />
									)}
								</MessageRow>
							</UserInfoContainer>
							{user.unreadCount > 0 && (
								<Badge
									badgeContent={user.unreadCount}
									color="primary"
									sx={{ marginLeft: '8px' }}
								/>
							)}
						</UserListItem>
						<Divider variant="inset" component="li" />
					</React.Fragment>
				))}
			</UserList>
		</SidebarContainer>
	);
};

export default ChatSidebar;
