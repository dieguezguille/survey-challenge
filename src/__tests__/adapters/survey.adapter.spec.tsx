import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { getSurvey } from '../../adapters/survey.adapter';
import { ISurvey } from '../../models/survey.model';

describe('Survey Adapter', () => {
    const surveyUrl = process.env.REACT_APP_SURVEY_URL;
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it('should return a survey object when server responds with success', async () => {
        const expectedResponse: ISurvey = {
            title: 'test-title',
            image: 'test-image',
            questions: [
                {
                    text: 'test-text',
                    image: 'test-image',
                    lifetimeSeconds: 12,
                    options: [],
                },
            ],
        };

        mock.onGet(surveyUrl).reply(200, expectedResponse);
        const result = await getSurvey();

        expect(mock.history.get[0].url).toEqual(surveyUrl);
        expect(result).toEqual(expectedResponse);
    });

    it('should throw an error when request fails', async () => {
        mock.onGet(surveyUrl).networkErrorOnce();

        try {
            await getSurvey();
        } catch (error) {
            expect(mock.history.get[0].url).toEqual(surveyUrl);
            expect(error).toHaveProperty('error');
            expect(error).toHaveProperty('message');
        }
    });
});

export default {};
