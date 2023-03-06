import { List } from '@mui/material';
import React from 'react';
import { Event } from '../../../app/models/event';
import EventListItem from './EventListItem';

interface Props {
    events: Event[];
    selectEvent: (id: string) => void;
    deleteEvent: (id: string) => void;
    submitting: boolean;
}

export default function EventList({ events,
        selectEvent,
        deleteEvent,
        submitting
    }: Props) {
    return (
        <>
            <List>
                {events.map((event: Event) => (
                    <EventListItem
                        event={event}
                        selectEvent={selectEvent}
                        deleteEvent={deleteEvent}
                        submitting={submitting}
                        key={event.id}
                    />
                ))}
            </List>         
        </>
    );
}