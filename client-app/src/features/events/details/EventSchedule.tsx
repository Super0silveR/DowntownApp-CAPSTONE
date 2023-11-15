import React, { useState } from 'react';
import { TextField, IconButton, Grid, Typography, Paper, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

export interface EventSchedule {
    id: number;
    date: string;
    location: string;
}

interface Props {
    schedules: EventSchedule[];
    setSchedules: React.Dispatch<React.SetStateAction<EventSchedule[]>>;
}

export const EventSchedule: React.FC<Props> = ({ schedules, setSchedules }) => {
    const [newSchedule, setNewSchedule] = useState<EventSchedule>({ id: Date.now(), date: '', location: '' });

    const handleAddSchedule = () => {
        if (newSchedule.date && newSchedule.location) {
            setSchedules([...schedules, newSchedule]);
            setNewSchedule({ id: Date.now(), date: '', location: '' }); 
        }
    };

    const handleDateChange = (id: number, date: string) => {
        setSchedules(schedules.map(schedule => schedule.id === id ? { ...schedule, date } : schedule));
    };

    const handleLocationChange = (id: number, location: string) => {
        setSchedules(schedules.map(schedule => schedule.id === id ? { ...schedule, location } : schedule));
    };

    const handleRemoveSchedule = (id: number) => {
        setSchedules(schedules.filter(schedule => schedule.id !== id));
    };
    const handleSaveSchedules = async () => {

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
                        <Grid item xs={5}>
                            <TextField
                                label="Location"
                                type="text"
                                value={schedule.location}
                                onChange={(e) => handleLocationChange(schedule.id, e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={2}>
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
                <Grid item xs={5}>
                    <TextField
                        label="New Location"
                        type="text"
                        value={newSchedule.location}
                        onChange={(e) => setNewSchedule({ ...newSchedule, location: e.target.value })}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={2}>
                    <IconButton onClick={handleAddSchedule} color="primary">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSaveSchedules}
                style={{ marginTop: '1em' }}
            >
                Save Schedules
            </Button>

        </Paper>
    );
};
export default EventSchedule;


