import { Contract, ethers } from 'ethers';
import { useSnackbar } from 'notistack';
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import contractAbi from '../../abis/survey.json';
import { getSurvey } from '../../adapters/survey.adapter';
import { ISurvey, ISurveyQuestion } from '../../models/survey.model';
import { AppContext } from './app.context';
import { WalletContext } from './wallet.context';

type SurveyContextType = {
    balance: number;
    getBalance: () => Promise<void>;
    survey: ISurvey | undefined;
    getDailySurvey: () => Promise<void>;
    isSurveyStarted: boolean;
    startSurvey: () => void;
    currentQuestion: ISurveyQuestion | undefined;
    getNextQuestion: () => void;
};

const defaultValues: SurveyContextType = {
    balance: 0,
    getBalance: async () => {},
    survey: undefined,
    getDailySurvey: async () => {},
    isSurveyStarted: false,
    startSurvey: () => {},
    currentQuestion: undefined,
    getNextQuestion: () => {},
};

export const SurveyContext = createContext(defaultValues);

const SurveyContextProvider: React.FC = ({ children }) => {
    const { setIsLoading } = useContext(AppContext);
    const { address, provider } = useContext(WalletContext);
    const { enqueueSnackbar } = useSnackbar();

    const [balance, setBalance] = useState<number>(defaultValues.balance);
    const [contract, setContract] = useState<Contract | undefined>(undefined);
    const [survey, setSurvey] = useState<ISurvey | undefined>(undefined);
    const [isSurveyStarted, setIsSurveyStarted] = useState<boolean>(
        defaultValues.isSurveyStarted
    );
    const [currentQuestion, setCurrentQuestion] = useState<
        ISurveyQuestion | undefined
    >(undefined);

    const getNextQuestion = useCallback(() => {
        setIsLoading(true);
        try {
            if (survey) {
                setCurrentQuestion(
                    (prevQuestion) =>
                        survey.questions[
                            prevQuestion
                                ? survey.questions.indexOf(prevQuestion) + 1
                                : 0
                        ]
                );
            }
        } catch (error) {
            enqueueSnackbar('Failed to get next question', {
                variant: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    }, [enqueueSnackbar, setIsLoading, survey]);

    const getDailySurvey = useCallback(async () => {
        setIsLoading(true);
        try {
            const result: ISurvey = await getSurvey();
            setSurvey(result);
        } catch (error) {
            enqueueSnackbar('Failed to get daily survey.', {
                variant: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    }, [enqueueSnackbar, setIsLoading]);

    const startSurvey = () => {
        setIsSurveyStarted(true);
    };

    const getBalance = useCallback(async () => {
        setIsLoading(true);
        try {
            if (contract && address) {
                const result = await contract.balanceOf(address);
                const newBalance = ethers.utils.formatUnits(result, 18);
                setBalance(parseFloat(newBalance));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [address, contract, setIsLoading]);

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

    const contextValue = useMemo(
        () => ({
            balance,
            getBalance,
            setBalance,
            contract,
            survey,
            getDailySurvey,
            isSurveyStarted,
            startSurvey,
            currentQuestion,
            getNextQuestion,
        }),
        [
            balance,
            contract,
            currentQuestion,
            getBalance,
            getDailySurvey,
            isSurveyStarted,
            survey,
            getNextQuestion,
        ]
    );

    return (
        <SurveyContext.Provider value={contextValue}>
            {children}
        </SurveyContext.Provider>
    );
};

export default SurveyContextProvider;
