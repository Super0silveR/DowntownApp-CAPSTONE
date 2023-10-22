import { LoadingButton } from "@mui/lab";
import { Stack, Typography, Button, Divider, InputAdornment } from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import FormContainer from "../../app/common/form/FormContainer";
import TextInput from "../../app/common/form/TextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import { UserFormValues } from "../../app/models/user";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import ValidationErrors from "../errors/ValidationErrors";

function RegisterForm() {

    /** Validation schema using Yup. */
    const validationSchema = Yup.object<UserFormValues>({
        email: Yup.string().required().email(),
        password: Yup.string().required(),
        displayName: Yup.string().required(),
        userName: Yup.string().required()
    });

    const { modalStore, userStore } = useStore();

    return (
        <FormContainer
            title='Register'
            form={
                <Formik
                    initialValues={{ displayName: '', email: '', password: '', userName: '', error: ''}}
                    onSubmit={(values, { setErrors, setSubmitting }) => {
                        userStore.register(values).catch((e) => {
                            setSubmitting(false);
                            setErrors({error: e});
                        });
                    }}
                    validationSchema={validationSchema}
                >
                    {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                        <Form 
                            className='ui-form error'
                            onSubmit={handleSubmit}
                            autoComplete='off'
                        >
                            <Stack direction='column' spacing={3}>     
                                <TextInput 
                                    placeholder='Display Name' 
                                    name='displayName'
                                />   
                                <TextInput 
                                    placeholder='Username' 
                                    name='userName'
                                /> 
                                <TextInput 
                                    placeholder='Email' 
                                    name='email'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='start'>
                                                <AlternateEmailIcon fontSize="small" />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <TextInput 
                                    placeholder='Password' 
                                    name='password' 
                                    type='password'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='start'>
                                                <LockIcon fontSize="small" />
                                            </InputAdornment>
                                        )
                                    }} 
                                />
                                <ErrorMessage 
                                    name='error'
                                    render={() => <ValidationErrors errors={[errors.error as string]} />}
                                />
                                <Divider sx={{width:'50%'}} />
                                <Stack direction='row' spacing={2}>
                                    <LoadingButton 
                                        disabled={!isValid || !dirty || isSubmitting}
                                        loading={isSubmitting}
                                        variant='contained' 
                                        fullWidth 
                                        type="submit"
                                    >
                                        <Typography fontFamily='monospace'>Register</Typography>
                                    </LoadingButton>
                                    <Button onClick={() => modalStore.closeModal()} color="warning" variant="contained" fullWidth>
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
export default observer(RegisterForm);