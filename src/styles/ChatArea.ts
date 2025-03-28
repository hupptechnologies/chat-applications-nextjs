import { styled } from '@mui/material/styles';
import {
	Box,
	Typography,
	Avatar,
	Divider,
	TextField,
	IconButton,
} from '@mui/material';

export const ChatContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	height: '100vh',
	backgroundColor: theme.palette.background.default,
}));

export const ChatHeader = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(2),
	backgroundColor: theme.palette.background.paper,
	borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const ChatAvatar = styled(Avatar)(({ theme }) => ({
	width: '40px',
	height: '40px',
	marginRight: theme.spacing(2),
	backgroundColor: theme.palette.primary.main,
}));

export const ChatUserName = styled(Typography)(() => ({
	fontWeight: 'bold',
	fontSize: '1rem',
}));

export const ChatMessages = styled(Box)(({ theme }) => ({
	flex: 1,
	padding: theme.spacing(2),
	overflowY: 'auto',
}));

export const MessageBubble = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'sent',
})<{ sent?: boolean }>(({ theme, sent }) => ({
	backgroundColor: sent ? '#d9fdd3' : theme.palette.background.paper,
	padding: '8px 12px',
	borderRadius: '7.5px',
	maxWidth: '65%',
	boxShadow: '0 1px 0.5px rgba(0, 0, 0, 0.13)',
	position: 'relative',
	marginBottom: theme.spacing(1),
}));

export const MessageText = styled(Typography)(({ theme }) => ({
	fontSize: '0.95rem',
	color: theme.palette.text.primary,
	wordWrap: 'break-word',
}));

export const MessageTimestamp = styled(Typography)(({ theme }) => ({
	fontSize: '0.6875rem',
	color: theme.palette.text.secondary,
	marginLeft: theme.spacing(1),
	display: 'inline-block',
}));

export const MessageStatus = styled(Box)(() => ({
	display: 'inline-flex',
	alignItems: 'center',
}));

export const DateDivider = styled(Divider)(({ theme }) => ({
	margin: theme.spacing(2, 0),
	'&::before, &::after': {
		borderColor: theme.palette.divider,
	},
}));

export const DateDividerText = styled(Typography)(({ theme }) => ({
	backgroundColor: theme.palette.grey[100],
	padding: theme.spacing(0.5, 2),
	borderRadius: '20px',
	color: theme.palette.text.secondary,
	fontSize: '0.75rem',
}));

export const InputContainer = styled(Box)(({ theme }) => ({
	padding: theme.spacing(1),
	backgroundColor: theme.palette.background.paper,
	borderTop: `1px solid ${theme.palette.divider}`,
}));

export const MessageInputContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(2),
	backgroundColor: theme.palette.background.paper,
	borderTop: `1px solid ${theme.palette.divider}`,
}));

export const MessageTextField = styled(TextField)(({ theme }) => ({
	flex: 1,
	marginRight: theme.spacing(2),
}));

export const SendButton = styled(IconButton)(({ theme }) => ({
	color: theme.palette.primary.main,
}));
