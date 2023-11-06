import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventContributors from './EventContributors';
import EventRatings from './EventRatings';
import EventRatingReviews from './EventRatingReviews';
import { Button, Grid, Card, CardMedia, CardContent, CardActions, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import GroupIcon from '@mui/icons-material/Group';
import Image3 from '../../../assets/party3.jpg';
import { useTheme } from '@mui/material/styles';
import partyImage2HD from '../../../assets/party2.jpg';

function EventDetails() {
    const { eventStore } = useStore();
    const { selectedEvent: event, loadEvent, loadingInitial } = eventStore;
    const { id } = useParams();
    const theme = useTheme();

    useEffect(() => {
        if (id) loadEvent(id);
    }, [id, loadEvent]);

    if (loadingInitial || !event) return <LoadingComponent content='Loading event...' />;

    return (
        <Box sx={{
            backgroundImage: `url(${partyImage2HD})`,
            padding: theme.spacing(3),
            minHeight: '100vh',
            paddingTop: theme.spacing(10),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#f7f7f7',
        }}>
            <Grid container spacing={4}>
                <Grid item xs={12} lg={8}>
                    {/* Event details and image */}
                    <Card raised sx={{ borderRadius: 2, boxShadow: 3 }}>
                        <CardMedia
                            component="img"
                            alt="Event Image"
                            image={event.image || Image3}
                            sx={{ height: 260, objectFit: 'cover' }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                {event.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {event.description}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px 8px' }}>
                            <Button
                                startIcon={<EditIcon />}
                                variant='contained'
                                color='primary'
                                component={Link}
                                to={`/manageEvent/${event.id}`}
                                sx={{ borderRadius: '0.2rem' }}
                            >
                                Edit Event
                            </Button>
                            <Button
                                startIcon={<ArrowBackIcon />}
                                variant='outlined'
                                color='secondary'
                                component={Link}
                                to={`/events`}
                                sx={{ borderRadius: '0.2rem' }}
                            >
                                Back to Events
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <EventRatings rating={event.rating} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: theme.spacing(2) }}>
                        <Button
                            variant='contained'
                            startIcon={<GroupIcon />}
                            color='success'
                            sx={{ marginBottom: theme.spacing(1) }}
                        // Add your onClick event handler for attending event
                        >
                            Attend Event
                        </Button>
                        <Button
                            variant='contained'
                            startIcon={<LiveTvIcon />}
                            color='info'
                        // Add your onClick event handler for joining live event
                        >
                            Join Live Event
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={12} lg={8}>
                    <EventContributors contributors={event.contributors} />
                </Grid>

                <Grid item xs={12}>
                    <EventRatingReviews ratings={event.rating.ratings} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default observer(EventDetails);
