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
import { ISurvey } from '../../models/survey.model';
import { ITransferEvent } from '../../models/transfer-event.model';
import { AppContext } from './app.context';
import { WalletContext } from './wallet.context';

type SurveyContextType = {
    balance: number;
    survey: ISurvey | undefined;
    getDailySurvey: () => Promise<void>;
    startSurvey: () => void;
    getNextQuestion: () => void;
    saveAnswer: (surveyId: number, answerId: number) => void;
    submitSurvey: () => void;
};

const defaultValues: SurveyContextType = {
    balance: 0,
    survey: undefined,
    getDailySurvey: async () => {},
    startSurvey: () => {},
    getNextQuestion: () => {},
    saveAnswer: () => {},
    submitSurvey: () => {},
};

export const SurveyContext = createContext(defaultValues);

const { REACT_APP_CONTRACT_ADDRESS } = process.env;

const SurveyContextProvider: React.FC = ({ children }) => {
    const {
        setIsLoading,
        surveyResult,
        setSurveyResult,
        setIsSurveyFinished,
        setIsSurveyStarted,
        setCurrentQuestion,
    } = useContext(AppContext);
    const { enqueueSnackbar } = useSnackbar();
    const { address, provider } = useContext(WalletContext);

    const [balance, setBalance] = useState<number>(defaultValues.balance);
    const [contract, setContract] = useState<Contract | undefined>(undefined);
    const [survey, setSurvey] = useState<ISurvey | undefined>(undefined);

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
        setIsLoading,
        contract,
        surveyResult,
        handleTransactionReceipt,
        enqueueSnackbar,
    ]);

    const saveAnswer = useCallback(
        (surveyId: number, answerId: number) => {
            setSurveyResult((previousState) => {
                if (!previousState) {
                    return { surveyId: surveyId, answerIds: [answerId] };
                }
                return {
                    ...previousState,
                    answerIds: [...previousState.answerIds, answerId],
                };
            });
        },
        [setSurveyResult]
    );

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
            enqueueSnackbar(
                'Failed to get next question. See console for details.',
                {
                    variant: 'error',
                }
            );
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [
        enqueueSnackbar,
        setCurrentQuestion,
        setIsLoading,
        setIsSurveyFinished,
        survey,
    ]);

    const getDailySurvey = useCallback(async () => {
        setIsLoading(true);
        try {
            const result: ISurvey = await getSurvey();
            setSurvey(result);
        } catch (error) {
            enqueueSnackbar(
                'Failed to get daily survey. See console for details.',
                {
                    variant: 'error',
                }
            );
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [enqueueSnackbar, setIsLoading]);

    const startSurvey = useCallback(() => {
        setIsSurveyStarted(true);
    }, [setIsSurveyStarted]);

    const loadContract = useCallback(async () => {
        setIsLoading(true);
        try {
            if (REACT_APP_CONTRACT_ADDRESS) {
                setContract(
                    await new ethers.Contract(
                        REACT_APP_CONTRACT_ADDRESS,
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

    useEffect(() => {
        if (!contract) {
            loadContract();
        } else {
            getBalance();
        }
    }, [contract, enqueueSnackbar, getBalance, loadContract]);

    useEffect(() => {
        if (address && contract) {
            getBalance();
        }
    }, [address, contract, getBalance]);

    const contextValue: SurveyContextType = useMemo(
        () => ({
            balance,
            setBalance,
            contract,
            survey,
            getDailySurvey,
            startSurvey,
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
            startSurvey,
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
