import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Profile } from "../models/profile";

export default class ProfileStore {
    profile?: Profile | null = null;
    loadingProfile = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadProfile = async (userName: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(userName);
            runInAction(() => this.profile = profile);
            console.log(profile);
        } catch (e) {
            console.log(e);
        } finally {
            this.setLoadingProfile(false);
        }
    }

    setLoadingProfile = (state: boolean) => this.loadingProfile = state;
}