import { styled } from '@mui/material';
import { Backdrop } from '@mui/material';
import { grey } from '@mui/material/colors';

export const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
    color: grey[50],
    zIndex: theme.zIndex.drawer + 1,
}));
