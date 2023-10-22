import { FormControl, FormHelperText } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { useField } from 'formik';
import React from 'react';
import FormValidationError from './FormValidationError';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
    name: string;
    label: string;
}

/** 
 * Custom and reusable DateTimeInput integrated with Formik. 
 * We essentially just need to specify the name and the placeholder and Formik
 * automatically bind the input with our initial values for the object given as
 * initial values.
 * */
function DateTimeInput(props: Props, dateProps: DatePickerProps<Dayjs>) {
    
    /** 
     * Formik hook that matches the name inside of the props param to the actual 
     * text field that we're creating.
     */
    const [field, meta, helpers] = useField(props.name);
    const dateValue = dayjs(field.value);

    /** TODO: Styling the DatePicker... */
    return (
        <FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    {...field}
                    {...dateProps}
                    {...props}
                    format='DD/MMMM/YYYY'
                    value={field.value ? dateValue : null}
                    onChange={(value) => {
                        helpers.setValue(value);
                    }} 
                    onOpen={() => helpers.setTouched(true)}            
                />
                <FormHelperText error={meta.touched && !!meta.error}>
                    {meta.touched && meta.error
                        ? <FormValidationError error={meta.error} />
                        : null}
                </FormHelperText>
            </LocalizationProvider> 
        </FormControl>         
    );
}

export default DateTimeInput;