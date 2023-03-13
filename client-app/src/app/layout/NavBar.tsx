import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Badge, Divider } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Whatshot } from '@mui/icons-material';

const pages = ['Bars', 'Events', 'Errors'];

/** 
 * React Component used as our Application NavBar.
 * Needs some rework.
 */
function ResponsiveAppBar() {
    return (
        <AppBar position="fixed">
            <Container maxWidth={false}>
                <Toolbar sx={{ margin:'0' }} disableGutters>
                    <Whatshot
                        fontSize='large'
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to='/'
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        DOWNTOWN
                    </Typography>
                    <Divider
                        orientation="vertical"
                        flexItem
                        style={{
                            marginTop: 10,
                            marginRight: 10,
                            marginBottom: 10,
                            borderWidth: '.1rem'
                        }} 
                    />
                    <Box textAlign='center' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button 
                            component={NavLink}
                            to='/bars'
                            color='inherit'
                            sx={{ my: 2, display: 'block' }}
                        >
                            {pages[0]}
                        </Button>
                        <Button 
                            component={NavLink}
                            to='/events'
                            color='inherit'
                            sx={{ my: 2, display: 'block' }}
                        >
                            {pages[1]}
                        </Button>
                        <Button 
                            component={NavLink}
                            to='/errors'
                            color='inherit'
                            sx={{ my: 2, display: 'block' }}
                        >
                            {pages[2]}
                        </Button>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={11} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;