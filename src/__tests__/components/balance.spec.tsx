import { render, screen } from '@testing-library/react';

import { surveyContractContext } from '../../__mocks__/contexts/survey-contract';
import Balance from '../../components/common/balance/balance';
import { SurveyContractContext } from '../../contexts/survey-contract.context';

const expectedTokenName = 'TEST';

const Consumer = () => {
    return (
        <SurveyContractContext.Provider value={surveyContractContext}>
            <Balance currencyName={expectedTokenName} />
        </SurveyContractContext.Provider>
    );
};

describe('Balance', () => {
    it('should render the current balance', () => {
        const expectedBalance = 123;
        surveyContractContext.balance = expectedBalance;
        render(<Consumer />);

        const balance = screen.getByLabelText('balance');

        expect(balance.innerHTML).toContain(expectedBalance.toString());
        expect(balance.innerHTML).toContain(expectedTokenName);
    });
});
