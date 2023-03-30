import { CropOriginal, EmojiEvents, PeopleOutline, PermIdentity } from '@mui/icons-material';
import { TabContext, TabList } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import CustomTabPanel from '../../app/common/components/TabPanel';
import { Profile } from '../../app/models/profile';
import ProfileEvents from './ProfileEvents';
import ProfileGeneral from './ProfileGeneral';
import ProfilePhotos from './ProfilePhotos';

interface Props {
    profile: Profile;
}

function ProfileContent({ profile }: Props) {
    const [value, setValue] = useState('0');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
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
            <TabContext value={value}>
                <TabList
                    sx={{p: 1, pt:0, mb:-1}}
                    onChange={handleChange}
                    aria-label="Profile Sections"
                    selectionFollowsFocus
                    centered
                >
                    <Tab label="General" value='0' icon={<PermIdentity fontSize='small' />} iconPosition='top' />
                    <Tab label="Photos" value='1' icon={<CropOriginal fontSize='small' />} iconPosition='top' />
                    <Tab label="Events" value='2' icon={<EmojiEvents fontSize='small' />} iconPosition='top' />
                    <Tab label="Friends" value='3' icon={<PeopleOutline fontSize='small' />} iconPosition='top' />
                </TabList>
                <ProfileGeneral profile={profile} />
                <ProfilePhotos profile={profile} />
                <ProfileEvents />
                <CustomTabPanel
                    id='followers-profile-tab'
                    value='3'
                />
            </TabContext>
        </Box>
    );
};

export default observer(ProfileContent);