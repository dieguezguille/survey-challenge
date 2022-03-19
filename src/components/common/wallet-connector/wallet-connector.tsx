import Button from '@mui/material/Button';
import { useContext } from 'react';
import { WalletContext } from '../../context/wallet.context';

const WalletConnector: React.FC = () => {
    const { isConnected, connect, disconnect, address } =
        useContext(WalletContext);

    const handleClick = () => {
        !isConnected ? connect() : disconnect();
    };

    return (
        <Button color="inherit" onClick={handleClick}>
            {isConnected
                ? `${String(address).substring(0, 6)}...${String(
                      address
                  ).substring(38)}`
                : 'Connect Wallet'}
        </Button>
    );
};

export default WalletConnector;
