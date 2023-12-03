import React, { useState } from 'react';
import { TextField, IconButton, Grid, Typography, Paper, Button, Switch, FormControlLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import toast from 'react-hot-toast';
import { useStore } from '../../../app/stores/store';

export interface EventSchedule {
    id: number; 
    date: string;
    location: string;
    isRemote: boolean;
    address?: string;
    barId?: string; 
    barData?: { 
        title: string;
        description: string;
    };
}

interface Props {
    schedules: EventSchedule[];
    setSchedules: React.Dispatch<React.SetStateAction<EventSchedule[]>>;
}

const EventScheduleComponent: React.FC<Props> = ({ schedules, setSchedules }) => {
    const [newSchedule, setNewSchedule] = useState<EventSchedule>({
        id: Date.now(),
        date: '',
        location: '',
        isRemote: true
    });

    const [newBar, setNewBar] = useState({
        title: '',
        description: ''
    });

    const handleDateChange = (id: number, date: string) => {
        setSchedules(schedules.map(schedule => schedule.id === id ? { ...schedule, date } : schedule));
    };
    const handleAddressChange = (id: number, address: string) => {
        setSchedules(schedules.map(schedule => schedule.id === id ? { ...schedule, address } : schedule));
    };

    const handleToggleRemote = (id: number) => {
        setSchedules(schedules.map(schedule => schedule.id === id ? { ...schedule, isRemote: !schedule.isRemote } : schedule));
    };

    const handleRemoveSchedule = (id: number) => {
        setSchedules(schedules.filter(schedule => schedule.id !== id));
    };

    const handleSaveSchedules = async () => {
    };
    const { eventStore } = useStore(); 

    const handleAddNewSchedule = async () => {
        const barData = {
            title: newBar.title,
            description: newBar.description,
        };

        const eventScheduleData = {
            ...newSchedule,
            barData: barData 
        };

        try {
            await eventStore.scheduleEvent(eventScheduleData);

            toast.success('Event and Bar scheduled successfully!');
        } catch (error) {
            console.error('Error scheduling event and creating bar:', error);
            toast.error('Error scheduling event and creating bar');
        }

        setNewBar({ title: '', description: '' });
        setNewSchedule({ id: Date.now(), date: '', location: '', barId: '', isRemote: true });
    };


    const handleDeleteAllSchedules = () => {
        setSchedules([]); 
    };


    return (
        <Paper style={{ padding: '1em', marginTop: '1em' }}>
            <Typography variant="h6">Event Schedules</Typography>
            <Grid container spacing={2} alignItems="center">
                {schedules.map(schedule => (
                    <React.Fragment key={schedule.id}>
                        <Grid item xs={5}>
                            <TextField
                                label="Event Date"
                                type="date"
                                value={schedule.date}
                                onChange={(e) => handleDateChange(schedule.id, e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={schedule.isRemote}
                                        onChange={() => handleToggleRemote(schedule.id)}
                                    />
                                }
                                label={schedule.isRemote ? 'Remote' : 'In-Person'}
                            />
                        </Grid>
                        {!schedule.isRemote && (
                            <Grid item xs={10}>
                                <TextField
                                    label="Address"
                                    type="text"
                                    value={schedule.address || ''}
                                    onChange={(e) => handleAddressChange(schedule.id, e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <IconButton onClick={() => handleRemoveSchedule(schedule.id)} color="error">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </React.Fragment>
                ))}
                <Grid item xs={5}>
                    <TextField
                        label="New Event Date"
                        type="date"
                        value={newSchedule.date || ''}
                        onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={newSchedule.isRemote}
                                onChange={() => setNewSchedule({ ...newSchedule, isRemote: !newSchedule.isRemote })}
                            />
                        }
                        label={newSchedule.isRemote ? 'Remote' : 'In-Person'}
                    />
                </Grid>
                {!newSchedule.isRemote && (
                    <Grid item xs={10}>
                        <TextField
                            label="New Address"
                            type="text"
                            value={newSchedule.address || ''}
                            onChange={(e) => setNewSchedule({ ...newSchedule, address: e.target.value })}
                            fullWidth
                        />
                    </Grid>
                )}
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IconButton onClick={handleAddNewSchedule} color="primary">
                        <AddIcon />
                    </IconButton>
                    <IconButton onClick={handleDeleteAllSchedules} color="secondary">
                        <DeleteForeverIcon />
                    </IconButton>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveSchedules}
                        fullWidth
                        style={{ marginTop: '1em' }}
                    >
                        Save Schedules
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default EventScheduleComponent;
