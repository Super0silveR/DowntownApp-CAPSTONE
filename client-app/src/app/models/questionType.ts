
export interface QuestionType {
    id: string;
    name: string;
    description: string
}

export const emptyQuestionType = (): QuestionType => ({
    id: '',
    name: '',
    description: '',
});