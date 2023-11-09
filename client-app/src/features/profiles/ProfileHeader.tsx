import { Avatar, Chip, Divider, Grid, Paper, Stack, Typography, Tooltip, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Profile } from '../../app/models/profile';
import VerifiedIcon from '@mui/icons-material/Verified';
import FollowButton from './FollowButton';
import { useStore } from '../../app/stores/store';
import EditProfileForm from './forms/EditProfileForm';
import { GetColor } from '../../app/common/constants';

interface Props {
    profile: Profile;
}

/** Test Image : 'https://res.cloudinary.com/dwixnc66t/image/upload/v1641058233/samples/people/kitchen-bar.jpg' */

function ProfileHeader({ profile }: Props) {

    const { modalStore, userStore : { user } } = useStore();

    const defaultColorCode = profile.colorCode ? GetColor(profile.colorCode) : GetColor('2');

    return (
        <Paper
            sx={{
                fontFamily: 'monospace',
                fontSize: 16,
                background: 'rgba(238, 238, 238, 0.85)',
                borderRadius: 0
            }}
            elevation={2}
            className='profile-header'
        >
            <Grid container direction='row' minHeight={165}>
                <Grid item xs={3}>
                    <Tooltip title="Edit my profile picture" placement="bottom">
                        <Avatar
                            src={profile.photo ?? ''}
                            sx={{
                                width: { xs: 100, md: 175 },
                                height: { xs: 100, md: 175 },
                                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset',
                                left: { xs: 'calc(50% - 50px)', md: 'calc(50% - 87.5px)' },
                                top: 0,
                                mb: 'calc(-5% - 87.5px)',
                                '&:hover': {
                                    opacity: [0.5, 0.5, 0.5],

                                }
                                
                            }}
                            
                        />
                    </Tooltip>
                </Grid>
                <Grid item xs={4} alignSelf='center'>
                    <Stack spacing={1}>
                        <Stack spacing={-0.5} justifyContent='center'>
                            <Typography component='span' fontSize={22}>{profile?.displayName}<VerifiedIcon sx={{fontSize:14,color:'royalblue'}} /></Typography>
                            <Typography sx={{ fontSize: 14, fontStyle: 'italic' }} variant='caption' color='secondary.dark'>@{profile?.userName}</Typography>
                            
                        </Stack>
                        <Chip label={defaultColorCode!.text} variant="outlined" sx={{ width: 'fit-content', color: defaultColorCode!.code, borderColor: defaultColorCode!.code }} />
                        {(user?.userName === profile.userName) &&
                            <Button
                                variant='contained'
                                size='small'
                                sx={{ width: '25%', height: 20 }}
                                onClick={() => modalStore.openModal(<EditProfileForm />)}
                            >
                                <Typography fontFamily='monospace'>Edit</Typography>
                            </Button>
                        }
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
                            <FollowButton profile={profile} />
                        </Grid>
                        {profile.isContentCreator && <div className="ribbon ribbon-top-right"><span>creator</span></div>}                        
                    </Grid>
                </Grid>
            </Grid>
        </Paper>  
    );
}

export default observer(ProfileHeader);