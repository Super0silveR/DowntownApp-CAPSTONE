import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { makeAutoObservable, runInAction } from "mobx";
import { UserChatDto } from "../models/userChat";
import { ChatRoomDto } from '../models/chatRoom';
import { store } from './store';
import agent from '../api/agent';
import dayjs from 'dayjs';

export default class UserChatStore {
    chatRegistry = new Map<string, UserChatDto>();
    chats: UserChatDto[] = [];
    selectedChatRoom: ChatRoomDto | undefined = undefined;
    chatRooms: ChatRoomDto[] = [];
    hubConnection: HubConnection | null = null;
    loadingChatRooms: boolean = false;
    loadingRoomCreation: boolean = false;
    
    /**
     *
     */
    constructor() {
        makeAutoObservable(this);
    }

    get chatsByDate() {
        return Array.from(this.chatRegistry.values()).sort((e1, e2) => 
            e1.sentAt!.getTime() - e2.sentAt!.getTime());
    }

    get groupedChatsByDate() {
        return Object.entries(
            this.chatsByDate.reduce((chats, chat) => {
                const date = dayjs(chat.sentAt!).format('MMMM DD — YYYY');
                chats[date] = chats[date] ? [...chats[date], chat] : [chat];
                return chats;
            }, {} as {[key: string]: UserChatDto[]})
        );
    }

    setLoadingChatRooms = (state: boolean) => this.loadingChatRooms = state;

    setChatRooms = (chatRooms: ChatRoomDto[]) => this.chatRooms = chatRooms;

    setLoadingChatRoomCreation = (state: boolean) => this.loadingRoomCreation = state;

    setSelectedChatRoom = (id: string) => this.selectedChatRoom = this.getChatRoom(id);

    loadChatRooms = async () => {
        this.setLoadingChatRooms(true);
        /** Asynchronous code has got to be in a try/catch block. */
        try {
            const result = await agent.Chats.listChatRooms();
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
                    chats.forEach(chat => {
                        this.setChat(chat);
                    });
                    this.chats = chats;
                });
            });

            this.hubConnection.on('ReceiveChat', (chat: UserChatDto) => {
                runInAction(() => {
                    if (chat.userName !== store.userStore.user?.userName) chat.isMe = false;
                    const lastChat = this.chats.pop();
                    if (lastChat) {
                        if (lastChat?.userName === chat.userName) {
                            lastChat.isLastInGroup = false;
                        }
                        this.chats.push(lastChat);
                    }
                    this.setChat(chat);
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

    createChatRoom = async (recipientId: string) => {
        this.loadingRoomCreation = true;
        try {
            await agent.Chats.createChatRoom(recipientId);
        } catch (e) {
            console.log(e);
            throw e;
        } finally {
            this.loadingRoomCreation = false;
        }
    }

    private getChatRoom = (id: string) => this.chatRooms.find(cr => cr.id === id);

    private setChat = (chat: UserChatDto) => {
        chat.sentAt = new Date(chat.sentAt!);
        this.chatRegistry.set(chat.id, chat);
    };
}