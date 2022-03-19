import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useState,
} from 'react';

type AppContextProps = {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const defaultValues: AppContextProps = {
    isLoading: false,
    setIsLoading: () => {},
};
export const AppContext = createContext(defaultValues);

const AppContextProvider: React.FC = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(
        defaultValues.isLoading
    );

    const contextValue = {
        isLoading,
        setIsLoading,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
