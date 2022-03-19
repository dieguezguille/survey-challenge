import Button from '@mui/material/Button';
import useWalletContext from '../../../hooks/use-wallet-context.hook';

const WalletConnector: React.FC = () => {
    const { isConnected, connect, disconnect } = useWalletContext();

    const handleClick = () => {
        !isConnected ? connect() : disconnect();
    };

    return (
        <Button color="inherit" onClick={handleClick}>
            {!isConnected ? 'Connect Wallet' : 'Disconnect Wallet'}
        </Button>
    );
};

export default WalletConnector;
