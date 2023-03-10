import { Button, Container, FormControl, Grid, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Event, emptyEvent } from '../../../app/models/event';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, DesktopDateTimePicker } from '@mui/x-date-pickers';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { v4 as uuid } from 'uuid';
import { Formik, Form, Field } from 'formik';
import { TextFieldsRounded } from '@mui/icons-material';

function EventForm() {

    const { eventStore } = useStore();
    const { createEvent, updateEvent, 
            loading, loadEvent, loadingInitial } = eventStore;

    /** React Router hook for fetching url params. */
    const { id } = useParams();
    const [currEvent, setEvent] = useState<Event>(emptyEvent);
    //const [date, setDate] = useState<Dayjs | null>(null);

    //const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(dayjs(event.date !== '' ? event.date : Date.now()));
    //const [disabled, setDisabled] = useState(true);

    //const navigate = useNavigate();

    /** 
     * Usage of the `!` operator because we KNOW the event will not be null.
     * Else we need to deal with nullable warnings from TS.
     */
    useEffect(() => {
        if (id) {
            loadEvent(id).then(event => {
                setEvent(event);
            });
        }
    }, [id, loadEvent]);

    // /** Handling the onSubmit logic. */
    // function handleSubmit(e: React.FormEvent<EventTarget>) {
    //     setDisabled(true);
    //     e.preventDefault();
    //     runInAction(() => {
    //         event.date = startDate ? startDate.toISOString() : '';
    //     });

    //     /** Redirecting the user depending on the action. */
    //     if (!event.id) {
    //         event.id = uuid();
    //         createEvent(event).then(value => {
    //             navigate(`/events/${event.id}`);
    //         }).catch(e => console.log(e));
    //     } else {
    //         updateEvent(event).then(() => {
    //             navigate(`/events/${event.id}`);
    //         }).catch(e => console.log(e));
    //     }
    // }

    // /** Clean-up necessary with the date picker and onChange handler. */
    // function handleInputChange(changeEvent: ChangeEvent<HTMLInputElement>) {
    //     const { name, value } = changeEvent.target;
    //     setEvent({ ...event, [name]: value });
    //     setDisabled(false);
    // }

    if (loadingInitial) return <LoadingComponent content='Loading Event..' />

    return (
        <>
            <Container maxWidth="md" sx={{my:3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>Create/Edit an Event!</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Formik<Event> enableReinitialize initialValues={currEvent} onSubmit={(values) => console.log(values)}>
                            {/** Deconstructing properties and functions form Formik that we'll use for our form. */}
                            {({ values, handleChange, handleSubmit, setFieldValue }) => (
                                <Form onSubmit={handleSubmit} autoComplete='off'>
                                    <Stack direction='column' spacing={2}>
                                        <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
                                            <Field placeholder='Category' name='eventCategoryId' />
                                        </FormControl>
                                        <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
                                            <Field placeholder='Type' name='eventTypeId' />                                            </FormControl>
                                        <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
                                            <Field placeholder='Title' name='title'
                                            />
                                        </FormControl>
                                        <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
                                            <Field placeholder='Description' name='description'
                                            />
                                        </FormControl>
                                        <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    format='DD MMMM, YYYY'
                                                    value={dayjs(values.date)}
                                                    onChange={(value) => setFieldValue('date', value)}
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                        <Stack direction='row' spacing={2}>
                                            <LoadingButton loading={loading} color="primary" variant="outlined" fullWidth type="submit">
                                                Submit
                                            </LoadingButton>
                                            <Button component={Link} to='/events' color="warning" variant="outlined" fullWidth>
                                                Cancel
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Form>                                
                            )}
                        </Formik>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default observer(EventForm);