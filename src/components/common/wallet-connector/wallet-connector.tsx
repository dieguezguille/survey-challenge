import { ChangeCircle } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';

import { WalletContext } from '../../context/wallet.context';
import OnlineIndicator from '../online-indicator/online-indicator';

const WalletConnector: React.FC = () => {
    const {
        isConnected,
        connect,
        disconnect,
        address,
        isInvalidChain,
        requestChainSwitch,
    } = useContext(WalletContext);

    const handleConnect = () => {
        !isConnected ? connect() : disconnect();
    };

    const handleChainSwitch = () => {
        requestChainSwitch();
    };

    return !isInvalidChain ? (
        <Button onClick={handleConnect}>
            <Stack direction="row" alignItems="center">
                <OnlineIndicator isOnline={isConnected} />
                <div>
                    {isConnected
                        ? `${String(address).substring(0, 6)}...${String(
                              address
                          ).substring(38)}`
                        : 'Connect Wallet'}
                </div>
            </Stack>
        </Button>
    ) : (
        <Button startIcon={<ChangeCircle />} onClick={handleChainSwitch}>
            Switch to Ropsten
        </Button>
    );
};

export default WalletConnector;
