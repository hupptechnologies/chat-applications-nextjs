import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const MessageStatusContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	marginLeft: theme.spacing(0.5),
	'& .MuiSvgIcon-root': {
		fontSize: '16px',
		color: theme.palette.text.secondary,
	},
	'& .MuiSvgIcon-colorPrimary': {
		color: theme.palette.primary.light,
	},
}));

export const DoubleCheckContainer = styled(Box)(() => ({
	display: 'flex',
	'& .MuiSvgIcon-root:last-child': {
		marginLeft: '-10px',
	},
}));
