/** Function from MobX allowing it to compute the observables by itself. */
import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Contributor, Event, ScheduleEvent } from "../models/event";
import { v4 as uuid } from 'uuid';
import dayjs from "dayjs";
import { Photo } from "../models/photo";
import { store } from "./store";
import { Pagination, PaginationParams } from "../models/pagination";
import toast from "react-hot-toast";
import {UserDto } from "../models/user";
import { Bar, emptyBar } from "../models/bar";
import { EventSchedule } from "../models/eventSchedule";
import { EventTicket } from "../models/eventTicket";


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
    scheduledEventTickets: EventTicket[] = [];

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

    get getScheduledEventTickets() {
        return this.scheduledEventTickets;
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

                const barId = await agent.Bars.create(barToCreate) as string;

                const eventDate = new Date(eventData.scheduled);

                if (!eventData.isRemote && !eventData.address) {
                    throw new Error('Address is required for in-person events.');
                }

                const scheduledEvent: ScheduleEvent = {
                    ...eventData,
                    id: eventData.id.toString(),
                    scheduled: eventDate,
                    barId: barId,
                };

                console.log(eventData);

                await agent.Events.schedule(scheduledEvent).then(() => {   
                    runInAction(() => this.selectedEvent?.schedules.push(eventData));
                });

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

    generateTicket = async (ticketData: EventTicket[], nbr: number) => {
        this.setLoading(true);
    
        try {
          // Iterate through each ticket and schedule it
          for (const ticket of ticketData) {
            // Perform any necessary validation or modifications to the ticket data
            const scheduledTicket: EventTicket = {
              ...ticket,
              id: "generate-unique-id-here", // You should generate a unique ID for the ticket
            };
    
            // Perform any additional checks or modifications before scheduling the ticket
    
            // Schedule the ticket
            await agent.EventTicket.create(scheduledTicket, nbr).then(() => {
            });
    
            // You can add additional logic or checks here
    
            // Display a success message for each scheduled ticket
            toast.success(`Ticket scheduled successfully: ${scheduledTicket.id}`);
          }
    
          // Display a general success message after scheduling all tickets
          toast.success("Tickets scheduled successfully!");
        } catch (error) {
          console.error("Error in scheduling tickets:", error);
          toast.error("Error scheduling tickets");
        } finally {
          this.setLoading(false);
        }
      };

      loadTickets = async (scheduledEventId: string) => {
      
        try {
          // Fetch tickets from the API based on scheduledEventId
          const response = await agent.EventTicket.list() as EventTicket[];
      
          // Filter tickets based on scheduledEventId
          const filteredTickets = response.filter(ticket => ticket.scheduledEventId === scheduledEventId);
      
          // Store the filtered tickets in the store
          this.scheduledEventTickets = filteredTickets;
        } catch (error) {
          console.error('Error loading tickets:', error);
          // Handle the error, show a message, etc.
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

    inviteContributor = async (eventId: string, userDto: UserDto) => {
        this.setLoading(true);
        try {
            if (!userDto.userName) {
                throw new Error('Username is required');
            }

            await agent.Events.inviteUser(eventId, userDto.userName);
            runInAction(() => {
                const event = this.eventRegistry.get(eventId);
                if (event) {
                    const newContributor: Contributor = {
                        isActive: true,
                        isAdmin: false,
                        created: new Date(),
                        status: "", 
                        user: {
                            userName: "",
                            displayName: userDto.displayName ?? '',
                            photo: userDto.photo ?? '',
                            token: ""
                        },
                    };
                    event.contributors.push(newContributor);
                }
            });
            toast.success('Contributor invited to the event');
        } catch (error) {
            console.error('Error inviting contributor:', error);
            toast.error('Error inviting contributor to the event');
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