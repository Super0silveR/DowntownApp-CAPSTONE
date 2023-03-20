import { Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import NotComplete from '../../app/common/NotComplete';
import { Profile } from '../../app/models/profile';

interface Props {
    profile: Profile;
}

function ProfileGeneral({ profile }: Props) {
    return (
        <>
            {profile?.bio
                ? <Typography>Bio</Typography>
                : <NotComplete text='Profile is not completed yet...' />
            }
        </>    
    );
}

export default observer(ProfileGeneral);