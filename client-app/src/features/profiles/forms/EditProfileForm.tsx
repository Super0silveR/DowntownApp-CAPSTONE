import { LoadingButton } from "@mui/lab";
import { Stack, Typography, Button, Divider, InputAdornment, Switch, FormControlLabel } from "@mui/material";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import { useStore } from "../../../app/stores/store";
import { ProfileFormValues } from "../../../app/models/profile";
import FormContainer from "../../../app/common/form/FormContainer";
import TextInput from "../../../app/common/form/TextInput";
import FormValidationError from "../../../app/common/form/FormValidationError";
import { COLOR_CODE, ColorCodeEnum } from "../../../app/common/constants";
import { Description, InfoOutlined, List, LocationCity } from "@mui/icons-material";
import SelectInput from "../../../app/common/form/SelectInput";
import { useEffect } from "react";

function EditProfileForm() {

    /** Validation schema using Yup. */
    const validationSchema = Yup.object<ProfileFormValues>({
        bio: Yup.string().required().max(255),
        colorCode: Yup.string().required(),
        displayName: Yup.string().max(24),
        isOpenForMessage: Yup.bool().required(),
        isPrivate: Yup.bool().required(),
        location: Yup.string()
    });

    const { modalStore, profileStore } = useStore();

    const label = { inputProps: { 'aria-label': 'switch for boolean.' } };

    useEffect(() => {
        console.log('loaded from button click...');
    });

    return (
        <FormContainer
            title='Profile'
            form={
                <Formik
                    initialValues={{
                        bio: '',
                        colorCode: '5',
                        displayName: '',
                        isOpenForMessage: true,
                        isPrivate: false,
                        location: ''
                    }}
                    onSubmit={(values, { setErrors }) => {
                        //TODO: Implement saving profile logic.
                        console.log(values);
                    }}
                    validationSchema={validationSchema}
                >
                    {({handleSubmit, isSubmitting, errors}) => (
                        <Form
                            className='ui-form'
                            onSubmit={handleSubmit}
                            autoComplete='off'
                        >
                            <Stack direction='column' spacing={3}>   
                                <TextInput 
                                    placeholder='Bio' 
                                    name='bio'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='start'>
                                                <Description fontSize="small" />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <SelectInput label='Color Code' placeholder='Color Code' name='colorCode' options={ColorCodeEnum} />    
                                <TextInput 
                                    placeholder='Display Name' 
                                    name='displayName'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='start'>
                                                <InfoOutlined fontSize="small" />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <FormControlLabel control={<Switch {...label} name="isOpenForMessage" defaultChecked size="small" />} label="Open For Message" />
                                <FormControlLabel control={<Switch {...label} name="isPrivate" size="small" /> } label="Profile Private" />
                                <TextInput 
                                    placeholder='Location' 
                                    name='location'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='start'>
                                                <LocationCity fontSize="small" />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                {/* {errors.error && <FormValidationError error={errors.error ?? ''} />} */}
                                <Divider sx={{width:'50%'}} />
                                <Stack direction='row' spacing={2}>
                                    <LoadingButton sx={{
                      background: 'linear-gradient(135deg, #C75172, #C85DA3)'}}
                                        loading={isSubmitting}
                                        variant='contained' 
                                        fullWidth 
                                        type="submit"
                                    >
                                        <Typography fontFamily='monospace'>Save</Typography>
                                    </LoadingButton>
                                    <Button onClick={() => modalStore.closeModal()} sx={{
                      background: 'linear-gradient(135deg, #785e7d, #2D1693)'}} variant="contained" fullWidth>
                                        <Typography fontFamily='monospace'>Cancel</Typography>
                                    </Button>
                                </Stack>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            }
            minWidth={450}
        />
    );
}

/** Every time we need to use any `store` object, we need the observable transformation. */
export default observer(EditProfileForm);