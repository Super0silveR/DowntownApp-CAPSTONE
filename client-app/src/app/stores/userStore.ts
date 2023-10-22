import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { router } from "../router/Routes";
import { store } from "./store";

/**
 * MobX class that represents the state management (or store) for our current user.
 * */
export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    /** Computed property to get the current logged in user. */
    get isLoggedIn() {
        return !!this.user;
    }

    setPhoto = (photo: string) => {
        if (this.user) this.user.photo = photo;
    }

    /** Action that logout the user and clear the token and user object. */
    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate('/');
    }

    /** ASYNC ACTIONS */

    /** Action that executes the login for the user values. */
    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Accounts.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate('/events');
            store.modalStore.closeModal();
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    /** Action that fetches the current logged in user. */
    getUser = async () => {
        try {
            const user = await agent.Accounts.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }

    /** Action that executes the register for the user values. */
    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Accounts.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate('/events');
            store.modalStore.closeModal();
        } catch (e) {
            console.log(e);
            throw e; 
        }
    }
}