// SignupPage/SignupPage.tsx
import React from 'react';
import {
	TextField,
	Typography,
	Checkbox,
	FormControlLabel,
	Divider,
} from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import NextLink from 'next/link';
import { useToaster } from '@/components/Toaster';
import { signup } from '@/services/api';
import PublicRoute from '@/context/PublicRoute';
import { SignupValidationSchema } from '@/utils/validationSchema';
import {
	SignupContainer,
	SignupBox,
	SignupTitle,
	SignupButton,
	LoginLinkBox,
	SignupFooter,
} from '@/styles/AuthStyle';

interface ErrorResponse {
	message: string;
}

const SignupPage: React.FC = () => {
	const router = useRouter();
	const { showToaster } = useToaster();

	const formik = useFormik({
		initialValues: {
			userName: '',
			email: '',
			password: '',
			receiveUpdates: false,
		},
		validationSchema: SignupValidationSchema,
		onSubmit: async (values) => {
			try {
				await signup(values.userName, values.email, values.password);
				showToaster('Signup successful!', 'success');
				router.push('/login');
			} catch (error) {
				const axiosError = error as AxiosError<ErrorResponse>;
				showToaster(
					axiosError.response?.data?.message || 'Signup failed',
					'error'
				);
			}
		},
	});

	return (
		<PublicRoute>
			<SignupContainer maxWidth="sm">
				<SignupBox>
					<SignupTitle variant="h4">Sign up</SignupTitle>
					<form onSubmit={formik.handleSubmit}>
						<TextField
							fullWidth
							id="name"
							name="userName"
							label="Full name"
							value={formik.values.userName}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.userName && Boolean(formik.errors.userName)}
							helperText={formik.touched.userName && formik.errors.userName}
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
						<FormControlLabel
							control={
								<Checkbox
									name="receiveUpdates"
									checked={formik.values.receiveUpdates}
									onChange={formik.handleChange}
									color="primary"
								/>
							}
							label="I want to receive updates via email."
						/>
						<SignupButton
							type="submit"
							variant="contained"
							color="primary"
							fullWidth
							sx={{ mt: 2 }}
						>
							Sign up
						</SignupButton>
					</form>
					<SignupFooter>
						<Divider sx={{ flexGrow: 1 }} />
						<Typography variant="body1" sx={{ mx: 2 }}>
							or
						</Typography>
						<Divider sx={{ flexGrow: 1 }} />
					</SignupFooter>
					<LoginLinkBox>
						<Typography variant="body1">
							Already have an account?{' '}
							<NextLink href="/login" passHref>
								Sign in
							</NextLink>
						</Typography>
					</LoginLinkBox>
				</SignupBox>
			</SignupContainer>
		</PublicRoute>
	);
};

export default SignupPage;
