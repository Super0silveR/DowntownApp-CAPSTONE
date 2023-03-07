import { Button, Divider, Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import EventList from './EventList';

function EventDashboard() {

    const { eventStore } = useStore();
    const { loadEvents, eventRegistry } = eventStore;

    /** Load the [filtered*(TODO)] events at the dashboard initialization. */
    useEffect(() => {
        if (eventRegistry.size <= 1)
            loadEvents();
    }, [loadEvents, eventRegistry.size]);

    if (eventStore.loadingInitial) return <LoadingComponent content='Loading App..' />

    return (
        <>
            <Typography variant='h3' fontFamily='monospace'>
                Events
            </Typography>
            <Button 
                variant='text' 
                component={NavLink} 
                to='/createEvent'>
                    Create a new Event!
            </Button>
            <Divider sx={{ margin: 2 }} />
            <Grid container>
                <Grid item xs={8}>
                    <EventList />
                </Grid>
                <Grid item xs={4}>
                    <Typography 
                        align='center' 
                        fontFamily='monospace' 
                        variant='h4'
                        letterSpacing={-3}
                    >
                            Event Filters
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default observer(EventDashboard);