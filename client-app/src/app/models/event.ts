import { ProfileDto } from "./profile";
import { User, UserDto } from "./user";

export interface Review {
    rated: Date;
    vote: number;
    review: string;
    user: UserDto;
}

export interface ScheduleEvent {
    id: string;
    date: Date | null;
    location: string;
    barId: string;
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
    user: User;
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
    attendees: ProfileDto[];
    contributors: Contributor[];
    BgImage: string;
    location: string;
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
    attendees: [],
    contributors: [],
    BgImage: '1.jpg',
    location: ''

});