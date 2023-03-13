import { Typography } from '@mui/material';
import React from 'react';

interface Props {
    error: string;
}

/** Capitalizing the first letter of error messages. */
function capitalizeFirstLetter(str: string) {
    if (str !== '')
        return str.charAt(0).toUpperCase() + str.slice(1) + '.';
    return null;
}

export default function FormValidationError({ error }: Props) {
    return (
        <Typography
            variant='body2'
            fontSize='inherit'
            fontFamily='monospace'
            letterSpacing='0.05rem'
            component='span'
            color='error'
            ml={0}
        >
            {capitalizeFirstLetter(String(error))}
        </Typography>
    );
}