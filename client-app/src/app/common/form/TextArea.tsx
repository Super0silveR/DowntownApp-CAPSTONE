import { TextField } from '@mui/material';
import { useField } from 'formik';
import React from 'react';
import FormValidationError from './FormValidationError';

interface Props {
    placeholder: string;
    name: string;
    rows?: number;
    label?: string;
    fullWidth?: boolean;
}

/** 
 * Custom and reusable TextArea integrated with Formik. 
 * We essentially just need to specify the name and the placeholder and Formik
 * automatically bind the input with our initial values for the object given as
 * initial values.
 * 
 * Note: The `rows` prop is the max number of rows before scrolling beings,
 * Leaving it empty will set it to Infinity, i.e. autosize.
 * */
export default function TextArea(props : Props) {
    
    /** 
     * Formik hook that matches the name inside of the props param to the actual 
     * text field that we're creating.
     */
    const [field, meta] = useField(props.name);

    return (
        <TextField
            size='small' 
            variant='filled' 
            color='primary'
            multiline
            /** The `!!` operator makes the predicate on the right a boolean, 
             * since the error is either a string or undefined. */
            error={meta.touched && !!meta.error}
            /** The spread operator to inherit the properties. */
            {...field}
            {...props}
            maxRows={props.rows ? undefined : Infinity}
            sx={{
                fontFamily:'monospace'
            }}
            helperText={
                meta.touched && meta.error
                    ? <FormValidationError error={meta.error} />
                    : null
            }
        />
    );
}