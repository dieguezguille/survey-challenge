export interface ISurvey {
    title: string;
    image: string;
    questions: Array<ISurveyQuestion>;
}

export interface ISurveyQuestion {
    text: string;
    image: string;
    lifetimeSeconds: number;
    options: Array<ISurveyQuestionOption>;
}

export interface ISurveyQuestionOption {
    text: string;
}
