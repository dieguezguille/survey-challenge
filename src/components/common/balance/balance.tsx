import Stack from '@mui/material/Stack';

import useSurveyContract from '../../../hooks/use-survey-contract.hook';
import { CustomPill } from './balance.styles';

type BalanceProps = {
    currencyName: string;
};

const Balance: React.FC<BalanceProps> = ({ currencyName }) => {
    const { balance } = useSurveyContract();
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
