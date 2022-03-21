import { styled } from '@mui/material';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';

export const QuestionWrapper = styled(Stack)({
    padding: '3em',
});

export const QuestionProgressWrapper = styled(Stack)({
    width: '100%',
    alignSelf: 'start',
});

export const QuestionProgress = styled(LinearProgress)({
    width: '100%',
});

export const QuestionGrid = styled(Grid)({
    justifyContent: 'center',
});
