import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useState,
} from 'react';

import { ISurvey, ISurveyQuestion } from '../../models/survey.model';
import { ISurveyResult } from '../../models/survey-result.model';

type AppContextType = {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    isSurveyStarted: boolean;
    setIsSurveyStarted: Dispatch<SetStateAction<boolean>>;
    surveyResult: ISurveyResult | undefined;
    setSurveyResult: Dispatch<SetStateAction<ISurveyResult | undefined>>;
    isSurveyFinished: boolean;
    setIsSurveyFinished: Dispatch<SetStateAction<boolean>>;
    currentQuestion: ISurveyQuestion | undefined;
    setCurrentQuestion: Dispatch<SetStateAction<ISurveyQuestion | undefined>>;
    survey: ISurvey | undefined;
    setSurvey: Dispatch<React.SetStateAction<ISurvey | undefined>>;
};

const defaultValues: AppContextType = {
    isLoading: false,
    setIsLoading: () => {},
    isSurveyStarted: false,
    setIsSurveyStarted: () => {},
    surveyResult: undefined,
    setSurveyResult: () => {},
    isSurveyFinished: false,
    setIsSurveyFinished: () => {},
    currentQuestion: undefined,
    setCurrentQuestion: () => {},
    survey: undefined,
    setSurvey: () => {},
};
export const AppContext = createContext(defaultValues);

const AppProvider: React.FC = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(
        defaultValues.isLoading
    );
    const [isSurveyStarted, setIsSurveyStarted] = useState<boolean>(
        defaultValues.isSurveyStarted
    );

    const [survey, setSurvey] = useState<ISurvey | undefined>(undefined);

    const [surveyResult, setSurveyResult] = useState<ISurveyResult | undefined>(
        undefined
    );
    const [currentQuestion, setCurrentQuestion] = useState<
        ISurveyQuestion | undefined
    >(undefined);

    const [isSurveyFinished, setIsSurveyFinished] = useState<boolean>(false);

    const contextValue = {
        isLoading,
        setIsLoading,
        isSurveyStarted,
        setIsSurveyStarted,
        surveyResult,
        setSurveyResult,
        isSurveyFinished,
        setIsSurveyFinished,
        currentQuestion,
        setCurrentQuestion,
        survey,
        setSurvey,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
