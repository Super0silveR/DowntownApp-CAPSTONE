import { Stack, Typography } from '@mui/material';
import React from 'react';

interface Props {
    text?: string;
}

function NotComplete({ text = 'Something is missing...' }: Props) {
    return (
        <Stack
            spacing={1}
            sx={{
                minHeight: 'inherit',
                textAlign: 'center',
            }}
            direction='column'
            justifyContent='center'
        >
            <Typography variant='body2'>¯\_(ツ)_/¯</Typography>
            <Typography variant='subtitle2'>{text}</Typography>
        </Stack>
    );
}

export default NotComplete;