import { Container, Link as MuiLink, Typography, AppBar, Button, IconButton, Toolbar, Box} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';
import monImage from '../../features/home/image.png';

function HomePage() {
  const { modalStore, userStore } = useStore();

  const handleLoginClick = () => {
    // Handle login logic here
  };

  const handlePasswordClick = () => {
    // Handle password logic here
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h3"
            fontWeight={600}
            fontFamily="-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', 'Fira Sans', Ubuntu, Oxygen, 'Oxygen Sans', Cantarell, 'Droid Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Lucida Grande', Helvetica, Arial, sans-serif;"

            sx={{
              fontSize: '2.5rem'
            }}
          >
            Downtown
          </Typography>

          <div>
            {userStore.isLoggedIn ? (
              <Button
                component={Link}
                to="/events"
                variant="contained"
                color="secondary"
                sx={{ mr: 2 }}
              >
                Events
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => modalStore.openModal(<LoginForm />)}
                  sx={{ mr: 1,  borderRadius: '50px' }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => modalStore.openModal(<RegisterForm />)}
                  sx={{ borderRadius: '50px' }}
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
      

      <Container sx={{ mt: '7em',
       // Remplacez cette couleur par celle que vous souhaitez utiliser
     }}>
        <Typography
          variant="h3"
          font-size =" 32px"
          font-weight= "300"
          fontFamily="-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', 'Fira Sans', Ubuntu, Oxygen, 'Oxygen Sans', Cantarell, 'Droid Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Lucida Grande', Helvetica, Arial, sans-serif;"
          sx={{
            color: '#8f5849',
            mb: '1em'
          }}
        >
          Welcome to <br/> Downtown !
        </Typography>

    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <p style={{ fontSize: '20px' }}>Welcome to our online platform! With our convenient downtown application< br/> you can easily attend and discover events anytime, anywhere < br/> all from the comfort of your own device.</p>
        </div>
      </div>
    </div>
          
          <>

          
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', marginTop: '3em' }}>
  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '0.5em' }}>
    <div style={{ marginBottom: '0.5em' }}>E-mail</div>
    <input
      type="email"
      style={{
        padding: '1em',
        fontSize: 16,
        borderRadius: 4,
        border: '1px solid #ccc',
        width: '360px'
      }}
    />
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1em' }}>
  <div style={{ marginBottom: '0.5em' }}>Password</div>
    <input
      type="password"
      style={{
        padding: '1em',
        fontSize: 16,
        borderRadius: 4,
        border: '1px solid #ccc',
        width: '360px'
      }}
    />
  </div>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}></div>
  <Button variant="contained" 
   onClick={() => modalStore.openModal(<LoginForm/>)} style={{ width: '360px',  borderRadius: '25px',  height: '50px'}}>
  Let loose & connect!
  </Button>
</div>

   </>
      </Container>
      <Box
        component="img"
        src={monImage}
        alt="ma photo"
        sx={{
            position: 'fixed',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',

            width: '500px',
            height: '500px',
            objectFit: 'cover',
            zIndex: 1,
            
            borderRadius: '50px'
        }}
      />
    </>
  );
    
    }


    function Accueil() {
        return (
          <Box
            sx={{
              backgroundColor: '#f0f0f0', // Remplacez cette couleur par celle que vous souhaitez utiliser
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
         </Box>
        );
    }
export default observer(HomePage);