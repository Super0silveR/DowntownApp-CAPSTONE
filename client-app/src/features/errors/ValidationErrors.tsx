import { Alert, Grid } from '@mui/material';
import React from 'react';

interface Props {
    errors: any;
}

export default function ValidationErrors({ errors }: Props) {

    if (Array.isArray(errors[0])) errors = errors[0];

    return (
        <>
            {errors && (
                <Grid 
                    container
                    maxWidth='md'
                    direction='column'
                >
                    {errors?.map((error: any, i: any) => (
                        <Grid item sx={{'&:not(:last-child)': { mb:2 }}} key={i}> 
                            <Alert severity="error">{error}</Alert>
                        </Grid>
                    ))}
                </Grid>                    
            )}
        </>
    );
}