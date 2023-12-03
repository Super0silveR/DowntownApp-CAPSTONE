/** Function from MobX allowing it to compute the observables by itself. */
import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Event, ScheduleEvent } from "../models/event";
import { v4 as uuid } from 'uuid';
import dayjs from "dayjs";
import { Photo } from "../models/photo";
import { store } from "./store";
import { Pagination, PaginationParams } from "../models/pagination";
import toast from "react-hot-toast";
import EventSchedule from "../../features/events/details/EventSchedule";
import { UserDto } from "../models/user";
import {UserDto } from "../models/user";
import { EventSchedule } from '../../features/events/details/EventSchedule'; 
import { Bar, emptyBar } from "../models/bar";


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
    predicate = new Map().set('all', true);
    userSearchResults: UserDto[] = []; 
    userSearchError = '';

    constructor() {
        makeAutoObservable(this);

        /** Reaction so that everytime we update (in our store) the values of our predicate we clear and load with the new filters. */
        reaction(
            () => this.predicate.keys(),
            () => {
                this.paginationParams = new PaginationParams();
                this.eventRegistry.clear();
                this.loadEvents();
            }
        )
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
                const date = dayjs(event.date!).format('MMMM DD — YYYY');
                events[date] = events[date] ? [...events[date], event] : [event];
                return events;
            }, {} as {[key: string]: Event[]})
        ).reverse();
    }

    /**
     * Configuration of the pagination and filtering parameters into the URL itself.
     */
    get generateAxiosPaginationParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.paginationParams.pageNumber.toString());
        params.append('pageSize', this.paginationParams.pageSize.toString());
        /** Adding the filtering parameters to the QueryURL. */
        this.predicate.forEach((value, key) => {
            if (key === 'startDate') {
                params.append(key, (value as Date).toISOString())
            } else {
                params.append(key, value);
            }
        })
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

    /** Set the current predicate parameters to keep track of filters. */
    setPredicate = (predicate: string, value: string | Date) => {
        /** Local helper method. */
        const resetPredicate = () => {
            this.predicate.forEach((_, key) => {
                if (key !== 'startDate') this.predicate.delete(key);
            })
        }
        switch (predicate) {
            case 'all':
                resetPredicate();
                this.predicate.set('all', true);
                break;
            case 'isGoing':
                resetPredicate();
                this.predicate.set('isGoing', true);
                break;
            case 'isHosting':
                resetPredicate();
                this.predicate.set('isHosting', true);
                break
            case 'startDate':
                this.predicate.delete('startDate');
                this.predicate.set('startDate', value);
        }

        console.log(predicate);
    }

    /** Action that recomputes the rating of an event. [TODO ; issues with displaying the changes.] */
    setRating = (newValue: number) => {
        const { value, count } = this.selectedEvent?.rating ?? {value: 0, count: 0};
        const newAvg = (this.selectedEvent?.rating.value !== 0) ? (value + ((newValue - value) / (count + 1))) : newValue;
        this.selectedEvent!.rating!.count = count + 1;
        this.selectedEvent!.rating!.value = Number.parseFloat(newAvg.toFixed(1));
    }

    /** Action that sets the recently updated main photo for a user */
    setCreatorPhoto = (photo: Photo) => {
        if (store.userStore.user) {
            const userName = store.userStore.user.userName;
            this.eventRegistry.forEach((event) => {
                const creator = event.contributors.find(c => {
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
            this.setPagination(result.pagination);
        } catch (e) {
            console.log(e);
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
                console.log(e);
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
            console.log(e);
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
            console.log(e);
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

    scheduleEvent = async (eventData: EventSchedule) => {
        this.setLoading(true);
        try {
            if (eventData.barData) {
                const barToCreate: Bar = {
                    ...emptyBar(), 
                    ...eventData.barData, 
                    name: eventData.barData.title 
                };

                const barResponse = await agent.Bars.create(barToCreate) as unknown as Bar;
                const barId = barResponse.id;

                const eventDate = new Date(eventData.date);

                const scheduledEvent: ScheduleEvent = {
                    ...eventData,
                    id: eventData.id.toString(),
                    date: eventDate,
                    barId: barId,
                };

                await agent.Events.schedule(scheduledEvent);
                toast.success('Event and Bar scheduled successfully!');
            } else {
                throw new Error('Bar data is missing.');
            }
        } catch (error) {
            console.error('Error in scheduling event:', error);
            toast.error('Error scheduling event');
        } finally {
            this.setLoading(false);
        }
    };




    searchUsers = async (query: string) => {
        this.setLoading(true);
        try {
            const users = await agent.Events.searchUsers(query);
            runInAction(() => {
                this.userSearchResults = users;
                this.userSearchError = '';
            });
        } catch (error) {
            console.error('Error searching for users:', error);
            runInAction(() => {
                this.userSearchError = 'An error occurred while searching for users.';
                this.userSearchResults = [];
            });
        } finally {
            this.setLoading(false);
        }
    };






    /** PRIVATE METHODS */

    /** Fetch an event from the registry. */
    private getEvent = (id: string) => this.eventRegistry.get(id);

    /** Add an event to the registry. */
    private setEvent = (event: Event) => {
        const genRandomNumber = Math.floor((Math.random() * 6) + 1);
        event.date = new Date(event.date!);
        event.creatorUserName ??= store.userStore.user?.userName as string;
        event.BgImage = `${genRandomNumber}.jpg`;
        this.eventRegistry.set(event.id, event);
    };
}