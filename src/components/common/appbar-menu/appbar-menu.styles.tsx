import { styled } from '@mui/material';
import Box from '@mui/system/Box';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

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
