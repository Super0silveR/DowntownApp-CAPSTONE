import { Avatar, AvatarGroup, Badge, Box, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material';
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

/** React component that represents an item in a list of events. */
function EventListItem({ event }: Props) {
    const theme = useTheme();

    /** Accessing the host through the list of contributors. WILL NEED CHANGES! */
    const host = event.contributors.find(c => c.status === 'Creator')?.user;

    return (
        <Grid item xs={12} 
            key={event.id}
            sx={{
                mb: 2,
                width: '100%',
                minHeight: 200,
                borderRadius: '0.3em',
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
                backgroundColor: '#9c27b0'
            }}
            alignItems='flex-start'
        >
            <Card
                sx={{
                    backgroundColor: '#be29ec', 
                    borderRadius: '0.3em',
                    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
                }}
            >
                <CardHeader
                    sx={{textAlign:'justify'}}
                    avatar={
                        <Tooltip title={host?.displayName} arrow>
                            <Avatar
                                src={host?.photo || '/assets/user.png'}
                                sx={{
                                    border: `0.1em solid ${host?.colorCode ?? theme.palette.primary.light}`,
                                    height: 112,
                                    width : 112
                                }}
                            /> 
                        </Tooltip>
                    }
                    action={
                        <EventOptionsMenu event={event} />
                    }
                    title={
                        <Typography
                            component="div"
                            variant="body2"
                            fontSize={18}
                        >
                            {event.title}
                        </Typography>
                    }
                    subheader={
                        <Box>
                            <Typography
                                component='span'
                                variant='subtitle2'
                                fontWeight='100'
                                color={theme.palette.secondary.dark}
                            >
                                {/** DayJs is our Date library */}
                                {dayjs(event.date!).format('MMMM DD, YYYY — h:mm A')}
                            </Typography>
                            <Divider sx={{mb:2,width:'50%'}} />
                            <Typography
                                component='p'
                                variant='caption'
                                fontWeight='100'
                                color={theme.palette.primary.dark}
                            >
                                Hosted by <Link to={host ? `/profiles/${host.userName}` : '#'}>{host?.displayName ?? 'Someone'}</Link>
                            </Typography>
                        </Box>
                    }
                /> 
                <Divider />
                <CardContent>
                    <Typography
                        variant="body2"
                        color={theme.palette.text.secondary}
                    >
                        {event.description}
                    </Typography>
                </CardContent>
                <Divider />
                <CardContent>
                    {/** TODO: Actually loading the attendees avatar. */}
                    <AvatarGroup max={4} sx={{justifyContent:'right',m:-1}}>
                        <Avatar aria-label='attendees' alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <Avatar aria-label='attendees' alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        <Avatar aria-label='attendees' alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                        <Avatar aria-label='attendees' alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                        <Avatar aria-label='attendees' alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    </AvatarGroup>
                </CardContent>
                <Divider />
                <CardActions disableSpacing>
                    <Tooltip title='Rate this event!'>
                        <IconButton aria-details='event-actions' aria-label="rate">
                            <Favorite />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Share'>
                        <IconButton aria-details='event-actions' aria-label="share">
                            <Share />
                        </IconButton>                        
                    </Tooltip>
                    <Tooltip title='Attend this event!'>
                        <IconButton aria-details='event-actions' aria-label="attend" sx={{marginLeft:'auto'}}>
                            <GroupAdd />
                        </IconButton>                        
                    </Tooltip>
                </CardActions>               
            </Card>
        </Grid>
    );
};

export default observer(EventListItem);