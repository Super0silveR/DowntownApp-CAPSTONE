import { Button, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';
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
            <Stack 
                direction='row' 
                display='flex' 
                sx={{
                    alignContent:'center',
                    alignItems:'center',
                    justifyContent:'space-between'
                }}>
                <Typography variant='h3' letterSpacing={-2} fontFamily='monospace'>
                    Events
                </Typography>
                <Button 
                    variant='outlined' 
                    component={NavLink}
                    size='small'
                    to='/createEvent'
                    sx={{
                        height:'2.25rem'
                    }}
                >
                        Create a new Event!
                </Button>
            </Stack>
            <Divider sx={{ my:1, mb: 5 }} />
            <Grid container>
                <Grid item xs={8}>
                    <EventList />
                </Grid>
                <Grid item xs={4}>
                    <Container sx={{alignItems:'center'}}>
                        <Typography 
                            fontFamily='monospace' 
                            variant='h4'
                            letterSpacing={-4}
                            sx={{mt:-1}}
                        >
                                Event Filters
                        </Typography>   
                    </Container>
                </Grid>
            </Grid>
        </>
    );
};

export default observer(EventDashboard);