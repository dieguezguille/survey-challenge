import { Button, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';

import Balance from '../../common/balance/balance';
import { AppContext } from '../../context/app.context';
import { SurveyContext } from '../../context/survey.context';

const OverviewView: React.FC = () => {
    const { surveyResult } = useContext(AppContext);
    const { survey, submitSurvey } = useContext(SurveyContext);

    const handleSurveySubmit = () => {
        submitSurvey();
    };

    return (
        <Container>
            <Stack alignItems="center" spacing={4}>
                <Balance currencyName="QUIZ" />
                <h2>
                    Overview: <i>&apos;{survey?.title}&apos;</i>
                </h2>
                <Stack spacing={2}>
                    {survey?.questions.map((question, index) => (
                        <Paper key={index} sx={{ padding: '15px' }}>
                            <Stack spacing={1}>
                                <Typography variant="h6">
                                    Question: {question.text}
                                </Typography>
                                <Typography variant="body1">
                                    Answer:{' '}
                                    {surveyResult &&
                                    surveyResult.answerIds[index] > 0
                                        ? question.options[
                                              surveyResult.answerIds[index] - 1
                                          ].text
                                        : 'No answer'}
                                </Typography>
                            </Stack>
                        </Paper>
                    ))}
                </Stack>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleSurveySubmit}
                >
                    Submit Survey
                </Button>
            </Stack>
        </Container>
    );
};

export default OverviewView;
