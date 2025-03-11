// LoginPage/style.ts
import { styled } from '@mui/material/styles';
import { Container, Box, Typography, Button } from '@mui/material';

export const LoginContainer = styled(Container)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	minHeight: '100vh',
	padding: theme.spacing(4),
}));

export const LoginBox = styled(Box)(({ theme }) => ({
	width: '100%',
	maxWidth: '400px',
	padding: theme.spacing(3),
	borderRadius: theme.shape.borderRadius,
	boxShadow: theme.shadows[3],
	backgroundColor: theme.palette.background.paper,
}));

export const LoginTitle = styled(Typography)(({ theme }) => ({
	marginBottom: theme.spacing(2),
	textAlign: 'center',
}));

export const LoginFooter = styled(Box)(() => ({
	display: 'flex',
	marginTop: 2,
	alignItems: 'center',
	justifyContent: 'space-between',
}));

export const LoginHeader = styled(Box)(() => ({
	display: 'flex',
	marginTop: 2,
	marginBottom: 2,
	alignItems: 'center',
	width: '100%',
}));

export const SignupFooter = styled(Box)(() => ({
	display: 'flex',
	marginTop: 2,
	marginBottom: 2,
	alignItems: 'center',
	width: '100%',
}));

export const LoginButton = styled(Button)(({ theme }) => ({
	marginTop: theme.spacing(2),
}));

export const SignupLinkBox = styled(Box)(({ theme }) => ({
	marginTop: theme.spacing(2),
	textAlign: 'center',
}));

export const SignupContainer = styled(Container)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	minHeight: '100vh',
	padding: theme.spacing(4),
}));

export const SignupBox = styled(Box)(({ theme }) => ({
	width: '100%',
	maxWidth: '400px',
	padding: theme.spacing(3),
	borderRadius: theme.shape.borderRadius,
	boxShadow: theme.shadows[3],
	backgroundColor: theme.palette.background.paper,
}));

export const SignupTitle = styled(Typography)(({ theme }) => ({
	marginBottom: theme.spacing(2),
	textAlign: 'center',
}));

export const SignupButton = styled(Button)(({ theme }) => ({
	marginTop: theme.spacing(2),
}));

export const LoginLinkBox = styled(Box)(({ theme }) => ({
	marginTop: theme.spacing(2),
	textAlign: 'center',
}));
