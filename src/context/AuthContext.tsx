/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { useRouter } from 'next/router';
import { login, fetchUsers } from '@/services/api';
import { useToaster } from '../components/Toaster';

// Define the shape of the context
interface AuthContextType {
	isAuthenticated: boolean;
	user: { id: string; name: string; email: string } | null;
	login: (_email: string, _password: string) => Promise<void>;
	logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<{
		id: string;
		name: string;
		email: string;
	} | null>(null);
	const router = useRouter();
	const { showToaster } = useToaster();

	// Ensure localStorage is only accessed in the browser
	useEffect(() => {
		const getToken = localStorage.getItem('authToken');
		if (getToken) {
			setToken(getToken);
		}
	}, []);

	// Check if the user is authenticated on initial load
	useEffect(() => {
		const checkAuth = async () => {
			if (token) {
				try {
					const userData = await fetchUsers(showToaster); // Pass showToaster to fetchUsers
					setIsAuthenticated(true);
					setUser(userData);
				} catch (error) {
					localStorage.removeItem('authToken'); // Clear invalid token
					setIsAuthenticated(false);
					setUser(null);
				}
			}
		};

		checkAuth();
	}, [token]);

	// Login function
	const handleLogin = async (email: string, password: string) => {
		try {
			const userData = await login(email, password, showToaster);
			setIsAuthenticated(true);
			const { user, token } = userData;
			setToken(token);
			setUser(user);
			showToaster('Login successful!', 'success');
			localStorage.setItem('authToken', token); // Store token in localStorage
			router.push('/'); // Redirect to the users page after login
		} catch (error) {
			showToaster('Login failed. Please try again.', 'error');
		}
	};

	// Logout function
	const handleLogout = () => {
		setIsAuthenticated(false);
		setUser(null);
		showToaster('Logged out successfully!', 'success');
		localStorage.removeItem('authToken'); // Remove token from localStorage
		router.push('/login'); // Redirect to the login page after logout
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				user,
				login: handleLogin,
				logout: handleLogout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to use the AuthContext
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
