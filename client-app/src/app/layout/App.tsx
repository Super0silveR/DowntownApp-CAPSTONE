import React, { useEffect } from 'react';
import ResponsiveAppBar from './NavBar';
import { Container } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import { observer } from 'mobx-react-lite';
import ModalContainer from '../common/modals/ModalContainer';
//import Footer from './Footer';

/** https://react-hot-toast.com/docs/styling */

/** Main Application component. */
function App() {
    /** React Router hook that gives us which route has the user gone to. */
    const location = useLocation();

    const { commonStore, userStore } = useStore();

    /** Fetching the user on `app init` if the localstorage contains a token. */
    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore]);

    if (!commonStore.appLoaded) return <LoadingComponent content='Loading App..' />

    return (
        <>
            {/** Providing the custom theme we created to the entire App. (see theme.ts) */}
            <ThemeProvider theme={theme}>
                <ModalContainer />
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
export default observer(App);
