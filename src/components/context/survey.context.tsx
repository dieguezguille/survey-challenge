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
import {
    ISurvey,
    ISurveyAnswers,
    ISurveyQuestion,
} from '../../models/survey.model';
import { AppContext } from './app.context';
import { WalletContext } from './wallet.context';

type SurveyContextType = {
    balance: number;
    getBalance: () => Promise<void>;
    survey: ISurvey | undefined;
    getDailySurvey: () => Promise<void>;
    isSurveyStarted: boolean;
    isSurveyFinished: boolean;
    startSurvey: () => void;
    currentQuestion: ISurveyQuestion | undefined;
    getNextQuestion: () => void;
    answers: ISurveyAnswers | undefined;
    saveAnswer: (surveyId: number, answerId: number) => void;
    submitSurvey: () => void;
};

const defaultValues: SurveyContextType = {
    balance: 0,
    getBalance: async () => {},
    survey: undefined,
    getDailySurvey: async () => {},
    isSurveyStarted: false,
    isSurveyFinished: false,
    startSurvey: () => {},
    currentQuestion: undefined,
    getNextQuestion: () => {},
    answers: undefined,
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
    const [answers, setAnswers] = useState<ISurveyAnswers | undefined>(
        undefined
    );

    const submitSurvey = useCallback(async () => {
        setIsLoading(true);
        try {
            if (contract && answers) {
                const result = await contract.submit(
                    answers.surveyId,
                    answers.answerIds
                );
                if (result) {
                    console.log(result);
                    enqueueSnackbar('Answers submitted.', {
                        variant: 'success',
                    });
                }
            }
        } catch (error) {
            enqueueSnackbar('Error submitting survey.', {
                variant: 'error',
            });
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [answers, contract, enqueueSnackbar, setIsLoading]);

    const saveAnswer = useCallback((surveyId: number, answerId: number) => {
        setAnswers((previousState) => {
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
            enqueueSnackbar('Error getting token balance.', {
                variant: 'error',
            });
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [address, contract, enqueueSnackbar, setIsLoading]);

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

    useEffect(() => {
        console.log(answers);
    }, [answers]);

    const contextValue: SurveyContextType = useMemo(
        () => ({
            balance,
            getBalance,
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
            answers,
            submitSurvey,
        }),
        [
            balance,
            getBalance,
            contract,
            survey,
            getDailySurvey,
            isSurveyStarted,
            isSurveyFinished,
            currentQuestion,
            getNextQuestion,
            saveAnswer,
            answers,
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
