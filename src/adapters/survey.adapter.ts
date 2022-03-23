import axios from 'axios';

import { ISurvey } from '../models/survey.model';

const { REACT_APP_SURVEY_URL } = process.env;

export const getSurvey = async () => {
    if (REACT_APP_SURVEY_URL) {
        const result = await axios.get(REACT_APP_SURVEY_URL);
        return result.data as ISurvey;
    } else {
        throw Error('.env file configuration missing.');
    }
};
