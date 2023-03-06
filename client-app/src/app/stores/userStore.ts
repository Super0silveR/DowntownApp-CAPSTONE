import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { history } from "../layout/base/history";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";

/**
 * MobX class that represents the state management (or store) for our current user.
 * */
export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    /** ASYNC ACTIONS */

    /** Action that executes the login for the user values. */
    login = async (creds: UserFormValues) => {
        try {
            const  user = await agent.Accounts.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/');
            store.eventStore.loadEvents();
        } catch (e) {
            throw e;
        }
    }
}