import { Container, Button, Box, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';
import homeBackgroundVideo from '../../assets/video/homeBackgroundVideo.mp4'
import NavBar from '../../app/layout/NavBar';
import { Filter } from '@mui/icons-material';

function HomePage() {
  const { modalStore, userStore } = useStore()

  return (
    <div style={{ backgroundColor: 'black', overflow: 'hidden', position: 'relative', height: '100vh' }}>
      <NavBar />
      <video autoPlay loop muted id="homeBackgroundVideo" style={{
    minWidth: '1920px',
    width: '100%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    filter: 'blur(5px)'
  }}>
        <source src={homeBackgroundVideo} type="video/mp4"></source>
      </video>

      <Container style={{ top: '80%', height: '100%', display: 'grid', alignItems: 'center' }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          zIndex="1"
        >
          <Grid container spacing={2} justifyContent="center">
            {userStore.isLoggedIn ? (
              <Grid item>
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, rgba(233, 30, 99, 1), rgba(156, 39, 176, 1))',
              
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
                      background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.8), rgba(156, 39, 176, 0.8))',
                      color: 'white',
                      fontSize: '1.5rem',
                      padding: '1em 3em',
                      minWidth: '335px'
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
                      background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.8), rgba(233, 30, 99, 0.8))',
                      color: 'white',
                      fontSize: '1.5rem',
                      padding: '1em 3em',
                      minWidth: '335px'
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
                      background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.8), rgba(163, 142, 49, 0.8))',
                      minWidth: '335px'
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
  );
}

export default observer(HomePage);
