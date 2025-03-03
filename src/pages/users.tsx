import React from 'react';
import { Container, Typography, List } from '@mui/material';
import ProtectedRoute from '@/context/ProtectedRoute';

const UsersPage: React.FC = () => {
	return (
		<ProtectedRoute>
			<Container maxWidth="sm">
				<Typography variant="h4" align="center" gutterBottom>
					User List
				</Typography>
				<List>{/* Render user list here */}</List>
			</Container>
		</ProtectedRoute>
	);
};

export default UsersPage;
