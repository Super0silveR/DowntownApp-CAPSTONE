import { UserChat } from "./userChat";
import { UserChatRoom } from "./userChatRoom";

export interface ChatRoom { 
    id: string,
    name?: string,
    description?: string,

    chats: UserChat[],
    users: UserChatRoom[]
}

export interface ChatRoomDto {
    id: string,
    displayName?: string
}