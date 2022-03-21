import { styled } from '@mui/material';
import green from '@mui/material/colors/green';
import red from '@mui/material/colors/red';
import Box from '@mui/system/Box';

type StyledOnlineIndicatorProps = {
    isOnline: boolean;
};

export const StyledOnlineIndicator = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isOnline',
})<StyledOnlineIndicatorProps>(({ isOnline }) => ({
    padding: '0px',
    margin: '5px 10px',
    width: '10px',
    height: '10px',
    backgroundColor: isOnline ? green[400] : red[400],
    borderRadius: '100%',
}));
