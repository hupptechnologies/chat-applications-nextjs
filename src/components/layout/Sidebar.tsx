import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, List, ListItemText, Toolbar, ListItemIcon } from '@mui/material';
import { SidebarDrawer, SidebarListItemButton } from '@/styles/DashboardLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from '@mui/icons-material/Chat';

interface SidebarProps {
	mobileOpen: boolean;
	onDrawerToggle: () => void;
}

const menuItems = [
	{ title: 'Dashboard', to: '/', icon: <DashboardIcon /> },
	{ title: 'Chat', to: '/chat', icon: <ChatIcon /> },
];

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onDrawerToggle }) => {
	const router = useRouter();

	const drawer = (
		<div>
			<Toolbar />
			<List>
				{menuItems.map((item, index) => (
					<Link href={item.to} key={index} passHref legacyBehavior>
						<SidebarListItemButton selected={router.pathname === item.to}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.title} />
						</SidebarListItemButton>
					</Link>
				))}
			</List>
		</div>
	);

	return (
		<Box component="nav">
			<SidebarDrawer
				variant="temporary"
				open={mobileOpen}
				onClose={onDrawerToggle}
				ModalProps={{ keepMounted: true }}
				sx={{ display: { xs: 'block', sm: 'none' } }}
			>
				{drawer}
			</SidebarDrawer>
			<SidebarDrawer
				variant="permanent"
				sx={{ display: { xs: 'none', sm: 'block' } }}
				open
			>
				{drawer}
			</SidebarDrawer>
		</Box>
	);
};

export default Sidebar;
