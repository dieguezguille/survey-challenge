import { Contract, ContractTransaction, ethers } from 'ethers';
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
import { ISurveyResult } from '../../models/survey-result.model';
import { ISurvey, ISurveyQuestion } from '../../models/survey.model';
import { AppContext } from './app.context';
import { WalletContext } from './wallet.context';

type SurveyContextType = {
    balance: number;
    survey: ISurvey | undefined;
    getDailySurvey: () => Promise<void>;
    isSurveyStarted: boolean;
    isSurveyFinished: boolean;
    startSurvey: () => void;
    currentQuestion: ISurveyQuestion | undefined;
    getNextQuestion: () => void;
    surveyResult: ISurveyResult | undefined;
    saveAnswer: (surveyId: number, answerId: number) => void;
    submitSurvey: () => void;
};

const defaultValues: SurveyContextType = {
    balance: 0,
    survey: undefined,
    getDailySurvey: async () => {},
    isSurveyStarted: false,
    isSurveyFinished: false,
    startSurvey: () => {},
    currentQuestion: undefined,
    getNextQuestion: () => {},
    surveyResult: undefined,
    saveAnswer: () => {},
    submitSurvey: () => {},
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
    const [isSurveyFinished, setIsSurveyFinished] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<
        ISurveyQuestion | undefined
    >(undefined);
    const [surveyResult, setSurveyResult] = useState<ISurveyResult | undefined>(
        undefined
    );

    const submitSurvey = useCallback(async () => {
        setIsLoading(true);
        try {
            if (contract && surveyResult) {
                const tx: ContractTransaction = await contract.submit(
                    surveyResult.surveyId,
                    surveyResult.answerIds
                );
                if (tx) {
                    console.log(tx);
                    await tx.wait();
                    enqueueSnackbar('Survey submitted.', {
                        variant: 'success',
                    });
                }
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
    }, [surveyResult, contract, enqueueSnackbar, setIsLoading]);

    const saveAnswer = useCallback((surveyId: number, answerId: number) => {
        setSurveyResult((previousState) => {
            if (!previousState) {
                return { surveyId: surveyId, answerIds: [answerId] };
            }
            return {
                ...previousState,
                answerIds: [...previousState.answerIds, answerId],
            };
        });
    }, []);

    const getNextQuestion = useCallback(() => {
        setIsLoading(true);
        try {
            if (survey) {
                setCurrentQuestion((previousQuestion) => {
                    if (!previousQuestion) return survey.questions[0];
                    const prevIndex =
                        survey.questions.indexOf(previousQuestion);
                    const index =
                        prevIndex + 1 > 0 &&
                        prevIndex + 1 < survey.questions.length
                            ? prevIndex + 1
                            : 0;
                    setIsSurveyFinished(index === 0);
                    return survey.questions[index];
                });
            }
        } catch (error) {
            enqueueSnackbar('Failed to get next question.', {
                variant: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    }, [enqueueSnackbar, setIsLoading, survey]);

    const getBalance = useCallback(async () => {
        setIsLoading(true);
        try {
            if (contract && address) {
                const result = await contract.balanceOf(address);
                const newBalance = ethers.utils.formatUnits(result, 18);
                setBalance(parseFloat(newBalance));
            }
        } catch (error) {
            enqueueSnackbar('Error getting token balance.', {
                variant: 'error',
            });
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [address, contract, enqueueSnackbar, setIsLoading]);

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
            await getBalance();
        }
    }, [enqueueSnackbar, getBalance, setIsLoading]);

    const startSurvey = () => {
        setIsSurveyStarted(true);
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
        } else {
            getBalance();
        }
    }, [contract, getBalance, loadContract]);

    const contextValue: SurveyContextType = useMemo(
        () => ({
            balance,
            setBalance,
            contract,
            survey,
            getDailySurvey,
            isSurveyStarted,
            isSurveyFinished,
            startSurvey,
            currentQuestion,
            getNextQuestion,
            saveAnswer,
            surveyResult,
            submitSurvey,
        }),
        [
            balance,
            contract,
            survey,
            getDailySurvey,
            isSurveyStarted,
            isSurveyFinished,
            currentQuestion,
            getNextQuestion,
            saveAnswer,
            surveyResult,
            submitSurvey,
        ]
    );

    return (
        <SurveyContext.Provider value={contextValue}>
            {children}
        </SurveyContext.Provider>
    );
};

export default SurveyContextProvider;
