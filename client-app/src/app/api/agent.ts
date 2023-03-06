import axios, { AxiosResponse } from 'axios';
import { Event } from '../models/event';

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
        await sleep(2000);
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
 * Event [domain entity] requests.
 * */
const Events = {
    list: () => requests.get<Event[]>('/events'),
    details: (id: string) => requests.get<Event>(`/events/${id}`),
    create: (event: Event) => requests.post<void>('/events/', event),
    update: (event: Event) => requests.put<void>(`/events/${event.id}`, event),
    delete: (id: string) => requests.del<void>(`/events/${id}`)
}

/**
 * Building the `agent` object.
 * */
const agent = {
    Events
}

/**
 * Exporting the `agent` object that serves as our proxy to our API.
 * */
export default agent;