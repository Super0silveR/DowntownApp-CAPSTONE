export interface UserChat {
    chatRoomId: string;
    userId: string;
    sent: Date;
    message: string;
}

export interface UserChatDto { 
    id: string;
    sentAt: Date;
    message: string;
    userName: string;
    displayName: string;
    image?: string;
    isMe: boolean;
    isLastInGroup: boolean;
}