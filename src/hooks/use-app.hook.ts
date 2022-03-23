import { useSnackbar } from 'notistack';
import { useCallback, useContext } from 'react';

import { getSurvey } from '../adapters/survey.adapter';
import { AppContext } from '../components/context/app.context';
import { ISurvey } from '../models/survey.model';

const useApp = () => {
    const { enqueueSnackbar } = useSnackbar();
    const {
        isLoading,
        setIsLoading,
        currentQuestion,
        setCurrentQuestion,
        survey,
        setSurvey,
        isSurveyStarted,
        setIsSurveyStarted,
        isSurveyFinished,
        setIsSurveyFinished,
        surveyResult,
        setSurveyResult,
    } = useContext(AppContext);

    const showLoader = useCallback(() => {
        setIsLoading(true);
    }, [setIsLoading]);

    const hideLoader = useCallback(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    const startSurvey = useCallback(() => {
        setIsSurveyStarted(true);
    }, [setIsSurveyStarted]);

    const endSurvey = useCallback(() => {
        setIsSurveyFinished(true);
    }, [setIsSurveyFinished]);

    const getDailySurvey = useCallback(async () => {
        showLoader();
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
            hideLoader();
        }
    }, [enqueueSnackbar, hideLoader, setSurvey, showLoader]);

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
        showLoader();
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
                    index === 0 && endSurvey();
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
            hideLoader();
        }
    }, [
        endSurvey,
        enqueueSnackbar,
        hideLoader,
        setCurrentQuestion,
        showLoader,
        survey,
    ]);

    return {
        isLoading,
        showLoader,
        hideLoader,
        currentQuestion,
        getNextQuestion,
        isSurveyStarted,
        survey,
        startSurvey,
        endSurvey,
        getDailySurvey,
        isSurveyFinished,
        surveyResult,
        saveAnswer,
    };
};

export default useApp;
