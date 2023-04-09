import { Button, Container, Divider, Grid, Slider, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import EventList from './EventList';
import { AllOut, Filter, Filter1, FilterAlt, SocialDistance, TripOrigin, ViewList, ViewModule, ViewQuilt } from '@mui/icons-material';
import theme from '../../../app/theme';

function EventDashboard() {

    const { eventStore } = useStore();
    const { loadEvents, eventRegistry } = eventStore;

    /** Load the [filtered*(TODO)] events at the dashboard initialization. */
    useEffect(() => {
        if (eventRegistry.size <= 1)
            loadEvents();
    }, [loadEvents, eventRegistry.size]);  
    
    const [view, setView] = React.useState('list');

    const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
      setView(nextView);
    };
    
    function valuetext(value: number) {
        return `${value}KM`;
    }

    if (eventStore.loadingInitial) return <LoadingComponent content='Loading Events..' />

    return (
        <>
            <Stack 
                direction='row' 
                display='flex' 
                sx={{
                    alignContent:'center',
                    alignItems:'center',
                    justifyContent:'space-between'
                }}>
                <Typography variant='h3' letterSpacing={-2} fontFamily='monospace'>
                    Events
                </Typography>
                <Button 
                    variant='outlined' 
                    component={NavLink}
                    size='small'
                    to='/createEvent'
                    sx={{
                        height:'2.25rem'
                    }}
                >
                        Create a new Event!
                </Button>
            </Stack>
            <Divider sx={{ my:1, mb: 5 }} />
            <Grid container>
                <Grid item xs={8}>
                    <EventList />
                </Grid>
                <Grid item xs={4}>
                    <Container sx={{alignItems:'center'}}>  
                        <Typography 
                            variant='h4'
                            mt={'1.1em'}
                            fontSize={18}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                color: theme.palette.primary.main
                            }}
                        >
                                <FilterAlt />
                                Filters
                        </Typography>
                        <ToggleButtonGroup
                            orientation="vertical"
                            value={view}
                            exclusive
                            onChange={handleChange}
                            fullWidth
                            title='Use these options to filter the event listing.'
                        >
                            <ToggleButton value="hosting" aria-label="hosting">
                                Hosting
                            </ToggleButton>
                            <ToggleButton value="going" aria-label="going">
                                Going
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <Divider sx={{pt:1,pb:1,mb:1}} />
                        <Typography 
                            variant='body2'
                            fontSize={18}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                color: theme.palette.primary.main
                            }}
                        >
                                <TripOrigin />
                                Distance (KM)
                        </Typography>
                        <Slider
                            aria-label="Distance (KM)"
                            defaultValue={30}
                            getAriaValueText={valuetext}
                            color='primary'
                        />
                    </Container>
                </Grid>
            </Grid>
        </>
    );
};

export default observer(EventDashboard);