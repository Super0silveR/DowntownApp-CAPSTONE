
export interface EventCategory {
    id: string;
    title: string;
    description: string
    color: string;
    creatorId: string;
}

export const emptyEventCategory = (): EventCategory => ({
    id: '',
    title: '',
    description: '',
    color: '',
    creatorId: '',
});