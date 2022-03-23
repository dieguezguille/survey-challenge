import { AppContextType } from '../../contexts/app.context';

export const appContext: AppContextType = {
    isLoading: false,
    setIsLoading: jest.fn(),
    surveyResult: undefined,
    isSurveyFinished: false,
    currentQuestion: undefined,
    survey: undefined,
    getDailySurvey: jest.fn(),
    getNextQuestion: jest.fn(),
    saveAnswer: jest.fn(),
};
