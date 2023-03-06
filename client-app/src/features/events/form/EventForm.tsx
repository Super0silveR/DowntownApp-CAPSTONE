import { Button, Container, FormControl, Grid, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { ChangeEvent, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Event, newEvent } from '../../../app/models/event';
import dayjs from 'dayjs';
import { DesktopDateTimePicker } from '@mui/x-date-pickers';

interface Props {
    event: Event | undefined;
    closeForm: () => void;
    createOrEdit: (event: Event) => void;
    submitting: boolean;
}

export default function EventForm({ event: selectedEvent, closeForm, createOrEdit, submitting }: Props) {

    const initialState = selectedEvent ?? newEvent();

    const [event, setEvent] = useState(initialState);
    const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(dayjs(event.date !== '' ? event.date : Date.now()));

    function handleSubmit(e: any) {
        e.preventDefault();

        event.date = startDate ? startDate.toISOString() : '';
        createOrEdit(event);
    }

    function handleInputChange(changeEvent: ChangeEvent<HTMLInputElement>) {
        const { name, value } = changeEvent.target;
        setEvent({...event, [name]: value});
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
                                    <LoadingButton loading={submitting} color="primary" variant="outlined" fullWidth type="submit">
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
}