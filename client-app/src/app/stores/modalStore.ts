import { makeAutoObservable } from "mobx";

interface Modal {
    open: boolean;
    body: JSX.Element | null;
}

/**
 * MobX class that represents the state management for a modal inside our App.
 * */
export default class ModalStore {
    modal: Modal = {
        open: false,
        body: null 
    }

    constructor() {
        makeAutoObservable(this);
    }

    openModal = (content: JSX.Element) => {
        this.modal.open = true;
        this.modal.body = content;
    }

    closeModal = () => {
        this.modal.open = false;
        this.modal.body = null;
    }
}