import Stack from '@mui/material/Stack';
import { SurveyContext } from '../../context/survey.context';
import { CustomPill } from './balance.styles';
import { useContext } from 'react';

type BalanceProps = {
    currencyName: string;
};

const Balance: React.FC<BalanceProps> = ({ currencyName }) => {
    const { balance } = useContext(SurveyContext);
    const currency = currencyName.toUpperCase();
    return (
        <Stack direction="row" alignItems="center">
            <div>
                Your current
                <strong> ${currency}</strong> balance is
            </div>
            <CustomPill>
                <Stack alignItems="center">
                    <strong>
                        {balance} ${currency}
                    </strong>
                </Stack>
            </CustomPill>
        </Stack>
    );
};

export default Balance;
