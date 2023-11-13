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
import theme from '../../../app/theme';

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
        <Box sx={{p:5,boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px',bgcolor:'rgba(249, 249, 249, 0.15)'}}>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                spacing={2}
                sx={{ marginBottom: 4 }}
            >
                <Box>
                    <Typography variant='h3'>Event Listing</Typography>
                    <Typography variant='subtitle1' color={theme.palette.primary.main} fontStyle='italic'>
                        Explore events, or create your own!
                    </Typography>
                </Box>
                <Button
                    variant='contained'
                    component={NavLink}
                    size='large'
                    to='/createEvent'
                    sx={{
                        borderRadius: '5px',
                        backgroundColor: theme.palette.primary.main,
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                            color: theme.palette.primary.dark
                        },
                        padding: '10px 15px',
                        boxShadow: 1,
                        transition: '0.1s',
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
