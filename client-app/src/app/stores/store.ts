import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import EventStore from "./eventStore";
import UserStore from "./userStore";

/** Main store interface. */
interface Store {
    commonStore: CommonStore,
    eventStore: EventStore,
    userStore: UserStore
}

/** Instance of our main store, containing different stores. */
export const store: Store = {
    commonStore: new CommonStore(),
    eventStore: new EventStore(),
    userStore: new UserStore()
}

/** Hooking up our store object to the React Context. */
export const StoreContext = createContext(store);

/** Simple hook to allow us to use our stores inside our react components. */
export function useStore() {
    return useContext(StoreContext);
}