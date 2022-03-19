import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useState,
} from 'react';

type WalletContextProps = {
    isConnected: boolean;
    setIsConnected: Dispatch<SetStateAction<boolean>>;
};

const defaultValues: WalletContextProps = {
    isConnected: false,
    setIsConnected: () => {},
};
export const WalletContext = createContext(defaultValues);

const WalletContextProvider: React.FC = ({ children }) => {
    const [isConnected, setIsConnected] = useState<boolean>(
        defaultValues.isConnected
    );

    const contextValue = {
        isConnected,
        setIsConnected,
    };

    return (
        <WalletContext.Provider value={contextValue}>
            {children}
        </WalletContext.Provider>
    );
};

export default WalletContextProvider;
