
export interface ChallengeType {
    id: string;
    title: string;
    description: string;
    creatorId: string;
}

export const emptyChallengeType = (): ChallengeType => ({
    id: '',
    title: '',
    description: '',
    creatorId: '',
});