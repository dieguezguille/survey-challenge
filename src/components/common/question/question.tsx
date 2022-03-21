import Stack from '@mui/material/Stack';
import { ISurveyQuestion } from '../../../models/survey.model';
import Image from 'mui-image';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { SurveyImageWrapper } from '../../styled/survey-image-wrapper/survey-image-wrapper';
import { LinearProgress, Typography } from '@mui/material';
import { useCallback, useContext, useEffect, useState } from 'react';
import { SurveyContext } from '../../context/survey.context';

type QuestionProps = {
    question: ISurveyQuestion;
    onNextQuestion: () => void;
};

const Question: React.FC<QuestionProps> = ({ question, onNextQuestion }) => {
    const { saveAnswer } = useContext(SurveyContext);
    const [remainingTime, setRemainingTime] = useState<number>(
        question.lifetimeSeconds
    );

    const [progress, setProgress] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<number>();

    const handleOptionClick = useCallback(
        (answerId: number) => {
            window.clearInterval(intervalId);
            saveAnswer(1, answerId);
            onNextQuestion();
        },
        [intervalId, onNextQuestion, saveAnswer]
    );

    useEffect(() => {
        const timer = window.setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    window.clearInterval(timer);
                    return 100;
                }
                const diff = 100 / question.lifetimeSeconds;
                return Math.min(oldProgress + diff, 100);
            });
            setRemainingTime((oldRemainingTime) =>
                oldRemainingTime > 0 ? oldRemainingTime - 1 : 0
            );
        }, 1000);
        setIntervalId(timer);
        return () => {
            window.clearInterval(timer);
        };
    }, [onNextQuestion, question]);

    useEffect(() => {
        if (question) {
            setRemainingTime(question.lifetimeSeconds);
            setProgress(0);
        }
    }, [intervalId, question]);

    useEffect(() => {
        if (remainingTime === 0) {
            handleOptionClick(0);
        }
    }, [handleOptionClick, remainingTime]);

    return (
        <Stack spacing={6} padding="3em">
            <Stack alignItems="center" spacing={4}>
                <h2>
                    <i>{question.text}</i>
                </h2>
                <SurveyImageWrapper>
                    <Image src={question.image} showLoading />
                </SurveyImageWrapper>
                <Stack spacing={4} alignSelf="start" width="100%">
                    <Typography variant="body2">
                        Remaining time: <b>{remainingTime}</b> seconds...
                    </Typography>
                    <LinearProgress
                        sx={{ width: '100%' }}
                        variant="determinate"
                        value={progress}
                    />
                </Stack>
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
                                onClick={() => handleOptionClick(index + 1)}
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
