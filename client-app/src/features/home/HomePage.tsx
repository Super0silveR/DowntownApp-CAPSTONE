import React from 'react';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <>
            <Container sx={{mt:'7em'}}>
                <Typography 
                    variant='h4' 
                    fontWeight={600} 
                    fontFamily='monospace'
                    sx={{
                        textDecoration:'underline'
                    }}
                >
                    Home Page
                </Typography>
                <Typography 
                    variant='h5' 
                    fontWeight={500} 
                    fontFamily='monospace'
                >
                    Go to our listed <Link to='/events'>Events</Link>!
                </Typography>
            </Container>
        </>
    );
}