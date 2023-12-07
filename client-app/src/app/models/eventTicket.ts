import { ScheduleEvent } from "./event";

export interface EventTicket{
    id: string;
    scheduledEventId: string;
    description: string | null;
    price: number | null;
    ticketClassification: TicketClassification.default;
    scheduledEvent: ScheduleEvent | null;
}

export enum TicketClassification{
    default = 0,
    vip = 1,
    subscription = 2,
}