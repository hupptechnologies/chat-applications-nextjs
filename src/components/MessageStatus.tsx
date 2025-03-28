import React from 'react';
import { Check as CheckIcon } from '@mui/icons-material';
import {
	MessageStatusContainer,
	DoubleCheckContainer,
} from '@/styles/MessageStatus';

interface MessageStatusProps {
	status: 'sent' | 'delivered' | 'read';
}

const MessageStatus: React.FC<MessageStatusProps> = ({ status }) => {
	return (
		<MessageStatusContainer>
			{status === 'read' ? (
				<DoubleCheckContainer>
					<CheckIcon color="primary" fontSize="inherit" />
					<CheckIcon color="primary" fontSize="inherit" />
				</DoubleCheckContainer>
			) : status === 'delivered' ? (
				<DoubleCheckContainer>
					<CheckIcon fontSize="inherit" />
					<CheckIcon fontSize="inherit" />
				</DoubleCheckContainer>
			) : (
				<CheckIcon fontSize="inherit" />
			)}
		</MessageStatusContainer>
	);
};

export default MessageStatus;
