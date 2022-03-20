import Container from '@mui/material/Container';
import { useContext, useEffect } from 'react';
import { SurveyContext } from '../../context/survey.context';

import { useCallback } from 'react';
import Question from '../../common/question/question';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../enums/routes.enum';

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
        if (isSurveyFinished) navigate(RoutesEnum.RESULTS, { replace: true });
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
