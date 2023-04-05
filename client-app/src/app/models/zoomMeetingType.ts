
export interface ZoomMeetingType {
	id: string;
	name: string;
	description: string
    }
    
    export const emptyChatRoomType = (): ZoomMeetingType => ({
	id: '',
	name: '',
	description: '',
    });