// ChatSidebar/style.ts
import { styled } from '@mui/material/styles';
import {
	Avatar,
	Box,
	Typography,
	TextField,
	ListItemButton,
} from '@mui/material';

export const SidebarContainer = styled(Box)(({ theme }) => ({
	width: '30%',
	height: 'calc(100vh - 120px)',
	borderRight: `1px solid ${theme.palette.divider}`,
	backgroundColor: theme.palette.background.paper,
	display: 'flex',
	flexDirection: 'column',
}));

export const SidebarHeader = styled(Box)(({ theme }) => ({
	padding: theme.spacing(2),
	borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const SidebarTitle = styled(Typography)(() => ({
	fontWeight: 'bold',
}));

export const SearchField = styled(TextField)(({ theme }) => ({
	marginTop: theme.spacing(1),
}));

export const UserList = styled(Box)(() => ({
	flex: 1,
	overflowY: 'auto',
}));
export const UserListItem = styled(ListItemButton)(({ theme }) => ({
	'&.Mui-selected': {
		backgroundColor: theme.palette.action.selected,
	},
	'&:hover': {
		backgroundColor: theme.palette.action.hover,
	},
}));

export const UserAvatar = styled(Avatar)(({ theme }) => ({
	margin: '10px',
	backgroundColor: theme.palette.primary.main,
}));

export const UserName = styled(Typography)(() => ({
	fontWeight: 'bold',
}));

export const UserLastMessage = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.secondary,
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
}));

export const UserTimestamp = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.secondary,
	alignSelf: 'flex-start',
	marginLeft: 'auto',
}));

export const OnlineStatus = styled(Box)(({ theme }) => ({
	width: '8px',
	height: '8px',
	backgroundColor: 'green',
	borderRadius: '50%',
	marginLeft: theme.spacing(1),
}));
