export interface ISurveyQuestionOption {
    text: string;
}

export interface ISurveyQuestion {
    test: string;
    image: string;
    lifeTimeSeconds: number;
    options: Array<ISurveyQuestionOption>;
}

export interface ISurvey {
    title: string;
    image: string;
    questions: Array<ISurveyQuestion>;
}
