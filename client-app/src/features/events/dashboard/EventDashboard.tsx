import { Box, Button, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { observer } from 'mobx-react-lite';
import { Fragment, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import EventList from './EventList';
import { PaginationParams } from '../../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroller';
import EventFilters from './EventFilters';
import EventListItemPlaceholder from './EventListItemPlaceholder';

function EventDashboard() {

    const { eventStore } = useStore();
    const { eventRegistry,
            loadEvents,  
            pagination, 
            setPaginationParams
        } = eventStore;
    const [loadingNextPage, setLoadingNextPage] = useState(false);

    /** Load the [filtered*(TODO)] events at the dashboard initialization. */
    useEffect(() => {
        if (eventRegistry.size <= 1)
            loadEvents();
    }, [loadEvents, eventRegistry.size]);

    /**
     * Method handling the action of loading the next page of events, triggered by the user.
     * 
     * IMPORTANT: Setting our pagination params here to a new object, i.e. updating their values,
     * our computed property in our event store, named generateAxiosPaginationParams(), will be 
     * re-computed to include the new ones. In this case here, we ask only for the next page.
     */
    const handleNextPage = () => {
        setLoadingNextPage(true);
        setPaginationParams(new PaginationParams(pagination!.currentPage + 1));
        loadEvents().then(() => {
            setLoadingNextPage(false);
        });
    }

    return (
        <Box sx={{ backgroundColor: '#fce7f3', minHeight: '100vh' }}>
            <Stack 
                direction='row' 
                display='flex' 
                sx={{
                    alignContent:'center',
                    alignItems:'center',
                    justifyContent:'space-between'
                }}>
                <Stack>
                    <Typography variant='h3'>
                        Listed Events
                    </Typography>
                    <Typography variant='subtitle1'>
                        Note that these events might not be <i><b>scheduled</b></i> yet.
                    </Typography>
                </Stack>
                <Button 
                    variant='contained' 
                    component={NavLink}
                    size='large'
                    to='/createEvent'
                    sx={{
                        borderRadius: '50%',  
                        backgroundColor: '#8b5cf6',  
                        width: '15rem',  
                        height: '4.25rem',  
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                }}
            >
                Create your new event!
            </Button>
            </Stack>
            <Divider sx={{ my:1, mb: 5 }} />
            <Grid
                container
            >
                <Grid item xs={8}>
                    {eventStore.loadingInitial && 
                     eventRegistry.size === 0 && 
                     !loadingNextPage ? (
                        <Fragment>
                            <EventListItemPlaceholder />
                            <EventListItemPlaceholder />
                        </Fragment>
                    ) : (
                        <InfiniteScroll
                            hasMore={
                                !loadingNextPage &&
                                !!pagination && 
                                pagination.currentPage < pagination.totalPages
                            }
                            initialLoad={false}
                            loadMore={handleNextPage}
                            pageStart={0}
                        >
                            <EventList />
                        </InfiniteScroll>

                    )}
                </Grid>
                <Grid item xs={4}>
                    <EventFilters />
                </Grid>
                {/** TODO: Hidding when not loading and centering the content with the rest of the page. */}
                <Grid item xs={8}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            paddingTop: 2
                        }}
                    >
                        {loadingNextPage && <CircularProgress />}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default observer(EventDashboard);
