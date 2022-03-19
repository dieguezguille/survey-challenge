import { Box, Button, Paper, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import { useContext, useEffect } from 'react';
import { SurveyContext } from '../../context/survey.context';
import Image from 'mui-image';

const MainView: React.FC = () => {
    const { balance, getBalance, getDailySurvey, survey } =
        useContext(SurveyContext);

    useEffect(() => {
        getBalance();
        getDailySurvey();
    }, [getBalance, getDailySurvey]);

    return (
        <Container sx={{ padding: '20px' }}>
            <Stack spacing={6}>
                <Stack direction="row" alignItems="center">
                    <div>
                        <strong>Welcome!</strong> Your current
                        <strong> $QUIZ</strong> balance is
                    </div>
                    <Paper
                        elevation={4}
                        sx={{
                            padding: '5px',
                            borderRadius: '50px',
                            minWidth: '120px',
                            marginLeft: '0.5em',
                        }}
                    >
                        <Stack alignItems="center">
                            <strong>{balance} $QUIZ</strong>
                        </Stack>
                    </Paper>
                </Stack>
                {survey && (
                    <Stack alignItems="center" spacing={4}>
                        <h2>
                            Today&apos;s survey is called{' '}
                            <i>&apos;{survey.title}&apos;</i>
                        </h2>
                        <Box
                            sx={{
                                maxWidth: '30%',
                                maxHeight: '30%',
                            }}
                        >
                            <Image src={survey.image} showLoading />
                        </Box>
                        <Button color="secondary" variant="outlined">
                            Begin Answering
                        </Button>
                    </Stack>
                )}
            </Stack>
        </Container>
    );
};

export default MainView;
