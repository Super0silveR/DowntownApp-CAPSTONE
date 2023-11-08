import { ColorCodeEnum } from '../common/constants';
import { Photo } from './photo';
import { Question } from './question';
import { User } from './user';

/** Creating a type for our color code value object. */
type ColorCode = typeof ColorCodeEnum;

/** Profile interface. */
export interface IProfile {
    bio?: string;
    colorCode: string;
    displayName?: string;
    followers: number;
    following: number;
    isContentCreator: boolean;
    isFollowing: boolean;
    isOpenForMessage: boolean;
    isPrivate: boolean;
    location?: string;
    phoneNumber?: string;
    photo?: string;
    photos?: Photo[];
    questions?: Question[];
    userName?: string;
}

export interface ProfileDto {
    bio?: string;
    colorCode: string;
    displayName?: string;
    followers: number;
    following: number;
    isContentCreator: boolean;
    isFollowing: boolean;
    isOpenForMessage: boolean;
    isPrivate: boolean;
    photo?: string;
    userName?: string;
}

/** Initializing the profile as `gray`. */
export class Profile implements IProfile {
    constructor(user: User) {
        this.userName = user.userName;
        this.displayName = user.displayName;
        this.photo = user.photo;
        this.colorCode = ColorCodeEnum.at(4)?.text!;
    }
    
    followers = 0;
    following = 0;
    isContentCreator = false;
    isFollowing = false;
    isOpenForMessage = true;
    isPrivate = false;
    bio?: string;
    colorCode: string;
    displayName?: string;
    location?: string;
    phoneNumber?: string;
    photo?: string;
    photos?: Photo[];
    questions?: Question[];
    userName?: string;
}

export interface ProfileFormValues {
    bio?: string;
    colorCode: ColorCode;
    displayName?: string;
    isOpenForMessage: boolean;
    isPrivate: boolean;
    location?: string;
}