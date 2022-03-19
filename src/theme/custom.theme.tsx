import { createTheme, responsiveFontSizes } from '@mui/material';

const CustomTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default responsiveFontSizes(CustomTheme);
