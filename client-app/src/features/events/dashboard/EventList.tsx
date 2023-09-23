import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { useStore } from '../../../app/stores/store';
import EventListItem from './EventListItem';
import theme from '../../../app/theme';

/** React component that represents the list of events. */
function EventList() {
    const { eventStore } = useStore();
    const { groupedEventsByDate } = eventStore;

    return (
        <>
            {groupedEventsByDate.map(([group, events]) => (
                <Fragment key={group}>
                    <Typography 
                        variant='h6' 
                        color={theme.palette.primary.dark}
                        fontSize='1.4em'
                        pb={2}
                    >
                        {group}
                    </Typography>
                    <Grid container>
                        {events.map(event => (
                            <EventListItem key={event.id} event={event} />
                        ))}
                    </Grid>         
                </Fragment>
            ))}
        </>
    );
};

export default observer(EventList);