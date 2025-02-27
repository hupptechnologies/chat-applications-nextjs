import { createTheme } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
	palette: {
		primary: {
			main: '#1976d2', // Customize primary color
		},
		secondary: {
			main: '#dc004e', // Customize secondary color
		},
		background: {
			default: '#f4f6f8', // Customize default background color
		},
	},
	typography: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Customize font family
		h1: {
			fontSize: '2.5rem',
			fontWeight: 500,
		},
		h2: {
			fontSize: '2rem',
			fontWeight: 500,
		},
	},
	spacing: 8, // Default spacing unit
});

export default theme;
