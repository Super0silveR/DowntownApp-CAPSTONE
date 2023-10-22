import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { FilterAlt, TripOrigin, CalendarMonth } from '@mui/icons-material';
import { Container, Typography, ToggleButtonGroup, ToggleButton, Divider, Slider } from '@mui/material';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import theme from '../../../app/theme';
import dayjs from 'dayjs';

/** Important to note here that 'observer' gives the 'rights' to the component to look into the store. (and being notified of changes) */
export default observer(function EventFilters() {

    const { eventStore } = useStore();
    const { predicate, setPredicate } = eventStore; 
    
    const [view, setView] = React.useState<string>();

    /** Method handling the toggle buttons change mouse-event. */
    const handleToggleButtonsChange = (nextView: string) => {
        setPredicate(nextView, 'true');
        setView(nextView);
    };

    /** Method handling the calendar date change. */
    const handleCalendarDateChange = (nextDate: string | Date) => {
        setPredicate('startDate', nextDate);
    }

    /** Using an effect so that our selected toggle button for the filtering is the good one.  */
    useEffect(() => {
        if (predicate.has('isGoing')) setView('isGoing');
        else if (predicate.has('isHosting')) setView('isHosting');
        else setView('all');
    }, [predicate, setView]);
    
    /** Method to get a label-value for the distance slider. */
    function valuetext(value: number) {
        return `${value}KM`;
    }

    return (
        <Container sx={{alignItems:'center'}}>  
            <Typography 
                variant='h4'
                mt={'1.1em'}
                pb={'1.1em'}
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
                orientation="horizontal"
                exclusive
                onChange={(_, value) => handleToggleButtonsChange(value)}
                fullWidth
                title='Use these options to filter the event listing.'
                value={view}
                sx={{
                    color: theme.palette.primary.light
                }}
            >
                <ToggleButton 
                    value="all" 
                    aria-label="all"
                >
                    All Events
                </ToggleButton>
                <ToggleButton 
                    value="isGoing" 
                    aria-label="going"
                >
                    Going
                </ToggleButton>
                <ToggleButton 
                    value="isHosting" 
                    aria-label="hosting"  
                >
                    Hosting
                </ToggleButton>
            </ToggleButtonGroup>
            <Divider sx={{pt:1,pb:1,mb:'1.1em'}} />
            <Typography 
                variant='h4'
                mt={'1.1em'}
                pb={'1.1em'}
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
            {/** Todo the change handler for filtering the distance. */}
            <Slider
                aria-label="Distance (KM)"
                defaultValue={30}
                getAriaValueText={valuetext}
                color='primary'
            />
            <Divider sx={{pt:1,pb:1,mb:'1.1rem'}} />
            <Typography 
                variant='h4'
                mt={'1.1em'}
                pb={'1.1em'}
                fontSize={18}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    color: theme.palette.primary.main
                }}
            >
                    <CalendarMonth />
                    Calendar
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar 
                    showDaysOutsideCurrentMonth
                    fixedWeekNumber={5} 
                    onChange={(date) => handleCalendarDateChange(date)}
                    value={predicate.get('startDate') || dayjs()}
                />
            </LocalizationProvider> 
        </Container>
    )
});