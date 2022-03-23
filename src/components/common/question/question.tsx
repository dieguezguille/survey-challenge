import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'mui-image';
import { useCallback, useEffect, useState } from 'react';

import useApp from '../../../hooks/use-app.hook';
import { ISurveyQuestion } from '../../../models/survey.model';
import { CenteredStack } from '../../styled/centered-stack/centered-stack';
import { SurveyImageWrapper } from '../../styled/survey-image-wrapper/survey-image-wrapper';
import {
    QuestionGrid,
    QuestionProgress,
    QuestionProgressWrapper,
    QuestionWrapper,
} from './question.styles';

type QuestionProps = {
    question: ISurveyQuestion;
    onNextQuestion: () => void;
};

const Question: React.FC<QuestionProps> = ({ question, onNextQuestion }) => {
    const { saveAnswer } = useApp();

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
        <QuestionWrapper spacing={6}>
            <CenteredStack spacing={4}>
                <h2>
                    <i>{question.text}</i>
                </h2>
                <SurveyImageWrapper>
                    <Image src={question.image} showLoading />
                </SurveyImageWrapper>
                <QuestionProgressWrapper spacing={4}>
                    <Typography variant="body2">
                        Remaining time: <b>{remainingTime}</b> seconds...
                    </Typography>
                    <QuestionProgress variant="determinate" value={progress} />
                </QuestionProgressWrapper>
            </CenteredStack>
            <Stack>
                <QuestionGrid spacing={2} container>
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
                </QuestionGrid>
            </Stack>
        </QuestionWrapper>
    );
};

export default Question;
