import { Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import { SurveyContext } from '../../context/survey.context';

const OverviewView: React.FC = () => {
    const { survey } = useContext(SurveyContext);
    return (
        <Container>
            <Stack alignItems="center">
                <h2>
                    Overview: <i>&apos;{survey?.title}&apos;</i>
                </h2>
            </Stack>
            <Stack spacing={2}>
                {survey?.questions.map((question, index) => (
                    <Paper key={index} sx={{ padding: '15px' }}>
                        <Stack spacing={1}>
                            <Typography variant="h6">
                                Question: {question.text}
                            </Typography>
                            <Typography variant="body1">
                                Answer:{' '}
                                {question.answerId && question.answerId !== 0
                                    ? question.options[question.answerId]
                                    : 'No answer'}
                            </Typography>
                        </Stack>
                    </Paper>
                ))}
            </Stack>
        </Container>
    );
};

export default OverviewView;
