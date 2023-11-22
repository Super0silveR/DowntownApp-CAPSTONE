import { Box, Button, Stack, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import { Event, emptyEvent } from '../../../app/models/event';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Divider from '@mui/material/Divider';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateTimeInput from '../../../app/common/form/DateTimeInput';
import FormContainer from '../../../app/common/form/FormContainer';
import ContentBox from '../../../app/common/components/ContentBox';
import theme from '../../../app/theme';
import ContentHeader from '../../../app/common/components/ContentHeader';
import { ArrowBack } from '@mui/icons-material';

function EventForm() {

    const { eventStore, lookupStore } = useStore();
    const { createEvent, updateEvent, 
        loading, loadEvent, loadingInitial } = eventStore;
    const { loadEventCategories, eventCategorySelectOptions,
        loadEventTypes, eventTypeSelectOptions, loadingCommon } = lookupStore;

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
        try {
            if (id) {
                loadEvent(id).then(event => {
                    setEvent(event);
                    setCreate(false);
                });
            }
            loadEventCategories();
            loadEventTypes();
        } catch (e) {
            console.log(e);
        }
    }, [id, loadEvent, loadEventCategories, loadEventTypes]);

    // /** Handling the onSubmit logic. */
    function handleFormSubmit(event: Event) {
        /** Redirecting the user depending on the action. */
        if (!event.id) {
            const newEvent = {
                ...event,
                id: uuid()
            };
            createEvent(newEvent).then(() => {
                navigate(`/events/${event.id}`);
            }).catch(e => console.log(e));
        } else {
            updateEvent(event).then(() => {
                navigate(`/events/${event.id}`);
            }).catch(e => console.log(e));
        }
    }

    if (loadingInitial || loadingCommon) return <LoadingComponent content='Loading Event..' />

    return (
        <ContentBox 
            content={(
                <>
                    <ContentHeader 
                        title={`${create ? 'Create a new' : 'Edit an'} event!`}
                        subtitle='Let your imagination go!'
                        displayActionButton={true}
                        actionButtonLabel='Back to events'
                        actionButtonStartIcon={<ArrowBack />}
                        actionButtonDest='/events'
                    />
                    <FormContainer
                        title=''
                        form={
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
                                                <SelectInput label='Category' placeholder='Category' name='eventCategoryId' options={eventCategorySelectOptions} />
                                                <SelectInput label='Type' placeholder='Type' name='eventTypeId' options={eventTypeSelectOptions} />        
                                                <DateTimeInput name='date' label='Date' />                                 
                                                <Divider />
                                                <Stack direction='row' spacing={2}>
                                                    <LoadingButton 
                                                        disabled={isSubmitting || !dirty || !isValid}
                                                        loading={loading} 
                                                        color="primary" 
                                                        variant="contained" 
                                                        fullWidth 
                                                        type="submit"
                                                    >
                                                        <Typography fontFamily='monospace'>Submit</Typography>
                                                    </LoadingButton>
                                                    <Button component={Link} to='/events' color="warning" variant="contained" fullWidth>
                                                        <Typography fontFamily='monospace'>Cancel</Typography>
                                                    </Button>
                                                </Stack>
                                            </Stack>
                                        </Form>                                
                                    )
                                }}
                            </Formik>
                        }
                        minWidth={700}
                    />
                </>
            )}
        />
    );
}

export default observer(EventForm);