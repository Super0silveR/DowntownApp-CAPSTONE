import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';
import AccountMenu from './menus/AccountMenu';
import logo from '../../assets/logo-4c-white-transparency@print.png';

const pages = ['Bars', 'Events', 'Errors'];

function ResponsiveAppBar() {
    const { userStore: { user, logout, isLoggedIn } } = useStore();

    return (
        <AppBar position="fixed" sx={{ background: 'black' }}>
            <Container maxWidth={false}>
                <Toolbar sx={{ margin:'0' }} disableGutters>
                    <NavLink to="/"> {}
                        <img src={logo} alt="Logo" style={{ width: '250px', height: '100px', marginRight: '10px' }} />
                    </NavLink>
                    {isLoggedIn && 
                    <>
                        <Divider
                            orientation="vertical"
                            flexItem
                            style={{
                                marginTop: 22,
                                marginRight: 10,
                                marginBottom: 22,
                                borderWidth: '.1rem',
                                backgroundColor: 'white',
                                opacity: 0.5
                            }}
                        />
                        <Box textAlign='center' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button 
                                component={NavLink}
                                to='/bars'
                                color='inherit'
                                sx={{
                                    my: 2,
                                    display: 'block',
                                    '&:hover': {
                                        color: 'purple',
                                    }
                                }}
                            >
                                {pages[0]}
                            </Button>
                            <Button 
                                component={NavLink}
                                to='/events'
                                color='inherit'
                                sx={{
                                    my: 2,
                                    display: 'block',
                                    '&:hover': {
                                        color: 'purple',
                                    }
                                }}
                            >
                                {pages[1]}
                            </Button>
                            <Button 
                                component={NavLink}
                                to='/errors'
                                color='inherit'
                                sx={{
                                    my: 2,
                                    display: 'block',
                                    '&:hover': {
                                        color: 'purple',
                                    }
                                }}
                            >
                                {pages[2]}
                            </Button>
                            <AccountMenu logout={logout} user={user} />
                        </Box>
                    </>}
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

export default observer(ResponsiveAppBar);
