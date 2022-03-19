import { ethers } from 'ethers';
import { useSnackbar } from 'notistack';
import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react';

type WalletContextProps = {
    isConnected: boolean;
    setIsConnected: Dispatch<SetStateAction<boolean>>;
    address: string | undefined;
    setAddress: Dispatch<SetStateAction<string | undefined>>;
    provider: ethers.providers.Web3Provider | undefined;
    setProvider: Dispatch<
        React.SetStateAction<ethers.providers.Web3Provider | undefined>
    >;
    connect: () => void;
    disconnect: () => void;
};

const defaultValues: WalletContextProps = {
    isConnected: false,
    setIsConnected: () => {},
    address: undefined,
    setAddress: () => {},
    provider: undefined,
    setProvider: () => {},
    connect: () => {},
    disconnect: () => {},
};

export const WalletContext = createContext(defaultValues);

const WalletContextProvider: React.FC = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [isConnected, setIsConnected] = useState<boolean>(
        defaultValues.isConnected
    );

    const [address, setAddress] = useState<string | undefined>(
        defaultValues.address
    );

    const [provider, setProvider] = useState<
        ethers.providers.Web3Provider | undefined
    >(defaultValues.provider);

    const connect = useCallback(async () => {
        if (provider) {
            const result = await provider.send('eth_requestAccounts', []);
            if (result && result.length > 0) {
                setAddress(result[0]);
                setIsConnected(true);
                enqueueSnackbar('Connected to Metamask', { variant: 'info' });
            }
        }
    }, [enqueueSnackbar, provider]);

    const disconnect = useCallback(() => {
        setIsConnected(false);
        setAddress(undefined);
        enqueueSnackbar('Disconnected from Metamask', { variant: 'info' });
    }, [enqueueSnackbar]);

    const contextValue = {
        isConnected,
        setIsConnected,
        address,
        setAddress,
        provider,
        setProvider,
        connect,
        disconnect,
    };

    useEffect(() => {
        if (window.ethereum && !provider) {
            setProvider(new ethers.providers.Web3Provider(window.ethereum));
        }
    }, [provider, setProvider]);

    useEffect(() => {
        if (window.ethereum?.on) {
            const handleAccountsChanged = (accounts: string[]) => {
                if (accounts && accounts.length > 0) {
                    setAddress(accounts[0]);
                } else {
                    disconnect();
                }
            };

            const handleChainChanged = () => {
                window.location.reload();
            };

            const handleDisconnect = (error: {
                code: number;
                message: string;
            }) => {
                console.log(error);
                disconnect();
            };

            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);
            window.ethereum.on('disconnect', handleDisconnect);

            return () => {
                if (window.ethereum.removeListener) {
                    window.ethereum.removeListener(
                        'accountsChanged',
                        handleAccountsChanged
                    );
                    window.ethereum.removeListener(
                        'chainChanged',
                        handleChainChanged
                    );
                    window.ethereum.removeListener(
                        'disconnect',
                        handleDisconnect
                    );
                }
            };
        } else {
            enqueueSnackbar(
                'No Metamask extension detected. Please install Metamask to continue.',
                {
                    variant: 'error',
                }
            );
        }
        return () => {};
    }, [disconnect, enqueueSnackbar, setAddress]);

    return (
        <WalletContext.Provider value={contextValue}>
            {children}
        </WalletContext.Provider>
    );
};

export default WalletContextProvider;
