import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

// Define the Toaster context
type ToasterContextType = {
	showToaster: (_message: string, _severity: AlertColor) => void;
};

const ToasterContext = createContext<ToasterContextType | null>(null);

// Toaster Provider component
export const ToasterProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [severity, setSeverity] = useState<AlertColor>('info');

	const showToaster = (message: string, severity: AlertColor) => {
		setMessage(message);
		setSeverity(severity);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<ToasterContext.Provider value={{ showToaster }}>
			{children}
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
					{message}
				</Alert>
			</Snackbar>
		</ToasterContext.Provider>
	);
};

// Custom hook to use the Toaster
export const useToaster = () => {
	const context = useContext(ToasterContext);
	if (!context) {
		throw new Error('useToaster must be used within a ToasterProvider');
	}
	return context;
};
