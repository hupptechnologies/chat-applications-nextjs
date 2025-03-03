import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { isAuthenticated } = useAuth();
	const router = useRouter();

	React.useEffect(() => {
		if (!isAuthenticated) {
			router.push('/login'); // Redirect unauthenticated users to the login page
		}
	}, [isAuthenticated, router]);

	return <>{isAuthenticated ? children : null}</>;
};

export default ProtectedRoute;
