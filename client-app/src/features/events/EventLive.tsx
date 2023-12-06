import { Box, Button, Grid, Paper, Typography, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { MonetizationOn } from '@mui/icons-material';

import { useStore } from '../../app/stores/store';
import EventRoom from './EventRoom';

function EventLive() {
    const theme = useTheme();
    const { eventStore, userStore: { user } } = useStore();
    const { selectedEvent: event } = eventStore;
    return (
        <>
            <Box>
                <Grid container spacing={2}>
                    <Grid container item spacing={1}>
                        <Grid item xs={12}>
                            {user?.userName}
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" component="div" >
                                Title: {event?.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <EventRoom />
                        </Grid>
                    </Grid>


                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                display: 'inline',
                                textDecoration: 'none',
                                fontFamily: 'monospace'
                            }}
                            component="span"
                            variant="h6"
                            color="text.secondary"
                        >
                            Participants
                        </Typography>
                        <Paper
                            sx={{
                                textAlign: 'center',
                                fontFamily: 'monospace',
                                padding: theme.spacing(1),
                                fontSize: 16
                            }}
                            elevation={3}
                        >
                            <Typography variant="body1" color="text.secondary">
                                No participants yet!
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            startIcon={<MonetizationOn />}
                            variant='contained'
                            color='primary'
                            sx={{ textTransform: 'none' }}
                        >
                            Donate
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default observer(EventLive);
