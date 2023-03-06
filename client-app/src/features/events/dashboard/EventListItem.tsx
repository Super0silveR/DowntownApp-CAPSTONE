import { Avatar, Button, Divider, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Stack, Typography } from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import { Event } from '../../../app/models/event';
import ImageIcon from '@mui/icons-material/Image';
import LoadingButton from '@mui/lab/LoadingButton';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

interface Props {
    event: Event;
}

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
            <ListItem key={event.id}
                sx={{
                    transition: "0.3s",
                    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                    "&:hover": {
                        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                    },
                    textAlign: "left",
                    mb: 2,
                    width: '100%',
                    borderRadius: 1
                }}>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </ListItemAvatar>
                <Stack direction='column'>
                    <ListItemText
                        primary={event.title}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
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
                                    {event.date.toLocaleString()}
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
                            variant='outlined'
                            size="small"
                            sx={{ borderRadius: '0.2rem' }}
                            onClick={() => eventStore.selectEvent(event.id)}
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