import React from 'react';
import ResponsiveAppBar from './NavBar';
import { Container } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
//import Footer from './Footer';

/** https://react-hot-toast.com/docs/styling */

/** Main Application component. */
function App() {
    /** React Router hook that gives us which route has the user gone to. */
    const location = useLocation();

    return (
        <>
            {/** Providing the custom theme we created to the entire App. (see theme.ts) */}
            <ThemeProvider theme={theme}>
                <Toaster
                    position='bottom-right'
                    gutter={8}
                    toastOptions={{
                        style: {
                            border: '1px solid #713200',
                            padding: '16px',
                            color: '#713200',
                        }
                    }}
                />
                {location.pathname === '/' ? <HomePage /> : (
                    <>
                        <ResponsiveAppBar />
                        <Container sx={{ my: '7em' }}>
                            {/** Route Outlet so we can swap in/out react components 
                             * when we navigate. */}
                            <Outlet />
                        </Container>
                        {/** <Footer /> */}
                    </>
                )}
            </ThemeProvider>
        </>
  );
}

/** Higher order function that add additional powers to our App component 
 * allowing it to observe the observables in our stores. 
 * */
export default App;
