import React from 'react';
import { useRouter } from 'next/router';
import { CircularProgress, Box } from '@mui/material';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { isAuthenticated, loading } = useAuth();
	const router = useRouter();

	React.useEffect(() => {
		if (!loading && !isAuthenticated) {
			router.push('/login'); // Redirect to login if not authenticated
		}
	}, [isAuthenticated, loading, router]);

	// Show a loading spinner while checking authentication
	if (loading) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="100vh"
			>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<>
			{isAuthenticated ? <DashboardLayout>{children}</DashboardLayout> : null}
		</>
	);
};

export default ProtectedRoute;
