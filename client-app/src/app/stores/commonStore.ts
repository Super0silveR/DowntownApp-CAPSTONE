import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

/**
 * MobX class that represents the state management (or store) for our common data.
 * */
export default class CommonStore {
    appLoaded = false;
    error: ServerError | null = null;
    token: string | null = window.localStorage.getItem('jwt');

    constructor() {
        makeAutoObservable(this);

        /** MobX reaction that is triggered when the `token` property changes. */
        reaction(
            () => this.token,
            token => {
                if (token)
                    window.localStorage.setItem('jwt', token);
                else 
                    window.localStorage.removeItem('jwt');
            }
        );
    }

    /** Actions */
    setServerError = (error: ServerError) => this.error = error;

    setToken = (token: string | null) => this.token = token;

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}