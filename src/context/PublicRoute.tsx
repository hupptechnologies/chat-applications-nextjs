import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const router = useRouter();

	React.useEffect(() => {
		if (isAuthenticated) {
			router.push('/'); // Redirect authenticated users to the home screen
		}
	}, [isAuthenticated, router]);

	return <>{!isAuthenticated ? children : null}</>;
};

export default PublicRoute;
