import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import WalletConnector from '../wallet-connector/wallet-connector';
import { ToolbarWrapper } from './appbar-menu.styles';

const AppBarMenu: React.FC = () => (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <ToolbarWrapper sx={{ padding: '0px' }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        ❔ Survey Challenge
                    </Typography>
                    <WalletConnector />
                </Toolbar>
            </ToolbarWrapper>
        </AppBar>
    </Box>
);

export default AppBarMenu;
