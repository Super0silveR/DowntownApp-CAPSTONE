import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../app/stores/store";
import CustomTabPanel from "../../app/common/components/TabPanel";
import { CircularProgress, Grid, Stack } from "@mui/material";
import ProfileCard from "./ProfileCard";
import theme from "../../app/theme";

export default observer(function ProfileFollowings() {
    const {profileStore} = useStore();
    const {profile, followings, loadingFollowings} = profileStore;

    return (
        <CustomTabPanel
            content={
                <>
                    {loadingFollowings ?
                        <Stack 
                            alignItems='center'
                            direction='row' 
                            justifyContent='center'
                            sx={{mt: 4}}
                        >
                            <CircularProgress sx={{color:theme.palette.primary.main}} />
                        </Stack> :
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                People that {profile?.displayName} is following!
                            </Grid>
                            {followings.map(following => (
                                <Grid item xs={12} sm={6} md={3} key={following.userName}>
                                    <ProfileCard 
                                        key={following.userName} 
                                        profile={following} 
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    }
                </>
            }
            id='followings-profile-tab'
            value='3'
            
        />
    );
})