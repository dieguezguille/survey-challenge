export interface ISurveyQuestionOption {
    text: string;
}

export interface ISurveyQuestion {
    text: string;
    image: string;
    lifetimeSeconds: number;
    options: Array<ISurveyQuestionOption>;
}

export interface ISurvey {
    title: string;
    image: string;
    questions: Array<ISurveyQuestion>;
}
