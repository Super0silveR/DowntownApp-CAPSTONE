import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventContributors from './EventContributors';
import EventRatings from './EventRatings';
import EventRatingReviews from './EventRatingReviews';
import { Button, Grid, Card, CardMedia, CardContent, CardActions, Typography, Box, Stack, Divider, ButtonGroup } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import GroupIcon from '@mui/icons-material/Group';
import { useTheme } from '@mui/material/styles';

function EventDetails() {
    const { eventStore, userStore: { user } } = useStore();
    const { selectedEvent: event, loadEvent, loadingInitial } = eventStore;
    const { id } = useParams();
    const theme = useTheme();

    useEffect(() => {
        if (id) loadEvent(id);
    }, [id, loadEvent]);

    const isCreator = user?.userName === event?.creatorUserName;

    if (loadingInitial || !event) return <LoadingComponent content='Loading event...' />;

    return (
        <Box sx={{p:5,boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px',bgcolor:'rgba(249, 249, 249, 0.15)'}}>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                spacing={2}
                sx={{ marginBottom: 4 }}
            >
                <Box>
                    <Typography variant='h3'>Event Details</Typography>
                    <Typography variant='subtitle1' color={theme.palette.primary.main} fontStyle='italic'>
                        Review, rate and be informed of your favorite event.
                    </Typography>
                </Box>
                <Button
                    startIcon={<ArrowBackIcon />}
                    variant='contained'
                    component={Link}
                    to={`/events`}
                    sx={{
                        borderRadius: '5px',
                        backgroundColor: theme.palette.primary.main,
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                            color: theme.palette.primary.dark
                        },
                        padding: '10px 15px',
                        boxShadow: 1,
                        transition: '0.1s',
                    }}
                >
                    Back to Events
                </Button>
            </Stack>
            <Divider sx={{ my: 3 }} />
            <Grid container spacing={4} mt={2}>
                <Grid item xs={12} lg={8}>
                    <Card raised sx={{ borderRadius: 2, boxShadow: 3 }}>
                        <CardMedia
                            component="img"
                            alt="Event Image"
                            image={`/assets/categoryImages/${event.BgImage}`}
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
                        <CardActions >
                            <Stack direction='row' justifyContent='space-between' width='100%'>
                                {isCreator && <Button
                                    startIcon={<EditIcon />}
                                    variant='contained'
                                    color='primary'
                                    component={Link}
                                    to={`/manageEvent/${event.id}`}
                                    sx={{ minWidth: '125px' }} 
                                >
                                    Edit Event
                                </Button>}
                                <ButtonGroup>
                                    <Button
                                        startIcon={<GroupIcon />}
                                        variant='contained'
                                        color='success'
                                        sx={{ minWidth: '125px' }} 
                                    >
                                        Attend Event
                                    </Button>
                                    <Button
                                        startIcon={<LiveTvIcon />}
                                        variant='contained'
                                        color='info'
                                        component={Link}
                                        to={`/events/${event.id}/live`}
                                        sx={{TextTransform: 'none'}}
                                    >
                                        Join Live Event
                                    </Button>
                                </ButtonGroup>
                            </Stack>
                        </CardActions>

                    </Card>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <EventRatings rating={event.rating} />
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
