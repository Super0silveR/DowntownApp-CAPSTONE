export interface EventSchedule {
    id: number; 
    scheduled: Date;
    location: string;
    isRemote: boolean;
    address?: string;
    barId?: string;
    eventId?: string;
    barData?: { 
        title: string;
        description: string;
    };
    availableTickets?: number;
}