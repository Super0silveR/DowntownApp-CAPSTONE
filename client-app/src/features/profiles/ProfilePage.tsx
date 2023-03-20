import React from 'react';
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import { useParams } from 'react-router';
import LoadingComponent from '../../app/layout/LoadingComponent';

function ProfilePage() {

    const { profileStore: { loadProfile, loadingProfile, profile } } = useStore();
    const { userName } = useParams<{userName: string}>();

    useEffect(() => {
        if (userName) loadProfile(userName);
    }, [loadProfile, userName]);

    if (loadingProfile) return <LoadingComponent content='Loading Profile...' />

    return (
        <>
            {profile &&
                <>
                    <ProfileHeader profile={profile} />
                    <ProfileContent profile={profile} />
                </>
            }
        </>    
    );
};

export default observer(ProfilePage);