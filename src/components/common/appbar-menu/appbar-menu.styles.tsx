import { styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';

export const AppBarWrapper = styled(Box)({
    flexGrow: 1,
});

export const StyledAppBar = styled(AppBar)({
    position: 'static',
});

export const ToolbarWrapper = styled(Container)({
    padding: '0px',
});

export const AppBarTitle = styled(Typography)({
    flexGrow: 1,
});
