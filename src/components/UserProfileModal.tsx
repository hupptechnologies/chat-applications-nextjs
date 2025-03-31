import React from 'react';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { UserAttributes } from '@/interface/User';
import {
	ModalContainer,
	ModalHeader,
	ModalContent,
	UserAvatar,
	UserName,
	SectionTitle,
	InfoItem,
	InfoText,
} from '@/styles/UserProfileModal';

interface UserProfileModalProps {
	open: boolean;
	onClose: () => void;
	user: UserAttributes;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
	open,
	onClose,
	user,
}) => {
	if (!open) {
		return null;
	}

	return (
		<ModalContainer>
			<ModalHeader>
				<IconButton onClick={onClose}>
					<ArrowBack />
				</IconButton>
				<Typography variant="h6">Profile</Typography>
			</ModalHeader>

			<ModalContent>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						p: 3,
					}}
				>
					<UserAvatar>{user.userName.charAt(0)}</UserAvatar>
					<UserName variant="h6">{user.userName}</UserName>
				</Box>

				<Divider />

				<Box sx={{ p: 2 }}>
					<SectionTitle variant="subtitle1">About</SectionTitle>
					<InfoItem>
						<InfoText>
							{user?.about || 'Hey there! I am using WhatsApp'}
						</InfoText>
					</InfoItem>
				</Box>

				<Divider />

				<Box sx={{ p: 2 }}>
					<SectionTitle variant="subtitle1">Phone</SectionTitle>
					<InfoItem>
						<InfoText>{user?.phoneNumber || '+1 234 567 890'}</InfoText>
					</InfoItem>
				</Box>
			</ModalContent>
		</ModalContainer>
	);
};

export default UserProfileModal;
