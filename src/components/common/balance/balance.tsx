import Stack from '@mui/material/Stack';
import { useContext } from 'react';

import { SurveyContractContext } from '../../../contexts/survey-contract.context';
import { CustomPill } from './balance.styles';

type BalanceProps = {
    currencyName: string;
};

const Balance: React.FC<BalanceProps> = ({ currencyName }) => {
    const { balance } = useContext(SurveyContractContext);
    const currency = currencyName.toUpperCase();

    return (
        <Stack direction="row" alignItems="center">
            <div>
                Your current
                <strong> ${currency}</strong> balance is
            </div>
            <CustomPill>
                <Stack alignItems="center">
                    <strong aria-label="balance">
                        {balance} ${currency}
                    </strong>
                </Stack>
            </CustomPill>
        </Stack>
    );
};

export default Balance;
