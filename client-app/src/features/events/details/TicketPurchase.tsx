import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { EventTicket } from '../../../app/models/eventTicket';
import { Typography, Button, Paper, List, ListItem, ListItemText, Grid } from '@mui/material';

interface Props {
  scheduledEventId: number
}

function TicketPurchase({ scheduledEventId }: Props) {
  const { modalStore, eventStore } = useStore();

  useEffect(() => {
    // Fetch or update ticket information when the component mounts or when scheduledEventId changes
    // Use an action in your store to fetch ticket information based on scheduledEventId
    eventStore.loadTickets(scheduledEventId.toString());
  }, [eventStore, scheduledEventId]);

  const handleBuyTicket = async (ticketId: string) => {
    try {
      console.log(ticketId);
      // Implement your logic for purchasing the ticket
      // For example: await eventStore.buyTicket(ticketId);

      // Optional: Close the modal after purchasing a ticket
      modalStore.closeModal();
    } catch (error) {
      console.error('Error buying ticket:', error);
      // Handle the error, show a message, etc.
    }
  };

  return (
    <Paper sx={{ padding: '20px', margin: '20px', maxHeight: '400px', overflowY: 'auto' }}>
      <Typography variant="h5" mb={2}>
        Available Tickets
      </Typography>
      {eventStore.scheduledEventTickets ? (
        <List>
          {eventStore.getScheduledEventTickets?.map((ticket: EventTicket) => (
            <ListItem key={ticket.id}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <ListItemText
                    primary={`Description: ${ticket.description}`}
                    secondary={`Price: ${ticket.price}, Classification: ${ticket.ticketClassification}`}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleBuyTicket(ticket.id)}
                    fullWidth
                  >
                    Buy Ticket
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No tickets available</Typography>
      )}
      <Button variant="outlined" color="secondary" style={{backgroundColor: 'black'}} onClick={() => modalStore.closeModal()} fullWidth>
        Cancel
      </Button>
    </Paper>
  );
}

export default observer(TicketPurchase);
