import axios, { AxiosResponse } from 'axios';
import { Event, EventType, EventCategory } from '../models/event';
import { ChallengeType } from '../models/challenge';
import { User, UserFormValues } from '../models/user';

/** Adding a `fake` delay to the app for testing the `loading` indicators after requests. */
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

/** Setting up the default url to our API. */
axios.defaults.baseURL = 'https://localhost:7246/api';

/** Setting up an Axios interceptor for computing the response. [in this case] */
axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
});

/** Extracting the data from the response. */
const responseBody = <T> (response: AxiosResponse<T>) => response.data;

/**
 * Axios requests for generic CRUD operations to our API.
 * */
const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

/**
 * Event [domain entity] related requests.
 * */
const Events = {
    list: () => requests.get<Event[]>('/events'),
    details: (id: string) => requests.get<Event>(`/events/${id}`),
    create: (event: Event) => requests.post<void>('/events/', event),
    update: (event: Event) => requests.put<void>(`/events/${event.id}`, event),
    delete: (id: string) => requests.del<void>(`/events/${id}`)
}

/**
 * Account related requests. 
 */
const Accounts = {
    login: (user: UserFormValues) => requests.post<User>('/accounts/login', user)
}

/**
 * EventTypes related requests. 
 */
const EventTypes = {
    list: () => requests.get<EventType[]>('/eventTypes'),
    details: (id: string) => requests.get<EventType>(`/eventTypes/${id}`),
    create: (eventType: EventType) => requests.post<void>('/eventTypes/', eventType),
    update: (eventType: EventType) => requests.put<void>(`/eventTypes/${eventType.id}`, eventType),
    delete: (id: string) => requests.del<void>(`/eventTypes/${id}`)
}

/**
 * EventCategories related requests. 
 */
const EventCategories = {
    list: () => requests.get<EventCategory[]>('/eventCategories'),
    details: (id: string) => requests.get<EventCategory>(`/eventCategories/${id}`),
    create: (eventCategory: EventCategory) => requests.post<void>('/eventCategories/', eventCategory),
    update: (eventCategory: EventCategory) => requests.put<void>(`/eventTypes/${eventCategory.id}`, eventCategory),
    delete: (id: string) => requests.del<void>(`/eventCategories/${id}`)
}

/**
 * ChallengeTypes related requests. 
 */
const ChallengeTypes = {
    list: () => requests.get<ChallengeType[]>('/challengeTypes'),
    details: (id: string) => requests.get<ChallengeType>(`/challengeTypes/${id}`),
    create: (challengeType: ChallengeType) => requests.post<void>('/challengeTypes/', challengeType),
    update: (challengeType: ChallengeType) => requests.put<void>(`/challengeTypes/${challengeType.id}`, challengeType),
    delete: (id: string) => requests.del<void>(`/challengeTypes/${id}`)
}

/**
 * Building the `agent` object.
 * */
const agent = {
    Accounts,
    Events,
    EventTypes,
    EventCategories,
    ChallengeTypes
}

/**
 * Exporting the `agent` object that serves as our proxy to our API.
 * */
export default agent;