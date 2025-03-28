import React from 'react';
import { Box, Typography, Divider, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
	ModalContainer,
	ModalHeader,
	ModalContent,
	UserAvatar,
	UserName,
	SectionTitle,
	InfoItem,
	InfoText,
} from '@/styles/ContactInfoModal';

interface ContactInfoModalProps {
	user: {
		userName: string;
		phoneNumber: string;
	};
	onClose: () => void;
}

const ContactInfoModal: React.FC<ContactInfoModalProps> = ({
	user,
	onClose,
}) => {
	return (
		<ModalContainer>
			<ModalHeader>
				<IconButton onClick={onClose}>
					<ArrowBackIcon />
				</IconButton>
				<Typography variant="h6">Contact Info</Typography>
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
					<SectionTitle variant="subtitle1">
						Media, Links and Documents
					</SectionTitle>
					<InfoItem>
						<InfoText>No media, links or documents yet</InfoText>
					</InfoItem>
				</Box>

				<Divider />

				<Box sx={{ p: 2 }}>
					<SectionTitle variant="subtitle1">
						About and phone number
					</SectionTitle>
					<InfoItem>
						<InfoText>{user.phoneNumber}</InfoText>
					</InfoItem>
				</Box>
			</ModalContent>
		</ModalContainer>
	);
};

export default ContactInfoModal;
