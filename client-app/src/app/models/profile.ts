import { User } from './user';

export interface Profile {
    userName?: string;
    displayName?: string;
    bio?: string;
    photo?: string;
    photos?: Photo[];
}

export class Profile implements Profile {
    constructor(user: User) {
        this.userName = user.userName;
        this.displayName = user.displayName;
        this.photo = user.photo;
    }
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
}