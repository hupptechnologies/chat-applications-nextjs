import React, { useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { ExitToApp, Menu as MenuIcon } from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';
import {
	HeaderAppBar,
	HeaderToolbar,
	MenuIconButton,
	UserInfoBox,
} from '@/styles/DashboardLayout';

interface HeaderProps {
	onDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onDrawerToggle }) => {
	const { user, logout } = useAuth();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
		<HeaderAppBar position="fixed">
			<HeaderToolbar>
				<MenuIconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={onDrawerToggle}
				>
					<MenuIcon />
				</MenuIconButton>
				<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
					Chat App
				</Typography>
				<UserInfoBox>
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
