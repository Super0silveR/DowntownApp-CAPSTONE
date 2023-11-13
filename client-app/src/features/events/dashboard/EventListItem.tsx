import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    Tooltip,
    Typography,
    CardMedia,
    CardActionArea,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Event } from '../../../app/models/event';
import { observer } from 'mobx-react-lite';
import dayjs from 'dayjs';
import { useTheme } from '@mui/material/styles';
import { Favorite, GroupAdd, InfoOutlined, Share } from '@mui/icons-material';
import { useStore } from '../../../app/stores/store';
import { router } from '../../../app/router/Routes';
import EventRatingModal from './EventRatingModal';

interface Props {
    event: Event;
    isAlone: boolean;
}

function EventListItem({ event, isAlone }: Props) {
    const theme = useTheme();
    const host = event.contributors.find((c) => c.status === 'Creator')?.user;

    const { userStore: { user }, modalStore } = useStore();

    const isHost = host?.userName === user?.userName;

    return (
        <Grid item xs={isAlone ? 12 : 6} key={event.id}>
            <Card
                sx={{
                    mb:1
                }}
                variant='outlined'
            >
                <CardActionArea onClick={() => router.navigate(`/events/${event.id}`)}>
                    <CardMedia
                        component="img"
                        image={`/assets/categoryImages/${event.BgImage}`}
                        alt={`Category${event.BgImage}.jpg`}
                        sx={{p:0}}
                    />
                </CardActionArea>
                <CardHeader
                    avatar={
                        <Tooltip title={host?.displayName} arrow>
                            <Avatar src={host?.photo} />
                        </Tooltip>
                    }
                    title={<Typography component="div" variant="body2" fontSize={18}>{event.title}</Typography>}
                    subheader={
                        <Box>
                            <Typography component="span" variant="subtitle2" fontWeight="100" color={theme.palette.primary.light}>
                                {dayjs(event.date!).format('MMMM DD, YYYY — h:mm A')}
                            </Typography>
                            <Divider sx={{ mb: 2, width: '50%' }} />
                            <Typography component="p" variant="caption" fontWeight="100" color={theme.palette.primary.main}>
                                Hosted by <Link to={host ? `/profiles/${host.userName}` : '#'}>{host?.displayName ?? 'Someone'}</Link>
                            </Typography>
                        </Box>
                    }
                />
                <Divider />
                <CardContent>
                    <Typography variant="body2" color={theme.palette.text.secondary}>
                        {event.description}
                    </Typography>
                </CardContent>
                <Divider />
                <CardActions disableSpacing>
                    <Tooltip title="Rate this event">
                        <IconButton aria-details="event-actions" aria-label="rate" onClick={() => modalStore.openModal(<EventRatingModal rating={event.rating} />)}>
                            <Favorite />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Share">
                        <IconButton aria-details="event-actions" aria-label="share">
                            <Share />
                        </IconButton>
                    </Tooltip>
                    {isHost ? 
                        <Tooltip title={
                            'You are hosting this event!'
                        }>
                            <IconButton aria-details="event-actions" aria-label="hosting" sx={{ marginLeft: 'auto' }}>
                                <InfoOutlined />
                            </IconButton>
                        </Tooltip>
                        :     
                        <Tooltip title="Attend this event">
                            <IconButton aria-details="event-actions" aria-label="attend" sx={{ marginLeft: 'auto' }}>
                                <GroupAdd />
                            </IconButton>
                        </Tooltip>
                    }
                </CardActions>
            </Card>
            {/** TODO: Use our MODAL STORE for using modals. (See ProfileHeader.tsx) */}
            {/* <Dialog open={ratingDialogOpen} onClose={handleCloseRatingDialog}>
                <DialogTitle>Rate "{event.title}"</DialogTitle>
                <DialogContent>
                    <Rating
                        name="event-rating"
                        value={userRating}
                        precision={0.5}
                        onChange={(_, newValue) => {
                            if (!newValue) return;
                            setUserRating(newValue!);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseRatingDialog}>Cancel</Button>
                    <Button onClick={handleRateEvent} color="primary">
                        Rate
                    </Button>
                </DialogActions>
            </Dialog> */}
        </Grid>
    );
}

export default observer(EventListItem);
