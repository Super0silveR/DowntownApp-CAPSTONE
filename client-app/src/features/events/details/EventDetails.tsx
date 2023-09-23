import { Button, Grid, Paper, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import EventContributors from './EventContributors';
import EventRatings from './EventRatings';
import EventRatingReviews from './EventRatingReviews';

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
            <Grid container>
                <Grid container sx={{mb:2}} spacing={2}>
                    <Grid item xs={12} md={9} sm={6}>
                        <Typography
                            sx={{ 
                                display: 'inline',
                                textDecoration: 'none',
                                fontFamily:'monospace'
                            }}
                            component="span"
                            variant="h6"
                            color="text.secondary"
                        >
                            Your Event!
                        </Typography>
                        <Paper 
                            sx={{
                                textAlign: 'center',
                                fontFamily: 'monospace',
                                padding: theme.spacing(2),
                                fontSize: 16
                            }} 
                            elevation={3}
                        >
                            Your event main informations and details.
                        </Paper>   
                    </Grid>
                    <Grid item xs={12} md={3} sm={6}>
                        <Typography
                            sx={{ 
                                display: 'inline',
                                textDecoration: 'none',
                                fontFamily:'monospace'
                            }}
                            component="span"
                            variant="h6"
                            color="text.secondary"
                        >
                            Upcoming!
                        </Typography>
                        <Paper 
                            sx={{
                                textAlign: 'center',
                                fontFamily: 'monospace',
                                padding: theme.spacing(2),
                                fontSize: 16
                            }} 
                            elevation={3}
                        >
                            Your event upcoming schedule.
                        </Paper>         
                    </Grid>
                </Grid>
                <Grid container sx={{mb:2}} spacing={2}>
                    <Grid item xs={12} md={9} sm={6}>
                        <EventContributors contributors={event.contributors} /> 
                    </Grid>
                    <Grid item xs={12} md={3} sm={6}>
                        <EventRatings rating={event.rating} />            
                    </Grid>
                    <Grid item xs={12} md={3} sm={6}>
                        <Button
                            variant='outlined'
                            color='primary'
                            size="small"
                            sx={{ borderRadius: '0.2rem' }}
                            component={Link}
                            to={`/manageEvent/${event.id}`}
                        >
                            Edit
                        </Button>           
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <EventRatingReviews ratings={event.rating.ratings} />
                    </Grid>
                </Grid>
            </Grid>
            {/* <Card
                sx={{ml:2,my:1}}
            >
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="200"
                    image={`/assets/categoryImages/${randomIntFromInterval(1, 5)}.jpg`}
                    sx={{
                        p: 'none',
                        objectFit: 'cover',
                        height: '15em'
                    }}
                />
                <CardContent sx={{ padding: theme.spacing(1.5) }}>
                    <Typography
                        className={"MuiTypography--heading"}
                        variant={"h6"}
                        gutterBottom
                        sx={{
                            color: 'secondary.dark'
                        }}
                    >
                        {event.title}
                    </Typography>
                    <Typography
                        className={"MuiTypography--subheading"}
                        variant={"caption"}
                        sx={{
                            color: 'secondary.light'
                        }}
                    >
                        {event.description}
                    </Typography>
                </CardContent>
                <Box sx={{ padding: theme.spacing(1.5) }}>
                    <CardActions>
                        <Stack
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem />}
                            spacing={1}
                        >
                            <Button
                                variant='outlined'
                                color='primary'
                                size="small"
                                sx={{ borderRadius: '0.2rem' }}
                                component={Link}
                                to={`/manageEvent/${event.id}`}
                            >
                                Edit
                            </Button>
                            <Button
                                variant='outlined'
                                color='warning'
                                size="small"
                                sx={{ borderRadius: '0.2rem' }}
                                component={Link}
                                to='/events'
                            >
                                Close
                            </Button>
                        </Stack>
                    </CardActions>
                </Box>
            </Card> */}
        </>
    );
};

export default observer(EventDetails);