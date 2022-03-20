import { createTheme, responsiveFontSizes } from '@mui/material';
import { MuiContainerStyleOverrides } from './overrides/mui-container.override';

const CustomTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    components: {
        MuiContainer: {
            styleOverrides: MuiContainerStyleOverrides,
        },
    },
});

export default responsiveFontSizes(CustomTheme);
