import axios from 'axios';
import { ISurvey } from '../models/survey.model';

export const getSurvey = async () => {
    const result = await axios.get('/surveys/survey-sample.json');
    return result.data as ISurvey;
};
