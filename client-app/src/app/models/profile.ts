import { COLOR_CODE, ValueOf } from '../common/constants';
import { Photo } from './photo';
import { Question } from './question';
import { User } from './user';

/** Creating a type for our color code value object. */
type ColorCode = ValueOf<typeof COLOR_CODE>;

/** Profile interface. */
export interface IProfile {
    bio?: string;
    colorCode: ColorCode;
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
    colorCode: ColorCode;
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
        this.colorCode = COLOR_CODE.gray;
    }
    
    followers = 0;
    following = 0;
    isContentCreator = false;
    isFollowing = false;
    isOpenForMessage = true;
    isPrivate = false;
    bio?: string;
    colorCode: ColorCode;
    displayName?: string;
    location?: string;
    phoneNumber?: string;
    photo?: string;
    photos?: Photo[];
    questions?: Question[];
    userName?: string;
}