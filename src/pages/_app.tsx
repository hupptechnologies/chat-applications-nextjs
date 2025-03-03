import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToasterProvider } from '@/components/Toaster';
import { AuthProvider } from '@/context/AuthContext';
import { SocketProvider } from '@/context/SocketContext';
import theme from '@/theme/theme';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline /> {/* Normalize CSS and apply baseline styles */}
			<ToasterProvider>
				<AuthProvider>
					<SocketProvider>
						<Component {...pageProps} />
					</SocketProvider>
				</AuthProvider>
			</ToasterProvider>
		</ThemeProvider>
	);
}

export default MyApp;
