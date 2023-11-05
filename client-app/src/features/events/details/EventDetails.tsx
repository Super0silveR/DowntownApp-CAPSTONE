import { Button, Grid, Paper, Typography, Card, CardMedia, CardContent, CardActions, Box, Stack, Divider } from '@mui/material';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import EventContributors from './EventContributors';
import EventRatings from './EventRatings';
import EventRatingReviews from './EventRatingReviews';
import Image3 from '../../../assets/party3.jpg';

function EventDetails() {
    const { eventStore } = useStore();
    const { selectedEvent: event, loadEvent, loadingInitial } = eventStore;
    const { id } = useParams();
    const theme = useTheme();

    useEffect(() => {
        if (id) loadEvent(id);
    }, [id, loadEvent]);

    if (loadingInitial || !event) return <LoadingComponent />;

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                    <Card raised>
                        <CardMedia
                            component="img"
                            alt="Event Image"
                            height="200"
                            image={Image3} 
                            sx={{ objectFit: 'cover', height: '15em' }}
                        />

                        <CardContent>
                            <Typography gutterBottom variant="h5">
                                {event.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {event.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant='contained'
                                color='primary'
                                component={Link}
                                to={`/manageEvent/${event.id}`}
                                sx={{ borderRadius: '0.2rem', marginLeft: theme.spacing(1) }}
                            >
                                Edit Event
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <EventRatings rating={event.rating} />
                </Grid>
                <Grid item xs={12} lg={8}>
                    <EventContributors contributors={event.contributors} />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Button
                        fullWidth
                        variant='outlined'
                        color='secondary'
                        component={Link}
                        to={`/events`}
                        sx={{ borderRadius: '0.2rem' }}
                    >
                        Back to Events List
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <EventRatingReviews ratings={event.rating.ratings} />
                </Grid>
            </Grid>
        </>
    );
}

export default observer(EventDetails);
