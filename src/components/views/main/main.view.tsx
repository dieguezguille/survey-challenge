import { Paper, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import { useContext, useEffect } from 'react';
import { SurveyContext } from '../../context/survey.context';

const MainView: React.FC = () => {
    const { balance, getBalance } = useContext(SurveyContext);

    useEffect(() => {
        getBalance();
    }, [getBalance]);

    return (
        <Container>
            <Stack alignItems="center">
                <h1>Welcome!</h1>
                <div>
                    Your current <strong>$QUIZ</strong> balance is
                </div>
                <Paper
                    elevation={4}
                    sx={{
                        padding: '0px 10px',
                        borderRadius: '50px',
                        minWidth: '200px',
                        marginTop: '2em',
                    }}
                >
                    <Stack alignItems="center">
                        <h2>
                            <strong>{balance} $QUIZ</strong>
                        </h2>
                    </Stack>
                </Paper>
            </Stack>
        </Container>
    );
};

export default MainView;
