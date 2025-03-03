import React from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { AxiosError } from 'axios';
import NextLink from 'next/link';
import { useToaster } from '@/components/Toaster';
import { signup } from '@/services/api';
import PublicRoute from '@/context/PublicRoute';
import { SignupValidationSchema } from '@/utils/validationSchema';

const SignupPage: React.FC = () => {
	const router = useRouter();
	const { showToaster } = useToaster();

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
		},
		validationSchema: SignupValidationSchema,
		onSubmit: async (values) => {
			try {
				await signup(values.name, values.email, values.password, showToaster);
				showToaster('Signup successful!', 'success');
				router.push('/login');
			} catch (error) {
				const axiosError = error as AxiosError;
				showToaster(axiosError.message || 'Signup failed', 'error');
			}
		},
	});

	return (
		<PublicRoute>
			<Container maxWidth="sm">
				<Box sx={{ mt: 4 }}>
					<Typography variant="h4" align="center" gutterBottom>
						Signup
					</Typography>
					<form onSubmit={formik.handleSubmit}>
						<TextField
							fullWidth
							id="name"
							name="name"
							label="Name"
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.name && Boolean(formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							fullWidth
							id="email"
							name="email"
							label="Email"
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.email && Boolean(formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							fullWidth
							id="password"
							name="password"
							label="Password"
							type="password"
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.password && Boolean(formik.errors.password)}
							helperText={formik.touched.password && formik.errors.password}
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
							Signup
						</Button>
					</form>
					<Box sx={{ mt: 2, textAlign: 'center' }}>
						<Typography variant="body1">
							Already have an account?{' '}
							<NextLink href="/login" passHref>
								Log in
							</NextLink>
						</Typography>
					</Box>
				</Box>
			</Container>
		</PublicRoute>
	);
};

export default SignupPage;
