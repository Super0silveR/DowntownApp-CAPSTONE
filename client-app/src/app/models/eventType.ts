
export interface EventType {
    id: string;
    creatorId?: string;
    title: string;
    color: string;
}

export const emptyEventType = (): EventType => ({
    id: '',
    title: '',
    color: '',
    creatorId: '',
});