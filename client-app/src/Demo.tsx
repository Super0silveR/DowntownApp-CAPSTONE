import React, { useEffect, useState } from "react";
import { Box } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Avatar, Button, Divider, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from "axios";

const faces = [
    "http://i.pravatar.cc/300?img=1",
    "http://i.pravatar.cc/300?img=2",
    // "http://i.pravatar.cc/300?img=3",
    // "http://i.pravatar.cc/300?img=4"
  ];
  
  const theme = createTheme({
    palette: {
        background: {
            paper: '#fff'
        },
        text: {
            primary: '#173A5E'
        }
    }
  });

  export default function Demo() {    
    // Variable to store the "events" and a method to set the "events"
    const [events, setEvents] = useState([]);
  
    useEffect(() => {
      axios.get('https://localhost:7246/api/events')
        .then(response => {
          setEvents(response.data);
        });
    }, []);
    
    return (
        <ThemeProvider theme={theme}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar>
              <Toolbar>
                <IconButton
                  size="medium"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography align='left' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Downtown-App
                </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
            <Grid
                marginTop={6}
                marginBottom={2}
                alignItems='center'
                container
                direction='column'
                justifyContent='center' 
                spacing={5}
                style={{
                    minHeight: '100vh'
                }}>
                {events.map((event: any) => {
                    const { id, title, description } = event;
                    return (
                    <Grid item xs={2} key={id}>
                        <Card
                            sx={{
                                minWidth: 750,
                                transition: "0.3s",
                                boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                                "&:hover": {
                                boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                                }
                            }} 
                            key={id}>
                        <CardContent 
                            sx={{
                                textAlign: "left",
                                padding: theme.spacing(3)                           
                            }}>
                            <Typography
                            className={"MuiTypography--heading"}
                            variant={"h6"}
                            gutterBottom
                            >
                            {title}
                            </Typography>
                            <Typography
                            className={"MuiTypography--subheading"}
                            variant={"caption"}
                            >
                            {description}
                            </Typography>
                            <Divider 
                                sx={{
                                    margin: `${theme.spacing(3)}`
                                }}
                                className="divider" 
                                light />
                            <Box
                                sx={{
                                    bgcolor: 'background.paper',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    display: 'flex'
                                }}>
                                {faces.map((face, index) => (
                                <Avatar
                                    sx={{
                                        display: 'inline-block',
                                        border: '2px solid white', 
                                        "&:not(:first-of-type)": {
                                            marginLeft: '4px'
                                        }
                                    }}
                                    className="avatar" 
                                    key={index} 
                                    src={face} />
                                ))}
                            </Box>
                        </CardContent>
                        </Card>
                    </Grid>            
                    )
                })}
            </Grid>
          </Box>
        </ThemeProvider>
      );
  }