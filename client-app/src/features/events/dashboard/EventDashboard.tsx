import { Button, Container, Divider, Grid, Slider, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import EventList from './EventList';
import { FilterAlt, TripOrigin } from '@mui/icons-material';
import theme from '../../../app/theme';

function EventDashboard() {

    const { eventStore } = useStore();
    const { loadEvents, eventRegistry } = eventStore;

    /** Load the [filtered*(TODO)] events at the dashboard initialization. */
    useEffect(() => {
      if (eventRegistry.size <= 1) loadEvents();
    }, [loadEvents, eventRegistry.size]);
  
    const [view, setView] = React.useState('list');
  
    const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
        setView(nextView);
      };
  
    function valuetext(value: number) {
      return `${value} KM`;
    }
  
    if (eventStore.loadingInitial) return <LoadingComponent content='Loading Events..' />;
  
    return (
      <Container
        component={Paper}
        elevation={3}
        sx={{
          padding: '2rem',
          borderRadius: '16px',
          backgroundColor: '#ff86c3', 
          boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
          margin: '2rem auto',
          maxWidth: '800px',
        }}
      >
        <Stack
          direction='column' 
          alignItems='center' 
          marginBottom='1.5rem'
        >
          <Typography variant='h3' color='white'>
            Events
          </Typography>
          <Button
            variant='outlined'
            component={NavLink}
            to='/createEvent'
            size='large' 
            fullWidth 
            sx={{
              height: '3rem', 
              marginTop: '1rem', 
              borderColor: '#fff', 
              color: '#fff', 
              '&:hover': {
                backgroundColor: '#fff', 
                color: '#9c27b0', 
              },
            }}
          >
            Create a New Event
          </Button>
        </Stack>
        <Divider sx={{ my: 1, mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}> {}
            <Container>
              <Typography variant='h5' color='white'>
                Filters
              </Typography>
              <ToggleButtonGroup
                orientation='vertical'
                value={view}
                exclusive
                onChange={handleChange}
                fullWidth
                sx={{
                  marginBottom: '1rem',
                  '& .MuiToggleButton-root': {
                    marginBottom: '0.5rem',
                    backgroundColor: '#fff', 
                    color: '#9c27b0', 
                    border: '1px solid #9c27b0', 
                    '&.Mui-selected': {
                      backgroundColor: '#9c27b0', 
                      color: '#fff', 
                    },
                  },
                }}
              >
                <ToggleButton value='hosting'>
                  Hosting
                </ToggleButton>
                <ToggleButton value='going'>
                  Going
                </ToggleButton>
              </ToggleButtonGroup>
              <Typography variant='h5' color='white'>
                Distance (KM)
              </Typography>
              <Slider
                aria-label='Distance (KM)'
                defaultValue={30}
                getAriaValueText={valuetext}
                color='primary'
              />
            </Container>
          </Grid>
          <Grid item xs={12} md={8}>
            <EventList />
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  export default observer(EventDashboard);
  