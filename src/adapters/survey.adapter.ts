import axios from 'axios';

import { ISurvey } from '../models/survey.model';

export const getSurvey = async () => {
    const surveyUrl = process.env.REACT_APP_SURVEY_URL;
    if (surveyUrl) {
        const result = await axios.get(surveyUrl);
        return result.data as ISurvey;
    } else {
        throw Error('.env file configuration missing.');
    }
};
