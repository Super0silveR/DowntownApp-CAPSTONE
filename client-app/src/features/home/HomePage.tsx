import { Container, Link as MuiLink, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

function HomePage() {

    const { modalStore, userStore } = useStore();

    return (
        <>
            <Container sx={{mt:'7em'}}>
                <Typography 
                    variant='h3' 
                    fontWeight={600} 
                    fontFamily='monospace'
                    sx={{
                        textDecoration:'underline'
                    }}
                >
                    Downtown
                </Typography>
                <Typography 
                    variant='body1' 
                    fontFamily='monospace'
                    sx={{
                        mb:2,
                        fontSize: 18
                    }}
                >
                    Let loose & connect!
                </Typography>
                { userStore.isLoggedIn 
                    ? (
                        <Typography 
                            variant='h5' 
                            fontWeight={500} 
                            fontFamily='monospace'
                        >
                            Go to our listed <Link to='/events'>Events</Link>!
                        </Typography>
                    ) 
                    : (
                        <>
                            <Typography 
                                variant='h5' 
                                fontWeight={500} 
                                fontFamily='monospace'
                            >
                                <MuiLink 
                                    component='button' 
                                    onClick={() => modalStore.openModal(<LoginForm />)}
                                    variant='overline'
                                    fontWeight={600}
                                    sx={{
                                        textDecoration:'none',
                                        fontSize: 20
                                    }}
                                >
                                    Login
                                </MuiLink> to start your adventure!
                            </Typography>
                            <MuiLink 
                                component='button' 
                                onClick={() => modalStore.openModal(<RegisterForm />)}
                                variant='overline'
                                fontWeight={600}
                                sx={{
                                    textDecoration:'none',
                                    fontSize: 20
                                }}
                            >
                                Register
                            </MuiLink>
                        </>
                    )}
            </Container>
        </>
    );
}; 

export default observer(HomePage);