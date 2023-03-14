import { Container, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useStore } from '../../app/stores/store';

function HomePage() {

    const { userStore } = useStore();

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
                    sx={{mb:2}}
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
                        <Typography 
                            variant='h5' 
                            fontWeight={500} 
                            fontFamily='monospace'
                        >
                            <Link to='/login'>Login</Link> to start your adventure!
                        </Typography>
                    )}
            </Container>
        </>
    );
}; 

export default observer(HomePage);