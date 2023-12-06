import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo } from "../models/photo";
import { CreatorFields, Profile, ProfileDto, ProfileFormValues } from "../models/profile";
import { store } from "./store";

export default class ProfileStore {
    activeTab: number = 0;
    creatorEditMode: boolean = false;
    profile?: Profile | null = null;
    followings: ProfileDto[] = [];
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

    setActiveTab = (activeTab: number) => {
        this.activeTab = activeTab;
    }

    setLoading = (state: boolean) => this.loading = state;

    setLoadingProfile = (state: boolean) => this.loadingProfile = state;

    setLoadingFollowings = (state: boolean) => this.loadingFollowings = state;

    setProfile = (values: ProfileFormValues) => {
        if (this.profile) {
            this.profile.bio = values.bio;
            this.profile.colorCode = values.colorCode;
            this.profile.displayName = values.displayName;
            this.profile.isOpenForMessage = values.isOpenForMessage;
            this.profile.isPrivate = values.isPrivate;
            this.profile.location = values.location;
        }
    }

    setCreatorFields = (values: CreatorFields) => {
        if (this.profile) {
            this.profile.creatorProfile!.collaborations = values.collaborations ?? this.profile.creatorProfile?.collaborations;
            this.profile.creatorProfile!.pastExperiences = values.pastExperiences ?? this.profile.creatorProfile?.pastExperiences;
            this.profile.creatorProfile!.standOut = values.standOut ?? this.profile.creatorProfile?.standOut;
        }
    }

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
            console.log(this.profile);
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

    updateProfileGeneral = async (values: ProfileFormValues) => { 
        this.loading = true;
        try {
            await agent.Profiles.editProfile(values);
            runInAction(() => {
                this.setProfile(values);
            })
        } catch (e) {
            console.log(e);
            throw e;
        } finally {
            this.setLoading(false);
        }
    }

    updateCreatorFields = async (values: CreatorFields) => {
        this.loading = true;
        console.log(values);
        try {
            await agent.Profiles.editCreatorFields(values);
            this.setCreatorFields(values);
        } catch (e) {
            console.log(e);
            throw e;
        } finally {
            this.setLoading(false);
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