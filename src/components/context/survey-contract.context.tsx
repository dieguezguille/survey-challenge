import { Contract } from 'ethers';
import React, { createContext, Dispatch, useMemo, useState } from 'react';

type SurveyContractContextType = {
    balance: number;
    setBalance: Dispatch<React.SetStateAction<number>>;
    contract: Contract | undefined;
    setContract: Dispatch<React.SetStateAction<Contract | undefined>>;
};

const defaultValues: SurveyContractContextType = {
    balance: 0,
    setBalance: () => {},
    contract: undefined,
    setContract: () => {},
};

export const SurveyContractContext = createContext(defaultValues);

const SurveyContractProvider: React.FC = ({ children }) => {
    const [balance, setBalance] = useState<number>(defaultValues.balance);
    const [contract, setContract] = useState<Contract | undefined>(undefined);

    const contextValue: SurveyContractContextType = useMemo(
        () => ({
            balance,
            setBalance,
            contract,
            setContract,
        }),
        [balance, contract]
    );

    return (
        <SurveyContractContext.Provider value={contextValue}>
            {children}
        </SurveyContractContext.Provider>
    );
};

export default SurveyContractProvider;
