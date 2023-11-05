import {
    Button,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import EventContributors from './EventContributors';
import EventRatings from './EventRatings';
import EventRatingReviews from './EventRatingReviews';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
        <Grid container spacing={4} sx={{ padding: theme.spacing(3) }}>
            <Grid item xs={12} lg={8}>
                <Card raised sx={{ borderRadius: 2, boxShadow: 3 }}>
                    <CardMedia
                        component="img"
                        alt="Event Image"
                        image={Image3}
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
            </Grid>
            <Grid item xs={12} lg={8}>
                <EventContributors contributors={event.contributors} />
            </Grid>
            <Grid item xs={12}>
                <EventRatingReviews ratings={event.rating.ratings} />
            </Grid>
        </Grid>
    );
}

export default observer(EventDetails);
