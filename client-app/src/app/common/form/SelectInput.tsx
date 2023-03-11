import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useField } from 'formik';
import React from 'react';
import FormValidationError from './FormValidationError';

/** 
 * Right now the `options` are a static object.
 * The goal is to fetch them from the database, depending on what type is required.
 */
interface Props {
    placeholder: string;
    name: string;
    label: string;
    options?: { value: string, text: string}[];
}

/** 
 * Custom and reusable TextInput integrated with Formik. 
 * We essentially just need to specify the name and the placeholder and Formik
 * automatically bind the input with our initial values for the object given as
 * initial values.
 */
export default function SelectInput(props: Props) {
    
    /** 
     * Formik hook that matches the name inside of the props param to the actual 
     * text field that we're creating.
     */
    const [field, meta, helpers] = useField(props.name);

    const hasError = meta.touched && !!meta.error;

    return (
        /** 
         * Since the `select` object is more complexe than a simple text input,
         * we use the `FormControl` to group the label and the text helper to the select input. 
         */
        <FormControl variant="filled">
            <InputLabel error={hasError} id={`select-${props.name}`}>{props.placeholder}</InputLabel>
            <Select
                labelId={`select-${props.name}`}
                value={field.value || ''}
                onChange={(e) => helpers.setValue(e.target.value)}
                onBlur={() => helpers.setTouched(true)}
                size='small'
                placeholder={props.placeholder}
                error={hasError}
                sx={{my:'0.2rem'}}
            >
                <MenuItem value=''>
                    <em>None</em>
                </MenuItem>
                {props.options &&
                    props.options.map((obj) => (
                        <MenuItem key={obj.value} value={obj.value}>{obj.text}</MenuItem>
                    ))
                }
            </Select>
            <FormHelperText error={hasError}>
                {meta.touched && meta.error
                    ? <FormValidationError error={meta.error} />
                    : null}
            </FormHelperText>
        </FormControl>
    );
}