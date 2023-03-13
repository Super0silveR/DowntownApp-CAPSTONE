import { Button, Grid, Paper, Typography } from "@mui/material";
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <Paper sx={{p:4}}>
                <Grid 
                    container 
                    alignItems='center' 
                    justifyContent='center' 
                    maxWidth='md'
                >
                    <Grid item xs={12} textAlign='center'>
                        <TroubleshootIcon fontSize='large' />
                    </Grid>
                    <Grid item xs={12} textAlign='center'>
                        <Typography
                            variant='body1'
                            p={2}
                            fontFamily='monospace'
                        >
                            Oops &#8212; We've looked everywhere but couldn't find what you're looking for!
                        </Typography>
                    </Grid>
                    <Grid item xs={12} textAlign='center'>
                        <Button 
                            component={Link}
                            to='/events'
                            size='small' 
                            variant='contained'
                            sx={{maxWidth:'33%',fontFamily:'monospace'}}
                        >
                            Return to Events listing!
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </>       
    );
}