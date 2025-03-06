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

// Define the drawer width as a constant
const drawerWidth = 240;

// Dashboard container
export const DashboardContainer = styled(Box)({
	display: 'flex',
});

// Header AppBar
export const HeaderAppBar = styled(AppBar)(({ theme }) => ({
	width: `calc(100% - ${drawerWidth}px)`,
	marginLeft: `${drawerWidth}px`,
	[theme.breakpoints.down('sm')]: {
		width: '100%',
		marginLeft: 0,
	},
}));

// Header Toolbar
export const HeaderToolbar = styled(Toolbar)({
	display: 'flex',
	justifyContent: 'space-between',
});

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
});

// Sidebar Drawer
export const SidebarDrawer = styled(Drawer)(({ theme }) => ({
	width: drawerWidth,
	flexShrink: 0,
	'& .MuiDrawer-paper': {
		width: drawerWidth,
		boxSizing: 'border-box',
	},
	[theme.breakpoints.down('sm')]: {
		display: 'none',
	},
}));

// Main Content
export const MainContent = styled(Box)(({ theme }) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	width: `calc(100% - ${drawerWidth}px)`,
	[theme.breakpoints.down('sm')]: {
		width: '100%',
	},
}));

// Sidebar List Item Button
export const SidebarListItemButton = styled(ListItemButton)(({ theme }) => ({
	'&.Mui-selected': {
		backgroundColor: theme.palette.action.selected,
	},
}));
