import React from "react";
//import {
//    Avatar,
//    Card,
//    CardContent,
//    Divider,
//    Typography
//} from '@mui/material';
//import Grid2 from '@mui/material/Unstable_Grid2';
//import { useTheme } from '@mui/material/styles';
//import { Box } from '@mui/system';
//import axios from "axios";

//const faces = [
//    "http://i.pravatar.cc/300?img=1",
//    "http://i.pravatar.cc/300?img=2",
//    "http://i.pravatar.cc/300?img=3",
//    "http://i.pravatar.cc/300?img=4"
//];

//  export default function Demo() {    
//    // Variable to store the "events" and a method to set the "events"
//    const [events, setEvents] = useState<Event[]>([]);
//    const theme = useTheme(); 
  
//    useEffect(() => {
//      axios.get<Event[]>('https://localhost:7246/api/events')
//        .then(response => {
//          setEvents(response.data);
//        });
//    }, []);
    
//    return (
//        <Box sx={{ my: '7em', mb: '3em', width: '100%' }}>
//        <Grid2
//            alignItems='center'
//            container
//            direction='column'
//            justifyContent='center' 
//            spacing={5}
//            style={{
//                minHeight: '100vh'
//            }}>
//            {events.map((event: Event) => {
//                //const { id, title, description } = event;
//                return (
//                <Grid2 xs={10} key={id}>
//                    <Card
//                            sx={{
//                            width: '100%',
//                            transition: "0.3s",
//                            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
//                            "&:hover": {
//                                boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
//                            }
//                        }} 
//                        key={id}
//                    >
//                    <CardContent 
//                        sx={{
//                            textAlign: "left",
//                            padding: theme.spacing(3)                           
//                        }}>
//                        <Typography
//                            className={"MuiTypography--heading"}
//                            variant={"h6"}
//                            gutterBottom
//                            sx={{
//                                color: 'secondary.dark'
//                            }}
//                        >
//                        {title}
//                        </Typography>
//                        <Typography
//                            className={"MuiTypography--subheading"}
//                            variant={"caption"}
//                            sx={{
//                                color: 'secondary.light'
//                            }}
//                        >
//                        {description}
//                        </Typography>
//                        <Divider 
//                            sx={{
//                                margin: `${theme.spacing(3)}`
//                            }}
//                            className="divider" 
//                            light />
//                        <Box
//                            sx={{
//                                bgcolor: 'background.paper',
//                                alignItems: 'center',
//                                justifyContent: 'center',
//                                display: 'flex'
//                            }}>
//                            {faces.map((face, index) => (
//                            <Avatar
//                                sx={{
//                                    display: 'inline-block',
//                                    border: '2px solid white', 
//                                    "&:not(:first-of-type)": {
//                                        marginLeft: '4px'
//                                    }
//                                }}
//                                className="avatar" 
//                                key={index} 
//                                src={face} />
//                            ))}
//                        </Box>
//                    </CardContent>
//                    </Card>
//                </Grid2>            
//                )
//            })}
//        </Grid2>
//        </Box>
//      );
//  }