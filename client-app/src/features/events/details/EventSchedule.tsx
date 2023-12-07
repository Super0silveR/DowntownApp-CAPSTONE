import React, { useState } from 'react';
import { Grid, Typography, Paper, Switch, FormControlLabel, Divider, Stack, Button } from '@mui/material';
import toast from 'react-hot-toast';
import { useStore } from '../../../app/stores/store';
import { EventSchedule } from '../../../app/models/eventSchedule';
import { observer } from 'mobx-react-lite';
import DateTimeInput from '../../../app/common/form/DateTimeInput';
import { LoadingButton } from '@mui/lab';
import { Formik } from 'formik';
import { Form } from 'react-router-dom';
import TextInput from '../../../app/common/form/TextInput';
import dayjs from 'dayjs';
import theme from '../../../app/theme';
import TicketManager from './TicketManager';
import TicketPurchase from './TicketPurchase';



interface Props {
    schedules: EventSchedule[];
    setSchedules: React.Dispatch<React.SetStateAction<EventSchedule[]>>;
    isCreator: boolean;
}

const EventScheduleComponent: React.FC<Props> = ({isCreator}: Props) => {
    const [newSchedule, setNewSchedule] = useState<EventSchedule>({
        id: 1,
        scheduled: new Date(),
        location: '',
        isRemote: true
    });

    const newBar = {
        title: 'auto-bar-creation',
        description: 'auto-bar-creation-for-event-'
    };

    // const handleDateChange = (id: number, date: string) => {
    //     setSchedules(schedules.map(schedule => schedule.id === id ? { ...schedule, date } : schedule));
    // };
    // const handleAddressChange = (id: number, address: string) => {
    //     setSchedules(schedules.map(schedule => schedule.id === id ? { ...schedule, address } : schedule));
    // };
    
    // const handleToggleRemote = (id: number) => {
    //     setSchedules(schedules.map(schedule => schedule.id === id ? { ...schedule, isRemote: !schedule.isRemote } : schedule));
    // };

    // const handleRemoveSchedule = (id: number) => {
    //     setSchedules(schedules.filter(schedule => schedule.id !== id));
    // };

    const { modalStore, eventStore: { selectedEvent, scheduleEvent } } = useStore();

    const handleAddNewSchedule = async (values: EventSchedule) => {
        if (!values.isRemote && (values.location === '')) {
            toast.error('Address is required for in-person events');
            return;
        }

        const barData = {
            title: newBar.title,
            description: newBar.description,
        };

        const eventScheduleData = {
            ...values,
            barData: barData,
            eventId: selectedEvent!.id,
            address: values.location,
            date: values.scheduled
        };

        try {
            await scheduleEvent(eventScheduleData);
            toast.success('Event and Bar scheduled successfully!');
        } catch (error) {
            console.error('Error scheduling event and creating bar:', error);
            toast.error('Error scheduling event and creating bar');
        }

        setNewSchedule({ id: 1, scheduled: new Date(), location: '', barId: '', isRemote: true });
    };

    // const handleDeleteAllSchedules = () => {
    //     setSchedules([]); 
    // };
    
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <Stack direction='row' justifyContent='space-between' width='100%' mb={1}>
                    <Typography
                        sx={{
                            display: 'inline',
                            textDecoration: 'none'
                        }}
                        component="span"
                        variant="h6"
                        color="text.secondary"
                    >
                        Event Schedules
                    </Typography>
                </Stack>
            </div>
            <Paper
                sx={{
                textAlign: 'center',
                fontFamily: 'monospace',
                padding: theme.spacing(1),
                fontSize: 16
                }}
                elevation={3}
            >
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} mb={2}>
                        <Formik<EventSchedule> 
                            enableReinitialize 
                            initialValues={newSchedule} 
                            onSubmit={(values) => handleAddNewSchedule(values)}
                        >
                            {/** Deconstructing properties and functions form Formik that we'll use for our form. */}
                            {({ handleSubmit, isValid, isSubmitting, dirty, values }) => { 
                                return (
                                    <Form onSubmit={handleSubmit} autoComplete='off'>
                                        <Stack direction='column' spacing={2}>      
                                            <DateTimeInput name='scheduled' label='Date' />
                                            <FormControlLabel
                                                name='isRemote'
                                                control={
                                                    <Switch
                                                        checked={newSchedule.isRemote}
                                                        onChange={() => setNewSchedule({ ...values, isRemote: !values.isRemote })}
                                                    />
                                                }
                                                label={newSchedule.isRemote ? 'Remote' : 'In-Person'}
                                            />
                                            {!values.isRemote && (            
                                                <TextInput name='location' placeholder='Location' label='Location' />
                                            )}
                                            <Stack direction='row' spacing={2}>
                                                <LoadingButton 
                                                    disabled={isSubmitting || !dirty || !isValid}
                                                    color="primary" 
                                                    variant="contained" 
                                                    fullWidth 
                                                    type="submit"
                                                >
                                                    <Typography fontFamily='monospace'>Schedule</Typography>
                                                </LoadingButton>
                                            </Stack>
                                        </Stack>
                                    </Form>                                
                                )
                            }}
                        </Formik>
                        <Divider sx={{mt: 2}} />
                    </Grid>
                    <Grid item xs={12}>
                        {selectedEvent?.schedules.map((schedule: EventSchedule, index: number) => (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem'}} key={index} >
                                <Typography key={index}>{`date: ${dayjs(schedule.scheduled!).format('MMMM DD — YYYY')} Tickets avaliable : ${schedule.availableTickets}`}</Typography>
                                { isCreator ?  <Button style={{backgroundColor: 'black'}} color='info' onClick={() => modalStore.openModal(<TicketManager scheduledEventId={schedule?.id} />)}>Generate Ticket</Button> 
                                : <Button style={{backgroundColor: 'black'}} color='info' onClick={() => modalStore.openModal(<TicketPurchase scheduledEventId={schedule?.id} />)} >Buy Ticket</Button>}      
                            </div>
                            
                            // <React.Fragment key={schedule.id}>
                            //     <Grid item xs={5}>
                            //         <TextField
                            //             label="Event Date"
                            //             type="date"
                            //             value={dayjs(schedule.scheduled!).format('yyyy-mm-dd')}
                            //             onChange={(e) => handleDateChange(schedule.id, e.target.value)}
                            //             fullWidth
                            //         />
                            //     </Grid>
                            //     <Grid item xs={2}>
                            //         <FormControlLabel
                            //             control={
                            //                 <Switch
                            //                     checked={schedule.isRemote}
                            //                     onChange={() => handleToggleRemote(schedule.id)}
                            //                 />
                            //             }
                            //             label={schedule.isRemote ? 'Remote' : 'In-Person'}
                            //         />
                            //     </Grid>
                            //     {!schedule.isRemote && (
                            //         <Grid item xs={10}>
                            //             <TextField
                            //                 label="Address"
                            //                 type="text"
                            //                 value={schedule.address || ''}
                            //                 onChange={(e) => handleAddressChange(schedule.id, e.target.value)}
                            //                 fullWidth
                            //             />
                            //         </Grid>
                            //     )}
                            //     <Grid item xs={12}>
                            //         <IconButton onClick={() => handleRemoveSchedule(schedule.id)} color="error">
                            //             <DeleteIcon />
                            //         </IconButton>
                            //     </Grid>
                            // </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default observer(EventScheduleComponent);
