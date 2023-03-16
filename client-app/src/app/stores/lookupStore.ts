import agent from '../api/agent';
import { makeAutoObservable, runInAction } from "mobx";
import { EventCategory } from "../models/eventCategory";
import { EventType } from "../models/eventType";

/**
 * MobX class that represents the state management for our lookup data.
 * */
export default class LookupStore {
    eventCategoryRegistry = new Map<string, EventCategory>();
    eventCategorySelectOptions: {value:string,text:string}[] = [];
    eventTypeRegistry = new Map<string, EventType>();
    eventTypeSelectOptions: { value: string, text: string }[] = [];
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    /** Setting the loading flag. */
    setLoading = (state: boolean) => this.loading = state;

    /** ASYNC */

    /** Fetching all the event categories. */
    loadEventCategories = async () => {
        this.setLoading(true);
        try {
            const eventCategories = await agent.EventCategories.list();
            eventCategories.forEach(category => this.setEventCategory(category));
            runInAction(() => {
                /** Formatting the list fetched from the API into a select input options format. */
                this.eventCategorySelectOptions = eventCategories.map((cat, i) => {
                    return { value: cat.id, text: cat.title };
                });
            });
        } catch (e) {
            throw e;
        } finally {
            this.setLoading(false);
        }
    }

    /** Fetching all the event types. */
    loadEventTypes = async () => {
        this.setLoading(true);
        try {
            const eventTypes = await agent.EventTypes.list();
            eventTypes.forEach(type => this.setEventType(type));
            runInAction(() => {
                /** Formatting the list fetched from the API into a select input options format. */
                this.eventTypeSelectOptions = eventTypes.map((type, i) => {
                    return { value: type.id, text: type.title };
                });
            });
        } catch (e) {
            throw e;
        } finally {
            this.setLoading(false);
        }
    }

    /** PRIVATE */

    /** Adding the eventCategory to the registry. */
    private setEventCategory = (category: EventCategory) => this.eventCategoryRegistry.set(category.id, category);

    /** Adding the eventType to the registry. */
    private setEventType = (type: EventType) => this.eventTypeRegistry.set(type.id, type);
}