// LoginPage/LoginPage.tsx
import React from 'react';
import { TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import NextLink from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { LoginValidationSchema } from '@/utils/validationSchema';
import PublicRoute from '@/context/PublicRoute';
import {
	LoginContainer,
	LoginBox,
	LoginTitle,
	LoginButton,
	SignupLinkBox,
} from '@/styles/AuthStyle'; // Import the styled components

const LoginPage: React.FC = () => {
	const { login } = useAuth();
	const initialValues = {
		email: 'huppdemo@hupp.in',
		password: '12345678',
	};

	const formik = useFormik({
		initialValues,
		validationSchema: LoginValidationSchema,
		onSubmit: async (values) => {
			await login(values.email, values.password);
		},
	});

	const { values, handleChange, errors, touched } = formik;

	return (
		<PublicRoute>
			<LoginContainer maxWidth="sm">
				<LoginBox>
					<LoginTitle variant="h4">Login</LoginTitle>
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
						<LoginButton
							type="submit"
							variant="contained"
							color="primary"
							fullWidth
						>
							Login
						</LoginButton>
					</form>
					<SignupLinkBox>
						<Typography variant="body1">
							Don't have an account?{' '}
							<NextLink href="/signup" passHref>
								Sign up
							</NextLink>
						</Typography>
					</SignupLinkBox>
				</LoginBox>
			</LoginContainer>
		</PublicRoute>
	);
};

export default LoginPage;
