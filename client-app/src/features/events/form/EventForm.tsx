import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useState } from 'react';
import { Event, emptyEvent } from '../../../app/models/event';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Divider from '@mui/material/Divider';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import { categoryOptions } from '../../../app/common/form/options/eventCategoryOptions';
import { typeOptions } from '../../../app/common/form/options/eventTypeOptions';
import DateTimeInput from '../../../app/common/form/DateTimeInput';

function EventForm() {

    const { eventStore } = useStore();
    const { createEvent, updateEvent, 
            loading, loadEvent, loadingInitial } = eventStore;

    /** React Router hooks for fetching url params. */
    const { id } = useParams();
    const navigate = useNavigate();

    /** Set a local state for the created/edited event. */
    const [currEvent, setEvent] = useState<Event>(emptyEvent);
    const [create, setCreate] = useState(true);

    /** Validation schema using Yup. */
    const validationSchema = Yup.object<Event>({
        title: Yup.string().required().min(5).max(50),
        description: Yup.string().required().max(250),
        eventCategoryId: Yup.string().uuid().required(),
        eventTypeId: Yup.string().uuid().required(),
        date: Yup.string().required()
    });

    useEffect(() => {
        if (id) {
            loadEvent(id).then(event => {
                setEvent(event);
                setCreate(false);
            });
        }
    }, [id, loadEvent]);

    // /** Handling the onSubmit logic. */
    function handleFormSubmit(event: Event) {
        /** Redirecting the user depending on the action. */
        if (!event.id) {
            let newEvent = {
                ...event,
                id: uuid()
            };
            createEvent(newEvent).then(value => {
                navigate(`/events/${event.id}`);
            }).catch(e => console.log(e));
        } else {
            updateEvent(event).then(() => {
                navigate(`/events/${event.id}`);
            }).catch(e => console.log(e));
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading Event..' />

    return (
        <>
            <Container maxWidth="md" sx={{my:3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            variant='h4'
                            fontFamily='monospace'
                            sx={{textDecoration:'underline'}}
                            mb={2}
                        >
                            {create ? 'Create a new' : 'Edit an'} event!
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Formik<Event> 
                            enableReinitialize 
                            initialValues={currEvent} 
                            onSubmit={(values) => handleFormSubmit(values)}
                            validationSchema={validationSchema}
                        >
                            {/** Deconstructing properties and functions form Formik that we'll use for our form. */}
                            {({ handleSubmit, isValid, isSubmitting, dirty }) => { 
                                return (
                                    <Form onSubmit={handleSubmit} autoComplete='off'>
                                        <Stack direction='column' spacing={3}>                                          
                                            <TextInput name='title' placeholder='Title' label='Title' />
                                            <TextArea name='description' placeholder='Description' label='Description' />
                                            <SelectInput label='Category' placeholder='Category' name='eventCategoryId' options={categoryOptions} />
                                            <SelectInput label='Type' placeholder='Type' name='eventTypeId' options={typeOptions} />        
                                            <DateTimeInput name='date' label='Date' />                                 
                                            <Divider />
                                            <Stack direction='row' spacing={2}>
                                                <LoadingButton 
                                                    disabled={isSubmitting || !dirty || !isValid}
                                                    loading={loading} 
                                                    color="primary" 
                                                    variant="outlined" 
                                                    fullWidth 
                                                    type="submit"
                                                >
                                                    <Typography fontFamily='monospace'>Submit</Typography>
                                                </LoadingButton>
                                                <Button component={Link} to='/events' color="warning" variant="outlined" fullWidth>
                                                    <Typography fontFamily='monospace'>Cancel</Typography>
                                                </Button>
                                            </Stack>
                                        </Stack>
                                    </Form>                                
                                )
                            }}
                        </Formik>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default observer(EventForm);