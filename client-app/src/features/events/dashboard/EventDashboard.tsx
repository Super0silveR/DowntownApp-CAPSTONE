import { Button, Divider, Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../app/stores/store';
import EventDetails from '../details/EventDetails';
import EventForm from '../form/EventForm';
import EventList from './EventList';

function EventDashboard() {

    const { eventStore } = useStore();
    const { selectedEvent, editMode } = eventStore;

    return (
        <>
            <Typography variant='h3' fontFamily='sans-serif'>
                Events
            </Typography>
            <Button variant='text' onClick={() => eventStore.openForm()}>Create a new Event!</Button>
            <Divider sx={{ margin: 2 }} />
            <Grid container>
                <Grid item xs={7}>
                    <EventList />
                </Grid>
                <Grid item xs={5}>
                    {selectedEvent && !editMode &&
                        <EventDetails />
                    }
                    {editMode &&
                        <EventForm />
                    }
                </Grid>
            </Grid>
        </>
    );
};

export default observer(EventDashboard);