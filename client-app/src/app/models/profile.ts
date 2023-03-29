import { COLOR_CODE, ValueOf } from '../common/constants';
import { Photo } from './photo';
import { Question } from './question';
import { User } from './user';

/** Creating a type for our color code value object. */
type ColorCode = ValueOf<typeof COLOR_CODE>;

/** Profile interface. */
export interface Profile {
    bio?: string;
    colorCode: ColorCode;
    displayName?: string;
    followers: number;
    following: number;
    isContentCreator: boolean;
    isOpenForMessage: boolean;
    isPrivate: boolean;
    location?: string;
    phoneNumber?: string;
    photo?: string;
    photos?: Photo[];
    questions?: Question[];
    userName?: string;
}

/** Initializing the profile as `gray`. */
export class Profile implements Profile {
    constructor(user: User) {
        this.userName = user.userName;
        this.displayName = user.displayName;
        this.photo = user.photo;
        this.colorCode = COLOR_CODE.gray;
    }
}