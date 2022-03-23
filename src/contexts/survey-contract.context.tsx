import { Contract, ContractTransaction, ethers } from 'ethers';
import { useSnackbar } from 'notistack';
import React, {
    createContext,
    Dispatch,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

import abi from '../abis/survey-contract.json';
import { ITransferEvent } from '../models/transfer-event.model';
import { AppContext } from './app.context';
import { WalletContext } from './wallet.context';

type SurveyContractContextType = {
    balance: number;
    setBalance: Dispatch<React.SetStateAction<number>>;
    contract: Contract | undefined;
    setContract: Dispatch<React.SetStateAction<Contract | undefined>>;
    submitSurvey: () => Promise<void>;
};

const defaultValues: SurveyContractContextType = {
    balance: 0,
    setBalance: () => {},
    contract: undefined,
    setContract: () => {},
    submitSurvey: async () => {},
};

export const SurveyContractContext = createContext(defaultValues);

const { REACT_APP_CONTRACT_ADDRESS } = process.env;

const SurveyContractProvider: React.FC = ({ children }) => {
    const { surveyResult, setIsLoading } = useContext(AppContext);
    const { address, provider } = useContext(WalletContext);
    const { enqueueSnackbar } = useSnackbar();

    const [balance, setBalance] = useState<number>(defaultValues.balance);
    const [contract, setContract] = useState<Contract | undefined>(undefined);

    const loadContract = useCallback(async () => {
        setIsLoading(true);
        try {
            if (REACT_APP_CONTRACT_ADDRESS) {
                setContract(
                    await new ethers.Contract(
                        REACT_APP_CONTRACT_ADDRESS,
                        abi,
                        provider?.getSigner()
                    )
                );
            } else {
                enqueueSnackbar('No contract address detected.', {
                    variant: 'error',
                });
            }
        } catch (error) {
            enqueueSnackbar(
                'Load contract operation failed. See console for details.',
                {
                    variant: 'error',
                }
            );
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [enqueueSnackbar, provider, setIsLoading]);

    const getBalance = useCallback(async () => {
        setIsLoading(true);
        try {
            if (contract && address) {
                const result = await contract.balanceOf(address);
                const newBalance = ethers.utils.formatUnits(result, 18);
                setBalance(parseFloat(newBalance));
            }
        } catch (error) {
            enqueueSnackbar(
                'Error getting token balance. See console for details.',
                {
                    variant: 'error',
                }
            );
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [address, contract, enqueueSnackbar, setIsLoading]);

    const handleTransactionReceipt = useCallback(
        async (transactionReceipt: ethers.ContractReceipt) => {
            const transferEvent = transactionReceipt.events?.find(
                (event) => event.event === 'Transfer'
            );

            if (transferEvent && transferEvent.args) {
                const eventArgs: ITransferEvent = {
                    from: transferEvent.args['from'],
                    to: transferEvent.args['to'],
                    value: transferEvent.args['value'],
                };

                if (eventArgs.from === ethers.constants.AddressZero) {
                    const tokensReceived = parseInt(
                        ethers.utils.formatUnits(eventArgs.value)
                    );
                    enqueueSnackbar(
                        `Received ${tokensReceived} ${
                            tokensReceived > 1 ? 'tokens' : 'token'
                        }!`,
                        {
                            variant: 'success',
                        }
                    );
                    await getBalance();
                }
            }
        },
        [enqueueSnackbar, getBalance]
    );

    const submitSurvey = useCallback(async () => {
        setIsLoading(true);
        try {
            if (contract && surveyResult) {
                const transaction: ContractTransaction = await contract.submit(
                    surveyResult.surveyId,
                    surveyResult.answerIds
                );
                const transactionReceipt = await transaction.wait();
                handleTransactionReceipt(transactionReceipt);
            }
        } catch (error) {
            enqueueSnackbar(
                'Error submitting survey. See console for details.',
                {
                    variant: 'error',
                }
            );
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [
        contract,
        enqueueSnackbar,
        handleTransactionReceipt,
        setIsLoading,
        surveyResult,
    ]);

    const contextValue = {
        balance,
        setBalance,
        contract,
        setContract,
        submitSurvey,
    };

    useEffect(() => {
        if (!contract) {
            loadContract();
        } else {
            getBalance();
        }
    }, [contract, getBalance, loadContract]);

    return (
        <SurveyContractContext.Provider value={contextValue}>
            {children}
        </SurveyContractContext.Provider>
    );
};

export default SurveyContractProvider;
