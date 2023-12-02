import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { makeAutoObservable, runInAction } from "mobx";
import { UserChat, UserChatDto } from "../models/userChat";
import { ChatRoomDto } from '../models/chatRoom';
import { store } from './store';
import agent from '../api/agent';

export default class UserChatStore {
    chats: UserChatDto[] = [];
    selectedChatRoom: ChatRoomDto | undefined = undefined;
    chatRooms: ChatRoomDto[] = [];
    hubConnection: HubConnection | null = null;
    loadingChatRooms: boolean = false;
    
    /**
     *
     */
    constructor() {
        makeAutoObservable(this);
    }

    setLoadingChatRooms = (state: boolean) => this.loadingChatRooms = state;

    setSelectedChatRoom = (id: string) => this.selectedChatRoom = this.getChatRoom(id);

    loadChatRooms = async () => {
        this.setLoadingChatRooms(true);
        /** Asynchronous code has got to be in a try/catch block. */
        try {
            var result = await agent.Chats.listChatRooms();
            runInAction(() => {
                result.forEach(chatRoom => {
                    this.chatRooms.push(chatRoom);
                });
                console.log('Length after loading rooms.', this.chatRooms.length);
            });
        } catch (e) {
            console.log(e);
            throw e;
        } finally {
            this.setLoadingChatRooms(false);
        }
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

            this.hubConnection.on('LoadChats', (chats: UserChatDto[]) => {
                runInAction(() => {
                    this.chats = chats;
                    console.log(chats);
                });
            });

            this.hubConnection.on('ReceiveChat', (chat: UserChatDto) => {
                runInAction(() => {
                    const lastChat = this.chats.pop();
                    if (lastChat?.userName === chat.userName) {
                        lastChat.isLastInGroup = false;
                        this.chats.push(lastChat);
                    }
                    this.chats.push(chat);
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

    sendChat = async (values: {message:string, chatRoomId?: string}) => { 
        values.chatRoomId = store.userChatStore.selectedChatRoom?.id;
        try {
            await this.hubConnection?.invoke('SendChat', values);
        } catch (error) {
            console.log(error);
        }
    }

    private getChatRoom = (id: string) => this.chatRooms.find(cr => cr.id === id);
}