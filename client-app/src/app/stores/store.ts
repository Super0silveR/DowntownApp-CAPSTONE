import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import EventStore from "./eventStore";
import LookupStore from "./lookupStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

/** Main store interface. */
interface Store {
    commonStore: CommonStore,
    eventStore: EventStore,
    lookupStore: LookupStore,
    modalStore: ModalStore,
    userStore: UserStore
}

/** Instance of our main store, containing different stores. */
export const store: Store = {
    commonStore: new CommonStore(),
    eventStore: new EventStore(),
    lookupStore: new LookupStore(),
    modalStore: new ModalStore(),
    userStore: new UserStore()
}

/** Hooking up our store object to the React Context. */
export const StoreContext = createContext(store);

/** Simple hook to allow us to use our stores inside our react components. */
export function useStore() {
    return useContext(StoreContext);
}