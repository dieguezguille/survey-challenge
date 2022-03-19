import Button from '@mui/material/Button';
import { useContext } from 'react';
import { WalletContext } from '../../context/wallet.context';

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
        <Button color="inherit" onClick={handleConnect}>
            {isConnected
                ? `${String(address).substring(0, 6)}...${String(
                      address
                  ).substring(38)}`
                : 'Connect Wallet'}
        </Button>
    ) : (
        <Button color="inherit" onClick={handleChainSwitch}>
            Switch to Ropsten
        </Button>
    );
};

export default WalletConnector;
