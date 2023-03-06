import { Button, Container, FormControl, Grid, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { ChangeEvent, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { newEvent } from '../../../app/models/event';
import dayjs from 'dayjs';
import { DesktopDateTimePicker } from '@mui/x-date-pickers';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { runInAction } from 'mobx';

function EventForm() {

    const { eventStore } = useStore();
    const { selectedEvent, closeForm, createEvent, updateEvent, loading } = eventStore;

    const initialState = selectedEvent ?? newEvent();

    const [event, setEvent] = useState(initialState);
    const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(dayjs(event.date !== '' ? event.date : Date.now()));
    const [disabled, setDisabled] = useState(true);

    function handleSubmit(e: React.FormEvent<EventTarget>) {
        console.log(e);
        setDisabled(true);
        e.preventDefault();
        runInAction(() => {
            event.date = startDate ? startDate.toISOString() : '';
        });
        event.id ? updateEvent(event) : createEvent(event);
    }

    /** Clean-up necessary with the date picker and onChange handler. */
    function handleInputChange(changeEvent: ChangeEvent<HTMLInputElement>) {
        const { name, value } = changeEvent.target;
        setEvent({ ...event, [name]: value });
        setDisabled(false);
    }

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
                                    <Button color="warning" onClick={closeForm} variant="outlined" fullWidth type="submit">
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