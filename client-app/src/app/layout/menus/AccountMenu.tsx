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
import { User } from '../../models/user';
import { Badge } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { router } from '../../router/Routes';
import { observer } from 'mobx-react-lite';

interface Props {
    user: User | null;
    logout: () => void;
}

function AccountMenu({ logout, user }: Props) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (user) 
            setAnchorEl(e.currentTarget);
        else
            router.navigate('/login');
    };
    /** Test route for Mailboxpage */
    const mailbox = (e: React.MouseEvent<HTMLElement>) => {
        if (user)
            router.navigate('/mailbox');
        else
            router.navigate('/login');
    }

    const handleClose = (e: React.MouseEvent<HTMLElement>) => {
        if (e.currentTarget.id === 'user-logout')
            logout();
        setAnchorEl(null);
    };

    return (
        <>
            <Box sx={{  display: { xs: 'none', md: 'flex' }, alignItems: 'center', textAlign: 'center' }}>
                {
                    user &&
                    <>
                        <IconButton size="small" aria-label="show 4 new mails" color="inherit" component={NavLink}
                            to='/mailbox'>
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            sx={{ ml: 1 }}
                            size="small"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            
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
                            }} 
                        />
                    </>
                }
                <Tooltip title={!user ? 'Login' : user.displayName}>
                    <IconButton
                        edge="end"
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 1 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        color="inherit"
                    >
                        {user 
                            ? <Avatar 
                                src={user?.photo || '/assets/user.png'} 
                                sx={{ width: 24, height: 24 }} 
                                /> 
                            : <AccountCircle />}
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem component={Link} to={`/profiles/${user?.userName}`} onClick={handleClose}>
                    <ListItemIcon>
                        <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    {user?.displayName}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem id='user-logout' onClick={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}

export default observer(AccountMenu);