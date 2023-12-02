import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { makeAutoObservable, runInAction } from "mobx";
import { UserChat } from "../models/userChat";
import { ChatRoom } from '../models/chatRoom';
import { store } from './store';

export default class UserChatStore {
    chats: UserChat[] = [];
    selectedChatRoom: ChatRoom | undefined = undefined;
    chatRooms: ChatRoom[] = [];
    hubConnection: HubConnection | null = null;
    
    /**
     *
     */
    constructor() {
        makeAutoObservable(this);

        this.chatRooms?.push({
            id: '1',
            chats: [],
            users: []
        });
        this.chatRooms?.push({
            id: '2',
            chats: [],
            users: []
        });
        this.chatRooms?.push({
            id: '3',
            chats: [],
            users: []
        });
    }

    createHubConnection = (chatRoomId: string) => {
        if (this.selectedChatRoom) { 
            this.hubConnection = new HubConnectionBuilder()
                .withUrl(import.meta.env.VITE_CHAT_URL + '?chatRoomId=' + chatRoomId, {
                    accessTokenFactory: () => store.userStore.user?.token as string
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();
                
            this.hubConnection
                .start()
                .catch(error => console.log('Error establishing the connection', error));

            this.hubConnection.on('LoadChats', (chats: UserChat[]) => {
                runInAction(() => {
                    this.chats = chats;
                    this.chatRooms?.find(cr => cr.id === chatRoomId)?.chats.concat(chats);
                });
            });

            this.hubConnection.on('ReceiveChat', (chat: UserChat) => {
                runInAction(() => {
                    this.chats.push(chat);
                    this.chatRooms?.find(cr => cr.id === chatRoomId)?.chats.push(chat);
                });
            });
        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connection.', error));
    }

    clearChats = () => {
        this.chats = [];
        this.stopHubConnection();
    }
}