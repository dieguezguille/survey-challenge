import Container from '@mui/material/Container';
import { useContext, useEffect } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutesEnum } from '../../../enums/routes.enum';
import Question from '../../common/question/question';
import { SurveyContext } from '../../context/survey.context';

const SurveyView: React.FC = () => {
    const navigate = useNavigate();
    const {
        startSurvey,
        isSurveyStarted,
        isSurveyFinished,
        currentQuestion,
        getNextQuestion,
    } = useContext(SurveyContext);

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

    useEffect(() => {
        if (isSurveyFinished) navigate(RoutesEnum.OVERVIEW, { replace: true });
    });

    return (
        <Container>
            {currentQuestion && isSurveyStarted && (
                <Question
                    question={currentQuestion}
                    onNextQuestion={handleNextQuestion}
                />
            )}
        </Container>
    );
};

export default SurveyView;
