import { Avatar, Button, Divider, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Stack, Typography } from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../../../app/models/event';
import ImageIcon from '@mui/icons-material/Image';
import LoadingButton from '@mui/lab/LoadingButton';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

interface Props {
    event: Event;
}

/** React component that represents an item in a list of events. */
function EventListItem({ event }: Props) {
    const { eventStore } = useStore();
    const { deleteEvent, loading } = eventStore;

    const [target, setTarget] = useState('');

    function handleEventDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteEvent(id);
    }

    return (
        <>
            <ListItem 
                component={Link}
                to={`/events/${event.id}`}
                key={event.id}
                sx={{
                    transition: "0.3s",
                    boxShadow: "0 2px 10px -3px rgba(0,0,0,0.3)",
                    "&:hover": {
                        boxShadow: "0 4px 13px -3.125px rgba(0,0,0,0.3)"
                    },
                    textAlign: "left",
                    mb: 2,
                    width: '100%',
                    borderRadius: '1em',
                    color: 'primary.dark',
                    backgroundColor: 'rgba(221,221,221,0.2)'
                }}
            >
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </ListItemAvatar>
                <Stack direction='column'>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <Typography
                                    sx={{ 
                                        display: 'inline',
                                        textDecoration: 'underline',
                                        fontFamily:'monospace' 
                                    }}
                                    component="span"
                                    variant="body2"
                                    color="primary.dark"
                                >
                                    {event.title}
                                </Typography>
                            </React.Fragment>
                        }
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ 
                                        display: 'inline',
                                        textDecoration: 'none',
                                        fontFamily:'monospace' 
                                    }}
                                    component="span"
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {event.description}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    <ListItemText
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component='span'
                                    variant='subtitle2'
                                    fontWeight='100'
                                    color="secondary.dark"
                                >
                                    {event.date?.toString()}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </Stack>
                <ListItemSecondaryAction>
                    <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={1}
                    >
                        <Button
                            component={Link}
                            to={`/events/${event.id}`}
                            variant='outlined'
                            size="small"
                            sx={{ borderRadius: '0.2rem' }}
                        >
                            See More!
                        </Button>
                        <LoadingButton
                            name={event.id}
                            loading={loading && target === event.id}
                            variant='outlined'
                            size="small"
                            sx={{ borderRadius: '0.2rem' }}
                            onClick={(e) => handleEventDelete(e, event.id)}
                            color='error'
                        >
                            Delete
                        </LoadingButton>
                    </Stack>
                </ListItemSecondaryAction>
            </ListItem>
        </>
    );
};

export default observer(EventListItem);