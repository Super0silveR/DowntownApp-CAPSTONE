
export interface EventType {
    id: string;
    title: string;
    description: string;
    color: string;
    creatorId: string;
    creatorUserName: string;
}

export const emptyEventType = (): EventType => ({
    id: '',
    title: '',
    description: '',
    color: '',
    creatorId: '',
    creatorUserName: '',
});