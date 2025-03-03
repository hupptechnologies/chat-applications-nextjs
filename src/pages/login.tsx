import React from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { AxiosError } from 'axios';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { useToaster } from '@/components/Toaster';
import { LoginValidationSchema } from '@/utils/validationSchema';

const LoginPage: React.FC = () => {
	const router = useRouter();
	const { showToaster } = useToaster();
	const initialValues = {
		email: '',
		password: '',
	};

	const formik = useFormik({
		initialValues,
		validationSchema: LoginValidationSchema,
		onSubmit: (values) => handleSubmit(values),
	});
	const handleSubmit = async (values: { email: string; password: string }) => {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			values;
			showToaster('Login successful!', 'success');
			router.push('/users');
		} catch (error) {
			const axiosError = error as AxiosError;
			showToaster(axiosError.message, 'error');
		}
	};

	const { values, handleChange, errors, touched } = formik;

	return (
		<Container maxWidth="sm">
			<Box sx={{ mt: 4 }}>
				<Typography variant="h4" align="center" gutterBottom>
					Login
				</Typography>
				<form onSubmit={formik.handleSubmit}>
					<TextField
						fullWidth
						id="email"
						name="email"
						label="Email"
						value={values.email}
						onChange={handleChange}
						error={touched.email && Boolean(errors.email)}
						helperText={touched.email && errors.email}
						margin="normal"
						variant="outlined"
					/>
					<TextField
						fullWidth
						id="password"
						name="password"
						label="Password"
						type="password"
						value={values.password}
						onChange={handleChange}
						error={touched.password && Boolean(errors.password)}
						helperText={touched.password && errors.password}
						margin="normal"
						variant="outlined"
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						sx={{ mt: 2 }}
					>
						Login
					</Button>
				</form>
				<Box sx={{ mt: 2, textAlign: 'center' }}>
					<Typography variant="body1">
						Don't have an account?{' '}
						<NextLink href="/signup" passHref>
							Sign up
						</NextLink>
					</Typography>
				</Box>
			</Box>
		</Container>
	);
};

export default LoginPage;
