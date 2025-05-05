// DashboardLayout/style.ts
import { styled } from '@mui/material/styles';
import {
	Box,
	Drawer,
	AppBar,
	Toolbar,
	IconButton,
	ListItemButton,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

// Define the drawer width as a constant
const drawerWidth = 260;

// Dashboard container
export const DashboardContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	minHeight: '100vh',
	background: '#f4f6fa',
}));

// Header AppBar
export const HeaderAppBar = styled(AppBar)(({ theme }) => ({
	background: '#fff',
	boxShadow: '0 2px 8px 0 rgba(60,72,100,.07)',
	borderRadius: '0 0 18px 18px',
	width: `calc(100% - ${drawerWidth}px)`,
	marginLeft: `${drawerWidth}px`,
	marginTop: 18,
	[theme.breakpoints.down('sm')]: {
		width: '100%',
		marginLeft: 0,
		borderRadius: 0,
		marginTop: 0,
	},
}));

// Header Toolbar
export const HeaderToolbar = styled(Toolbar)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	minHeight: 72,
	padding: theme.spacing(0, 3),
}));

// Menu Icon Button
export const MenuIconButton = styled(IconButton)(({ theme }) => ({
	marginRight: theme.spacing(2),
	[theme.breakpoints.up('sm')]: {
		display: 'none',
	},
}));

// User Info Box
export const UserInfoBox = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	gap: 16,
});

// Sidebar Drawer
export const SidebarDrawer = styled(Drawer)(({ theme }) => ({
	width: drawerWidth,
	flexShrink: 0,
	'& .MuiDrawer-paper': {
		width: drawerWidth,
		boxSizing: 'border-box',
		background: '#fff',
		borderRadius: 18,
		margin: 18,
		boxShadow: '0 2px 8px 0 rgba(60,72,100,.07)',
		border: 'none',
		padding: theme.spacing(2, 0),
	},
	[theme.breakpoints.down('sm')]: {
		display: 'none',
		'& .MuiDrawer-paper': {
			borderRadius: 0,
			margin: 0,
		},
	},
}));

// Main Content
export const MainContent = styled(Box)(({ theme }) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	background: '#f4f6fa',
	minHeight: '100vh',
	borderRadius: 18,
	margin: 18,
	[theme.breakpoints.down('sm')]: {
		width: '100%',
		borderRadius: 0,
		margin: 0,
		padding: theme.spacing(1),
	},
}));

// Sidebar List Item Button
export const SidebarListItemButton = styled(ListItemButton)(({ theme }) => ({
	borderRadius: 12,
	margin: theme.spacing(0.5, 1),
	padding: theme.spacing(1.2, 2),
	'&.Mui-selected': {
		background: alpha(theme.palette.primary.main, 0.12),
		color: theme.palette.primary.main,
		fontWeight: 600,
		'& .MuiListItemIcon-root': {
			color: theme.palette.primary.main,
		},
	},
	'&:hover': {
		background: alpha(theme.palette.primary.main, 0.08),
	},
}));
