import React, { useState } from 'react';
import {
    Avatar,
    AvatarGroup,
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
    Rating, // Add the Rating component
    Dialog, // Add the Dialog component
    DialogActions, // Add the DialogActions component
    DialogContent, // Add the DialogContent component
    DialogTitle, // Add the DialogTitle component
    Button, // Add the Button component
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Event } from '../../../app/models/event';
import { observer } from 'mobx-react-lite';
import dayjs from 'dayjs';
import { useTheme } from '@mui/material/styles';
import { Favorite, GroupAdd, Share } from '@mui/icons-material';
import EventOptionsMenu from '../../../app/layout/menus/EventOptionsMenu';

interface Props {
    event: Event;
}

function EventListItem({ event }: Props) {
    const theme = useTheme();
    const host = event.contributors.find((c) => c.status === 'Creator')?.user;
    const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
    const [userRating, setUserRating] = useState(0);

    const handleOpenRatingDialog = () => {
        setRatingDialogOpen(true);
    };

    const handleCloseRatingDialog = () => {
        setRatingDialogOpen(false);
    };

    const handleRateEvent = () => {
        // Implement the logic to submit the user's rating to the server or store it locally.
        // You can use the 'userRating' state for this.
        console.log(`Rated event "${event.title}" with ${userRating} stars.`);
        setRatingDialogOpen(false);
    };

    return (
        <Grid item xs={12} key={event.id} sx={{ /* ... styles ... */ }}>
            <Card sx={{ /* ... styles ... */ }}>
                <CardHeader
                    avatar={
                        <Tooltip title={host?.displayName} arrow>
                            <Avatar src={host?.photo || '/assets/user.png'} sx={{ /* ... styles ... */ }} />
                        </Tooltip>
                    }
                    action={<EventOptionsMenu event={event} />}
                    title={<Typography component="div" variant="body2" fontSize={18}>{event.title}</Typography>}
                    subheader={
                        <Box>
                            <Typography component="span" variant="subtitle2" fontWeight="100" color={theme.palette.secondary.dark}>
                                {dayjs(event.date!).format('MMMM DD, YYYY — h:mm A')}
                            </Typography>
                            <Divider sx={{ mb: 2, width: '50%' }} />
                            <Typography component="p" variant="caption" fontWeight="100" color={theme.palette.primary.dark}>
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
                <CardContent>
                    <AvatarGroup max={4} sx={{ justifyContent: 'right', m: -1 }}>
                        {/* ... attendees avatars ... */}
                    </AvatarGroup>
                </CardContent>
                <Divider />
                <CardActions disableSpacing>
                    <Tooltip title="Rate this event">
                        <IconButton aria-details="event-actions" aria-label="rate" onClick={handleOpenRatingDialog}>
                            <Favorite />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Share">
                        <IconButton aria-details="event-actions" aria-label="share">
                            <Share />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Attend this event">
                        <IconButton aria-details="event-actions" aria-label="attend" sx={{ marginLeft: 'auto' }}>
                            <GroupAdd />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>

            {/* Rating Dialog */}
            <Dialog open={ratingDialogOpen} onClose={handleCloseRatingDialog}>
                <DialogTitle>Rate "{event.title}"</DialogTitle>
                <DialogContent>
                    <Rating
                        name="event-rating"
                        value={userRating}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setUserRating(newValue);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseRatingDialog}>Cancel</Button>
                    <Button onClick={handleRateEvent} color="primary">
                        Rate
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

export default observer(EventListItem);
