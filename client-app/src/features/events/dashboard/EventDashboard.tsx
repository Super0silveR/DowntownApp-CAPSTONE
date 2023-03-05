import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { Event } from '../../../app/models/event';
import EventDetails from '../details/EventDetails';
import EventForm from '../form/EventForm';
import EventList from './EventList';

// Passing properties through components.
interface Props {
    events: Event[];
    selectedEvent: Event | undefined;
    selectEvent: (id: string) => void;
    cancelSelectEvent: () => void;
    editMode: boolean;
    openForm: (id?: string) => void;
    closeForm: () => void;
    createOrEdit: (event: Event) => void;
    deleteEvent: (id: string) => void;
}

export default function EventDashboard({ events,
        selectedEvent,
        selectEvent,
        cancelSelectEvent,
        editMode,
        openForm,
        closeForm,
        createOrEdit,
    deleteEvent
    }: Props) {
    return (
        <>
            <Box sx={{ my: '6.5em', mb: '3.5em', mr: '3em', ml: '3em' }}>
                <Typography variant='h3' fontFamily='sans-serif'>
                    Events
                </Typography>
                <Button variant='text' onClick={() => openForm(undefined)}>Create a new Event!</Button>
                <Divider sx={{ margin: 2 }} />
                <Grid container>
                    <Grid item xs={7}>
                        <EventList
                            events={events}
                            selectEvent={selectEvent}
                            deleteEvent={deleteEvent}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        {selectedEvent && !editMode &&
                            <EventDetails
                                event={selectedEvent}
                                cancelSelectEvent={cancelSelectEvent}
                                openForm={openForm}
                            />                    
                        }
                        {editMode &&
                            <EventForm
                                closeForm={closeForm}
                                event={selectedEvent}
                                createOrEdit={createOrEdit}
                            />
                        }
                    </Grid>
                </Grid>
            </Box>
        </>    
    );
}