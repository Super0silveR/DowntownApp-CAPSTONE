import { Box, Button, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import EventList from './EventList';
import InfiniteScroll from 'react-infinite-scroller';
import EventFilters from './EventFilters';
import EventListItemPlaceholder from './EventListItemPlaceholder';
import { PaginationParams } from '../../../app/models/pagination';
import partyImage2HD from '../../../assets/party2.jpg';

function EventDashboard() {
    const { eventStore } = useStore();
    const { eventRegistry, loadEvents, pagination, setPaginationParams } = eventStore;
    const [loadingNextPage, setLoadingNextPage] = useState(false);

    useEffect(() => {
        if (eventRegistry.size <= 1) loadEvents();
    }, [loadEvents, eventRegistry.size]);

    const handleNextPage = () => {
        setLoadingNextPage(true);
        setPaginationParams(new PaginationParams(pagination!.currentPage + 1));
        loadEvents().then(() => setLoadingNextPage(false));
    }

    return (
        <Box sx={{
            backgroundImage: `url(${partyImage2HD})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#f7f7f7',
            minHeight: '100vh',
            padding: 3
        }}>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                spacing={2}
                sx={{ marginBottom: 4 }}
            >
                <Box>
                    <Typography variant='h4' gutterBottom>
                        Upcoming Events
                    </Typography>
                    <Typography variant='subtitle1' color='text.secondary'>
                        Explore events, or create your own!
                    </Typography>
                </Box>
                <Button
                    variant='contained'
                    component={NavLink}
                    size='large'
                    to='/createEvent'
                    sx={{
                        borderRadius: '20px',
                        backgroundColor: '#5c6bc0',
                        '&:hover': {
                            backgroundColor: '#3f51b5',
                        },
                        padding: '10px 30px',
                        boxShadow: 1,
                        transition: '0.3s',
                    }}
                >
                    + New Event
                </Button>
            </Stack>
            <Divider sx={{ my: 3 }} />
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    {eventStore.loadingInitial && eventRegistry.size === 0 && !loadingNextPage ? (
                        <>
                            <EventListItemPlaceholder />
                            <EventListItemPlaceholder />
                        </>
                    ) : (
                        <InfiniteScroll
                            hasMore={!loadingNextPage && !!pagination && pagination.currentPage < pagination.totalPages}
                            loadMore={handleNextPage}
                            pageStart={0}
                        >
                            <EventList />
                        </InfiniteScroll>
                    )}
                </Grid>
                <Grid item xs={12} md={4}>
                    <EventFilters />
                </Grid>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            paddingTop: 2,
                            paddingBottom: 2,
                        }}
                    >
                        {loadingNextPage && <CircularProgress size={50} />}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default observer(EventDashboard);
