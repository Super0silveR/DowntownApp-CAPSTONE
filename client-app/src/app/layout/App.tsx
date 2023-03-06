import React, { useEffect } from 'react';
import EventDashboard from '../../features/events/dashboard/EventDashboard';
import ResponsiveAppBar from './NavBar';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { Container } from '@mui/material';
import { observer } from 'mobx-react-lite';

function App() {

    /** Destructuring the event store from our StoreContext. */
    const { eventStore } = useStore();

    useEffect(() => {
        eventStore.loadEvents();
    }, [eventStore]);

    if (eventStore.loadingInitial) return <LoadingComponent content='Loading App..' />
    return (
        <>
            <ResponsiveAppBar />
            <Container sx={{ my: '7em' }}>
                <EventDashboard />
            </Container>
        </>
  );
}

/** Higher order function that add additional powers to our App component 
 * allowing it to observe the observables in our stores. 
 * */
export default observer(App);
