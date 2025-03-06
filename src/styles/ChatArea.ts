// ChatArea/style.ts
import { styled } from '@mui/material/styles';
import { Box, Typography, Avatar, TextField, IconButton } from '@mui/material';

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
	marginRight: theme.spacing(2),
}));

export const ChatUserName = styled(Typography)(() => ({
	fontWeight: 'bold',
}));

export const ChatStatus = styled(Typography)(({ theme }) => ({
	marginLeft: 'auto',
	color: theme.palette.text.secondary,
}));

export const ChatMessages = styled(Box)(({ theme }) => ({
	flex: 1,
	padding: theme.spacing(2),
	overflowY: 'auto',
	backgroundColor: theme.palette.background.paper,
}));

export const MessageBubble = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.primary.light,
	padding: theme.spacing(1, 2),
	borderRadius: theme.shape.borderRadius,
	maxWidth: '70%',
}));

export const MessageText = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.primary,
}));

export const MessageTimestamp = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.secondary,
	fontSize: theme.typography.caption.fontSize,
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
