
export interface ChatRoomType {
    id: string;
    name: string;
    description: string
}

export const emptyChatRoomType = (): ChatRoomType => ({
    id: '',
    name: '',
    description: '',
});