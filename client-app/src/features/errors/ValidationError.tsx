import { Alert, Grid, Paper } from '@mui/material';
import React from 'react';

interface Props {
    errors: string[];
}

export default function ValidationError({ errors }: Props) {
    return (
        <>
            <Paper sx={{p:4}}>
                {errors && (
                    <Grid 
                        container
                        justifyContent='center' 
                        maxWidth='md'
                        direction='column'
                        spacing={2}
                    >
                        {errors.map((error: string, i: number) => (
                            <Grid item xs={12} sx={{fontFamily:'monospace'}} key={i}> 
                                <Alert severity="error">{error}</Alert>
                            </Grid>
                        ))}
                    </Grid>                    
                )}
            </Paper>
        </>
    );
}