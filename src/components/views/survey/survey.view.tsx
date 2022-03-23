import Container from '@mui/material/Container';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutesEnum } from '../../../enums/routes.enum';
import useApp from '../../../hooks/use-app.hook';
import Question from '../../common/question/question';

const SurveyView: React.FC = () => {
    const navigate = useNavigate();
    const { currentQuestion, isSurveyFinished, getNextQuestion } = useApp();

    useEffect(() => {
        getNextQuestion();
    }, [getNextQuestion]);

    useEffect(() => {
        if (isSurveyFinished) {
            navigate(RoutesEnum.OVERVIEW, { replace: true });
        }
    });

    return (
        <Container>
            {currentQuestion && (
                <Question
                    question={currentQuestion}
                    onNextQuestion={getNextQuestion}
                />
            )}
        </Container>
    );
};

export default SurveyView;
