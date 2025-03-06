import React from 'react';
import {
	List,
	ListItemButton,
	ListItemText,
	Typography,
	Box,
} from '@mui/material';

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
		<Box sx={{ width: '30%', borderRight: '1px solid #ccc', padding: '10px' }}>
			<Typography variant="h6" sx={{ padding: '10px' }}>
				Contacts
			</Typography>
			<List>
				{users.map((user) => (
					<ListItemButton
						key={user.id}
						onClick={() => onSelectUser(user)}
						sx={{
							backgroundColor:
								selectedUser?.id === user.id ? '#f0f0f0' : 'white',
							borderRadius: '5px',
							marginBottom: '5px',
						}}
					>
						<ListItemText
							primary={user.userName}
							secondary={
								user.lastMessage && (
									<>
										<Typography variant="body2" color="text.secondary">
											{user.lastMessage.content}
										</Typography>
										<Typography variant="caption" color="text.secondary">
											{user.lastMessage.status === 'read'
												? 'Read'
												: user.lastMessage.status === 'delivered'
													? 'Delivered'
													: 'Sent'}
										</Typography>
									</>
								)
							}
						/>
					</ListItemButton>
				))}
			</List>
		</Box>
	);
};

export default ChatSidebar;
