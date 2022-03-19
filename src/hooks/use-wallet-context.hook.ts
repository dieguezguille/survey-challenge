import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { WalletContext } from '../components/context/wallet.context';

const useWalletContext = () => {
    const { isConnected, setIsConnected } = useContext(WalletContext);
    const { enqueueSnackbar } = useSnackbar();

    const connect = () => {
        setIsConnected(true);
        enqueueSnackbar('Connected!', { variant: 'info' });
    };

    const disconnect = () => {
        setIsConnected(false);
        enqueueSnackbar('Disconnected!', { variant: 'info' });
    };

    return { isConnected, connect, disconnect };
};

export default useWalletContext;
