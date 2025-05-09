// style.ts
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ChatPageContainer = styled(Box)(() => ({
	display: 'flex',
}));

export const ChatMainContent = styled(Box)(() => ({
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
}));
