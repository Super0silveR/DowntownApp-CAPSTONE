import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import EventListItem from './EventListItem';
import theme from '../../../app/theme';

/** React component that represents the list of events. */
function EventList() {
    const { eventStore } = useStore();
    const { groupedEventsByDate } = eventStore;

    return (
        <>
            {groupedEventsByDate.map(([group, events]) => (
                <Box key={group}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'left',
                        }}
                    >
                        <Typography 
                            variant='caption' 
                            color={theme.palette.primary.main}
                            fontSize='1.4em'
                            pb={2}
                            sx={{fontFamily:'Roboto'}}
                        >
                            <u>{group}</u>
                        </Typography>
                    </Box>
                    <Grid container spacing={2} sx={{mb:2}}>
                        {events.map(event => (
                            <EventListItem key={event.id} event={event} isAlone={(events.length <= 1)} />
                        ))}
                    </Grid>         
                </Box>
            ))}
        </>
    );
}

export default observer(EventList);