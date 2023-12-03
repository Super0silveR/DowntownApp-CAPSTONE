
export interface Bar {
    id: string;
    name: string;
    description: string;
    location?: string;
}
export const emptyBar = (): Bar => ({
    id: '',
    name: '',
    description: '',
    location: '',
});