import { Stack } from '@mui/material';
import Container from '@mui/material/Container';
import { useContext, useEffect } from 'react';
import { QuizContext } from '../../context/quiz.context';

const MainView: React.FC = () => {
    const { balance, getBalance } = useContext(QuizContext);

    useEffect(() => {
        getBalance();
    }, [getBalance]);

    return (
        <Container>
            <Stack alignItems="center">
                <h1>Welcome!</h1>
                <div>Your current balance is:</div>
                <h4>
                    <b>{balance} $QUIZ</b>
                </h4>
            </Stack>
        </Container>
    );
};

export default MainView;
