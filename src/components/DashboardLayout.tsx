import React, { useState } from 'react';
import {
	Box,
	CssBaseline,
	Toolbar,
	Drawer,
	List,
	ListItemText,
	Typography,
	AppBar,
	IconButton,
	ListItemButton,
	Avatar,
	Menu,
	MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

interface DashboardLayoutProps {
	children: React.ReactNode;
}

const drawerWidth = 240;

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
	const { user, logout } = useAuth();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const router = useRouter();

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		// Add your logout logic here
		logout();
	};

	const menuItems = [
		{
			title: 'Dashboard',
			to: '/',
		},
		{
			title: 'Users',
			to: '/users',
		},
		{
			title: 'Chat',
			to: '/chat',
		},
	];

	const drawer = (
		<div>
			<Toolbar />
			<List>
				{menuItems.map((item, index) => (
					<Link href={item.to} key={index} passHref>
						<ListItemButton selected={router.pathname === item.to}>
							<ListItemText primary={item.title} />
						</ListItemButton>
					</Link>
				))}
			</List>
		</div>
	);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			{/* Header */}
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
						Chat App
					</Typography>

					{/* User info and logout button */}
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography variant="body1" sx={{ mr: 2 }}>
							{user?.userName}
						</Typography>
						{user?.userName && (
							<IconButton color="inherit" onClick={handleMenuClick}>
								<Avatar>{user.userName.charAt(0)}</Avatar>
							</IconButton>
						)}
						<Menu
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={handleMenuClose}
						>
							<MenuItem onClick={handleLogout}>
								<ExitToAppIcon sx={{ mr: 1 }} />
								Logout
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>

			{/* Sidebar */}
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>

			{/* Main Content */}
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar /> {/* Add a toolbar to account for the header height */}
				{children}
			</Box>
		</Box>
	);
};

export default DashboardLayout;
