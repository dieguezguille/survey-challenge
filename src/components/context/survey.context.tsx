import { Contract } from 'ethers';
import React, { createContext, Dispatch, useMemo, useState } from 'react';

type SurveyContextType = {
    balance: number;
    setBalance: Dispatch<React.SetStateAction<number>>;
    contract: Contract | undefined;
    setContract: Dispatch<React.SetStateAction<Contract | undefined>>;
};

const defaultValues: SurveyContextType = {
    balance: 0,
    setBalance: () => {},
    contract: undefined,
    setContract: () => {},
};

export const SurveyContext = createContext(defaultValues);

const SurveyContextProvider: React.FC = ({ children }) => {
    const [balance, setBalance] = useState<number>(defaultValues.balance);
    const [contract, setContract] = useState<Contract | undefined>(undefined);

    const contextValue: SurveyContextType = useMemo(
        () => ({
            balance,
            setBalance,
            contract,
            setContract,
        }),
        [balance, contract]
    );

    return (
        <SurveyContext.Provider value={contextValue}>
            {children}
        </SurveyContext.Provider>
    );
};

export default SurveyContextProvider;
