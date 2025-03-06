// DashboardLayout/DashboardLayout.tsx
import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Header from './Header';
import Sidebar from './Sidebar';
import { DashboardContainer, MainContent } from '@/styles/DashboardLayout';

interface DashboardLayoutProps {
	children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<DashboardContainer>
			<CssBaseline />
			<Header onDrawerToggle={handleDrawerToggle} />
			<Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
			<MainContent>
				<Toolbar /> {/* Add a toolbar to account for the header height */}
				{children}
			</MainContent>
		</DashboardContainer>
	);
};

export default DashboardLayout;
