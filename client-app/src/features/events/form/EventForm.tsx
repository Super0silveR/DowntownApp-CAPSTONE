import { Button, Container, FormControl, Grid, Stack, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { Event, newEvent } from '../../../app/models/event';

interface Props {
    event: Event | undefined;
    closeForm: () => void;
    createOrEdit: (event: Event) => void;
}

export default function EventForm({ event: selectedEvent, closeForm, createOrEdit }: Props) {

    const initialState = selectedEvent ?? newEvent();

    const [event, setEvent] = useState(initialState);

    function handleSubmit(e: any) {
        e.preventDefault();
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
                                <Stack direction='row' spacing={2}>
                                    <Button color="primary" variant="outlined" fullWidth type="submit">
                                        Submit
                                    </Button>
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