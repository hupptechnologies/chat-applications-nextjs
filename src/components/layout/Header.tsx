import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';
import {
	HeaderAppBar,
	HeaderToolbar,
	UserInfoBox,
} from '@/styles/DashboardLayout';
interface HeaderProps {
	onDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onDrawerToggle }) => {
	const { user, logout } = useAuth();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const router = useRouter();

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		logout();
	};

	return (
		<HeaderAppBar position="fixed" elevation={1}>
			<HeaderToolbar>
				<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 0.5, color: '#222' }}>
					{router.pathname === '/chat' ? 'Private Messaging' : 'Dashboard'}
				</Typography>
				<UserInfoBox>
					{user?.userName && (
						<IconButton color="inherit" onClick={handleMenuClick} sx={{ ml: 1 }}>
							<Avatar sx={{ bgcolor: '#1976d2' }}>{user.userName.charAt(0)}</Avatar>
						</IconButton>
					)}
					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleMenuClose}
					>
						<MenuItem onClick={handleLogout}>
							<ExitToApp sx={{ mr: 1 }} />
							Logout
						</MenuItem>
					</Menu>
				</UserInfoBox>
			</HeaderToolbar>
		</HeaderAppBar>
	);
};

export default Header;
