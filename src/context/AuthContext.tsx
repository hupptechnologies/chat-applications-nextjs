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
import { UserAttributes } from '@/interface/User';

// Define the shape of the context
interface AuthContextType {
	isAuthenticated: boolean;
	loading: boolean;
	user: UserAttributes | null;
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
	const [user, setUser] = useState<UserAttributes | null>(null);
	const [loading, setLoading] = useState(true); // Initialize loading as true
	const router = useRouter();
	const { showToaster } = useToaster();

	// Check if the user is authenticated on initial load
	useEffect(() => {
		const checkAuth = async () => {
			const token = localStorage.getItem('authToken');
			if (token) {
				try {
					const userData = await fetchUsers(showToaster);
					setIsAuthenticated(true);
					setUser(userData.data);
				} catch (error) {
					localStorage.removeItem('authToken'); // Clear invalid token
					setIsAuthenticated(false);
					setUser(null);
				}
			}
			setLoading(false); // Set loading to false after the check is complete
		};

		checkAuth();
	}, [showToaster]);

	// Login function
	const handleLogin = async (email: string, password: string) => {
		try {
			const userData = await login(email, password, showToaster);
			setIsAuthenticated(true);
			setUser(userData);
			showToaster('Login successful!', 'success');
			router.push('/users');
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
				loading, // Provide the loading state
				login: handleLogin,
				logout: handleLogout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
