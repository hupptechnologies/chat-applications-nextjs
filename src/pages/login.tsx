// LoginPage/LoginPage.tsx
import React from 'react';
import { TextField, Typography, Divider } from '@mui/material';
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
	LoginFooter,
	LoginHeader,
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
					<LoginTitle variant="h4">Login to your account</LoginTitle>
					<LoginHeader>
						<Divider sx={{ flexGrow: 1 }} />
						<Typography variant="body1" sx={{ mx: 2 }}>
							OR
						</Typography>
						<Divider sx={{ flexGrow: 1 }} />
					</LoginHeader>
					<form onSubmit={formik.handleSubmit}>
						<TextField
							fullWidth
							id="email"
							name="email"
							label="Email Address"
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
						<LoginFooter>
							<Typography variant="body2">
								<NextLink href="/signup" passHref>
									Don't have an account? Sign up
								</NextLink>
							</Typography>
						</LoginFooter>
						<LoginButton
							type="submit"
							variant="contained"
							color="primary"
							fullWidth
							sx={{ mt: 3 }}
						>
							Login
						</LoginButton>
					</form>
				</LoginBox>
			</LoginContainer>
		</PublicRoute>
	);
};

export default LoginPage;
