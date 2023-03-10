import { UserDto } from "./user";

export interface Review {
    rated: Date;
    vote: number;
    review: string;
    user: UserDto;
}

export interface Rating {
    value: number;
    count: number;
    reviews: Review[];
}

const emptyRating = (): Rating => ({
    value: 0,
    count: 0,
    reviews: []
});

export interface Contributor {
    isActive: boolean;
    isAdmin: boolean;
    created: Date;
    status: string;
    userName: string;
    displayName: string;
    bio?: any;
    image?: any;
}

export interface BaseChallenge {
    id: string;
    Name: string;
    description: string;
}

export interface ChallengeType extends BaseChallenge {
    creatorId: string;
    date: string;
    creatorUserName: string;
    isActive: boolean;
    rating: Rating;
    contributors: Contributor[];
}


const emptyBaseChallengeType = (): BaseChallenge => ({
    id: '',
    Name: '',
    description: '',
});

const emptyChallengeType = (): ChallengeType => ({
    ...emptyBaseChallengeType(),
    creatorId: '',
    date: '',
    creatorUserName: '',
    isActive: true,
    rating: emptyRating(),
    contributors: []
});

export const newChallengeType = <T extends Partial<ChallengeType>>(challenge?: T): ChallengeType & T => {
    return Object.assign(emptyChallengeType(), challenge);
}