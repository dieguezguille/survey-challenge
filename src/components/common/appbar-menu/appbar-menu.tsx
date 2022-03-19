import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import WalletConnector from '../wallet-connector/wallet-connector';

const AppBarMenu: React.FC = () => (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Quiz Challenge
                    </Typography>
                    <WalletConnector />
                </Toolbar>
            </Container>
        </AppBar>
    </Box>
);

export default AppBarMenu;
