import React from 'react';
import ResponsiveAppBar from './NavBar';
import { Container } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';

/** Main Application component. */
function App() {
    /** React Router hook that gives us which route has the user gone to. */
    const location = useLocation();

    return (
        <>
            {location.pathname === '/' ? <HomePage /> : (
                <>
                    <ResponsiveAppBar />
                    <Container sx={{ my: '7em' }}>
                        {/** Route Outlet so we can swap in/out react components 
                         * when we navigate. */}
                        <Outlet />
                    </Container>
                </>
            )}
        </>
  );
}

/** Higher order function that add additional powers to our App component 
 * allowing it to observe the observables in our stores. 
 * */
export default observer(App);
