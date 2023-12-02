import { Send, SendOutlined } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, InputAdornment, Stack, TextField, styled } from "@mui/material";
import { Formik, Field, FieldProps } from "formik";
import { Form } from "react-router-dom";
import * as Yup from 'yup';
import theme from "../../app/theme";
import { UserChatDto } from "../../app/models/userChat";
import ChatBubble from "./ChatBubble";

const CommentValidationSchema = Yup.object({
    body: Yup.string().required('The comment requires a body.')
});

interface Props {
    id: string;
    chats: UserChatDto[];
}

const ChatDetails = ({ id, chats }: Props) => {
    return (
        <Box display='grid' alignContent='end' height='100%' marginLeft={1}>
            <Stack>
                <Box marginBottom={3} height={500} display='block' sx={{
                    boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px',
                    borderRadius: 0.3,
                    color: theme.palette.primary.main,
                }}>
                    <Stack direction='column'>
                        <ChatBubble key={id} content={id} />
                        <ChatBubble key={id + 1} content={id + 1} />
                        <ChatBubble key={id + 2} content={id + 2} />
                        <ChatBubble key={id + 3} content={id + 3} />
                    </Stack>
                </Box>
                <Formik
                    enableReinitialize
                    initialValues={{ body: '' }}
                    onSubmit={(values, { resetForm }) => console.log(values)}
                    validationSchema={CommentValidationSchema}
                >
                    {({ isValid, isSubmitting, handleSubmit }) => (
                        <Form
                            className='ui form'>
                            <Field name='body'>
                                {(props: FieldProps) => (
                                    <div style={{ position: 'relative' }}>
                                        {isSubmitting && <CircularProgress size={50} />}
                                        <TextField
                                            placeholder='Enter your comment (Enter to submit, SHIFT + enter for new line)'
                                            minRows={1}
                                            maxRows={5}
                                            {...props.field}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter' && e.shiftKey)
                                                    console.log('new line');
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    isValid && handleSubmit();
                                                }
                                            }}
                                            fullWidth
                                            size='small'
                                            multiline
                                            color='secondary'
                                            InputProps={{
                                            endAdornment:  
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-details='base-userchat'
                                                        aria-label="toggle password visibility"
                                                        edge="end"
                                                    >
                                                        <Send sx={{fontSize:18}} />
                                                    </IconButton>
                                                </InputAdornment>
                                            }}
                                        />
                                    </div>
                                )}
                            </Field>
                        </Form>
                    )}
                </Formik> 
            </Stack>        
        </Box>
    ); 
}

export default ChatDetails;