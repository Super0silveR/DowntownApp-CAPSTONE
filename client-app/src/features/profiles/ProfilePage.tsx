import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import { useParams } from 'react-router';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';
import ProfileAside from './ProfileAside';

function ProfilePage() {

    const { profileStore: { loadProfile, loadingProfile, profile, setActiveTab } } = useStore();
    const { userName } = useParams<{userName: string}>();

    useEffect(() => {
        if (userName) loadProfile(userName);
        return () => {
            setActiveTab(0);
        }
    }, [loadProfile, userName, setActiveTab]);

    if (loadingProfile) return <LoadingComponent content='Loading Profile...' />

    return (
        <Container maxWidth={false} disableGutters>
            {profile &&
                <Grid container>
                    <Grid item xs={12} mt={5}>
                        <ProfileHeader profile={profile} />
                    </Grid>
                    <Grid container spacing={1} textAlign='left'>
                        <Grid item xs={3} color='#fff'>
                            <ProfileAside profile={profile} />
                        </Grid>
                        <Grid item xs={9}>
                            <ProfileContent profile={profile} />                            
                        </Grid>
                    </Grid>
                </Grid>
            }
        </Container>    
    );
}

export default observer(ProfilePage);