import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import { SurveyContext } from '../../context/survey.context';

const OverviewView: React.FC = () => {
    const { survey } = useContext(SurveyContext);
    return (
        <Container>
            <h2>Overview</h2>
            <Stack alignItems="center">
                <h2>
                    <i>&apos;{survey?.title}&apos;</i>
                </h2>
            </Stack>
            <Stack>
                {survey?.questions.map((question, index) => (
                    <Stack key={index}>
                        <Typography>{question.text}</Typography>
                        {/* <ul>
                            {question.answers.map((answer, index) => (
                                <li key={index}>{answer}</li>
                            ))}
                        </ul> */}
                    </Stack>
                ))}
            </Stack>
        </Container>
    );
};

export default OverviewView;
