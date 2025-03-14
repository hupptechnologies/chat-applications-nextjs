import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { CircularProgress, Box } from '@mui/material';

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { isAuthenticated, loading } = useAuth();
	const router = useRouter();

	React.useEffect(() => {
		if (!loading && isAuthenticated) {
			router.push('/'); // Redirect to home if authenticated
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

	return <>{!isAuthenticated ? children : null}</>;
};

export default PublicRoute;
