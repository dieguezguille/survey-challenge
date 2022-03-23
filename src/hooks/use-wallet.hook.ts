import { useContext } from 'react';

import { WalletContext } from '../components/context/wallet.context';

const useWallet = () => {
    const {
        isConnected,
        isInvalidChain,
        address,
        provider,
        connect,
        disconnect,
        requestChainSwitch,
    } = useContext(WalletContext);

    const switchConnection = () => {
        !isConnected ? connect() : disconnect();
    };

    return {
        isConnected,
        address,
        isInvalidChain,
        provider,
        switchConnection,
        connect,
        disconnect,
        requestChainSwitch,
    };
};

export default useWallet;
