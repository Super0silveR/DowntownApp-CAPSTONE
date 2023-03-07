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

export interface BaseEvent {
    id: string;
    eventCategoryId: string;
    eventTypeId: string;
    title: string;
    description: string;
}

export interface Event extends BaseEvent {
    creatorId: string;
    date: string;
    creatorUserName: string;
    isActive: boolean;
    rating: Rating;
    contributors: Contributor[];
}

const emptyBaseEvent = (): BaseEvent => ({
    id: '',
    title: '',
    description: '',
    eventTypeId: '',
    eventCategoryId: ''
});

const emptyEvent = (): Event => ({
    ...emptyBaseEvent(),
    creatorId: '',
    date: '',
    creatorUserName: '',
    isActive: true,
    rating: emptyRating(),
    contributors: []
});

export const newEvent = <T extends Partial<Event>>(event?: T): Event & T => {
    return Object.assign(emptyEvent(), event);
}