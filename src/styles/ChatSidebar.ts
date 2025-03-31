// ChatSidebar/style.ts
import { styled } from '@mui/material/styles';
import {
	Avatar,
	Box,
	IconButton,
	Typography,
	InputBase,
	List,
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
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: theme.spacing(2),
	backgroundColor: theme.palette.grey[100],
	borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const SidebarTitle = styled(Typography)(({ theme }) => ({
	fontWeight: 'bold',
	fontSize: '1.25rem',
	color: theme.palette.text.primary,
	marginBottom: theme.spacing(1),
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	backgroundColor: theme.palette.background.paper,
	borderRadius: '20px',
	padding: theme.spacing(0.5, 1.5),
	margin: '10px 0 10px 0',
	border: `1px solid ${theme.palette.divider}`,
}));

export const UserProfileButton = styled(IconButton)(({ theme }) => ({
	padding: theme.spacing(1),
}));

export const UserProfileAvatar = styled(Avatar)(() => ({
	width: '48px',
	height: '48px',
}));

export const SearchInput = styled(InputBase)(({ theme }) => ({
	marginLeft: theme.spacing(1),
	flex: 1,
	fontSize: '0.9rem',
}));

export const UserList = styled(List)(() => ({
	flex: 1,
	overflowY: 'auto',
}));

export const UserListItem = styled(ListItemButton)(({ theme }) => ({
	padding: theme.spacing(1.5, 2),
	'&:hover': {
		backgroundColor: theme.palette.action.hover,
	},
	'&.Mui-selected': {
		backgroundColor: theme.palette.action.selected,
	},
}));

export const UserAvatar = styled(Avatar)(({ theme }) => ({
	width: '48px',
	height: '48px',
	marginRight: theme.spacing(2),
}));

export const UserInfoContainer = styled(Box)(() => ({
	flex: 1,
	minWidth: 0, // Allows text truncation
}));

export const UserNameRow = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}));

export const UserName = styled(Typography)(() => ({
	fontWeight: 'bold',
	fontSize: '0.9rem',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
}));

export const UserTimestamp = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.secondary,
	fontSize: '0.7rem',
}));

export const MessageRow = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
}));

export const UserLastMessage = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.secondary,
	fontSize: '0.8rem',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	flex: 1,
}));

export const NoContactsContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%',
	padding: theme.spacing(4),
	textAlign: 'center',
}));

export const NoContactsTitle = styled(Typography)(({ theme }) => ({
	fontWeight: 'bold',
	fontSize: '1.2rem',
	marginBottom: theme.spacing(1),
}));

export const NoContactsText = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.secondary,
	fontSize: '0.9rem',
	marginBottom: theme.spacing(2),
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
	padding: theme.spacing(1, 2),
	fontSize: '0.8rem',
	color: theme.palette.text.secondary,
	backgroundColor: theme.palette.grey[100],
}));
