import { Send } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { Formik, Field, FieldProps } from "formik";
import { Form } from "react-router-dom";
import * as Yup from 'yup';
import theme from "../../app/theme";
import ChatBubble from "./ChatBubble";
import { useEffect, useRef } from "react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

const CommentValidationSchema = Yup.object({
    body: Yup.string().required('The comment requires a body.')
});

interface Props {
    id: string;
    chatRoomId: string;
}

const ChatDetails = ({ chatRoomId }: Props) => {

    const boxRef = useRef<HTMLDivElement>(null);

    const { userChatStore } = useStore();

    /// TODO: Scroll to bottom of conversations doesn't work for some obscure reason.
    useEffect(() => {
        if (boxRef.current) {
            //boxRef.current.scrollIntoView({behavior: 'smooth'});
        }

        /**
         * Connecting to the Chats Hub.
         */
        if (chatRoomId) {
            userChatStore.createHubConnection(chatRoomId);
        }

        return () => {
            userChatStore.clearChats();
        }
    }, [userChatStore, chatRoomId]);

    return (
        <Box display='grid' alignContent='end' height='100%' marginLeft={1}>
            <Stack>
                <Box 
                    marginBottom={3} 
                    height={500} 
                    display='block' 
                    className='messages-box' 
                    sx={{
                        boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px',
                        borderRadius: 0.3,
                        color: theme.palette.primary.main,
                        scrollMargin: 1,
                        overflowY: 'auto',
                        scrollBehavior: 'smooth',
                        overscrollBehavior: 'contain',
                        padding:2
                    }}
                    ref={boxRef}
                >
                    <Stack 
                        direction='column'
                        justifyContent="space-evenly"
                        spacing={1}
                    >
                        {
                            userChatStore.chats.map((chat, i) => (
                                <ChatBubble key={i} content={chat} previousDate={userChatStore.chats.at(i - 1)?.sentAt!} />
                            )) 
                        }
                    </Stack>
                </Box>
                <Formik
                    enableReinitialize
                    initialValues={{body:''}}
                    onSubmit={(values, { resetForm }) => userChatStore.sendChat({message: values.body}).then(() => resetForm())}
                    validationSchema={CommentValidationSchema}
                >
                    {({ isValid, isSubmitting, handleSubmit }) => (
                        <Form className='ui form'>
                            <Field name='body'>
                                {(props: FieldProps) => (
                                    <div style={{ position: 'relative' }}>
                                        {isSubmitting && <CircularProgress size={50} />}
                                        <TextField
                                            placeholder='Enter your comment (Enter to submit)'
                                            minRows={1}
                                            maxRows={5}
                                            {...props.field}
                                            onKeyDown={e => {
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
                                                        disabled={!isValid}
                                                        onClick={() => handleSubmit()}
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

export default observer(ChatDetails);