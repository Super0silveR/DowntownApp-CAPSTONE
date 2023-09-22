import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo } from "../models/photo";
import { Profile } from "../models/profile";
import { store } from "./store";

export default class ProfileStore {
    activeTab: Number = 0;
    profile?: Profile | null = null;
    followings: Profile[] = [];
    loading = false;
    loadingProfile = false;
    loadingFollowings = false;
    uploading = false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.activeTab,
            activeTab => {
                if (activeTab === 3 || activeTab === 4) {
                    const predicate = activeTab === 3 ? "following" : 'followers';
                    this.loadFollowings(predicate);
                } else {
                    this.followings = [];
                }
            }
        );
    }

    get isCurrentUser() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.userName === this.profile.userName;
        }
        return false;
    }

    setActiveTab = (activeTab: Number) => {
        console.log(activeTab);
        this.activeTab = activeTab;
    }

    setLoading = (state: boolean) => this.loading = state;

    setLoadingProfile = (state: boolean) => this.loadingProfile = state;

    setLoadingFollowings = (state: boolean) => this.loadingFollowings = state;

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

    /**
     * Async action used for updating the following of specific user, 
     * determined by the action of the currently logged user.
     * @param username Updating the following of this specific user.
     * @param isFollowing Property representing the new following status.
     */
    updateFollowing = async (username: string, isFollowing: boolean) => {
        this.loading = true;
        try {
            await agent.Profiles.updateFollowing(username);
            store.eventStore.updateAttendeeFollowing(username);
            runInAction(() => {
                if (this.profile 
                    && this.profile.userName !== store.userStore.user?.userName 
                    && this.profile.userName === username) {
                    isFollowing ? this.profile.followers++ : this.profile.followers--;
                    this.profile.isFollowing = !this.profile.isFollowing;
                }
                if (this.profile && this.profile.userName === store.userStore.user?.userName) {
                    isFollowing ? this.profile.following++ : this.profile.following--;
                }
                this.followings.forEach(profile => {
                    if (profile.userName === username) {
                        profile.isFollowing ? profile.followers-- : profile.followers++;
                        profile.isFollowing = !profile.isFollowing;
                    }
                })
            })
        } catch (error) {
            console.log(error);
        } finally {
            this.setLoading(false);
        }
    }

    loadFollowings = async (predicate: string) => {
        this.loadingFollowings = true;
        try {
            const followings = await agent.Profiles.listFollowings(this.profile!.userName!, predicate);
            runInAction(() => {
                this.followings = followings;
            });
        } catch (error) {
            console.log(error)
        } finally {
            this.setLoadingFollowings(false);
        }
    }
}