import { List } from '@mui/material';
import React from 'react';
import { Event } from '../../../app/models/event';
import EventListItem from './EventListItem';

interface Props {
    events: Event[];
    selectEvent: (id: string) => void;
    deleteEvent: (id: string) => void;
}

export default function EventList({ events,
        selectEvent,
        deleteEvent
    }: Props) {
    return (
        <>
            <List>
                {events.map((event: Event) => (
                    <EventListItem
                        event={event}
                        selectEvent={selectEvent}
                        deleteEvent={deleteEvent}
                        key={event.id}
                    />
                ))}
            </List>         
        </>
    );
}