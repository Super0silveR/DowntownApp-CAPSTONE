import React from 'react';
import { AvatarGroup, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Skeleton, Stack, Typography } from '@mui/material';

export default function EventListItemPlaceholder() {
    return (
        <Stack spacing={1} mb={5}>
            <Typography variant="caption"></Typography>
            <Card>
                <CardHeader
                    sx={{textAlign:'justify'}}
                    avatar={
                        <Skeleton animation='wave' variant='circular' width={75} height={75} />
                    }
                    action={
                        <IconButton 
                            aria-details='event-actions' 
                            aria-label="settings"
                            aria-haspopup="true"
                            id="event-settings-button"
                        />
                    }
                    title={
                        <Skeleton animation='wave' height={10} width='80%' style={{marginBottom: 6}} />
                    }
                    subheader={
                        <Skeleton animation="wave" height={10} width="40%" />
                    }
                /> 
                <Divider />
                <CardContent>
                    <Typography variant="h3"><Skeleton/></Typography>
                </CardContent>
                <Divider />
                <CardContent>
                    {/** TODO: Actually loading the attendees avatar. */}
                    <AvatarGroup max={4} sx={{justifyContent:'right',m:-1}}>
                        <Skeleton animation='wave' variant='circular' width={40} height={40} />
                        <Skeleton animation='wave' variant='circular' width={40} height={40} />
                        <Skeleton animation='wave' variant='circular' width={40} height={40} />
                    </AvatarGroup>
                </CardContent>
                <Divider />
                <CardActions disableSpacing>
                    <React.Fragment>
                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="80%" />
                    </React.Fragment>
                </CardActions>               
            </Card>
        </Stack>
    );
}