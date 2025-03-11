import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:4000/api';

// Define the error response interface
interface ErrorResponse {
	message: string;
}

// Login API
export const login = async (
	email: string,
	password: string,
	showToaster: (_message: string, _severity: 'success' | 'error') => void
) => {
	try {
		const response = await axios.post(`${API_URL}/auth/login`, {
			email,
			password,
		});
		const { token } = response.data.data; // Assume the API returns a token and user data
		localStorage.setItem('authToken', token); // Store the token in localStorage
		showToaster('Login successful!', 'success');
		return response.data.data;
	} catch (error) {
		const axiosError = error as AxiosError<ErrorResponse>;
		showToaster(axiosError.response?.data?.message || 'Login failed', 'error');
		throw error;
	}
};

// Signup API
export const signup = async (
	userName: string,
	email: string,
	password: string
) => {
	try {
		const response = await axios.post(`${API_URL}/auth/signup`, {
			userName,
			email,
			password,
		});
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<ErrorResponse>;
		throw axiosError;
	}
};

// Fetch Users API
export const fetchUsers = async (
	showToaster: (_message: string, _severity: 'success' | 'error') => void
) => {
	try {
		const token = localStorage.getItem('authToken');
		const response = await axios.get(`${API_URL}/auth/me`, {
			headers: {
				token,
			},
		});
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<ErrorResponse>;
		showToaster(
			axiosError.response?.data?.message || 'Failed to fetch users',
			'error'
		);
		throw error;
	}
};
