import { DeleteForever, InfoOutlined, MoreVert } from '@mui/icons-material';
import { CircularProgress, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useStore } from '../../stores/store';
import { Event } from '../../models/event';
import { router } from '../../router/Routes';
import theme from '../../theme';
  
const ITEM_HEIGHT = 48;

interface Props {
    event: Event;
}

function EventOptionsMenu({ event } : Props) {

    const { 
        userStore: { user }, 
        eventStore: { deleteEvent, loading }
    } = useStore();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [target, setTarget] = useState('');

    const open = Boolean(anchorEl);
    const isCreator = user?.userName === event.creatorUserName;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleEventDelete(e: React.MouseEvent<HTMLLIElement, MouseEvent>, id: string) {
        setTarget(e.currentTarget.id);
        setAnchorEl(null);
        deleteEvent(id);
    }

    return (
        <>
            <IconButton 
                aria-details='event-actions' 
                aria-label="settings"
                aria-controls={open ? 'event-settings-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                id="event-settings-button"
                onClick={handleClick}
            >
                {(loading && target === 'event-delete-' + event.id) ? <CircularProgress size={24} /> :<MoreVert />}
            </IconButton>
            <Menu
                id="event-settings-menu"
                MenuListProps={{
                    'aria-labelledby': 'event-settings-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose}
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5
                        },
                    }
                }}
            >
                <MenuItem onClick={() => router.navigate(`/events/${event.id}`)}>
                    <ListItemIcon>
                        <InfoOutlined sx={{color:theme.palette.primary.dark}} fontSize="small" />
                    </ListItemIcon>
                    See more
                </MenuItem>
                {isCreator && <Divider />}
                {isCreator &&
                    <MenuItem id={`event-delete-${event.id}`} onClick={(e) => handleEventDelete(e, event.id)}>
                        <ListItemIcon>
                            <DeleteForever sx={{color:theme.palette.primary.dark}} fontSize="small" />
                        </ListItemIcon>
                        Delete
                    </MenuItem>
                }
            </Menu>
        </>
    );
}

export default observer(EventOptionsMenu);