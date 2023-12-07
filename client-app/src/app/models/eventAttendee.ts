import { ScheduleEvent } from "./event";
import { EventTicket } from "./eventTicket";
import { User } from "./user";

export interface EventAttendee{
    id: string;
    attendeeId: string;
    scheduledEventId: string;
    ticketId: string | null;
    isHost: boolean;
    attendee: User | null;
    scheduledEvent: ScheduleEvent | null;
    eventTicket: EventTicket | null;
}


