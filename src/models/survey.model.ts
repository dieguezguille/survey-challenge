interface ISurveyQuestionOption {
    text: string;
}

interface ISurveyQuestion {
    test: string;
    image: string;
    lifeTimeSeconds: number;
    options: Array<ISurveyQuestionOption>;
}

interface ISurvey {
    title: string;
    image: string;
    questions: Array<ISurveyQuestion>;
}

export default ISurvey;
