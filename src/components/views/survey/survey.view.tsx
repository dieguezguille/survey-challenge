import Container from '@mui/material/Container';
import { useContext, useEffect } from 'react';
import { SurveyContext } from '../../context/survey.context';

import { useCallback } from 'react';
import Question from '../../common/question/question';

const SurveyView: React.FC = () => {
    const { startSurvey, isSurveyStarted, currentQuestion, getNextQuestion } =
        useContext(SurveyContext);

    const handleNextQuestion = useCallback(() => {
        getNextQuestion();
    }, [getNextQuestion]);

    useEffect(() => {
        startSurvey();
    }, [startSurvey]);

    useEffect(() => {
        if (isSurveyStarted) {
            handleNextQuestion();
        }
    }, [getNextQuestion, handleNextQuestion, isSurveyStarted]);

    return (
        <Container>
            {currentQuestion && isSurveyStarted && (
                <Question question={currentQuestion} />
            )}
        </Container>
    );
};

export default SurveyView;
