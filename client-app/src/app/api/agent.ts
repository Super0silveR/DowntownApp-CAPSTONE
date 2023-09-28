import axios, { AxiosError, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import { Event } from '../models/event';
import { EventType } from '../models/eventType';
import { EventCategory } from '../models/eventCategory';
import { ChallengeType } from '../models/challengeType';
import { QuestionType } from '../models/questionType';
import { ChatRoomType } from '../models/chatRoomType';
import { User, UserFormValues } from '../models/user';
import { router } from '../router/Routes';
import { store } from '../stores/store';
import { Profile, ProfileDto } from '../models/profile';
import { Photo } from '../models/photo';
import { PaginatedResult } from '../models/pagination';

/** Adding a `fake` delay to the app for testing the `loading` indicators after requests. */
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

/** Setting up the default url to our API. */
axios.defaults.baseURL = 'https://localhost:7246/api';

/**
 * Setting up an Axios interceptor for adding the JWT token to the
 * outgoing request.
 */
axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) 
        config.headers.Authorization = `Bearer ${token}`;
    return config;
});

/**
 * Setting up an Axios interceptor for computing the response.
 * 
 * In case of an error getting thrown by the API, we also use interceptor for quality of life
 * and user experience.
 */
axios.interceptors.response.use(async response => {
    await sleep(1000); // Temporary.

    const pagination = response.headers['pagination'];

    /** If the pagination parameters exist, we transform the data into our paginated class. */
    if (pagination) {
        const parsedPagination = JSON.parse(pagination);
        response.data = new PaginatedResult(response.data, parsedPagination)
        return response as AxiosResponse<PaginatedResult<any>>
    }
    return response;
}, (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key])
                        modalStateErrors.push(data.errors[key]);
                }
                throw modalStateErrors.flat();
            } else {
               toast.error(data); 
            }
            break;
        case 401:
            toast.error('Unauthorized');
            break;
        case 403:
            toast.error('Forbidden');
            break;
        case 404:
            /** Navigate the user to our NotFound react component. */
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }
    return Promise.reject(error);
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
    /** Custom usage of the axios.get() to append the pagination parameters. */
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Event[]>>('/events', {params}).then(responseBody),
    details: (id: string) => requests.get<Event>(`/events/${id}`),
    create: (event: Event) => requests.post<void>('/events/', event),
    update: (event: Event) => requests.put<void>(`/events/${event.id}`, event),
    delete: (id: string) => requests.del<void>(`/events/${id}`)
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
    update: (eventCategory: EventCategory) => requests.put<void>(`/eventCategories/${eventCategory.id}`, eventCategory),
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
 * QuestionTypes related requests. 
 */
const QuestionTypes = {
    list: () => requests.get<QuestionType[]>('/questionTypes'),
    details: (id: string) => requests.get<QuestionType>(`/questionTypes/${id}`),
    create: (questionType: QuestionType) => requests.post<void>('/questionTypes/', questionType),
    update: (questionType: QuestionType) => requests.put<void>(`/questionTypes/${questionType.id}`, questionType),
    delete: (id: string) => requests.del<void>(`/questionTypes/${id}`)
}

/**
 * ChatRoomTypes related requests. 
 */
const ChatRoomTypes = {
    list: () => requests.get<ChatRoomType[]>('/chatRoomTypes'),
    details: (id: string) => requests.get<ChatRoomType>(`/chatRoomTypes/${id}`),
    create: (chatRoomType: ChatRoomType) => requests.post<void>('/chatRoomTypes/', chatRoomType),
    update: (chatRoomType: ChatRoomType) => requests.put<void>(`/chatRoomTypes/${chatRoomType.id}`, chatRoomType),
    delete: (id: string) => requests.del<void>(`/chatRoomTypes/${id}`)
}

/**
 * Account related requests. 
 */
const Accounts = {
    current: () => requests.get<User>('/accounts'),
    login: (user: UserFormValues) => requests.post<User>('/accounts/login', user),
    register: (user: UserFormValues) => requests.post<User>('/accounts/register', user)
}

/**
 * Profile related requests.
 */
const Profiles = {
    get: (userName: string) => requests.get<Profile>(`/profiles/${userName}`),
    uploadPhoto: (file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<Photo>('photos', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
    deletePhoto: (id: string) => requests.del(`/photos/${id}`),
    updateFollowing: (username: string) => requests.post(`/followers/${username}`, {}),
    listFollowings: (username: string, predicate: string) => 
        requests.get<ProfileDto[]>(`/followers/${username}?predicate=${predicate}`)
}

/**
 * Building the `agent` object.
 * */
const agent = {
    Accounts,
    ChallengeTypes,
    ChatRoomTypes,
    Events,
    EventTypes,
    EventCategories,
    Profiles,
    QuestionTypes
}

/**
 * Exporting the `agent` object that serves as our proxy to our API.
 * */
export default agent;