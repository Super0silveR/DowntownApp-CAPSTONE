import { Button, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import TextArea from '../../app/common/form/TextArea';
import NotComplete from '../../app/common/NotComplete';
import { Profile } from '../../app/models/profile';

interface Props {
    profile: Profile;
}

function ProfileGeneral({ profile }: Props) {
    return (
        <>
            {profile?.bio
                ? (
                    <Stack direction='row'>
                        <Typography sx={{textDecoration:'underline', mr:1}}>
                            Bio
                        </Typography>
                        <Typography textAlign='justify'>
                            A believer in the power of technology to accelerate progress in healthcare, Joaquin is leading Johnson & Johnson to harness data science and intelligent automation for insight 
                            generation so that teams work as a united front, with expertise and purpose, to solve the world’s toughest health challenges.
                        </Typography>
                    </Stack>
                )
                : <NotComplete text='Profile is not completed yet...' />
            }
        </>    
    );
}

export default observer(ProfileGeneral);