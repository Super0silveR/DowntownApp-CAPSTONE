import { LoadingButton } from "@mui/lab";
import { Stack, Typography, Button, Divider, InputAdornment, Switch, FormControlLabel } from "@mui/material";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import { useStore } from "../../../app/stores/store";
import { ProfileFormValues } from "../../../app/models/profile";
import FormContainer from "../../../app/common/form/FormContainer";
import TextInput from "../../../app/common/form/TextInput";
import { ColorCodeEnum } from "../../../app/common/constants";
import { InfoOutlined } from "@mui/icons-material";
import SelectInput from "../../../app/common/form/SelectInput";
import { ChangeEvent, useState } from "react";
import TextArea from "../../../app/common/form/TextArea";

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

    const { modalStore, profileStore: { profile, updateProfileGeneral, loading } } = useStore();

    const label = { inputProps: { 'aria-label': 'switch for boolean.' } };

    const emptyFormValues: ProfileFormValues = {
        bio: profile?.bio ?? '',
        colorCode: profile?.colorCode ?? '2',
        displayName: profile?.displayName ?? '',
        isOpenForMessage: profile?.isOpenForMessage ?? true,
        isPrivate: profile?.isPrivate ?? false,
        location: profile?.location ?? ''
    }

    const [formValues, setFormValues] = useState<ProfileFormValues>(emptyFormValues);

    const handleFormSubmit = (values: ProfileFormValues) => {
        //console.log(values);
        setFormValues(values);
        updateProfileGeneral(values).then(() => modalStore.closeModal());
    }

    const handleSwitchChange = (value: ChangeEvent<HTMLInputElement>) => {
        console.log(value.currentTarget.value);
    }

    return (
        <FormContainer
            title='Profile'
            form={
                <Formik
                    enableReinitialize
                    initialValues={formValues}
                    onSubmit={(values) => handleFormSubmit(values)}
                    validationSchema={validationSchema}
                >
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form
                            className='ui-form'
                            onSubmit={handleSubmit}
                            autoComplete='off'
                        >
                            <Stack direction='column' spacing={3}>   
                                <TextArea name='bio' placeholder='Bio' label='Bio' rows={6} />
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
                                {/* <CheckboxInput name="isOpenForMessage" placeholder="Open For Message" />
                                <CheckboxInput name="isPrivate" placeholder="" /> */}
                                <FormControlLabel control={<Switch {...label} name="isOpenForMessage" defaultChecked size="small" onChange={handleSwitchChange} />} label="Open For Message" />
                                <FormControlLabel control={<Switch {...label} name="isPrivate" size="small" /> } label="Profile Private" />
                                {/* <TextInput 
                                    placeholder='Location' 
                                    name='location'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='start'>
                                                <LocationCity fontSize="small" />
                                            </InputAdornment>
                                        )
                                    }}
                                /> */}
                                <Divider sx={{width:'50%'}} />
                                <Stack direction='row' spacing={2}>
                                    
                                    <LoadingButton 
                                        disabled={isSubmitting || !dirty || !isValid}
                                        loading={loading} 
                                        color="primary" 
                                        variant="contained" 
                                        fullWidth 
                                        type="submit"
                                    >
                                        <Typography fontFamily='monospace'>Save</Typography>
                                    </LoadingButton>
                                    <Button onClick={() => modalStore.closeModal()} variant="contained" fullWidth>
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