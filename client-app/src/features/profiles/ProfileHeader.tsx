import { Avatar, Button, Chip, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Profile } from '../../app/models/profile';
import VerifiedIcon from '@mui/icons-material/Verified';

interface Props {
    profile: Profile;
}

/** Test Image : 'https://res.cloudinary.com/dwixnc66t/image/upload/v1641058233/samples/people/kitchen-bar.jpg' */

function ProfileHeader({ profile }: Props) {
    return (
        <Paper
            sx={{
                fontFamily: 'monospace',
                fontSize: 16
            }}
            elevation={3}
        >
            <Grid container alignItems='center'>
                <Grid item xs={9}>
                    <Grid container alignItems='center' p={2}>
                        <Avatar
                            src={'https://res.cloudinary.com/dwixnc66t/image/upload/v1641058233/samples/people/kitchen-bar.jpg'}
                            sx={{
                                width: 125,
                                height: 125,
                                boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em'
                            }}
                        />
                        <Stack spacing={1} ml={2}>
                            <Stack spacing={-0.5} justifyContent='center'>
                                <Typography component='span'>{profile?.displayName}<VerifiedIcon sx={{fontSize:14,color:'royalblue'}} /></Typography>
                                <Typography sx={{ fontStyle: 'italic' }} variant='caption' color='secondary.dark'>@{profile?.userName}</Typography>
                            </Stack>
                            <Chip size='small' label="info" color='primary' variant="outlined" sx={{width:'50%'}} />
                        </Stack>
                    </Grid>
                </Grid>
                <Grid item xs={3} p={2}>
                    <Grid container sx={{ textAlign: 'center' }}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <Stack direction='column' spacing={-1}>
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: 36,
                                            m: 0
                                        }}
                                        component="span"
                                        variant="h6"
                                        color="text.secondary"
                                    >
                                        55
                                    </Typography>
                                    <Typography variant='caption'>Followers</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack direction='column' spacing={-1}>
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: 36,
                                            m: 0
                                        }}
                                        component="span"
                                        variant="h6"
                                        color="text.secondary"
                                    >
                                        145
                                    </Typography>
                                    <Typography variant='caption'>Following</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider
                                sx={{ m:1 }}
                            />
                            <Button
                                variant='contained'
                                size='small'
                                sx={{width:'75%'}}
                            >
                                <Typography fontFamily='monospace'>Follow</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>  
    );
};

export default observer(ProfileHeader);