import React from 'react';
import { Box, Typography } from '@mui/material';

interface ChatAreaProps {
	selectedUser: any;
	messages: any[];
	user: any;
}

const ChatArea: React.FC<ChatAreaProps> = ({
	selectedUser,
	messages,
	user,
}) => {
	return (
		<Box
			sx={{
				flex: 1,
				padding: '20px',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			{selectedUser ? (
				<>
					<Typography variant="h6">
						Chat with {selectedUser.userName}
					</Typography>
					<Box
						sx={{
							flex: 1,
							overflowY: 'scroll',
							borderBottom: '1px solid #ccc',
							padding: '10px',
						}}
					>
						{messages.map((msg) => (
							<Box
								key={msg.id}
								sx={{
									textAlign: msg.senderId === user?.id ? 'right' : 'left',
									margin: '10px 0',
								}}
							>
								<Box
									sx={{
										backgroundColor:
											msg.senderId === user?.id ? '#dcf8c6' : '#f0f0f0',
										padding: '10px',
										borderRadius: '10px',
										display: 'inline-block',
										maxWidth: '70%',
									}}
								>
									<Typography variant="body1">{msg.content}</Typography>
									<Typography variant="caption" color="text.secondary">
										{msg.timestamp}
									</Typography>
								</Box>
							</Box>
						))}
					</Box>
				</>
			) : (
				<Typography variant="body1">Select a user to start chatting</Typography>
			)}
		</Box>
	);
};

export default ChatArea;
