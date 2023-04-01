import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo } from "../models/photo";
import { Profile } from "../models/profile";
import { store } from "./store";

export default class ProfileStore {
    profile?: Profile | null = null;
    loading = false;
    loadingProfile = false;
    uploading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isCurrentUser() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.userName === this.profile.userName;
        }
        return false;
    }

    setLoading = (state: boolean) => this.loading = state;

    setLoadingProfile = (state: boolean) => this.loadingProfile = state;

    setUploading = (state: boolean) => this.uploading = state;

    loadProfile = async (userName: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(userName);
            runInAction(() => this.profile = profile);
        } catch (e) {
            console.log(e);
        } finally {
            this.setLoadingProfile(false);
        }
    }

    deletePhoto = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.Profiles.deletePhoto(photo.id);
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos = this.profile.photos?.filter(p => p.id !== photo.id);
                }
            })
        } catch (error) {
            console.log(error);
        } finally {
            this.setLoading(true);
        }
    }

    uploadPhoto = async (file: Blob) => {
        this.uploading = true;
        try {
            const response = await agent.Profiles.uploadPhoto(file);
            const photo = response.data;
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos?.push(photo);
                    if (photo.isMain && store.userStore.user) {
                        store.userStore.setPhoto(photo.url);
                        this.profile.photo = photo.url;
                        store.eventStore.setCreatorPhoto(photo);
                    }
                }
            })
        } catch (error) {
            console.log(error);
        } finally {
            this.setUploading(false);
        }
    }

    setMain = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.Profiles.setMainPhoto(photo.id);
            store.userStore.setPhoto(photo.url);
            runInAction(() => {
                if (this.profile && this.profile.photos) {
                    this.profile.photos.find(p => p.isMain)!.isMain = false;
                    this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
                    this.profile.photo = photo.url;
                    store.eventStore.setCreatorPhoto(photo);
                }
            })
        } catch (error) {
            console.log(error);
        } finally {
            this.setLoading(false);
        }
    }
}