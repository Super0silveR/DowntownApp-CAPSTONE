import React, { useState } from 'react';
import axios from 'axios';
import { Button, ButtonGroup, Typography } from '@mui/material';
import { Container } from '@mui/system';
import ValidationErrors from './ValidationErrors';

export default function TestErrors() {
    const baseUrl = 'https://localhost:7246/api/';
    const [errors, setErrors] = useState(null);

    function handleNotFound() {
        axios.get(baseUrl + 'errors/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + 'errors/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + 'errors/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + 'errors/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get(baseUrl + 'events/notaguid').catch(err => console.log(err.response));
    }

    function handleValidationError() {
        axios.post(baseUrl + 'events', {}).catch(err => {
            console.log(err);
            setErrors(err);
        });
    }

    return (
        <>
            <Container>
                <Typography mb={2} variant='h4' fontFamily='monospace'>Error Components</Typography>
                <ButtonGroup 
                    variant="outlined" 
                    aria-label="outlined primary button group"
                    fullWidth
                    size='small'
                    sx={{pb:1}}
                >
                    <Button onClick={handleNotFound}>Not Found</Button>
                    <Button onClick={handleBadRequest}>Bad Request</Button>
                    <Button onClick={handleValidationError}>Validation</Button>
                    <Button onClick={handleServerError}>Server Error</Button>
                    <Button onClick={handleUnauthorised}>Unauthorized</Button>
                    <Button onClick={handleBadGuid}>Bad GUID</Button>
                </ButtonGroup>
                {errors && <ValidationErrors errors={errors} />}
            </Container>         
        </>
    )
}