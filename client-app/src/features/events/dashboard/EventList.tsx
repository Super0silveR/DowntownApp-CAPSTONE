import { List } from '@mui/material';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { useStore } from '../../../app/stores/store';
import EventListItem from './EventListItem';

/** React component that represents the list of events. */
function EventList() {
    const { eventStore } = useStore();
    const { groupedEventsByDate } = eventStore;

    return (
        <>
            {groupedEventsByDate.map(([group, events]) => (
                <Fragment key={group}>
                    <Typography 
                        fontFamily='monospace' 
                        variant='h6' 
                        color='#6B5B95'
                        fontSize='1.3em'
                    >
                        {group}
                    </Typography>
                    <List>
                        {events.map(event => (
                            <EventListItem key={event.id} event={event} />
                        ))}
                    </List>         
                </Fragment>
            ))}
        </>
    );
};

export default observer(EventList);