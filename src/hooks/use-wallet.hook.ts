import { useContext } from 'react';

import { WalletContext } from '../contexts/wallet.context';

const useWallet = () => {
    const { isConnected, connect, disconnect } = useContext(WalletContext);

    const switchConnection = () => {
        !isConnected ? connect() : disconnect();
    };

    return { switchConnection };
};

export default useWallet;
