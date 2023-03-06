import { createContext, useContext } from "react";
import EventStore from "./eventStore";

/** Main store interface. */
interface Store {
    eventStore: EventStore
}

/** Instance of our main store, containing different stores. */
export const store: Store = {
    eventStore: new EventStore()
}

/** Hooking up our store object to the React Context. */
export const StoreContext = createContext(store);

/** Simple hook to allow us to use our stores inside our react components. */
export function useStore() {
    return useContext(StoreContext);
}