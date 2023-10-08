/** Function from MobX allowing it to compute the observables by itself. */
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Event } from "../models/event";
import { v4 as uuid } from 'uuid';
import dayjs from "dayjs";
import { Photo } from "../models/photo";
import { store } from "./store";
import { Pagination, PaginationParams } from "../models/pagination";

/**
 * MobX class that represents the state management (or store) for our event entities.
 * Essentially replace and refactor the local states. [useState() from React]
 * */
export default class EventStore {
    /** Properties */
    eventRegistry = new Map<string, Event>();
    selectedEvent: Event | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    paginationParams = new PaginationParams();

    constructor() {
        makeAutoObservable(this);
    }

    /** 
     * Usage of the `!` operator because we KNOW the event will not be null.
     * Else we need to deal with nullable warnings from TS.
     */
    get eventsByDate() {
        return Array.from(this.eventRegistry.values()).sort((e1, e2) => 
            e1.date!.getTime() - e2.date!.getTime());
    }

    /** 
     * Reducing the array of events so that we now have an array of objects.
     * Each objects has a `key` and a `value` where the `key` is a date, and 
     * the value is an array of Event.
     * We could have 3 events [value] on the same day [key], for example.
     */
    get groupedEventsByDate() {
        return Object.entries(
            this.eventsByDate.reduce((events, event) => {
                const date = dayjs(event.date!).format('MMMM DD - YYYY');
                events[date] = events[date] ? [...events[date], event] : [event];
                return events;
            }, {} as {[key: string]: Event[]})
        ).reverse();
    }

    /**
     * Configuration of the pagination parameters into the URL itself.
     */
    get generateAxiosPaginationParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.paginationParams.pageNumber.toString());
        params.append('pageSize', this.paginationParams.pageSize.toString());
        return params;
    }

    /** Action that sets the `loadingInitial` property.  */
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    /** Action that sets the `loading` property.  */
    setLoading = (state: boolean) => {
        this.loading = state;
    }

    /** Set the current pagination object to our pagination parameters. */
    setPagination = (pagination: Pagination) => this.pagination = pagination;

    /** Set the current pagination parameters in our store. */
    setPaginationParams = (paginationParams: PaginationParams) => this.paginationParams = paginationParams;

    /** Action that recomputes the rating of an event. [TODO ; issues with displaying the changes.] */
    setRating = (newValue: number) => {
        const { value, count } = this.selectedEvent?.rating!;
        var newAvg = (this.selectedEvent?.rating.value !== 0) ? (value + ((newValue - value) / (count + 1))) : newValue;
        this.selectedEvent!.rating!.count = count + 1;
        this.selectedEvent!.rating!.value = Number.parseFloat(newAvg.toFixed(1));
    }

    /** Action that sets the recently updated main photo for a user */
    setCreatorPhoto = (photo: Photo) => {
        if (store.userStore.user) {
            const userName = store.userStore.user.userName;
            this.eventRegistry.forEach((event, key) => {
                let creator = event.contributors.find(c => {
                    return c.status.toUpperCase() === 'CREATOR' 
                        && c.user.userName === userName
                })?.user;
                
                if (creator) creator.photo = photo.url;
            });
        }
    }

    /** ASYNC ACTIONS */

    /** Action that executes the loading of the events. */
    loadEvents = async () => {
        this.setLoadingInitial(true);
        /** Asynchronous code has got to be in a try/catch block. */
        try {
            const result = await agent.Events.list(this.generateAxiosPaginationParams);
            result.data.forEach(event => {
                this.setEvent(event);
            });
            console.log(this.groupedEventsByDate);
            this.setPagination(result.pagination);
        } catch (e) {
            throw e;
        } finally {
            this.setLoadingInitial(false);
        }
    }

    /** Action that executes the loading of one specific event. */
    loadEvent = async (id: string) => {
        let event = this.getEvent(id);
        if (event) {
            this.selectedEvent = event; 
            return event;
        } else {
            this.setLoadingInitial(true);
            try {
                event = await agent.Events.details(id);
                this.setEvent(event);
                runInAction(() => {
                    this.selectedEvent = event
                });
                return event;
            } catch (e) {
                throw e;
            } finally {
                this.setLoadingInitial(false);
            }
        }
    }

    /** Action that executes the creation of an event. */
    createEvent = async (event: Event) => {
        this.setLoading(true);
        event.id = uuid();
        event.contributors.push({
            user: store.userStore.user!,
            created: new Date(),
            isActive: true,
            isAdmin: true,
            status: 'Creator'
        });
        try {
            await agent.Events.create(event);
            runInAction(() => {
                this.setEvent(event);
                this.selectedEvent = event;
                this.editMode = false;
            });
        } catch (e) {
            return Promise.reject(e);
        }
        finally {
            this.setLoading(false);
        }
    }

    /** Action that executes the update of an event. */
    updateEvent = async (event: Event) => {
        this.setLoading(true);
        try {
            await agent.Events.update(event);
            runInAction(() => {
                this.setEvent(event);
                this.selectedEvent = event;
                this.editMode = false;
            });
        } catch (e) {
            throw e;
        } finally {
            this.setLoading(false);
        }
    }

    /** Action that executes the delete of an event. */
    deleteEvent = async (id: string) => {
        this.setLoading(true);
        try {
            await agent.Events.delete(id);
            runInAction(() => {
                this.eventRegistry.delete(id);
            });
        } catch (e) {
            throw e;
        } finally {
            this.setLoading(false);
        }
    }

    /** Actions that allows us to update the following count for specific attendees in the event registry. */
    updateAttendeeFollowing = (username: string) => {
        this.eventRegistry.forEach(event => {
            event.attendees.forEach(attendee => {
                if (attendee.userName === username) {
                    attendee.isFollowing ? attendee.followers-- : attendee.followers++;
                    attendee.isFollowing = !attendee.isFollowing;
                }
            })
        })
    }

    /** PRIVATE METHODS */

    /** Fetch an event from the registry. */
    private getEvent = (id: string) => this.eventRegistry.get(id);

    /** Add an event to the registry. */
    private setEvent = (event: Event) => {
        event.date = new Date(event.date!);
        event.creatorUserName ??= store.userStore.user?.userName!;
        this.eventRegistry.set(event.id, event);
    };
}