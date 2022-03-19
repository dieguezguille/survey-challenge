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
            <Stack>
                <h1>Welcome!</h1>
                <h2>Your current balance is: {balance} $QUIZ</h2>
            </Stack>
        </Container>
    );
};

export default MainView;
