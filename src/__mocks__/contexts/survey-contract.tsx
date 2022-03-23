import { SurveyContractContextType } from '../../contexts/survey-contract.context';

export const surveyContractContext: SurveyContractContextType = {
    balance: 0,
    setBalance: jest.fn(),
    contract: undefined,
    setContract: jest.fn(),
    submitSurvey: jest.fn(),
};
