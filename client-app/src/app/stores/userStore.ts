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

    /** Action that logout the user and clear the token and user object. */
    logout = () => {
        store.commonStore.setToken(null);
        localStorage.removeItem('jwt');
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
        } catch (e) {
            throw e;
        }
    }
}