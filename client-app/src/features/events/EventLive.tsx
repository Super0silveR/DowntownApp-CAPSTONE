import { Box, Button, Card, CardMedia, Grid, Paper, Typography, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import partyImage2HD from '../../../assets/party2.jpg';
import Image3 from '../../../assets/party3.jpg';
import { MonetizationOn } from '@mui/icons-material';
import EventLiveChat from './EventLiveChat';

function EventLive() {
    const theme = useTheme();
    return (
        <>
            <Box sx={{
                backgroundImage: `url(${partyImage2HD})`,
                padding: theme.spacing(1),
                minHeight: '100vh',
                paddingTop: theme.spacing(1),
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#f7f7f7',
            }}>
                
                <Grid container spacing={2}>
                    <Grid container item spacing={1}>
                        <Grid item xs={12} lg={8}>
                            <Card raised sx={{ borderRadius: 1, boxShadow: 1 }}>
                                <CardMedia
                                    component="img"
                                    alt="Event Image"
                                    image={Image3}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <Typography variant="h4" component="div" textAlign={"center"}>
                                    Video Controls
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <EventLiveChat />
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" component="div" >
                                Event Title
                            </Typography>
                        </Grid>
                    </Grid>
                    

                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                display: 'inline',
                                textDecoration: 'none',
                                fontFamily: 'monospace'
                            }}
                            component="span"
                            variant="h6"
                            color="text.secondary"
                        >
                            Participants
                        </Typography>
                        <Paper
                            sx={{
                                textAlign: 'center',
                                fontFamily: 'monospace',
                                padding: theme.spacing(1),
                                fontSize: 16
                            }}
                            elevation={3}
                        >
                            <Typography variant="body1" color="text.secondary">
                                No participants yet!
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            startIcon={<MonetizationOn />}
                            variant='contained'
                            color='primary'
                            sx={{ textTransform: 'none' }}
                        >
                            Donate
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default observer(EventLive);