import { useSnackbar } from 'notistack';
import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useCallback,
    useState,
} from 'react';

import { getSurvey } from '../adapters/survey.adapter';
import { ISurvey, ISurveyQuestion } from '../models/survey.model';
import { ISurveyResult } from '../models/survey-result.model';

export type AppContextType = {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    surveyResult: ISurveyResult | undefined;
    isSurveyFinished: boolean;
    currentQuestion: ISurveyQuestion | undefined;
    survey: ISurvey | undefined;
    getDailySurvey: () => Promise<void>;
    getNextQuestion: () => void;
    saveAnswer: (surveyId: number, answerId: number) => void;
};

const defaultValues: AppContextType = {
    isLoading: false,
    setIsLoading: () => {},
    surveyResult: undefined,
    isSurveyFinished: false,
    currentQuestion: undefined,
    survey: undefined,
    getDailySurvey: async () => {},
    getNextQuestion: () => {},
    saveAnswer: () => {},
};
export const AppContext = createContext(defaultValues);

const AppProvider: React.FC = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();

    const [isLoading, setIsLoading] = useState<boolean>(
        defaultValues.isLoading
    );
    const [survey, setSurvey] = useState<ISurvey | undefined>(undefined);
    const [surveyResult, setSurveyResult] = useState<ISurveyResult | undefined>(
        undefined
    );
    const [currentQuestion, setCurrentQuestion] = useState<
        ISurveyQuestion | undefined
    >(undefined);
    const [isSurveyFinished, setIsSurveyFinished] = useState<boolean>(false);

    const getDailySurvey = useCallback(async () => {
        setIsLoading(true);
        try {
            const dailySurvey: ISurvey = await getSurvey();
            setSurvey(dailySurvey);
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
    }, [enqueueSnackbar]);

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
                    index === 0 && setIsSurveyFinished(true);
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
    }, [enqueueSnackbar, survey]);

    const contextValue: AppContextType = {
        isLoading,
        setIsLoading,
        surveyResult,
        isSurveyFinished,
        currentQuestion,
        survey,
        getDailySurvey,
        getNextQuestion,
        saveAnswer,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
