import Container from '@mui/material/Container';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '../../../contexts/app.context';
import { RoutesEnum } from '../../../enums/routes.enum';
import Question from '../../common/question/question';

const SurveyView: React.FC = () => {
    const navigate = useNavigate();
    const { currentQuestion, isSurveyFinished, getNextQuestion } =
        useContext(AppContext);

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
