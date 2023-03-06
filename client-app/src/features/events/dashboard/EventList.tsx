import { List } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Event } from '../../../app/models/event';
import { useStore } from '../../../app/stores/store';
import EventListItem from './EventListItem';

function EventList() {
    const { eventStore } = useStore();
    const { eventsByDate } = eventStore;

    return (
        <>
            <List>
                {eventsByDate.map((event: Event) => (
                    <EventListItem key={event.id} event={event} />
                ))}
            </List>         
        </>
    );
};

export default observer(EventList);