import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import ProtectedRoute from '@/context/ProtectedRoute';

const HomePage: React.FC = () => {
	const router = useRouter();
	return (
		<ProtectedRoute>
			<div>
				<h1>Welcome to Chat Application</h1>
				<Button
					variant="contained"
					color="primary"
					onClick={() => router.push('/chat')}
				>
					Click Me
				</Button>
			</div>
		</ProtectedRoute>
	);
};

export default HomePage;
