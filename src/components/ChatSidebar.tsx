import React from 'react';
import { Badge, Divider, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import MessageStatus from './MessageStatus';
import UserProfileModal from './UserProfileModal';
import { useAuth } from '@/context/AuthContext';
import { UserAttributes } from '@/interface/User';
import { formatTime } from '@/utils/Index';
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
	UserProfileButton,
	UserProfileAvatar,
} from '@/styles/ChatSidebar';

interface ChatSidebarProps {
	users: UserAttributes[];
	selectedUser: UserAttributes;
	onSelectUser: (_user: UserAttributes) => void;
	handleSearchUser: (_event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
	users,
	selectedUser,
	onSelectUser,
	handleSearchUser,
}) => {
	const { user: currentUser } = useAuth();
	const [showProfileModal, setShowProfileModal] = React.useState(false);

	const renderUnreadCount = (user: UserAttributes) => {
		if (user.unreadCount && user.unreadCount > 0) {
			return (
				<Badge
					badgeContent={Number(user.unreadCount)}
					color="primary"
					sx={{ marginLeft: '8px' }}
				/>
			);
		}
		return null;
	};

	return (
		<SidebarContainer>
			<SidebarHeader>
				<SidebarTitle>Chats</SidebarTitle>
				<UserProfileButton onClick={() => setShowProfileModal(true)}>
					<UserProfileAvatar>
						{currentUser?.userName.charAt(0)}
					</UserProfileAvatar>
				</UserProfileButton>
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
							<UserAvatar alt={user.userName}>
								{user.userName.charAt(0)}
							</UserAvatar>
							<UserInfoContainer>
								<UserNameRow>
									<UserName>{user.userName}</UserName>
									{user.lastMessage && (
										<UserTimestamp>
											{`${formatTime(new Date(user.lastMessage.sentAt))}` || ''}
										</UserTimestamp>
									)}
								</UserNameRow>
								<MessageRow>
									<UserLastMessage>{user.lastMessage?.content}</UserLastMessage>
									{user.lastMessage?.status && (
										<MessageStatus status={user.lastMessage?.status} />
									)}
								</MessageRow>
							</UserInfoContainer>
							{renderUnreadCount(user)}
						</UserListItem>
						<Divider variant="inset" sx={{ marginLeft: 0 }} component="li" />
					</React.Fragment>
				))}
			</UserList>
			{currentUser && (
				<UserProfileModal
					open={showProfileModal}
					onClose={() => setShowProfileModal(false)}
					user={currentUser}
				/>
			)}
		</SidebarContainer>
	);
};

export default ChatSidebar;
