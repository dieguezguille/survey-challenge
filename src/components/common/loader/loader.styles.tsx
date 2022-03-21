import { styled } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import grey from '@mui/material/colors/grey';

export const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
    color: grey[50],
    zIndex: theme.zIndex.drawer + 1,
}));
