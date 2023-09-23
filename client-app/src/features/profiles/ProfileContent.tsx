import { CropOriginal, EmojiEvents, People, PeopleOutline, PermIdentity } from '@mui/icons-material';
import { TabContext, TabList } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Profile } from '../../app/models/profile';
import ProfileEvents from './ProfileEvents';
import ProfileGeneral from './ProfileGeneral';
import ProfilePhotos from './ProfilePhotos';
import ProfileFollowings from './ProfileFollowings';
import { useStore } from '../../app/stores/store';
import ProfileFollowers from './ProfileFollowers';

interface Props {
    profile: Profile;
}

function ProfileContent({ profile }: Props) {
    const [value, setValue] = useState('0');
    const {profileStore} = useStore();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        profileStore.setActiveTab(Number.parseInt(newValue));
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
                borderRadius: '0.2em',
                mt: 1
            }}
        >
            <TabContext 
                value={value}
            >
                <TabList
                    sx={{p: 1, pt:0, mb:-1}}
                    onChange={(e, data) => handleChange(e, data)}
                    aria-label="Profile Sections"
                    selectionFollowsFocus

                    centered
                >
                    <Tab label="General" value='0' icon={<PermIdentity fontSize='small' />} iconPosition='top' />
                    <Tab label="Photos" value='1' icon={<CropOriginal fontSize='small' />} iconPosition='top' />
                    <Tab label="Events" value='2' icon={<EmojiEvents fontSize='small' />} iconPosition='top' />
                    <Tab label="Following" value='3' icon={<PeopleOutline fontSize='small' />} iconPosition='top' />
                    <Tab label="Followers" value='4' icon={<People fontSize='small' />} iconPosition='top' />
                </TabList>
                <ProfileGeneral profile={profile} />
                <ProfilePhotos profile={profile} />
                <ProfileEvents />
                <ProfileFollowings key='following' />
                <ProfileFollowers key='followers' />
            </TabContext>
        </Box>
    );
};

export default observer(ProfileContent);