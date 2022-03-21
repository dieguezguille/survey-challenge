import Stack from '@mui/material/Stack';
import { SurveyContext } from '../../context/survey.context';
import { CustomPill } from './balance.styles';
import { useContext } from 'react';

const Balance: React.FC = () => {
    const { balance } = useContext(SurveyContext);
    return (
        <Stack direction="row" alignItems="center">
            <div>
                Your current
                <strong> $QUIZ</strong> balance is
            </div>
            <CustomPill>
                <Stack alignItems="center">
                    <strong>{balance} $QUIZ</strong>
                </Stack>
            </CustomPill>
        </Stack>
    );
};

export default Balance;
