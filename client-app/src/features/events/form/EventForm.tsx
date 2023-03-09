import { Button, Container, FormControl, Grid, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Event, newEvent } from '../../../app/models/event';
import dayjs from 'dayjs';
import { DesktopDateTimePicker } from '@mui/x-date-pickers';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { runInAction } from 'mobx';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { v4 as uuid } from 'uuid';

function EventForm() {

    const { eventStore } = useStore();
    const { createEvent, updateEvent, 
            loading, loadEvent, loadingInitial } = eventStore;

    /** React Router hook for fetching url params. */
    const { id } = useParams();

    const [event, setEvent] = useState<Event>(newEvent());

    const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(dayjs(event.date !== '' ? event.date : Date.now()));
    const [disabled, setDisabled] = useState(true);

    const navigate = useNavigate();

    /** 
     * Usage of the `!` operator because we KNOW the event will not be null.
     * Else we need to deal with nullable warnings from TS.
     */
    useEffect(() => {
        if (id) loadEvent(id).then(event => setEvent(event!));
    }, [id, loadEvent]);

    /** Handling the onSubmit logic. */
    function handleSubmit(e: React.FormEvent<EventTarget>) {
        setDisabled(true);
        e.preventDefault();
        runInAction(() => {
            event.date = startDate ? startDate.toISOString() : '';
        });

        /** Redirecting the user depending on the action. */
        if (!event.id) {
            event.id = uuid();
            createEvent(event).then(value => {
                navigate(`/events/${event.id}`);
            }).catch(e => console.log(e));
        } else {
            updateEvent(event).then(() => {
                navigate(`/events/${event.id}`);
            }).catch(e => console.log(e));
        }
    }

    /** Clean-up necessary with the date picker and onChange handler. */
    function handleInputChange(changeEvent: ChangeEvent<HTMLInputElement>) {
        const { name, value } = changeEvent.target;
        setEvent({ ...event, [name]: value });
        setDisabled(false);
    }

    if (loadingInitial) return <LoadingComponent content='Loading Event..' />

    return (
        <>
            <Container maxWidth="md" sx={{my:3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>Create/Edit an Event!</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <form onSubmit={handleSubmit} autoComplete='off'>
                            <Stack direction='column' spacing={2}>
                                <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
                                    <TextField
                                        onChange={handleInputChange}
                                        placeholder='Title'
                                        value={event.title}
                                        name='title'
                                        fullWidth
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
                                    <TextField
                                        onChange={handleInputChange}
                                        placeholder='Description'
                                        name='description'
                                        value={event.description}
                                        fullWidth
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDateTimePicker
                                            value={startDate}
                                            onChange={(newDate) => setStartDate(newDate)}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                                <Stack direction='row' spacing={2}>
                                    <LoadingButton disabled={disabled} loading={loading} color="primary" variant="outlined" fullWidth type="submit">
                                        Submit
                                    </LoadingButton>
                                    <Button component={Link} to='/events' color="warning" variant="outlined" fullWidth>
                                        Cancel
                                    </Button>
                                </Stack>
                            </Stack>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default observer(EventForm);