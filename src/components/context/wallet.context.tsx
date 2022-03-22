import { ethers } from 'ethers';
import { useSnackbar } from 'notistack';
import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

import { MetamaskCommands } from '../../enums/metamask-commands.enum';
import { MetamaskEvents } from '../../enums/metamask-events.enum';
import useMetamaskUtils from '../../hooks/metamask-utils.hook';
import { AppContext } from './app.context';

type WalletContextType = {
    isConnected: boolean;
    setIsConnected: Dispatch<SetStateAction<boolean>>;
    address: string | undefined;
    setAddress: Dispatch<SetStateAction<string | undefined>>;
    provider: ethers.providers.Web3Provider | undefined;
    setProvider: Dispatch<
        React.SetStateAction<ethers.providers.Web3Provider | undefined>
    >;
    isInvalidChain: boolean;
    setIsInvalidChain: Dispatch<SetStateAction<boolean>>;
    requestChainSwitch: () => Promise<void>;
    connect: () => void;
    disconnect: () => void;
};

const defaultValues: WalletContextType = {
    isConnected: false,
    setIsConnected: () => {},
    address: undefined,
    setAddress: () => {},
    provider: undefined,
    setProvider: () => {},
    isInvalidChain: false,
    setIsInvalidChain: () => {},
    requestChainSwitch: async () => {},
    connect: () => {},
    disconnect: () => {},
};

export const WalletContext = createContext(defaultValues);

const { REACT_APP_CHAIN_ID, REACT_APP_CHAIN_NUMBER, REACT_APP_CHAIN_RPC_URL } =
    process.env;

const WalletContextProvider: React.FC = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { isMetamaskError } = useMetamaskUtils();
    const { setIsLoading } = useContext(AppContext);

    const [isConnected, setIsConnected] = useState<boolean>(
        defaultValues.isConnected
    );

    const [address, setAddress] = useState<string | undefined>(
        defaultValues.address
    );

    const [provider, setProvider] = useState<
        ethers.providers.Web3Provider | undefined
    >(defaultValues.provider);

    const [isInvalidChain, setIsInvalidChain] = useState<boolean>(
        defaultValues.isInvalidChain
    );

    const disconnect = useCallback(() => {
        setIsLoading(true);
        try {
            setIsConnected(false);
            setAddress(undefined);
            enqueueSnackbar('Disconnected from Metamask', { variant: 'info' });
        } catch (error) {
            enqueueSnackbar('Unable to disconnect from Metamask', {
                variant: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    }, [enqueueSnackbar, setIsLoading]);

    const checkChain = useCallback(async () => {
        setIsLoading(true);
        try {
            if (!provider) return;
            const network = await provider.getNetwork();
            const chain = network.chainId;
            if (chain && chain.toString() !== REACT_APP_CHAIN_NUMBER) {
                enqueueSnackbar(
                    'Unsupported chain detected. Make sure to be connected to Ropsten Network',
                    { variant: 'error' }
                );
                setIsInvalidChain(true);
                disconnect();
            } else {
                setIsInvalidChain(false);
            }
        } catch (error) {
            enqueueSnackbar('Error validating current network', {
                variant: 'error',
            });
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [disconnect, enqueueSnackbar, provider, setIsLoading]);

    const requestChainSwitch = useCallback(async () => {
        setIsLoading(true);
        try {
            await provider?.send(MetamaskCommands.SWITCH_CHAIN, [
                {
                    chainId: REACT_APP_CHAIN_ID,
                },
            ]);
        } catch (error) {
            if (isMetamaskError(error) && error.code === 4902) {
                try {
                    await provider?.send(MetamaskCommands.ADD_CHAIN, [
                        {
                            chainId: REACT_APP_CHAIN_ID,
                            rpcUrl: REACT_APP_CHAIN_RPC_URL,
                        },
                    ]);
                } catch (error) {
                    enqueueSnackbar(
                        'Unable to add Ropsten Testnet to Metamask',
                        { variant: 'error' }
                    );
                    console.log(error);
                }
            } else {
                enqueueSnackbar('Operation failed', { variant: 'error' });
                console.log(error);
            }
        } finally {
            setIsLoading(false);
        }
    }, [enqueueSnackbar, isMetamaskError, provider, setIsLoading]);

    const connect = useCallback(async () => {
        setIsLoading(true);
        try {
            if (provider) {
                checkChain();
                const result = await provider.send(
                    MetamaskCommands.REQUEST_ACCOUNTS,
                    []
                );
                if (result && result.length > 0) {
                    setAddress(result[0]);
                    setIsConnected(true);
                    enqueueSnackbar('Connected to Metamask', {
                        variant: 'info',
                    });
                }
            } else {
                enqueueSnackbar('No Ethereum provider detected.', {
                    variant: 'error',
                });
            }
        } catch (error) {
            enqueueSnackbar('Unable to connect to Metamask.', {
                variant: 'error',
            });
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [checkChain, enqueueSnackbar, provider, setIsLoading]);

    const contextValue = {
        isConnected,
        setIsConnected,
        address,
        setAddress,
        provider,
        setProvider,
        isInvalidChain,
        setIsInvalidChain,
        requestChainSwitch,
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

            const handleChainChanged = async () => {
                window.location.reload();
            };

            const handleDisconnect = (error: {
                code: number;
                message: string;
            }) => {
                console.log(error);
                disconnect();
            };

            window.ethereum.on(
                MetamaskEvents.ACCOUNTS_CHANGED,
                handleAccountsChanged
            );
            window.ethereum.on(
                MetamaskEvents.CHAIN_CHANGED,
                handleChainChanged
            );
            window.ethereum.on(MetamaskEvents.DISCONNECT, handleDisconnect);

            return () => {
                if (window.ethereum.removeListener) {
                    window.ethereum.removeListener(
                        MetamaskEvents.ACCOUNTS_CHANGED,
                        handleAccountsChanged
                    );
                    window.ethereum.removeListener(
                        MetamaskEvents.CHAIN_CHANGED,
                        handleChainChanged
                    );
                    window.ethereum.removeListener(
                        MetamaskEvents.DISCONNECT,
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
