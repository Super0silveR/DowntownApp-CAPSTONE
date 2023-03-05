import { Avatar, Button, Divider, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Stack, Typography } from '@mui/material';
import React from 'react';
import { Event } from '../../../app/models/event';
import ImageIcon from '@mui/icons-material/Image';

interface Props {
    event: Event;
    selectEvent: (id: string) => void;
    deleteEvent: (id: string) => void;
}

export default function EventListItem({ event, selectEvent, deleteEvent }: Props) {
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
                            onClick={() => selectEvent(event.id)}
                        >
                            See More!
                        </Button>
                        <Button
                            variant='outlined'
                            size="small"
                            sx={{ borderRadius: '0.2rem' }}
                            onClick={() => deleteEvent(event.id)}
                            color='error'
                        >
                            Delete
                        </Button>
                    </Stack>
                </ListItemSecondaryAction>
            </ListItem>
        </>
    );
}