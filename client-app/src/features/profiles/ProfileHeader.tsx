import { Avatar, Button, Chip, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Profile } from '../../app/models/profile';
import VerifiedIcon from '@mui/icons-material/Verified';
import { FavoriteBorder } from '@mui/icons-material';

interface Props {
    profile: Profile;
}

/** Test Image : 'https://res.cloudinary.com/dwixnc66t/image/upload/v1641058233/samples/people/kitchen-bar.jpg' */

function ProfileHeader({ profile }: Props) {
    return (
        <Paper
            sx={{
                fontFamily: 'monospace',
                fontSize: 16,
                background: 'rgba(238, 238, 238, 0.85)',
                borderRadius: 0
            }}
            elevation={2}
        >
            <Grid container direction='row' minHeight={165}>
                <Grid item xs={3}>
                    <Avatar
                        src={profile.photo ?? 'https://res.cloudinary.com/dwixnc66t/image/upload/v1641058233/samples/people/kitchen-bar.jpg'}
                        sx={{
                            width: { xs: 100, md: 175},
                            height: { xs: 100, md: 175},
                            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset',
                            left: { xs: 'calc(50% - 50px)', md: 'calc(50% - 87.5px)'},
                            top: 0,
                            mb: 'calc(-5% - 87.5px)'
                        }}
                    />
                </Grid>
                <Grid item xs={4} alignSelf='center'>
                    <Stack spacing={1}>
                        <Stack spacing={-0.5} justifyContent='center'>
                            <Typography component='span' fontSize={22}>{profile?.displayName}<VerifiedIcon sx={{fontSize:14,color:'royalblue'}} /></Typography>
                            <Typography sx={{ fontSize: 14, fontStyle: 'italic' }} variant='caption' color='secondary.dark'>@{profile?.userName}</Typography>
                        </Stack>
                        <Chip size='small' label="color-code" color='primary' variant="outlined" sx={{width:'fit-content'}} />
                    </Stack>
                </Grid>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={3} alignSelf='center'>
                    <Grid container sx={{ textAlign: 'center' }}>
                        <Grid item xs={12} md={6}>
                            <Stack direction='column' spacing={-1}>
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: 30,
                                        m: 0
                                    }}
                                    component="span"
                                    variant="h6"
                                    color="text.secondary"
                                >
                                    {profile.followers}
                                </Typography>
                                <Typography variant='caption'>Followers</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack direction='column' spacing={-1}>
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: 30,
                                        m: 0
                                    }}
                                    component="span"
                                    variant="h6"
                                    color="text.secondary"
                                >
                                    {profile.following}
                                </Typography>
                                <Typography variant='caption'>Following</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} m={1}><Divider variant='middle' /></Grid>
                        <Grid item xs={12}>
                            <Button
                                variant='contained'
                                size='small'
                                sx={{width:'75%'}}
                                endIcon={<FavoriteBorder />}
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