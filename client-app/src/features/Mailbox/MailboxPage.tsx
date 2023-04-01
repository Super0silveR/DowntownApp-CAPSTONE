import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import React from 'react';
import MailboxMessagesChatters from './MailboxMessagesChatters';
import MailboxMessagesContents from './MailboxMessagesContents';

function MailboxPage() {
    return (
        <Container maxWidth={false} disableGutters>
            <Grid container>
                <Grid item xs={5}>
                    <MailboxMessagesChatters></MailboxMessagesChatters>
                </Grid>
                <Grid item xs={7}>
                    <MailboxMessagesContents></MailboxMessagesContents>
                </Grid>
            </Grid>
        </Container>


  );
}

export default MailboxPage;