import { styled } from '@mui/material/styles';
import { Box, Typography, Avatar } from '@mui/material';

export const ModalContainer = styled(Box)(({ theme }) => ({
	position: 'fixed',
	top: 0,
	right: 0,
	width: '30%',
	height: '100vh',
	backgroundColor: theme.palette.background.paper,
	zIndex: 1300,
	display: 'flex',
	flexDirection: 'column',
}));

export const ModalHeader = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(2),
	backgroundColor: theme.palette.grey[100],
	borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const ModalContent = styled(Box)(() => ({
	flex: 1,
	overflowY: 'auto',
}));

export const UserAvatar = styled(Avatar)(({ theme }) => ({
	width: '120px',
	height: '120px',
	fontSize: '48px',
	marginBottom: theme.spacing(2),
	backgroundColor: theme.palette.primary.main,
}));

export const UserName = styled(Typography)(({ theme }) => ({
	fontWeight: 'bold',
	marginBottom: theme.spacing(1),
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.secondary,
	padding: theme.spacing(1, 2),
	fontSize: '0.8rem',
	textTransform: 'uppercase',
}));

export const InfoItem = styled(Box)(({ theme }) => ({
	padding: theme.spacing(1.5, 2),
	'&:hover': {
		backgroundColor: theme.palette.action.hover,
	},
}));

export const InfoText = styled(Typography)(() => ({
	fontSize: '0.9rem',
}));
