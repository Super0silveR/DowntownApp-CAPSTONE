import {
  Typography,
  Button,
  Paper,
  TextField,
  IconButton,
  Grid,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { EventTicket, TicketClassification } from "../../../app/models/eventTicket";
import { useStore } from "../../../app/stores/store";
import { Formik, FieldArray, Field } from "formik";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import CancelIcon from '@mui/icons-material/Cancel';
import { v4 as uuid } from 'uuid';

interface Props {
  scheduledEventId: number
}

function TicketManager({ scheduledEventId }: Props) {
  const { modalStore, eventStore } = useStore(); // Replace with the actual store name

  const getTotalQuantity = (values : {
    tickets: [
      { quantity:number,classification:TicketClassification,price:number,description:string}
    ]}) => {
    return values.tickets.reduce((total, ticket) => total + ticket.quantity, 0);
  };

  const handleGenerateTickets = async (values : {
    tickets: [
      { quantity:number,classification:TicketClassification,price:number,description:string}
    ]}) => {
    try {
      for (const ticket of values.tickets) {
        // Extract nbr from each ticket
        const nbr = ticket.quantity;
  
        // Map the ticket data to the EventTicket model
        const eventTicket: EventTicket = {
          id: uuid(),
            ...values,
          scheduledEventId: scheduledEventId.toString(), // Replace with the actual scheduled event ID
          description: ticket.description || null,
          price: ticket.price || null,
          ticketClassification: TicketClassification.default,
          scheduledEvent: null, // You may need to populate this based on your application logic
        };
  
        // Call the function from another store to generate tickets for each ticket
        await eventStore.generateTicket([eventTicket], nbr);
      }
  
      // Close the modal or perform any other necessary actions
      modalStore.closeModal();
    } catch (error) {
      console.error("Error generating tickets:", error);
      // Handle the error, show a message, etc.
    }
  };

  return (
    <Paper sx={{ padding: "20px", margin: "20px", backgroundColor: "#f8f9fa" }}>
  <Typography variant="h5" mb={2} color="#0d6efd">
    <ConfirmationNumberIcon style={{ fontSize: 28, marginRight: "8px", color: "#0d6efd" }} />
    Generate Tickets!
  </Typography>
  <Formik
    initialValues={{
      tickets: [
        { quantity: 0, classification: TicketClassification.default, price: 0, description: "" }
      ],
    }}
    onSubmit={handleGenerateTickets}
  >
    {({ values, handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <FieldArray
          name="tickets"
          render={(arrayHelpers) => (
            <div>
              {values.tickets.map((ticket, index) => (
                <div key={index} style={{ marginBottom: "16px", border: "1px solid #dee2e6", borderRadius: "8px", padding: "12px" }}>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <Typography>
                        <ConfirmationNumberIcon style={{ fontSize: 20, marginRight: "8px" }} />
                        <Field
                          as={TextField}
                          type="number"
                          name={`tickets.${index}.quantity`}
                          value={ticket.quantity}
                          label="Quantity"
                        />
                        <EventSeatIcon style={{ fontSize: 20, marginLeft: "8px", marginRight: "4px" }} />
                        <Field as={Select} name={`tickets.${index}.classification`} value={ticket.classification} label="Type">
                          <MenuItem value={TicketClassification.default}>Default</MenuItem>
                          <MenuItem value={TicketClassification.vip}>VIP</MenuItem>
                        </Field>
                        <EuroSymbolIcon style={{ fontSize: 20, marginLeft: "8px" }} />
                        <Field
                          as={TextField}
                          type="number"
                          name={`tickets.${index}.price`}
                          value={ticket.price}
                          label="Price"
                        />
                        <ReceiptIcon style={{ fontSize: 20, marginLeft: "8px" }} />
                        <Field
                          as={TextField}
                          type="text"
                          name={`tickets.${index}.description`}
                          value={ticket.description}
                          label="Description"
                        />
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => arrayHelpers.remove(index)}>
                        <ClearIcon style={{ fontSize: 20, color: "#dc3545" }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </div>
              ))}
              <Box mt={2} mb={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{backgroundColor: 'black'}} 
                  onClick={() => arrayHelpers.push({ quantity: 1, classification: TicketClassification.default, price: 0, description: "" })}
                >
                  <AddIcon style={{ fontSize: 20, marginRight: "4px" }} />
                  Add Ticket
                </Button>
              </Box>
            </div>
          )}
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="success" type="submit">
            <ConfirmationNumberIcon style={{ fontSize: 20, marginRight: "4px" }} />
            Generate Ticket
          </Button>
          <Button variant="outlined" style={{backgroundColor: 'red'}} color="secondary" onClick={() => modalStore.closeModal()}>
            <CancelIcon style={{ fontSize: 20, marginRight: "4px" }} />
            Cancel
          </Button>
        </Box>
        <Box mt={2}>
          <Typography variant="h6">
            <EventSeatIcon style={{ fontSize: 20, marginRight: "4px" }} />
            Total Quantity: {getTotalQuantity(values)}
          </Typography>
        </Box>
      </form>
    )}
  </Formik>
</Paper>
  );
}

export default TicketManager;
