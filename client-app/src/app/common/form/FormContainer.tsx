import { Container, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';

/** TODO: Find a better way of controlling the Width for responsivibility purposes. */
interface Props {
    title: string;
    form: React.ReactNode;
    minWidth?: number;
    maxWidth?: number;

}

export default function FormContainer({ title, form, minWidth }: Props) {
    const theme = useTheme();

    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center'
            }}
        >
            <Paper 
                sx={{
                    textAlign: 'center',
                    padding: theme.spacing(2),
                    my: theme.spacing(1),
                    minWidth: {minWidth}
                }} 
                elevation={3}
            >
                <Typography
                    sx={{ 
                        display: 'inline',
                        fontFamily:'monospace',
                        fontVariant: 'all-small-caps',
                        fontSize: 52
                    }}
                    component="span"
                    variant="h4"
                    color="text.secondary"
                >
                    {title}
                </Typography>
                <Container sx={{my:2}}>
                    <Grid container spacing={2} alignContent='center'>
                        <Grid item xs={12}>
                            {form}
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </Box>
    );
}