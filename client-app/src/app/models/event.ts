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
    ratings: Review[];
}

const emptyRating = (): Rating => ({
    value: 0,
    count: 0,
    ratings: []
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

export interface Event {
    id: string;
    eventCategoryId: string;
    eventTypeId: string;
    date: Date | null;
    title: string;
    description: string;
    creatorId: string;
    creatorUserName: string;
    isActive: boolean;
    rating: Rating;
    contributors: Contributor[];
}

export const emptyEvent = (): Event => ({
    id: '',
    title: '',
    date: null,
    description: '',
    eventTypeId: '',
    eventCategoryId: '',
    creatorId: '',
    creatorUserName: '',
    isActive: true,
    rating: emptyRating(),
    contributors: []
});