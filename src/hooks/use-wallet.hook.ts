import { useContext } from 'react';

import { WalletContext } from '../contexts/wallet.context';

const useWallet = () => {
    const {
        isConnected,
        isInvalidChain,
        requestChainSwitch,
        connect,
        disconnect,
        address,
        provider,
    } = useContext(WalletContext);

    const switchConnection = () => {
        !isConnected ? connect() : disconnect();
    };

    return {
        isConnected,
        isInvalidChain,
        requestChainSwitch,
        switchConnection,
        connect,
        disconnect,
        address,
        provider,
    };
};

export default useWallet;
