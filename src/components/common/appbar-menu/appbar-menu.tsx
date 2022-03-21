import Toolbar from '@mui/material/Toolbar';

import WalletConnector from '../wallet-connector/wallet-connector';
import {
    AppBarTitle,
    AppBarWrapper,
    StyledAppBar,
    ToolbarWrapper,
} from './appbar-menu.styles';

const AppBarMenu: React.FC = () => (
    <AppBarWrapper>
        <StyledAppBar>
            <ToolbarWrapper>
                <Toolbar>
                    <AppBarTitle variant="h6">❔ Survey Challenge</AppBarTitle>
                    <WalletConnector />
                </Toolbar>
            </ToolbarWrapper>
        </StyledAppBar>
    </AppBarWrapper>
);

export default AppBarMenu;
