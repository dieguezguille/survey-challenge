import Stack from '@mui/material/Stack';
import { ISurveyQuestion } from '../../../models/survey.model';
import Image from 'mui-image';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { SurveyImageWrapper } from '../../styled/survey-image-wrapper/survey-image-wrapper';

type QuestionProps = {
    question: ISurveyQuestion;
    onNextQuestion: () => void;
};

const Question: React.FC<QuestionProps> = ({ question, onNextQuestion }) => {
    const handleOptionClick = () => {
        // TODO: Save answer
        // Request next question
        onNextQuestion();
    };

    return (
        <Stack spacing={6}>
            <Stack alignItems="center" spacing={4}>
                <h2>
                    <i>{question.text}</i>
                </h2>
                <SurveyImageWrapper>
                    <Image src={question.image} showLoading />
                </SurveyImageWrapper>
                <div>Remaining time: {question.lifetimeSeconds} seconds</div>
            </Stack>
            <Stack>
                <Grid
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    container
                >
                    {question.options.map((option, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                onClick={handleOptionClick}
                            >
                                {option.text}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Stack>
    );
};

export default Question;
