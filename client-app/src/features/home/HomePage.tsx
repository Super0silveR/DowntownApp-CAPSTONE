import { Container, Button, Typography, Box, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

import logo from '../../assets/logo.png';
import partyImage1HD from '../../assets/party1.jpg';

function HomePage() {
  const { modalStore, userStore } = useStore();

 
  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'linear-gradient(135deg, #9c27b0, #e91e63)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        color: 'white',
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          width: '400px',  // Adjust the width as needed
          marginBottom: '2em',
        }}
      />
      <div
        style={{
          fontSize: '2rem',
          color: '#e91e63',
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: '1em', // Adjust the top margin as needed
        }}
      >
        Stop swiping, start experiencing
        <span role="img" aria-label="sparkles" style={{ marginLeft: '0.5rem' }}>
    ✨
  </span>
      </div>
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '2em',
          borderRadius: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          marginTop: '2em',
          marginBottom: '2em',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #9c27b0, #e91e63)',
            opacity: 0.7,
          }}
        ></div>

        <img
          src={partyImage1HD}
          alt="Party 1"
          style={{
            width: '100%',
            transform: 'scale(1.1)',
            transition: 'transform 0.5s ease-in-out',
            filter: 'brightness(80%)',
          }}
        />

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
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
                    Login
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
                      background: 'linear-gradient(135deg, #e91e63, #e74c3c)',
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
