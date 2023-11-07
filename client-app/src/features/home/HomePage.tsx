import { Container, Button, Box, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';
import Footer from '../../app/layout/Footer';
import homeBackgroundVideo from '../../../public/assets/homeBackgroundVideo.mp4'
import NavBar from '../../app/layout/NavBar';

function HomePage() {
  const { modalStore, userStore } = useStore();
 
  return (
    <div style={{backgroundColor: 'black'}}>
      <NavBar/>
      <div style={{}}>
      <video autoPlay loop muted id ='homeBackgroundVideo' style={{
        justifyContent: 'center',
        position: 'static',
        top: '0px',
        width: '100%',
        zIndex: '-1',
        filter: 'blur(0px)'      
      }}>
        <source src={homeBackgroundVideo} type='video/mp4'></source>
      </video>
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="0px"
          position='relative'
          top='-150px'
          margin='0px'
          padding='0px'
        >
          <Grid container spacing={2} justifyContent="center">
            {userStore.isLoggedIn ? (
              <Grid item>
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, #e91e63, #9c27b0)',
                    color: 'white',
                    fontSize: '1.5rem',
                    padding: '1em 3em',
                  }}
                  component={Link}
                  to="/events"
                  size="large"
                >
                  Explore Events
                </Button>
              </Grid>
            ) : (
              <>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(135deg, #e91e63, #9c27b0)',
                      color: 'white',
                      fontSize: '1.5rem',
                      padding: '1em 3em',
                    }}
                    onClick={() => modalStore.openModal(<LoginForm />)}
                    size="large"
                  >
                    I am Creator
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(135deg, #9c27b0, #e91e63)',
                      color: 'white',
                      fontSize: '1.5rem',
                      padding: '1em 3em',
                    }}
                    onClick={() => modalStore.openModal(<LoginForm />)}
                    size="large"
                  >
                    I am Attendee
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => modalStore.openModal(<RegisterForm />)}
                    size="large"
                    sx={{
                      fontSize: '1.5rem',
                      padding: '1em 3em',
                      background: 'linear-gradient(135deg, #e91e63, #A38E31)',
                    }}
                  >
                    Register
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Container>
      </div>
      <div style={{ position: 'static'}}>
       <Footer/>
      </div>

    </div>
  );
}

export default observer(HomePage);
