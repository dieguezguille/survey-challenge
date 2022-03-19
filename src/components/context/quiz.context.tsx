import { Contract, ethers } from 'ethers';
import { useSnackbar } from 'notistack';
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import contractAbi from '../../abis/survey.json';
import { AppContext } from './app.context';
import { WalletContext } from './wallet.context';

type QuizContextProps = {
    balance: number;
    getBalance: () => Promise<void>;
};

const defaultValues: QuizContextProps = {
    balance: 0,
    getBalance: async () => {},
};

export const QuizContext = createContext(defaultValues);

const QuizContextProvider: React.FC = ({ children }) => {
    const { setIsLoading } = useContext(AppContext);
    const { address, provider } = useContext(WalletContext);
    const { enqueueSnackbar } = useSnackbar();
    const [balance, setBalance] = useState<number>(defaultValues.balance);
    const [contract, setContract] = useState<Contract | undefined>();

    const getBalance = async () => {
        setIsLoading(true);
        try {
            if (contract && address) {
                const result = await contract.balanceOf(address);
                const newBalance = await ethers.utils.formatUnits(result, 18);
                setBalance(parseFloat(newBalance));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadContract = useCallback(async () => {
        setIsLoading(true);
        try {
            const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
            if (contractAddress) {
                setContract(
                    await new ethers.Contract(
                        contractAddress,
                        contractAbi,
                        provider?.getSigner()
                    )
                );
            } else {
                enqueueSnackbar('No contract address detected.', {
                    variant: 'error',
                });
            }
        } catch (error) {
            enqueueSnackbar('Load contract operation failed.', {
                variant: 'error',
            });
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [enqueueSnackbar, provider, setIsLoading]);

    useEffect(() => {
        if (!contract) {
            loadContract();
        }
    }, [contract, loadContract]);

    const contextValue = {
        balance,
        getBalance,
        setBalance,
        contract,
    };

    return (
        <QuizContext.Provider value={contextValue}>
            {children}
        </QuizContext.Provider>
    );
};

export default QuizContextProvider;
