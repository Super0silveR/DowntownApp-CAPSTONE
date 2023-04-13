export interface MeetingZoomType {
    id: string;
    name: string;
    description: string
}

export const emptyMeetingZoomType = (): MeetingZoomType => ({
    id: '',
    name: '',
    description: '',
});