import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useField } from 'formik';
import FormValidationError from './FormValidationError';
import { useState } from 'react';
import theme from '../../theme';

/** 
 * Right now the `options` are a static object.
 * The goal is to fetch them from the database, depending on what type is required.
 */
interface Props {
    placeholder: string;
    name: string;
    label: string;
    options?: { value: string, text: string, description?: string, code?: string }[];
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

    const [isOpen, setIsOpen] = useState(false);

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
                value={field.value}
                onChange={(e) => helpers.setValue(e.target.value)}
                onBlur={() => helpers.setTouched(true)}
                onOpen={() => setIsOpen(true)}
                onClose={() => setIsOpen(false)}
                size='small'
                placeholder={props.placeholder}
                error={hasError}
                sx={{my:'0.2rem',textAlign:'left'}}
            >
                <MenuItem value='' divider>
                    <em>None</em>
                </MenuItem>
                {props.options &&
                    props.options.map((obj) => (
                        <MenuItem key={obj.value} value={obj.value} divider>
                            <Stack spacing={1}>
                                {obj.text}
                                {obj.description && isOpen && <Typography sx={{fontStyle: 'italic', color: theme.palette.primary.dark}} variant='caption'>{obj.description}</Typography>}
                            </Stack>
                        </MenuItem>
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