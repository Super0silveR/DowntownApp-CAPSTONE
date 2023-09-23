import { Container, Button, Typography, Box } from '@mui/material';
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
        justifyContent: 'center',
        overflow: 'hidden',
        color: 'white', 
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          width: '250px',
          marginBottom: '2em',
        }}
      />
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
          mb={2}
        >
          <Typography
            variant='body1'
            fontFamily='monospace'
            sx={{
              mb: 2,
              fontSize: 18,
            }}
            
            
          >
          </Typography>
          <Typography
            variant='body1'
            fontFamily='monospace'
            sx={{
              mb: 2,
              fontSize: 18,
            }}
          >
          </Typography>
          <Typography
            variant='body1'
            fontFamily='monospace'
            sx={{
              mb: 2,
              fontSize: 18,
            }}
          >
          </Typography>
          {userStore.isLoggedIn ? (
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #e91e63, #9c27b0)',
                color: 'white',
                fontSize: '1.5rem',
                padding: '1em 3em',
                mt: 2,
              }}
              component={Link}
              to="/events"
              size="large"
            >
              Explore Events
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg, #e91e63, #9c27b0)',
                  color: 'white',
                  fontSize: '1.5rem',
                  padding: '1em 3em',
                  mt: 2,
                }}
                onClick={() => modalStore.openModal(<LoginForm />)}
                size="large"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => modalStore.openModal(<RegisterForm />)}
                size="large"
                sx={{
                  fontSize: '1.5rem',
                  padding: '1em 3em',
                  mt: 2,
                  background: 'linear-gradient(135deg, #e91e63, #e74c3c)',
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default observer(HomePage);
