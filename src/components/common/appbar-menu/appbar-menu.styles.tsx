import { styled } from '@mui/material';
import Box from '@mui/system/Box';
import { Container } from '@mui/material';
import { AppBar } from '@mui/material';
import { Typography } from '@mui/material';

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
