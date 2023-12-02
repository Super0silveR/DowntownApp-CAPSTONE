import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { Badge } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { router } from '../../router/Routes';
import { User } from '../../models/user';

interface Props {
    user: User | null;
    logout: () => void;
}

export function AccountMenu({ logout, user }: Props) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (user)
            setAnchorEl(e.currentTarget);

        else
            router.navigate('/login');
    };

    const handleClose = (e: React.MouseEvent<HTMLElement>) => {
        if (e.currentTarget.id === 'user-logout')
            logout();
        setAnchorEl(null);
    };

    return (
        <>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', textAlign: 'center' }}>
                {user &&
                    <>
                        <IconButton
                            aria-label="show 4 new mails"
                            aria-details='base'
                            component={NavLink}
                            to='/messages'
                        >
                            <Badge badgeContent={4}>
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            sx={{ ml: 1 }}
                            aria-label="show 17 new notifications"
                            aria-details='base'
                        >
                            <Badge badgeContent={11} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Divider
                            orientation="vertical"
                            flexItem
                            style={{
                                marginLeft: 12,
                                borderWidth: '.1rem'
                            }} />
                    </>}
                <Tooltip title={!user ? 'Login' : user.displayName}>
                    <IconButton
                        edge="end"
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 1 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-details='base'
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        color="inherit"
                    >
                        {user
                            ?
                            <Avatar
                                src={user?.photo || '/assets/user.png'}
                                sx={{ width: 42, height: 42 }}
                                aria-label='account-avatar' />
                            : <AccountCircle sx={{ width: 42, height: 42 }} />}
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem component={Link} to={`/profiles/${user?.userName}`} onClick={handleClose}>
                    <ListItemIcon aria-details='account-menu-icon'>
                        <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    {user?.displayName}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon aria-details='account-menu-icon'>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon aria-details='account-menu-icon'>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem id='user-logout' onClick={handleClose}>
                    <ListItemIcon aria-details='account-menu-icon'>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}
