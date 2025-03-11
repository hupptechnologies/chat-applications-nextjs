import * as yup from 'yup';

export const LoginValidationSchema = yup.object({
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup.string().required('Password is required'),
});

export const SignupValidationSchema = yup.object({
	userName: yup.string().required('Name is required'),
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup.string().required('Password is required'),
});
