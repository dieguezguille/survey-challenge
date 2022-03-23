import axios from 'axios';

import { ISurvey } from '../models/survey.model';
import ApiError from '../types/api-error.type';

const { REACT_APP_SURVEY_URL } = process.env;

export const getSurvey = async () => {
    try {
        if (REACT_APP_SURVEY_URL) {
            const result = await axios.get(REACT_APP_SURVEY_URL);
            return result.data as ISurvey;
        }
    } catch (error) {
        const errorResult: ApiError = {
            error: error,
            message: 'GET survey error',
        };

        throw errorResult;
    }
};
